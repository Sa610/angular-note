import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { EditorService }    from '../../services/editor.service';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    @ViewChild('wrapper') wrapper: ElementRef;

    constructor(protected editorService: EditorService) { }
    ngOnInit() {
        this.wrapper.nativeElement.style.height = (window.innerHeight) + "px";
    }

}
