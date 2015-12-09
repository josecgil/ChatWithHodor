/// <reference path="ChatRoom.ts" />
/// <reference path="EventBus.ts" />
/// <reference path="User.ts" />
class HumanController {

    private chatRoom:ChatRoom;
    private _user=new User("You");

    constructor(chatRoom:ChatRoom) {
        this.chatRoom=chatRoom;
        var eventBus=EventBus.getInstance();

        eventBus.on(ChatUI.HUMAN_INPUT_EVENT, (message) => {
            this.chatRoom.send(this._user, message);
        });
    }

    getUser():User {
        return this._user;
    }

}