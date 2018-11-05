import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { EditorService }    from '../../../services/editor.service';

import { Commands }         from '../../../enums/commands.enum';

@Component({
    selector:       'editor-textarea',
    templateUrl:    './textarea.component.html',
    styleUrls:      ['./textarea.component.scss']
})

export class TextareaComponent implements OnInit {
    @ViewChild('editorTextBox') textBox: ElementRef;

    public commands = Commands;

    private noteChanged: boolean = false;

    constructor(protected editorService: EditorService) { }

    ngOnInit() {
        this.editorService.setTextareaComponent(this);

        setInterval(() => {
            this.editorService.textUpdate();
        }, 300);
    }

    public getTextBox(): HTMLTextAreaElement {
        return <HTMLTextAreaElement> this.textBox.nativeElement;
    }

    onKeyDown(event) {
        if(event.code == 'Tab') {
            event.preventDefault();
            this.editorService.command(this.commands.Tab);
        }
    }
}
