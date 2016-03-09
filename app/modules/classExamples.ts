/**
 * Created by Abbey on 3/9/2016.
 */

export module Matrix.MyMatrix {

    export interface IMustHaveIdAndText{
        id:number;
        text:string;
    }


    export class Question implements IMustHaveIdAndText{
        id:number;
        text:string;
    }


    export class Survey {
        id:number
        name:string;
        questions:IMustHaveIdAndText[];

        /*        constructor(){}*/
        constructor(id:number = 0, name:string = "Default Survery") {
            this.id = id;
            this.name = name;
        }
    }


    // how to declare instance inside the same namespace
    let instance = new Survey();
}

// how to declare instance outside of namespace
let instance = new Matrix.MyMatrix.Question();
