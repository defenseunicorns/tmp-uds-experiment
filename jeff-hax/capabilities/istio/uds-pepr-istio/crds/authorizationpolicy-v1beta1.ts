// This file is auto-generated by kubernetes-fluent-client, do not edit manually

import { GenericKind, RegisterKind } from "kubernetes-fluent-client";

export class AuthorizationPolicy extends GenericKind {
    /**
     * Configuration for access control on workloads. See more details at:
     * https://istio.io/docs/reference/config/security/authorization-policy.html
     */
    spec?:   Spec;
    status?: { [key: string]: unknown };
}

/**
 * Configuration for access control on workloads. See more details at:
 * https://istio.io/docs/reference/config/security/authorization-policy.html
 */
export interface Spec {
    /**
     * Optional.
     */
    action?: Action;
    /**
     * Specifies detailed configuration of the CUSTOM action.
     */
    provider?: Provider;
    /**
     * Optional.
     */
    rules?: Rule[];
    /**
     * Optional.
     */
    selector?:  Selector;
    targetRef?: TargetRef;
}

/**
 * Optional.
 */
export enum Action {
    Allow = "ALLOW",
    Audit = "AUDIT",
    Custom = "CUSTOM",
    Deny = "DENY",
}

/**
 * Specifies detailed configuration of the CUSTOM action.
 */
export interface Provider {
    /**
     * Specifies the name of the extension provider.
     */
    name?: string;
}

export interface Rule {
    /**
     * Optional.
     */
    from?: From[];
    /**
     * Optional.
     */
    to?: To[];
    /**
     * Optional.
     */
    when?: When[];
}

export interface From {
    /**
     * Source specifies the source of a request.
     */
    source?: Source;
}

/**
 * Source specifies the source of a request.
 */
export interface Source {
    /**
     * Optional.
     */
    ipBlocks?: string[];
    /**
     * Optional.
     */
    namespaces?: string[];
    /**
     * Optional.
     */
    notIpBlocks?: string[];
    /**
     * Optional.
     */
    notNamespaces?: string[];
    /**
     * Optional.
     */
    notPrincipals?: string[];
    /**
     * Optional.
     */
    notRemoteIpBlocks?: string[];
    /**
     * Optional.
     */
    notRequestPrincipals?: string[];
    /**
     * Optional.
     */
    principals?: string[];
    /**
     * Optional.
     */
    remoteIpBlocks?: string[];
    /**
     * Optional.
     */
    requestPrincipals?: string[];
}

export interface To {
    /**
     * Operation specifies the operation of a request.
     */
    operation?: Operation;
}

/**
 * Operation specifies the operation of a request.
 */
export interface Operation {
    /**
     * Optional.
     */
    hosts?: string[];
    /**
     * Optional.
     */
    methods?: string[];
    /**
     * Optional.
     */
    notHosts?: string[];
    /**
     * Optional.
     */
    notMethods?: string[];
    /**
     * Optional.
     */
    notPaths?: string[];
    /**
     * Optional.
     */
    notPorts?: string[];
    /**
     * Optional.
     */
    paths?: string[];
    /**
     * Optional.
     */
    ports?: string[];
}

export interface When {
    /**
     * The name of an Istio attribute.
     */
    key?: string;
    /**
     * Optional.
     */
    notValues?: string[];
    /**
     * Optional.
     */
    values?: string[];
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

export interface TargetRef {
    group?:     string;
    kind?:      string;
    name?:      string;
    namespace?: string;
}

RegisterKind(AuthorizationPolicy, {
  group: "security.istio.io",
  version: "v1beta1",
  kind: "AuthorizationPolicy",
});
