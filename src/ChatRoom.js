/// <reference path="User.ts" />
/// <reference path="EventBus.ts" />
/// <reference path="ChatUI.ts" />
var ChatRoom = (function () {
    function ChatRoom() {
        this.eventBus = EventBus.getInstance();
    }
    ChatRoom.prototype.expect = function (user) {
        this.eventBus.trigger(ChatRoom.USER_EXPECTED_EVENT, user);
    };
    ChatRoom.prototype.join = function (user) {
        this.eventBus.trigger(ChatRoom.USER_JOINED_EVENT, user);
    };
    ChatRoom.prototype.send = function (user, message, delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        if (delay == 0) {
            this.sendMessage(user, message);
            return;
        }
        setTimeout(function () {
            _this.sendMessage(user, message);
        }, delay);
    };
    ChatRoom.prototype.sendMessage = function (user, message) {
        this.eventBus.trigger(ChatRoom.USER_SENDMESSAGE_EVENT, { user: user, message: message });
    };
    ChatRoom.USER_EXPECTED_EVENT = "chatroom.user.expected";
    ChatRoom.USER_JOINED_EVENT = "chatroom.user.joined";
    ChatRoom.USER_SENDMESSAGE_EVENT = "chatroom.user.sendmessage";
    return ChatRoom;
})();
//# sourceMappingURL=ChatRoom.js.map