/// <reference path="../lib/jquery-2.1.4/jquery.d.ts" />
/// <reference path="EventBus.ts" />

class ChatUI {
    private statusElement:JQuery=$("#status");
    private messagesElement:JQuery=$("#messages");
    private textBoxElement:JQuery=$("input");
    private buttonElement:JQuery=$("button");
    private eventBus:EventBus;

    public static HUMAN_INPUT_EVENT:string = "chatui.human.input";

    constructor() {
        this.eventBus=EventBus.getInstance();

        this.eventBus.on(ChatRoom.USER_EXPECTED_EVENT, (user) => {
            this.status("Waiting for "+user.name()+" to join the chat...");
        });
        this.eventBus.on(ChatRoom.USER_JOINED_EVENT, (user) => {
            this.status(user.name()+" has joined the chat");
        });
        this.eventBus.on(ChatRoom.USER_SENDMESSAGE_EVENT, (event) => {
            this.addMessage(event.user, event.message);
        });

        this.textBoxElement.keypress((event)=> {
            if (event.keyCode!=13) {
                return;
            }
            this.triggerHumanInput();
        });
        this.buttonElement.click((event) => {
            event.preventDefault();
            this.triggerHumanInput();
        });

    }

    private triggerHumanInput():void {
        this.eventBus.trigger(ChatUI.HUMAN_INPUT_EVENT, this.textBoxElement.val());
        this.textBoxElement.val("");
    }

    status(message:string):void {
        this.statusElement.html(message);
    }

    addMessage(user:User, message:string):void {
        var messagesElement = this.messagesElement;
        if (messagesElement.length==0) return;
        messagesElement.append("<strong>"+user.name()+"</strong>: "+message+"<br/>");
        messagesElement.scrollTop(messagesElement[0].scrollHeight);
    }
}
