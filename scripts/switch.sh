#!/bin/bash

# handle arguments, e.g., --init
case "$1" in
--init)
    echo "Initializing..."
    # Your initialization logic here
    mkdir -p .ws-switcher/main
    cp node_modules/vscode-ws-switcher/template.main.js .ws-switcher/main/ws.js
    ;;

--select)
    shift
    echo "Selecting workspace config ... $1" 
    path=.ws-switcher/$1/ws.js
    mod=node_modules/vscode-ws-switcher/index.js
    if [ -f "$mod" ];then
	node $mod $path > ws.code-workspace
    else
	echo "Could not find main module [$mod]"
    fi
    ;;
*)
    echo "Unknown command: $1"
    exit 1
    ;;
esac
