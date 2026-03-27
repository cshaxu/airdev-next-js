#!/bin/bash
# "@airdev/next": "seeded"

current_path=$(pwd)
cd $BAREBONE_NEXT_REPO_PATH

if [ -n "$BASH_VERSION" ]; then
  if [[ "$(type -t devtool)" != 'function' ]]; then
    source node_modules/@airdev/tool/bin/devtool.sh
  fi

elif [ -n "$ZSH_VERSION" ]; then
  if [[ "$(type devtool 2>/dev/null | grep -E 'function|alias')" == "" ]]; then
    source node_modules/@airdev/tool/bin/devtool.sh
  fi
fi

devtool env restore
cd $current_path
