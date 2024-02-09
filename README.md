# vscode-ws-switcher

## Installation

`npm install -D vscode-ws-switcher`

## Setup

Add to your package.json the following script:

` "init:ws-switcher": "wsswitch --init"`

Or run:

`node node_modules/.bin/wsswitch --init`

This will create a .ws-switcher folder at your top level which you should add to your 
global gitignore file (usually ~/.gitignore_global)

## Creating additional workspaces

Copy the main folder to a new name to create an additional workspace.



## Changing workspace



`node node_modules/.bin/wsswitch --switch main`


