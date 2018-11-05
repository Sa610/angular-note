import { Commands }                 from '../../enums/commands.enum';
import { Note }                     from '../../models/note.model';

import { TextareaComponent }        from '../../components/editor/textarea/textarea.component';

import { Converter }                from 'showdown';

export class CommandsModule {
    public  rawText:              string                  = '';

    protected textBox:            HTMLTextAreaElement;
    protected previewBox:         HTMLDivElement;

    protected textAreaComponent:  TextareaComponent;

    protected htmlPreview:        boolean                 = false;

    protected htmlText:           string                  = '';
    protected pointerPosition:    number                  = 0;
    protected selectionStart:     number                  = 0;
    protected selectionEnd:       number                  = 0;

    protected currentNote:        Note;

    constructor() { }

    public update(): void {
        this.setPointerPosition(this.textAreaComponent.getTextBox().selectionStart, this.textAreaComponent.getTextBox().selectionEnd);
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
            case Commands.Undo: {
                this.undo();
                break;
            }
            case Commands.Redo: {
                this.redo();
                break;
            }
            case Commands.HTML: {
                this.toggleHTMLPreview();
                break;
            }
        }

        this.moveCursor(offset);
    }

    protected addHeader(headerType: number): number {
        let syntax      = '#'.repeat(headerType + 1);

        this.rawText    = this.splice(this.rawText, this.selectionStart, this.selectionEnd - this.selectionStart, syntax + this.selectedText() + syntax);

        return syntax.length;
    }

    protected addTab(): number {
        this.rawText    = this.splice(this.rawText, this.selectionStart, 0, "> ");
        return 2;
    }

    protected addBold(): number {
        this.rawText    = this.splice(this.rawText, this.selectionStart, this.selectionEnd - this.selectionStart, "**" + this.selectedText() + "**");
        return 2;
    }

    protected addItalic(): number {
        this.rawText    = this.splice(this.rawText, this.selectionStart, this.selectionEnd - this.selectionStart, "*" + this.selectedText() + "*");
        return 1;
    }

    protected addCode(): number {
        this.rawText    = this.splice(this.rawText, this.selectionStart, this.selectionEnd - this.selectionStart, "`" + this.selectedText() + "`");
        return 1;
    }

    protected addList(): number {
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

    protected addLink(): number {
        var selectedText    = this.selectedText();

        if(selectedText == '')
            selectedText = 'Title';

        this.rawText        = this.splice(this.rawText, this.selectionStart, this.selectionEnd - this.selectionStart, "[" + selectedText + "](Link)");
        return 7;
    }

    protected undo(): void {
        this.rawText = this.currentNote.undoLastChange();
    }

    protected redo(): void {
        this.rawText = this.currentNote.redoLastChange();
    }

    protected toggleHTMLPreview(): void {
        let html: string;

        this.htmlPreview = !this.htmlPreview;

        if(this.htmlPreview) {
            html = (new Converter()).makeHtml(this.rawText);
            this.previewBox.innerHTML = html;
        }

        this.previewBox.style.display   = this.htmlPreview ? 'block' : 'none';
        this.textAreaComponent.getTextBox().style.display      = this.htmlPreview ? 'none' : 'block';
    }

    protected selectedText(): string {
        return this.rawText.slice(this.selectionStart, this.selectionEnd);
    }

    protected moveCursor(offset: number): void{
        this.textAreaComponent.getTextBox().focus();

        this.setPointerPosition(this.pointerPosition + offset);
    }

    protected setPointerPosition(start: number, end: number = null): void {
        let that                    = this;

        this.selectionStart         = start;
        this.selectionEnd           = end || start;
        this.pointerPosition        = this.selectionEnd;

        setTimeout(() => {
            if (that.textAreaComponent.getTextBox().setSelectionRange) {
                that.textAreaComponent.getTextBox().focus();
                that.textAreaComponent.getTextBox().setSelectionRange(that.selectionStart, that.selectionEnd);
            }
         }, 1);
    }

    protected splice(str: string, start: number, delCount: number, newSubStr: string): string {
        return str.slice(0, start) + newSubStr + str.slice(start + Math.abs(delCount));
    }
}
