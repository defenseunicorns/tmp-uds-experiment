import { K8s, kind } from "kubernetes-fluent-client";

////////////////////////////////////////////////////////////////////////////////

// #1

Promise.all([
  // Admin Gateway Secret, "*.admin.burning.boats"
  K8s(kind.Secret).Apply({
    metadata: {
      name: "gw-cert",
      namespace: "istio-admin-gateway",
    },
    type: "kubernetes.io/tls",
    stringData: {
      "tls.crt": process.env.ADMIN_GATEWAY_TLS_CERT,
      "tls.key": process.env.ADMIN_GATEWAY_TLS_KEY,
    },
  }),

  // Tenant Gateway Secret, "*.burning.boats"
  K8s(kind.Secret).Apply({
    metadata: {
      name: "gw-cert",
      namespace: "istio-tenant-gateway",
    },
    type: "kubernetes.io/tls",
    stringData: {
      "tls.crt": process.env.TENANT_GATEWAY_TLS_CERT,
      "tls.key": process.env.TENANT_GATEWAY_TLS_KEY,
    },
  }),
]).catch((e) => {
  // If there's an error, log it and exit with an error code to fail the job.
  console.error(e);
  process.exit(1);
});

////////////////////////////////////////////////////////////////////////////////

// #2

apply().catch((e) => {
  console.error(e);
  process.exit(1);
});

async function apply() {
  // Admin Gateway Secret, "*.admin.burning.boats"
  await K8s(kind.Secret).Apply({
    metadata: {
      name: "gw-cert",
      namespace: "istio-admin-gateway",
    },
    type: "kubernetes.io/tls",
    stringData: {
      "tls.crt": process.env.ADMIN_GATEWAY_TLS_CERT,
      "tls.key": process.env.ADMIN_GATEWAY_TLS_KEY,
    },
  });

  // Tenant Gateway Secret, "*.burning.boats"
  await K8s(kind.Secret).Apply({
    metadata: {
      name: "gw-cert",
      namespace: "istio-tenant-gateway",
    },
    type: "kubernetes.io/tls",
    stringData: {
      "tls.crt": process.env.TENANT_GATEWAY_TLS_CERT,
      "tls.key": process.env.TENANT_GATEWAY_TLS_KEY,
    },
  });
}

////////////////////////////////////////////////////////////////////////////////

// #3

const applySecret = (gw: string) =>
  K8s(kind.Secret).Apply({
    metadata: {
      name: "gw-cert",
      namespace: `istio-${gw}-gateway`,
    },
    type: "kubernetes.io/tls",
    stringData: {
      "tls.crt": process.env[`${gw.toUpperCase()}_GATEWAY_TLS_CERT`],
      "tls.key": process.env[`${gw.toUpperCase()}_GATEWAY_TLS_KEY`],
    },
  });

Promise.all([applySecret("admin"), applySecret("tenant")]).catch((e) => {
  console.error(e);
  process.exit(1);
});

