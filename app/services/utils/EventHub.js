
var EventHub = function EventHub(options) {
    var thus = this;
    var channels = { };
    
    function publish(channel, ...args) {
        if (!this.channels[channel]) this.channels[channel] = [ ];
        let channels = this.channels[channel];
        
        for (let i = 0, len = channels.length; i < len; i++) {
            let subscription = channels[i], handler = subscription.handler, context = subscription.context;
            handler.apply(context, args);
        }
        
        return this;
    }
    
    function subscribe(channel, handler) {
        if (!this.channels[channel]) this.channels[channel] = [ ];
        var subscription = { handler, context: this };
        this.channels[channel].push(subscription);
        return this;
    }
    
    function unsubscribe(channel, handler) {
        console.warn('UNIMPLEMENTED', channel, handler);
        return this;
    }
    
    // export precepts
    this.channels = channels;
    this.publish = publish;
    this.subscribe = subscribe;
    this.unsubscribe = unsubscribe;
    
    return this;
};

export { EventHub as default, EventHub };
