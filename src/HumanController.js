/// <reference path="ChatRoom.ts" />
/// <reference path="EventBus.ts" />
/// <reference path="User.ts" />
var HumanController = (function () {
    function HumanController(chatRoom) {
        var _this = this;
        this._user = new User("You");
        this.chatRoom = chatRoom;
        var eventBus = EventBus.getInstance();
        eventBus.on(ChatUI.HUMAN_INPUT_EVENT, function (message) {
            _this.chatRoom.send(_this._user, message);
        });
    }
    HumanController.prototype.getUser = function () {
        return this._user;
    };
    return HumanController;
})();
//# sourceMappingURL=HumanController.js.map