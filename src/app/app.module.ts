import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './components/editor/editor.component';
import { CommandsComponent } from './components/editor/commands/commands.component';
import { TextareaComponent } from './components/editor/textarea/textarea.component';

@NgModule({
    declarations: [
        AppComponent,
        EditorComponent,
        CommandsComponent,
        TextareaComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
