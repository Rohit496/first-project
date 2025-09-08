#!/bin/bash

# Script to run ESLint only on critical errors
# This bypasses any Trunk interference

# Run prettier first to fix formatting
npx prettier --write "$@"

# Run ESLint with only error-level issues (--quiet suppresses warnings)
npx eslint --fix --quiet "$@"
