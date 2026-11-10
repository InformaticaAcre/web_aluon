#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   export ALUON_REGISTRY="ghcr.io/ORG"   # or "docker.io/USER", "registry.example.com/namespace"
#   export ALUON_FRONTEND_TAG="1.0.0"
#   export ALUON_BACKEND_TAG="0.1.0"
#   ./scripts/publish-images.sh
#
# Prereq: `docker login` to the registry already done in your terminal.

REGISTRY="${ALUON_REGISTRY:?Set ALUON_REGISTRY (e.g. docker.io/user or ghcr.io/org)}"
FRONT_TAG="${ALUON_FRONTEND_TAG:-1.0.0}"
BACK_TAG="${ALUON_BACKEND_TAG:-0.1.0}"

LOCAL_FRONT="aluon/frontend:local"
LOCAL_BACK="aluon/backend:local"

REMOTE_FRONT="${REGISTRY}/aluon-frontend:${FRONT_TAG}"
REMOTE_BACK="${REGISTRY}/aluon-backend:${BACK_TAG}"

echo "Tagging:"
echo "  ${LOCAL_FRONT} -> ${REMOTE_FRONT}"
echo "  ${LOCAL_BACK}  -> ${REMOTE_BACK}"
docker tag "${LOCAL_FRONT}" "${REMOTE_FRONT}"
docker tag "${LOCAL_BACK}" "${REMOTE_BACK}"

echo "Pushing:"
docker push "${REMOTE_FRONT}"
docker push "${REMOTE_BACK}"

echo "Done."
echo "Portainer env:"
echo "  ALUON_FRONTEND_IMAGE=${REMOTE_FRONT}"
echo "  ALUON_BACKEND_IMAGE=${REMOTE_BACK}"

