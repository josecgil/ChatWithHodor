describe("HodorIAController", function () {

    var eventBus;
    var chatRoom;
    var MAX_TIME_TO_RESPOND = 1;

    beforeEach(function() {
        eventBus=EventBus.getInstance();
        chatRoom = new ChatRoom();
    });

    afterEach(function() {
        EventBus.destroyInstance();
    });

    it("must expect Hodor in chatRoom when HodorIAController is initialized", function (done) {
        eventBus.on(ChatRoom.USER_EXPECTED_EVENT, function(user) {
            expect(user.name()).toBe("Hodor");
            done();
        });
        new HodorIAController(chatRoom, MAX_TIME_TO_RESPOND);
    });

    it("must join Hodor in chatRoom when HodorIAController is initialized", function (done) {
        eventBus.on(ChatRoom.USER_JOINED_EVENT, function(user) {
            expect(user.name()).toBe("Hodor");
            done();
        });
        new HodorIAController(chatRoom, MAX_TIME_TO_RESPOND);
    });

    it("must not respond if not joined yet", function (done) {
        eventBus.on(ChatRoom.USER_SENDMESSAGE_EVENT, function(event) {
            if (event.user.name()!="Hodor") return;
            fail("Hodor has responded when not joined yet");
            done();
        });
        eventBus.on(ChatRoom.USER_EXPECTED_EVENT, function(user) {
            chatRoom.send(new User("user"), "message from user");
        });
        eventBus.on(ChatRoom.USER_JOINED_EVENT, function(user) {
            expect(user.name()).toBe("Hodor");
            done();
        });
        new HodorIAController(chatRoom, MAX_TIME_TO_RESPOND);
    });


});
