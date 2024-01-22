// Description: Common settings for all workspaces

const scrdir = process.cwd()

const fs = require('fs');

const configTasks = () => {
    const workspaceDir = `${scrdir}/.ws-switcher`;
    const folderNames = fs.readdirSync(workspaceDir).filter(x => x !== 'common');

    return folderNames.map((name) => {
        return {
            "label": "WS: " + name,
            "type": "shell",
            "command": `bash`,
            "args": [
                `${scrdir}/node_modules/vscode-ws-switcher/scripts/switch.sh`,
                '--select',
                name
            ],
            "options": {
                "cwd": `${scrdir}`,
            },
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    });
}

const commonProperties = (dark = true) => {
    return {
        settings: {
            "workbench.colorTheme": dark ? "Monokai" : "Visual Studio Light",
            "workbench.iconTheme": "material-icon-theme",
            "workbench.startupEditor": "newUntitledFile",
            "workbench.editor.enablePreview": false,
            // hide line numbers
            "editor.lineNumbers": "off",
            // hide minimap
            "editor.minimap.enabled": false,
            // hide folder named _superseded
            "files.exclude": {
                "_superseded": true,
                "**/*~": true,
                "**/.#*": true,
                "**/#*": true,
            },
            // hide gitignored files
            "git.ignoreMissingGitWarning": true,
        },
        tasks: {
            version: "2.0.0",
            tasks: [
                ...configTasks()
            ]
        },
        "info": {
            cwd: `${process.cwd()}`,
        }
    }
}


const wrapInWorkspace = (name, ws) => {
    try {
        console.log(JSON.stringify({
            folders: [
                {
                    "name": `~ ${name.split('').join(' ').toUpperCase()}`,
                    "path": ".ws-switcher/" + name,
                },
                ...ws
            ],
            ...commonProperties()
        }, null, 4))
    } catch (e) {
        console.log(JSON.stringify({
            "folders": [
                {
                    "name": "ERROR",
                    "path": "."
                },
            ],
            error: e
        }, null, 4))
    }
}

module.exports = wrapInWorkspace
