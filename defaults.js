module.exports = {
    settings: (dark) => ({
        "workbench.colorTheme": dark ? "Monokai" : "Visual Studio Light",
        "workbench.iconTheme": "material-icon-theme",
        "workbench.startupEditor": "newUntitledFile",
        "workbench.editor.enablePreview": false,
        // unhide line numbers
        "editor.lineNumbers": "relative",
        // hide minimap
        "vim.useSystemClipboard": true,
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
    }),
};
