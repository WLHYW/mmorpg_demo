import { _decorator, Component, EditBox, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoginManager')
export class LoginManager extends Component {
    account:EditBox;
    password:EditBox;
    onLoad() {
        this.account = this.node.getChildByName("Account").getComponent(EditBox);
        this.password = this.node.getChildByName("Password").getComponent(EditBox);

    }

    async register() {
        const account = this.account.string;
        const password = this.password.string;

        console.log("account", account);
        console.log("password", password);

        const res = await fetch("http://localhost:3000/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                account,
                password,
              }),
        }).then((response) => response.json());

            console.log("res",res);
    }
}

