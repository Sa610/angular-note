import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { EditorService }    from '../../../services/editor.service';

import { Commands }         from '../../../enums/commands.enum';

@Component({
    selector:       'editor-textarea',
    templateUrl:    './textarea.component.html',
    styleUrls:      ['./textarea.component.scss']
})

export class TextareaComponent implements OnInit {
    @ViewChild('editorTextBox') editorTextBox: ElementRef;

    public commands = Commands;

    constructor(protected editorService: EditorService) { }

    ngOnInit() {
        this.editorService.setTextBoxReference(this.editorTextBox.nativeElement);

        setInterval(() => {
            this.editorService.textUpdate();
        }, 300);
    }

    onKeyDown(event) {
        if(event.code == 'Tab') {
            event.preventDefault();
            this.editorService.command(this.commands.Tab);
        }
    }
}
