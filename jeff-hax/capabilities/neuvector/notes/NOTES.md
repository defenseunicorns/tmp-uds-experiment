# Known diffs from BB

Security context(all the places... this is only some):

```yaml
  containerSecurityContext:
    capabilities:
      drop:
        - ALL
    privileged: true
    runAsNonRoot: true
    runAsUser: 1000
```

```yaml
enforcer:
  containerSecurityContext:
    capabilities:
      drop:
        - ALL
    privileged: true
  enabled: true
```

```yaml
Secret Data:
  secret:
    data:
      oidcinitcfg.yaml:
        always_reload: true
        client_id: null
        client_secret: null
        default_role: null
        enable: true
        issuer: 'https://login.dso.mil/auth/realms/baby-yoda'
      sysinitcfg.yaml:
        always_reload: true
        no_telemetry_report: true
        scan_config:
          auto_scan: true
      userinitcfg.yaml:
        always_reload: true
        users:
          - fullname: metrics
            password: password
            role: reader
            username: metrics
          - fullname: admin
            password: password
            role: admin
            username: admin
    enabled: true
```

```yaml
            - name: JDK_JAVA_OPTIONS
              value: '-Dcom.redhat.fips=false'
```

## TODO deal with this

```yaml
monitor:
  exporter:
    CTRL_PASSWORD: blah
    CTRL_USERNAME: metrics
    enabled: true
    image:
      repository: ironbank/neuvector/neuvector/prometheus-exporter
      tag: 5.1.0
    podAnnotations:
      bigbang.dev/istioVersion: 1.18.2-enterprise
      checksum/metrics-pass: dubbd-override
    serviceMonitor:
      annotations: {}
      enabled: true
      interval: ''
      labels: {}
      metricRelabelings: []
      relabelings: []
      scheme: https
      tlsConfig:
        caFile: /etc/prom-certs/root-cert.pem
        certFile: /etc/prom-certs/cert-chain.pem
        insecureSkipVerify: true
        keyFile: /etc/prom-certs/key.pem
    svc:
      annotations: {}
      enabled: true
      loadBalancerIP: null
      type: ClusterIP
  global: {}
  imagePullSecrets: private-registry
  install: true
  oem: null
  registry: registry1.dso.mil
  serviceAccount: default
monitoring:
  enabled: true
  namespace: monitoring
networkPolicies:
  controlPlaneCidr: 0.0.0.0/0
  enabled: true
  ingressLabels:
    app: admin-ingressgateway
```

## Gotchas

- Service Monitor setup depends on crds that arent there yet
