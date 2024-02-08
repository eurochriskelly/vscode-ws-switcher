// Description: Common settings for all workspaces

const scrdir = process.cwd();

const fs = require("fs");

const configTasks = (wsname) => {
    const workspaceDir = `${scrdir}/.ws-switcher`;
    const folderNames = fs
        .readdirSync(workspaceDir)
        .filter((x) => x !== "common");

    const toggleOpt = (opt) => ({
        label: `WS: toggle ${opt} extra drawers`,
        type: "shell",
        command: `bash`,
        args: [
            `${scrdir}/node_modules/vscode-ws-switcher/scripts/switch.sh`,
            `--toggle-${opt}`,
            wsname,
        ],
        options: {
            cwd: `${scrdir}`,
        },
        group: {
            kind: "build",
            isDefault: true,
        },
    });
    return [
        toggleOpt("show"),
        toggleOpt("hide"),
        ...folderNames
            .filter((name) => {
                const data = require(`${workspaceDir}/${name}/ws.js`);
                if (!data.disabled) {
                    return true;
                }
            })
            .map((name) => {
                return {
                    label: "WS: " + name,
                    type: "shell",
                    command: `bash`,
                    args: [
                        `${scrdir}/node_modules/vscode-ws-switcher/scripts/switch.sh`,
                        "--select",
                        name,
                    ],
                    options: {
                        cwd: `${scrdir}`,
                    },
                    group: {
                        kind: "build",
                        isDefault: true,
                    },
                };
            }),
    ];
};

const commonProperties = (name, dark = true) => {
    return {
        settings: {
            "workbench.colorTheme": dark ? "Monokai" : "Visual Studio Light",
            "workbench.iconTheme": "material-icon-theme",
            "workbench.startupEditor": "newUntitledFile",
            "workbench.editor.enablePreview": false,
            // unhide line numbers
            "editor.lineNumbers": "on",
            // hide minimap
            "editor.minimap.enabled": false,
            // hide folder named _superseded
            "files.exclude": {
                _superseded: true,
                "**/*~": true,
                "**/.#*": true,
                "**/#*": true,
            },
            // hide gitignored files
            "git.ignoreMissingGitWarning": true,
        },
        tasks: {
            version: "2.0.0",
            tasks: [...configTasks(name)],
        },
        info: {
            cwd: `${process.cwd()}`,
        },
    };
};

// ENTRY POINT
const wrapInWorkspace = (name, ws, opt) => {
    try {
        console.log(
            JSON.stringify(
                {
                    folders: [
                        {
                            name: `⚙️  ${name.split("").join(" ").toUpperCase()}`,
                            path: ".ws-switcher/" + name,
                        },
                        ...ws.map(({ name, path, disabled }) => {
                            return disabled && opt !== "--show"
                                ? { name: `🚫 ${name}`, path: "~/BROKEN" }
                                : { name: `📝 ${name}`, path };
                        }),
                    ],
                    ...commonProperties(name),
                },
                null,
                4,
            ),
        );
    } catch (e) {
        console.log(
            JSON.stringify(
                {
                    folders: [
                        {
                            name: "ERROR",
                            path: ".",
                        },
                    ],
                    error: `${e}`,
                },
                null,
                4,
            ),
        );
    }
};

module.exports = wrapInWorkspace;
