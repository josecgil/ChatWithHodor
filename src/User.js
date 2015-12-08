var User = (function () {
    function User(name) {
        this._name = name;
    }
    User.prototype.name = function () {
        return this._name;
    };
    User.prototype.equals = function (anotherUser) {
        if (this.name() == anotherUser.name())
            return true;
        return false;
    };
    return User;
})();
//# sourceMappingURL=User.js.map