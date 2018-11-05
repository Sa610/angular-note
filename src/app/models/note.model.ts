export class Note {
    readonly MAX_HISTORY_LINES: number = 40;
    readonly SAVE_EACH:         number = 3;

    private history:        Array<string> = [];
    private historyIndex:   number = 0;

    public constructor(public id: number, public title: string, public text: string, public updateAt: Date) {
        this.history.push(text);
    }

    public setText(text: string) {
        this.text = text;

        if(this.history[this.historyIndex] != text) {
            if(this.history.length == 0 || Math.abs(text.length - this.history[this.historyIndex].length) > this.SAVE_EACH)
                this.history.push(text);
            else
                this.history[this.history.length] = text;

            if(this.history.length > this.MAX_HISTORY_LINES)
                this.history.splice(0, 1);
            else if(this.history.length > 1 || this.history[this.history.length] != text)
                this.historyIndex ++;
        }
    }

    public undoLastChange(): string {
        if(this.historyIndex > 0)
            this.historyIndex --;

        if(this.history.length > 0)
            this.text = this.history[this.historyIndex];

        return this.text;
    }

    public redoLastChange(): string {
        if(this.historyIndex < this.history.length - 1)
            this.historyIndex ++;

        if(this.history.length > 0)
            this.text = this.history[this.historyIndex];

        return this.text;
    }
}
