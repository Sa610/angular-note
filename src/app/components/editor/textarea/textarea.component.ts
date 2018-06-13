import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector:       'editor-textarea',
    templateUrl:    './textarea.component.html',
    styleUrls:      ['./textarea.component.scss']
})

export class TextareaComponent implements OnInit {
    // @ViewChild('textarea') textarea: ElementRef;
    pointerPosition: int;

    constructor() {
        // this.textarea.nativeComponent.height = window.innerHeight;
        // window.innerHeight;
    }

    ngOnInit() {
        // console.log(this.textarea.nativeElement);
        // window.test = this.textarea.nativeElement;

        // this.textarea.nativeElement.style.height = (window.innerHeight - 45) + "px";
    }

    changedPointerPosition(event) {
        window.test = event.target;
        console.log(event.target.selectionStart);
    }
}
