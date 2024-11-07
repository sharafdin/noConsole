import * as vscode from 'vscode';

export function removeConsole() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const document = editor.document;
        const consoleMethods = ["log", "error", "warn", "info", "debug", "trace"];
        let logsFound = false; // Track if any console logs are found

        editor.edit(editBuilder => {
            for (let i = 0; i < document.lineCount; i++) {
                const line = document.lineAt(i);
                
                // Check if line contains any of the primary console methods
                const regex = new RegExp(`console\\.(${consoleMethods.join("|")})\\(`);
                if (regex.test(line.text)) {
                    editBuilder.delete(line.range);
                    logsFound = true; // Mark that a log was found and removed
                }
            }
        }).then(success => {
            if (logsFound) {
                vscode.window.showInformationMessage(
                    'Primary console logs (log, error, warn, info, debug, trace) removed from file!'
                );
            } else {
                vscode.window.showInformationMessage(
                    'There are no primary console logs in this file.'
                );
            }
        });
    }
}
