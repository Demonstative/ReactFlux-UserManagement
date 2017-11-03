
var Dictionary = function Dictionary(data) {
    var map = (function init(data) {
        var pairs = [ ];
        if (!data.push) for (let key in data) pairs.push([ key, data[key] ]);  // assume we've an object-literal
        else pairs = data;  // data must be an array
        return new Map(pairs);
    })(data || []);  // force a value
    
    function get(key) {
        return map.get(key);
    }
    
    function set(key, value) {
        return map.set(key, value);
    }
    
    function values() {
        var values = Array.from( map.values() );
        return values;
    }
    
    function keys() {
        return map.keys();
    }
    
    function __valueOf__() {
        var values = this.values(), map = { };
        
        for (let i = values.length; i--;) {
            let value = values[i];
            map[ value.id ] = value;
        }
        
        return map;
    }
    function __toJSON__() {
        return this.valueOf();
    }
    
    // export precepts
    this.get = get;
    this.set = set;
    this.values = values;
    this.keys = keys;
    this.valueOf = __valueOf__;
    this.toJSON = __toJSON__;
    
    return this;
};

export { Dictionary as default, Dictionary };
