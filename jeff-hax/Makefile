ZARF_VERSION := v0.29.1
UDS_CLI_VERSION := v0.0.6-alpha
UNAME_S := $(shell uname -s)
UNAME_M := $(shell uname -m)
ifeq ($(UNAME_M),x86_64)
    ARCH := amd64
else ifeq ($(UNAME_M),amd64)
    ARCH := amd64
else ifeq ($(UNAME_M),arm64)
    ARCH := arm64
else
    $(error Unsupported architecture: $(UNAME_M))
endif

ROOT_DIR := $(dir $(realpath $(lastword $(MAKEFILE_LIST))))

########################################################################
# Build Section
########################################################################

build: ## Create build directory
	mkdir -p build

build/all: build build/zarf build/uds build/k3d build/metallb build/istio build/neuvector build/custom-dubbd build/jeff-hax-bundle

build/istio: | build/zarf ## create istio package
	cd build && ./zarf package create ../capabilities/istio/ --confirm -o .

build/metallb: | build ## Build metallb package
	cd build && ./zarf package create ../metallb/ --confirm -o .

build/neuvector: | build ## Build neuvector package
	cd build && ./zarf package create ../capabilities/neuvector/ --confirm -o .

build/k3d: | build ## Build idam-dns package
	cd build && ./zarf package create ../k3d/ --confirm -o .

build/custom-dubbd: | build ## Build custom-dubbd package
	echo "Placeholder for partial dubbd package"
# cd build && ./zarf package create ../capabilities/custom-dubbd/ --confirm -o .

build/jeff-hax-bundle: | build/uds ## create bundle
	cd build && ./uds bundle create ../ --confirm 
	mv uds-bundle-dubbd-experiments-*.tar.zst build/

.PHONY: build/zarf
build/zarf: | build ## Download the Zarf to the build dir
	if [ -f build/zarf ] && [ "$$(build/zarf version)" = "$(ZARF_VERSION)" ] ; then exit 0; fi && \
	echo "Downloading zarf" && \
	curl -sL https://github.com/defenseunicorns/zarf/releases/download/$(ZARF_VERSION)/zarf_$(ZARF_VERSION)_$(UNAME_S)_$(ARCH) -o build/zarf && \
	chmod +x build/zarf

.PHONY: build/uds
build/uds: | build ## Download uds-cli to the build dir
	if [ -f build/uds ] && [ "$$(build/uds version)" = "$(UDS_CLI_VERSION)" ] ; then exit 0; fi && \
	echo "Downloading uds-cli" && \
	curl -sL https://github.com/defenseunicorns/uds-cli/releases/download/$(UDS_CLI_VERSION)/uds-cli_$(UDS_CLI_VERSION)_$(UNAME_S)_$(ARCH) -o build/uds && \
	chmod +x build/uds


deploy: ## Deploy the  bundle
	cd build && ./uds deploy uds-bundle-dubbd-experiments-$(ARCH)-0.0.1.tar.zst --confirm

########################################################################
# Cleanup Section
########################################################################
.PHONY: clean
clean: ## Clean up build files
	rm -rf ./build
