// This file is auto-generated by kubernetes-fluent-client, do not edit manually

import { GenericKind, RegisterKind } from "kubernetes-fluent-client";

export class Sidecar extends GenericKind {
    /**
     * Configuration affecting network reachability of a sidecar. See more details at:
     * https://istio.io/docs/reference/config/networking/sidecar.html
     */
    spec?:   Spec;
    status?: { [key: string]: unknown };
}

/**
 * Configuration affecting network reachability of a sidecar. See more details at:
 * https://istio.io/docs/reference/config/networking/sidecar.html
 */
export interface Spec {
    /**
     * Egress specifies the configuration of the sidecar for processing outbound traffic from
     * the attached workload instance to other services in the mesh.
     */
    egress?: Egress[];
    /**
     * Ingress specifies the configuration of the sidecar for processing inbound traffic to the
     * attached workload instance.
     */
    ingress?: Ingress[];
    /**
     * Configuration for the outbound traffic policy.
     */
    outboundTrafficPolicy?: OutboundTrafficPolicy;
    /**
     * Criteria used to select the specific set of pods/VMs on which this `Sidecar`
     * configuration should be applied.
     */
    workloadSelector?: WorkloadSelector;
}

export interface Egress {
    /**
     * The IP(IPv4 or IPv6) or the Unix domain socket to which the listener should be bound to.
     */
    bind?: string;
    /**
     * When the bind address is an IP, the captureMode option dictates how traffic to the
     * listener is expected to be captured (or not).
     */
    captureMode?: CaptureMode;
    /**
     * One or more service hosts exposed by the listener in `namespace/dnsName` format.
     */
    hosts?: string[];
    /**
     * The port associated with the listener.
     */
    port?: EgressPort;
}

/**
 * When the bind address is an IP, the captureMode option dictates how traffic to the
 * listener is expected to be captured (or not).
 *
 * The captureMode option dictates how traffic to the listener is expected to be captured
 * (or not).
 */
export enum CaptureMode {
    Default = "DEFAULT",
    Iptables = "IPTABLES",
    None = "NONE",
}

/**
 * The port associated with the listener.
 */
export interface EgressPort {
    /**
     * Label assigned to the port.
     */
    name?: string;
    /**
     * A valid non-negative integer port number.
     */
    number?: number;
    /**
     * The protocol exposed on the port.
     */
    protocol?:   string;
    targetPort?: number;
}

export interface Ingress {
    /**
     * The IP(IPv4 or IPv6) to which the listener should be bound.
     */
    bind?: string;
    /**
     * The captureMode option dictates how traffic to the listener is expected to be captured
     * (or not).
     */
    captureMode?: CaptureMode;
    /**
     * The IP endpoint or Unix domain socket to which traffic should be forwarded to.
     */
    defaultEndpoint?: string;
    /**
     * The port associated with the listener.
     */
    port?: IngressPort;
    /**
     * Set of TLS related options that will enable TLS termination on the sidecar for requests
     * originating from outside the mesh.
     */
    tls?: TLS;
}

/**
 * The port associated with the listener.
 */
export interface IngressPort {
    /**
     * Label assigned to the port.
     */
    name?: string;
    /**
     * A valid non-negative integer port number.
     */
    number?: number;
    /**
     * The protocol exposed on the port.
     */
    protocol?:   string;
    targetPort?: number;
}

/**
 * Set of TLS related options that will enable TLS termination on the sidecar for requests
 * originating from outside the mesh.
 */
export interface TLS {
    /**
     * REQUIRED if mode is `MUTUAL` or `OPTIONAL_MUTUAL`.
     */
    caCertificates?: string;
    /**
     * Optional: If specified, only support the specified cipher list.
     */
    cipherSuites?: string[];
    /**
     * For gateways running on Kubernetes, the name of the secret that holds the TLS certs
     * including the CA certificates.
     */
    credentialName?: string;
    /**
     * If set to true, the load balancer will send a 301 redirect for all http connections,
     * asking the clients to use HTTPS.
     */
    httpsRedirect?: boolean;
    /**
     * Optional: Maximum TLS protocol version.
     */
    maxProtocolVersion?: ProtocolVersion;
    /**
     * Optional: Minimum TLS protocol version.
     */
    minProtocolVersion?: ProtocolVersion;
    /**
     * Optional: Indicates whether connections to this port should be secured using TLS.
     */
    mode?: TLSMode;
    /**
     * REQUIRED if mode is `SIMPLE` or `MUTUAL`.
     */
    privateKey?: string;
    /**
     * REQUIRED if mode is `SIMPLE` or `MUTUAL`.
     */
    serverCertificate?: string;
    /**
     * A list of alternate names to verify the subject identity in the certificate presented by
     * the client.
     */
    subjectAltNames?: string[];
    /**
     * An optional list of hex-encoded SHA-256 hashes of the authorized client certificates.
     */
    verifyCertificateHash?: string[];
    /**
     * An optional list of base64-encoded SHA-256 hashes of the SPKIs of authorized client
     * certificates.
     */
    verifyCertificateSpki?: string[];
}

/**
 * Optional: Maximum TLS protocol version.
 *
 * Optional: Minimum TLS protocol version.
 */
export enum ProtocolVersion {
    TLSAuto = "TLS_AUTO",
    Tlsv10 = "TLSV1_0",
    Tlsv11 = "TLSV1_1",
    Tlsv12 = "TLSV1_2",
    Tlsv13 = "TLSV1_3",
}

/**
 * Optional: Indicates whether connections to this port should be secured using TLS.
 */
export enum TLSMode {
    AutoPassthrough = "AUTO_PASSTHROUGH",
    IstioMutual = "ISTIO_MUTUAL",
    Mutual = "MUTUAL",
    OptionalMutual = "OPTIONAL_MUTUAL",
    Passthrough = "PASSTHROUGH",
    Simple = "SIMPLE",
}

/**
 * Configuration for the outbound traffic policy.
 */
export interface OutboundTrafficPolicy {
    egressProxy?: EgressProxy;
    mode?:        OutboundTrafficPolicyMode;
}

export interface EgressProxy {
    /**
     * The name of a service from the service registry.
     */
    host?: string;
    /**
     * Specifies the port on the host that is being addressed.
     */
    port?: EgressProxyPort;
    /**
     * The name of a subset within the service.
     */
    subset?: string;
}

/**
 * Specifies the port on the host that is being addressed.
 */
export interface EgressProxyPort {
    number?: number;
}

export enum OutboundTrafficPolicyMode {
    AllowAny = "ALLOW_ANY",
    RegistryOnly = "REGISTRY_ONLY",
}

/**
 * Criteria used to select the specific set of pods/VMs on which this `Sidecar`
 * configuration should be applied.
 */
export interface WorkloadSelector {
    /**
     * One or more labels that indicate a specific set of pods/VMs on which the configuration
     * should be applied.
     */
    labels?: { [key: string]: string };
}

RegisterKind(Sidecar, {
  group: "networking.istio.io",
  version: "v1alpha3",
  kind: "Sidecar",
});
