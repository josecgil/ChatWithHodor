class User {
    private _name:string;

    constructor(name:string) {
        this._name=name;
    }

    name():string {
        return this._name;
    }

    equals(anotherUser:User):boolean {
        if (this.name()==anotherUser.name()) return true
        return false
    }

}