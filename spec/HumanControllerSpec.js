describe("HumanController", function () {

    var eventBus;
    var chatRoom;

    beforeEach(function() {
        eventBus=EventBus.getInstance();
        chatRoom = new ChatRoom();
        spyOn(chatRoom, "send");
    });

    afterEach(function() {
        EventBus.destroyInstance();
    });

    it("must send message to chat when ChatUI.HUMAN_INPUT_EVENT is received", function () {
        var humanController=new HumanController(chatRoom);
        var message = "Hi";
        eventBus.trigger(ChatUI.HUMAN_INPUT_EVENT, message);
        expect(chatRoom.send).toHaveBeenCalledWith(humanController.getUser(), message)
    });


});
