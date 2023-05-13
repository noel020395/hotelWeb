export default class UserModel {
    //做note 提醒 role 0 = admin
    // role 1 = user
    constructor({email, username, password,displayName,role}){
        this.email = email;
        this.username = username;
        this.password = password;
        this.displayName = displayName;
        this.role = role;
    }
}