function ObjStorageFunc() {
    const self = this;

    self.storage = {};

    self.addValue = function(key,value) {
        self.storage[key] = value;
    };

    self.getValue = function(key) {
        return self.storage[key];
    };
    
    self.deleteValue = function(key) {
        if ( key in self.storage) {
            delete self.storage[key];
            return true;
        }
        return false; 
    }
    self.getKeys = function() {
        return Object.keys(self.storage)
    } 
}

const drinkStorage = new ObjStorageFunc();