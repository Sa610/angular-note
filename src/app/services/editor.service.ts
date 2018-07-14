import { Injectable, ElementRef } from '@angular/core';

import { Commands } from '../enums/commands.enum';

import { Converter } from 'showdown';

// @Injectable()
@Injectable({ providedIn: 'root'})

export class EditorService {
    public  rawText:            string                  = 'Ciao ami mio che mi dici?';

    private textBox:            HTMLTextAreaElement;
    private previewBox:         HTMLDivElement;

    private htmlPreview:        boolean                 = false;

    private htmlText:           string                  = '';
    private pointerPosition:    number                  = 0;
    private selectionStart:     number                  = 0;
    private selectionEnd:       number                  = 0;

    constructor() { }

    public update(): void {
        this.setPointerPosition(this.textBox.selectionStart, this.textBox.selectionEnd);
    }

    public setTextBoxReference(textBox: HTMLTextAreaElement): void {
        this.textBox = textBox;
    }
    public setPreviewBoxReference(previewBox: HTMLDivElement): void {
        this.previewBox = previewBox;
    }

    public command(commandType: Commands): void {
        var offset: number = 0;

        this.update();

        switch(commandType){
            case Commands.Header_1: case Commands.Header_2: case Commands.Header_3: {
                offset = this.addHeader(commandType);
                break;
            }
            case Commands.Bold: {
                offset = this.addBold();
                break;
            }
            case Commands.Italic: {
                offset = this.addItalic();
                break;
            }
            case Commands.Code: {
                offset = this.addCode();
                break;
            }
            case Commands.Link: {
                offset = this.addLink();
                break;
            }
            case Commands.List: {
                offset = this.addList();
                break;
            }
            case Commands.Tab: {
                offset = this.addTab();
                break;
            }
            case Commands.HTML: {
                this.showHTMLPreview();
                break;
            }
        }

        this.moveCursor(offset);
    }

    private addHeader(headerType: number): number {
        let syntax      = '#'.repeat(headerType + 1);

        this.rawText    = this.splice(this.rawText, this.selectionStart, this.selectionEnd - this.selectionStart, syntax + this.selectedText() + syntax);

        return syntax.length;
    }

    private addTab(): number {
        this.rawText    = this.splice(this.rawText, this.selectionStart, 0, "> ");
        return 2;
    }

    private addBold(): number {
        this.rawText    = this.splice(this.rawText, this.selectionStart, this.selectionEnd - this.selectionStart, "**" + this.selectedText() + "**");
        return 2;
    }

    private addItalic(): number {
        this.rawText    = this.splice(this.rawText, this.selectionStart, this.selectionEnd - this.selectionStart, "*" + this.selectedText() + "*");
        return 1;
    }

    private addCode(): number {
        this.rawText    = this.splice(this.rawText, this.selectionStart, this.selectionEnd - this.selectionStart, "`" + this.selectedText() + "`");
        return 1;
    }

    private addList(): number {
        let rows        = this.rawText.slice(0, this.selectionStart).split("\n").slice(0, -1);
        var index       = rows.join("\n").length + 1;

        if(index == 1)
            index = 0;

        if(this.rawText.slice(index, index + 1) != "*") {
            this.rawText    = this.splice(this.rawText, index, 0, "* ");
            return 2;
        } else {
            this.rawText    = this.splice(this.rawText, index, 2, "");
            return -2;
        }
    }

    private addLink(): number {
        var selectedText    = this.selectedText();

        if(selectedText == '')
            selectedText = 'Title';

        this.rawText        = this.splice(this.rawText, this.selectionStart, this.selectionEnd - this.selectionStart, "[" + selectedText + "](Link)");
        return 7;
    }

    private showHTMLPreview(): void {
        let html: string = (new Converter()).makeHtml(this.rawText);

        this.previewBox.innerHTML = html;
    }

    private selectedText(): string {
        return this.rawText.slice(this.selectionStart, this.selectionEnd);
    }

    private moveCursor(offset: number): void{
        this.textBox.focus();

        this.setPointerPosition(this.pointerPosition + offset);
    }

    private setPointerPosition(start: number, end: number = null): void {
        let that                    = this;

        this.selectionStart         = start;
        this.selectionEnd           = end || start;
        this.pointerPosition        = this.selectionEnd;

        setTimeout(function() {
            if (that.textBox.setSelectionRange) {
                that.textBox.focus();
                that.textBox.setSelectionRange(that.selectionStart, that.selectionEnd);
            }
         }, 1);
    }

    private splice(str: string, start: number, delCount: number, newSubStr: string): string {
        return str.slice(0, start) + newSubStr + str.slice(start + Math.abs(delCount));
    }
}
//
// String.prototype.splice = function(start, delCount, newSubStr) {
//     return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
// };
