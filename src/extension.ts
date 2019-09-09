import * as vscode from 'vscode';

async function promptForInput() {
	const input = await vscode.window.showInputBox();
	if(!input) { return; }
	vscode.commands.executeCommand('toggleCharacter.toggle', input);
}

function toggleOffCharacter(editor: vscode.TextEditor, currentLine: vscode.TextLine) {
	editor.edit((editBuilder: vscode.TextEditorEdit) => {
		const endPosition = currentLine.range.end;
		const endColumn = endPosition.character;
		const newEnd = new vscode.Position(currentLine.lineNumber, endColumn - 1);
		editBuilder.delete(new vscode.Range(newEnd, currentLine.range.end));
	});
}

function toggleOnCharacter(editor: vscode.TextEditor, currentLine: vscode.TextLine, toggleChar: string) {
	editor.edit((editBuilder: vscode.TextEditorEdit) => {
		editBuilder.insert(currentLine.range.end, toggleChar);
	});
}

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('toggleCharacter.toggle', (toggleChar?: string) => {
		const editor = vscode.window.activeTextEditor;

		if (!editor) { return; }
		if (!toggleChar) { return promptForInput(); }

		const currentLine = editor.document.lineAt(editor.selection.active.line);
		const currentLineText = currentLine.text;
		const endCharacter = currentLineText[currentLineText.length - 1];

		return endCharacter === toggleChar ? toggleOffCharacter(editor, currentLine)
										   : toggleOnCharacter(editor, currentLine, toggleChar);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
