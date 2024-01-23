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
    echo "Selecting... $1" 
    path=.ws-switcher/$1/ws.js 
    echo "Path is $path"
    node node_modules/vscode-ws-switcher/index.js $path > ws.code-workspace
    ;;

*)
    echo "Unknown command: $1"
    exit 1
    ;;
esac
