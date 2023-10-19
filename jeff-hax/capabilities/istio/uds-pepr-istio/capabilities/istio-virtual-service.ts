import { Capability, K8s, Log, a } from "pepr";
import {
  PurpleDestination,
  VirtualService,
} from "../crds/virtualservice-v1beta1";

export const IstioVirtualService = new Capability({
  name: "istio-virtual-service",
  description: "Generate Istio VirtualService resources",
  namespaces: [],
});

// Use the 'When' function to create a new action
const { When } = IstioVirtualService;

// Define the configuration keys
enum config {
  Gateway = "uds/istio-gateway",
  Host = "uds/istio-host",
  Port = "uds/istio-port",
}

// Define the valid gateway names
const validGateway = ["admin", "tenant", "passthrough"];

When(a.Service)
  .IsCreatedOrUpdated()
  .WithLabel(config.Gateway)
  .Watch(async svc => {
    const logTitle = `VirtualService ${svc.metadata.namespace}/${svc.metadata.name}`;

    try {
      // Validate the gateway
      const gateway = getValidGateway(svc);

      // Get the gateway name
      const gateways = [`istio-${gateway}-gateway/${gateway}-gateway`];

      // Get any the host or fallback to a wildcard
      const hosts = [svc.metadata.labels[config.Host] || "*"];

      // Get the port number
      const number =
        // Try to parse the port number from the label
        parseInt(svc.metadata.labels[config.Port]) ||
        // Try to parse the port number from a named port
        svc.spec.ports.find(p => p.name.includes("http"))?.port ||
        // Fallback to the first port
        svc.spec.ports[0].port;

      // Create the destination
      const destination: PurpleDestination = {
        host: `${svc.metadata.name}.${svc.metadata.namespace}.svc.cluster.local`,
        port: { number },
      };

      // Establish the owner ref
      const ownerReference = {
        apiVersion: svc.apiVersion,
        uid: svc.metadata.uid,
        kind: svc.kind,
        name: svc.metadata.name,
      };

      const payload = {
        metadata: {
          name: svc.metadata.name,
          namespace: svc.metadata.namespace,
          ownerReferences: [ownerReference],
        },
        spec: {
          hosts,
          gateways,
          http: [{ route: [{ destination }] }],
        },
      };

      Log.debug(payload, `Applying ${logTitle}`);

      // Apply the VirtualService
      await K8s(VirtualService).Apply(payload);

      Log.info(`Applied ${logTitle}`);
    } catch (e) {
      Log.error(e, `Error applying ${logTitle}`);
    }
  });

function getValidGateway(svc: a.Service): string {
  const gateway = svc.metadata.labels[config.Gateway];
  if (!validGateway.includes(gateway)) {
    throw new Error(`Invalid gateway: ${gateway}`);
  }

  return gateway;
}
