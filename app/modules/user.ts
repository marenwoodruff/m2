export class User {
    id:number;
    name:string;
    email:string;
    phone:number;

    constructor(id?:number, name?:string, email?:string, phone?:number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}
