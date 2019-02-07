'use strict';

// @ts-check

const vscode = require('vscode');





/**
 * @param {vscode.ExtensionContext} context
 */
exports.activate = function (context) {
    context.subscriptions.push(Controller(1000));
};

exports.deactivate = function () {
};





const link = 'https://code.visualstudio.com/buy';

const message = [

    'Hello! Thanks for trying out VS Code.',

    '\n\n',

    'This is an unregistered evaluation version',
    ', and although the trial is untimed',
    ', a license must be purchased for continued use.',

    '\n\n',

    'Would you like to purchase a license now?',

].join('');





function Controller (MAX = 42) {

    let count = 0;

    const subscriptions = vscode.Disposable.from(
        vscode.window.onDidChangeTextEditorSelection(onEvent),
    );


    return Object.freeze({
        dispose,
    });

    // ========================================================================

    function dispose () {
        subscriptions.dispose();
    }

    /**
     * @param {vscode.TextEditorSelectionChangeEvent} event
     */
    async function onEvent (event) {

        if (event.kind !== vscode.TextEditorSelectionChangeKind.Keyboard) {
            return;
        }

        count += 1;

        if (count < MAX) {
            return;
        }

        count = 0;

        const resolution = await vscode.window.showWarningMessage(message, { modal: true }, 'Purchase');

        if (resolution !== 'Purchase') {
            return;
        }

        vscode.env.openExternal(vscode.Uri.parse(link));

    }

}

