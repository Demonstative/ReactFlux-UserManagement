
import { dispatcher } from './services/dispatcher';
import { director } from './director';

var sandbox = new class Sandbox {
    constructor() {
        
    }
    
    publish(...args) {
        director(...args);
        return this;
    }
    subscribe(...args) {
        director.subscribe(...args);
        return this;
    }
    
    dispatch(action) {
        dispatcher.dispatch(action);
        return this;
    }
    
    getUser(id) {
        var user = director.store.get(id);
        var primise = Promise.resolve(user);
        return promise;
    }
    getUsers() {
        var users = director.store.values();
        var promise = Promise.resolve(users);
        return promise;
    }
    
};

export { sandbox as $ };
