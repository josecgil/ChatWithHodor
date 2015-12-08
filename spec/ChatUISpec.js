describe("ChatUI", function () {

    var chatRoom;
    var chatUI;

    beforeEach(function() {
        chatRoom = new ChatRoom();
        chatUI=new ChatUI(chatRoom);
        spyOn(chatUI, 'status');
        spyOn(chatUI, 'addMessage');
    });


    it("must show status in chatUI when a user is expected", function () {
        var newUser=new User("UserName");
        chatRoom.expect(newUser);
        expect(chatUI.status).toHaveBeenCalledWith("Waiting for "+newUser.name()+" to join the chat...");
    });

    it("must show status in chatUI when a user is added", function () {
        var newUser=new User("UserName");
        chatRoom.join(newUser);
        expect(chatUI.status).toHaveBeenCalledWith(newUser.name()+" has joined the chat");
    });

    it("must show message in chatUI when a user sends a message", function () {
        var user=new User("UserName");
        var message="Message";
        chatRoom.send(user, message);
        expect(chatUI.addMessage).toHaveBeenCalledWith(user, message);
    });

});
