export class Note {
    readonly MAX_HISTORY_LINES = 40;

    private history:        Array<string> = [];
    private historyIndex:   number = 0;

    public constructor(public id: number, public title: string, public text: string, public updateAt: Date) { }

    public setText(text: string) {
        this.text = text;

        if(this.history.length == 0 || this.history[this.history.length - 1] != text) {
            this.history.push(text);

            if(this.history.length > this.MAX_HISTORY_LINES)
                this.history.splice(0, 1);
            else
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
}
