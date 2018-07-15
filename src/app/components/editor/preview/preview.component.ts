import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { EditorService }    from '../../../services/editor.service';

@Component({
    selector:       'editor-preview',
    templateUrl:    './preview.component.html',
    styleUrls:      ['./preview.component.scss']
})

export class PreviewComponent implements OnInit {
    @ViewChild('previewBox') previewBox: ElementRef;

    constructor(protected editorService: EditorService) { }

    ngOnInit() {
        this.editorService.setPreviewBoxReference(this.previewBox.nativeElement);
    }

}
