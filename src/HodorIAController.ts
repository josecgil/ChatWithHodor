/// <reference path="EventBus.ts" />
/// <reference path="ChatRoom.ts" />
/// <reference path="User.ts" />

class HodorIAController {
    constructor(chatRoom:ChatRoom, maxTimeToRespond=1000) {
        var eventBus=EventBus.getInstance();
        var hodor=new User("Hodor");

        chatRoom.expect(hodor);
        setTimeout(()=>{
            chatRoom.join(hodor);
            eventBus.on(ChatRoom.USER_SENDMESSAGE_EVENT, (event) => {
                if (event.user.equals(hodor)) return;
                chatRoom.send(hodor, "Hodor! hodor! hodor...", maxTimeToRespond);
            });

        }, maxTimeToRespond);



    }
}