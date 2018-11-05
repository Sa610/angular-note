import { Injectable, ElementRef }   from '@angular/core';
import { IpcRenderer }              from 'electron';

import { TextareaComponent }        from '../components/editor/textarea/textarea.component';

import { CommandsModule }           from './modules/commands.module';

import { Note }                     from '../models/note.model';

// @Injectable()
@Injectable({ providedIn: 'root'})

export class EditorService extends CommandsModule {
    private switchedNote:   boolean = false;
    private ipc:            IpcRenderer | undefined;

    constructor() {
        super()

        if(window.require) {
            try {
                this.ipc = window.require('electron').ipcRenderer;

                this.ipc.on('pong', (event: Electron.IpcMessageEvent) => {
                    console.log('pong');
                });

                this.ipc.send('ping');
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log('Electron\'s IPC was not loaded')
        }
    }

    public on(channel: string, listener: Function): void {
        if (!this.ipc) {
            return;
        }
        this.ipc.on(channel, listener);
    }

    public send(channel: string, ...args): void {
        if (!this.ipc) {
            return;
        }
        this.ipc.send(channel, ...args);
    }


    public setTextareaComponent(component: TextareaComponent): void {
        this.textAreaComponent = component;
    }

    public setPreviewBoxReference(previewBox: HTMLDivElement): void {
        this.previewBox = previewBox;
    }

    public setNote(note: Note): void {
        this.currentNote    = note;
        this.rawText        = this.currentNote.text;

        this.switchedNote   = true;
    }

    public textUpdate(): void {
        if(this.currentNote != null && !this.switchedNote)
            this.currentNote.setText(this.rawText);
        else
            this.switchedNote = false;
    }
}
