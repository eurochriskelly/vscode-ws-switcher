const { resolve } = require('path')

const p = resolve(process.cwd(), process.argv[2])
const pw = resolve(process.cwd(), 'node_modules/vscode-ws-switcher/settings.js')

const data = require(p)

const wrapInWorkspace = require(pw)
wrapInWorkspace(data.title, data.folders)
