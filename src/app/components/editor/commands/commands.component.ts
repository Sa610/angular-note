import { Component, OnInit } from '@angular/core';

import { EditorService }    from '../../../services/editor.service';

import { Commands }         from '../../../enums/commands.enum';

@Component({
    selector:       'editor-commands',
    templateUrl:    './commands.component.html',
    styleUrls:      ['./commands.component.scss']
})

export class CommandsComponent implements OnInit {
    public commands = Commands;

    constructor(private editorService: EditorService) { }

    ngOnInit() { }

    public onCommand(commandType: Commands): void {
        this.editorService.command(commandType);
    }
}
