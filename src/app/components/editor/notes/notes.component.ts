import { Component, OnInit }    from '@angular/core';

import { EditorService }        from '../../../services/editor.service';

import { Note }                 from '../../../models/note.model';

@Component({
    selector:       'editor-notes',
    templateUrl:    './notes.component.html',
    styleUrls:      ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
    private notes:              Array<Note>             = [];

    constructor(protected editorService: EditorService) { }
    ngOnInit() {
        this.notes = [
            new Note(0, "Title #00", "Lorem ipsum... [TEXT #00]", new Date()),
            new Note(1, "Title #01", "Lorem ipsum... [TEXT #01]", new Date()),
            new Note(2, "Title #02", "Lorem ipsum... [TEXT #02]", new Date()),
            new Note(3, "Title #03", "Lorem ipsum... [TEXT #03]", new Date()),
            new Note(4, "Title #04", "Lorem ipsum... [TEXT #04]", new Date())
        ];
    }

    public selectNote(index: number) {
        this.editorService.setNote(this.notes[index]);
    }
}
