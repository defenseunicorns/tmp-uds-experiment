// This file is auto-generated by kubernetes-fluent-client, do not edit manually

import { GenericKind, RegisterKind } from "kubernetes-fluent-client";

export class ProxyConfig extends GenericKind {
    /**
     * Provides configuration for individual workloads. See more details at:
     * https://istio.io/docs/reference/config/networking/proxy-config.html
     */
    spec?:   Spec;
    status?: { [key: string]: unknown };
}

/**
 * Provides configuration for individual workloads. See more details at:
 * https://istio.io/docs/reference/config/networking/proxy-config.html
 */
export interface Spec {
    /**
     * The number of worker threads to run.
     */
    concurrency?: number;
    /**
     * Additional environment variables for the proxy.
     */
    environmentVariables?: { [key: string]: string };
    /**
     * Specifies the details of the proxy image.
     */
    image?: Image;
    /**
     * Optional.
     */
    selector?: Selector;
}

/**
 * Specifies the details of the proxy image.
 */
export interface Image {
    /**
     * The image type of the image.
     */
    imageType?: string;
}

/**
 * Optional.
 */
export interface Selector {
    /**
     * One or more labels that indicate a specific set of pods/VMs on which a policy should be
     * applied.
     */
    matchLabels?: { [key: string]: string };
}

RegisterKind(ProxyConfig, {
  group: "networking.istio.io",
  version: "v1beta1",
  kind: "ProxyConfig",
});
