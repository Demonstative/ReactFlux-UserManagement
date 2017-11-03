
import { Dictionary as Storage } from './services/utils/Dictionary';
import { EventHub } from './services/utils/EventHub';
import { User, Name, Address } from './children/common/models/user.model';
//
import { dispatcher } from './services/dispatcher';

// MOCK
const defaults = { };
;([
    new User({ name: { first: "Jonathan", last: "Chapman" }, address: { line1: "221 B Baker St." } }),
    new User({ name: { first: "Tony", last: "Stark" }, address: { line1: "1600 Pennsylvania Avenue NW" } }),
    new User({ name: { first: "Ada", last: "Lovelace" }, address: { line1: "1313 Webfoot Walk" } }),
]).forEach( (user) => defaults[user.id] = user );

const director = new class Mediator extends EventHub {
    constructor(store) {
        super();
        this.store = store;
        dispatcher.register(this.trigger.bind(this));
        
        return this;
    }
    
    trigger(action) {
        var type = action.type, request = this[type] || this.noop;
        request.call(this, action.data);
    }
    
    noop() { return undefined; }
    
    ['USER:CREATE'](data) {
        var user = new User(data);
        this.store.set(user.id, user);
        this.publish('USER:CREATED', user).trigger({ type: 'USERS:CHANGED', data: this.store.values() });
    }
    
    ['USERS:CHANGED'](data) {
        var users = data;
        this.publish('USERS:CHANGED', users);
    }
    
}(new Storage(defaults));

export { director as default, director };
