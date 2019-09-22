class Room{
    constructor(roomId, roomTitle, namespace, isPrivate){
        this.roomId = roomId;
        this.namespace = namespace;
        this.roomTitle = roomTitle;
        this.isPrivate = isPrivate;
        this.history = [];
    }

    addMessage(message){
        this.history.push(message);
    }

    clearHistory(){
        this.history = [];
    }
}

module.exports = Room;