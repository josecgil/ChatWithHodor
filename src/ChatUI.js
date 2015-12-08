/// <reference path="../lib/jquery-2.1.4/jquery.d.ts" />
/// <reference path="EventBus.ts" />
var ChatUI = (function () {
    function ChatUI() {
        var _this = this;
        this.statusElement = $("#status");
        this.messagesElement = $("#messages");
        this.textBoxElement = $("input");
        this.buttonElement = $("button");
        this.eventBus = EventBus.getInstance();
        this.eventBus.on(ChatRoom.USER_EXPECTED_EVENT, function (user) {
            _this.status("Waiting for " + user.name() + " to join the chat...");
        });
        this.eventBus.on(ChatRoom.USER_JOINED_EVENT, function (user) {
            _this.status(user.name() + " has joined the chat");
        });
        this.eventBus.on(ChatRoom.USER_SENDMESSAGE_EVENT, function (event) {
            _this.addMessage(event.user, event.message);
        });
        this.textBoxElement.keypress(function (event) {
            if (event.keyCode != 13) {
                return;
            }
            _this.triggerHumanInput();
        });
        this.buttonElement.click(function (event) {
            event.preventDefault();
            _this.triggerHumanInput();
        });
    }
    ChatUI.prototype.triggerHumanInput = function () {
        this.eventBus.trigger(ChatUI.HUMAN_INPUT_EVENT, this.textBoxElement.val());
        this.textBoxElement.val("");
    };
    ChatUI.prototype.status = function (message) {
        this.statusElement.html(message);
    };
    ChatUI.prototype.addMessage = function (user, message) {
        var messagesElement = this.messagesElement;
        if (messagesElement.length == 0)
            return;
        messagesElement.append("<strong>" + user.name() + "</strong>: " + message + "<br/>");
        messagesElement.scrollTop(messagesElement[0].scrollHeight);
    };
    ChatUI.HUMAN_INPUT_EVENT = "chatui.human.input";
    return ChatUI;
})();
//# sourceMappingURL=ChatUI.js.map