import { PeprModule } from "pepr";
// cfg loads your pepr configuration from package.json
import cfg from "./package.json";
import { IstioVirtualService } from "./capabilities/istio-virtual-service";

/**
 * This is the main entrypoint for this Pepr module. It is run when the module is started.
 * This is where you register your Pepr configurations and capabilities.
 */
new PeprModule(cfg, [
  IstioVirtualService,
  // Your capabilities go here
]);
