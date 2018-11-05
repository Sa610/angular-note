import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { EditorService }    from '../../services/editor.service';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

    constructor(protected editorService: EditorService) { }
    ngOnInit() { }

}
