'use strict';
// The module 'vscode' contains the VS Code extensibility API Import the module
// and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { readFileSync } from 'fs';

// this method is called when your extension is activated your extension is
// activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {
  vscode.languages.registerCompletionItemProvider('typescriptreact', {
    provideCompletionItems(
      document: vscode.TextDocument,
      position: vscode.Position,
      token: vscode.CancellationToken,
      context: vscode.CompletionContext
    ) {
      try {
        return vscode.workspace
          .findFiles('**/en-GB/messages.json', '**/node_modules/**', 1)
          .then(files => {
            if (files.length > 0) {
              const jsonFile = JSON.parse(readFileSync(files[0].path, 'utf8'));
              let item = new vscode.CompletionItem(
                'FM',
                vscode.CompletionItemKind.Snippet
              );
              const autocompleteKeys = [' ']
                .concat(Object.keys(jsonFile))
                .join(',');
              item.insertText = new vscode.SnippetString(
                "<FormattedMessage id='${1|" + autocompleteKeys + "|}' />"
              );
              item.documentation = new vscode.MarkdownString(
                'Inserts a snippet for <FormattedMessage/> with autocomplete support for locale keys'
              );
              return [item];
            }
          });
      } catch (error) {}
    },
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
