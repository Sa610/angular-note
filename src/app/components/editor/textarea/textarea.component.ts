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

    constructor(private editorService: EditorService) { }

    ngOnInit() {
        this.editorService.setTextBoxReference(this.editorTextBox.nativeElement);
    }

    onKeyDown(event) {
        if(event.code == 'Tab') {
            event.preventDefault();
            this.editorService.command(this.commands.Tab);
        }
    }
}
