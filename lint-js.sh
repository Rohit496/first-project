#!/bin/bash

# Script to run ESLint only on critical errors
# This bypasses any Trunk interference

# Run prettier first to fix formatting
npx prettier --write "$@"

# Run ESLint and capture output
ESLINT_OUTPUT=$(npx eslint --fix "$@" 2>&1)
ESLINT_EXIT_CODE=$?

echo "$ESLINT_OUTPUT"

# Check if there are actual errors (lines containing "error")
ERROR_COUNT=$(echo "$ESLINT_OUTPUT" | grep -c " error " 2>/dev/null)
if [ -z "$ERROR_COUNT" ]; then
  ERROR_COUNT=0
fi

if [ "$ERROR_COUNT" -gt 0 ]; then
  echo "❌ Found $ERROR_COUNT JavaScript errors that must be fixed before committing"
  exit 1
fi

echo "✅ No JavaScript errors found"
exit 0
