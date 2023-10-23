import { Capability, a } from "pepr";

export const IstioInjection = new Capability({
  name: "istio-injection",
  description:
    "Ensure Istio sidecar injection is explicitly enabled or disabled",
});

// Use the 'When' function to create a new action
const { When } = IstioInjection;

When(a.Namespace)
  .IsCreatedOrUpdated()
  // Require the namespace to have a label for Istio injection
  .Validate(ns => {
    if (ns.HasLabel("istio-injection")) {
      return ns.Approve();
    }

    return ns.Deny("Namespace must have a label for Istio injection");
  });
