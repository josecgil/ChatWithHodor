describe("ChatRoom", function () {

    var eventBus;
    var chatRoom;

    beforeEach(function() {
        eventBus=EventBus.getInstance();
        chatRoom = new ChatRoom();
    });

    afterEach(function() {
        EventBus.destroyInstance();
    });

    it("must send ChatRoom.USER_EXPECTED_EVENT when a user is expected to join", function (done) {
        var newUser=new User("UserName");
        eventBus.on(ChatRoom.USER_EXPECTED_EVENT, function(user) {
            expect(user.equals(newUser)).toBeTruthy();
            done();
        });
        chatRoom.expect(newUser);
    });

    it("must send ChatRoom.USER_JOINED_EVENT when a user is added", function (done) {
        var newUser=new User("UserName");
        eventBus.on(ChatRoom.USER_JOINED_EVENT, function(user) {
            expect(user.equals(newUser)).toBeTruthy();
            done();
        });
        chatRoom.join(newUser);
    });

    it("must send ChatRoom.USER_MESSAGE_EVENT when a user send a message", function (done) {
        var testMessage = "Message";
        var testUser=new User("UserName");
        eventBus.on(ChatRoom.USER_SENDMESSAGE_EVENT, function(event) {
            expect(event.user.equals(testUser)).toBeTruthy();
            expect(event.message).toBe(testMessage);
            done();
        });
        chatRoom.send(testUser, testMessage);
    });

});
