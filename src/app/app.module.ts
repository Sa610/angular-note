import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';

import { AppRoutingModule }     from './app-routing.module';
import { AppComponent }         from './app.component';
import { EditorComponent }      from './components/editor/editor.component';
import { CommandsComponent }    from './components/editor/commands/commands.component';
import { TextareaComponent }    from './components/editor/textarea/textarea.component';
import { PreviewComponent } from './components/editor/preview/preview.component';

@NgModule({
    declarations: [
        AppComponent,
        EditorComponent,
        CommandsComponent,
        TextareaComponent,
        PreviewComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
