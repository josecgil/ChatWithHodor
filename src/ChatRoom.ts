/// <reference path="User.ts" />
/// <reference path="EventBus.ts" />
/// <reference path="ChatUI.ts" />

class ChatRoom {
    private eventBus:EventBus;

    public static USER_EXPECTED_EVENT:string = "chatroom.user.expected";
    public static USER_JOINED_EVENT:string = "chatroom.user.joined";
    public static USER_SENDMESSAGE_EVENT:string = "chatroom.user.sendmessage";

    constructor() {
        this.eventBus=EventBus.getInstance();
    }

    expect(user:User):void {
        this.eventBus.trigger(ChatRoom.USER_EXPECTED_EVENT, user)
    }

    join(user:User):void {
        this.eventBus.trigger(ChatRoom.USER_JOINED_EVENT, user)
    }

    send(user:User, message:string, delay:number=0) {
        if (delay==0) {
            this.sendMessage(user, message);
            return;
        }
        setTimeout(()=> {
            this.sendMessage(user, message);
        }, delay);
    }

    private sendMessage(user, message) {
        this.eventBus.trigger(ChatRoom.USER_SENDMESSAGE_EVENT, {user: user, message: message});
    }
}