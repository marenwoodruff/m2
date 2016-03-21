export class Option {
    selected:boolean;
    value:any;
    display: string;

    constructor(selected?:boolean, value?:any, display?:string) {
        this.selected = selected;
        this.value = value;
        this.display = display;
    }
}


