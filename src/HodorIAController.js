/// <reference path="EventBus.ts" />
/// <reference path="ChatRoom.ts" />
/// <reference path="User.ts" />
var HodorIAController = (function () {
    function HodorIAController(chatRoom, maxTimeToRespond) {
        if (maxTimeToRespond === void 0) { maxTimeToRespond = 1000; }
        var eventBus = EventBus.getInstance();
        var hodor = new User("Hodor");
        chatRoom.expect(hodor);
        setTimeout(function () {
            chatRoom.join(hodor);
            eventBus.on(ChatRoom.USER_SENDMESSAGE_EVENT, function (event) {
                if (event.user.equals(hodor))
                    return;
                chatRoom.send(hodor, "Hodor! hodor! hodor...", maxTimeToRespond);
            });
        }, maxTimeToRespond);
    }
    return HodorIAController;
})();
//# sourceMappingURL=HodorIAController.js.map