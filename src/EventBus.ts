/// <reference path="../lib/postal/postal.d.ts" />
/// <reference path="User.ts" />

class EventBus {

    private static _instance:EventBus = new EventBus();
    private static _channelNumber:number=null;
    private channel:PostalChannelDefinition = null;

    constructor() {
        if(EventBus._instance){
            throw new Error("Error: Instantiation failed: Use EventBus.getInstance() instead of new.");
        }
        EventBus._instance = this;
        if (EventBus._channelNumber!=null) {
            EventBus._channelNumber++;
        } else {
            EventBus._channelNumber=1;
        }

        var channelName = "EventBus-" + EventBus._channelNumber;
        this.channel = postal.channel(channelName);
    }

    static getInstance():EventBus
    {
        return EventBus._instance;
    }

    static destroyInstance() {
        EventBus._instance = null;
        EventBus._instance = new EventBus();
    }

    trigger(name:string, data:any):void {
        this.channel.publish(name, data);

    }

    on(eventName:string, callback:Function):void {
        this.channel.subscribe(eventName, function(eventData, envelope) {
            callback(eventData);
            return null
        });
    }

}