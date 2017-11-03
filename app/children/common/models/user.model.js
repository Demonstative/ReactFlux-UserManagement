
var Name = function Name(options) {
    var options = options || { };
    
    // export precepts
    this.first = options.first || this.first || '';
    this.last = options.last || this.last || '';
    
    return this;
};
var Address = function Address(options) {
    var options = options || { };
    
    function valueOf() {
        return `${this.line1}`;
    }
    
    // export precepts
    this.line1 = options.line1 || this.line1 || '';
    this.valueOf = valueOf;
    
    return this;
};
var User = function User(options) {
    var options = options || { };
    var random = Math.round(Math.random() * 1000), ts = +(new Date());
    var id = ( ts * random );
    
    // export precepts
    this.id = id;
    this.name = new Name(options.name || this.name);
    this.address = new Address(options.address || this.address);
    
    return this;
};

export { User as default, User, Name, Address };
