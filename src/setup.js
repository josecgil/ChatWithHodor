$(document).ready(function() {
    var chatRoom=new ChatRoom();
    var chatUI=new ChatUI();
    new HodorIAController(chatRoom);
    new HumanController(chatRoom);
});