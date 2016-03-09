module Matrix.MyMatrix {

    export class Option{
        selected:boolean;
        value:string;

        constructor(selected?:boolean, value?:string) {
            this.selected = selected;
            this.value = value;
        }
    }
}


