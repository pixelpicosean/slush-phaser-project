var classNS = {
    copy: function(object) {
        var l, c, i;
        if (
            !object || typeof object !== 'object' ||
            object instanceof HTMLElement ||
            object instanceof this.Class
        ) {
            return object;
        }
        else if (object instanceof Array) {
            c = [];
            for (i = 0, l = object.length; i < l; i++) {
                c[i] = this.copy(object[i]);
            }
            return c;
        }
        else {
            c = {};
            for (i in object) {
                c[i] = this.copy(object[i]);
            }
            return c;
        }
    },

    merge: function(to, from) {
        for (var key in from) {
            var ext = from[key];
            if (
                typeof ext !== 'object' ||
                ext instanceof HTMLElement ||
                ext instanceof this.Class
            ) {
                to[key] = ext;
            }
            else {
                if (!to[key] || typeof to[key] !== 'object') {
                    to[key] = (ext instanceof Array) ? [] : {};
                }
                this.merge(to[key], ext);
            }
        }
        return to;
    }
};

// http://ejohn.org/blog/simple-javascript-inheritance/
classNS.initializing = false;
classNS.fnTest = /xyz/.test(function() {
    var xyz; return xyz;
}) ? /\b_super\b/ : /[\D|\d]*/;

classNS.Class = function() {};
classNS.Class.extend = function(prop) {
    var parent = this.prototype;
    classNS.initializing = true;
    var prototype = new this();
    classNS.initializing = false;

    var makeFn = function(name, fn) {
        return function() {
            var tmp = this._super;
            this._super = parent[name];
            var ret = fn.apply(this, arguments);
            this._super = tmp;
            return ret;
        };
    };

    for (var name in prop) {
        if (
            typeof prop[name] === 'function' &&
            typeof parent[name] === 'function' &&
            classNS.fnTest.test(prop[name])
        ) {
            prototype[name] = makeFn(name, prop[name]);
        }
        else {
            prototype[name] = prop[name];
        }
    }

    function Class() {
        if (!classNS.initializing) {
            if (this.staticInit) {
                var obj = this.staticInit.apply(this, arguments);
                if (obj) {
                    return obj;
                }
            }
            for (var p in this) {
                if (typeof this[p] === 'object') {
                    this[p] = classNS.copy(this[p]);
                }
            }
            if (this.init) {
                /**
                    This method is called, when you create new instance of the class.
                    @method init
                    @param {Array} arguments
                **/
                this.init.apply(this, arguments);
            }
        }
        return this;
    }

    Class.prototype = prototype;
    Class.prototype.constructor = Class;
    Class.extend = classNS.Class.extend;
    Class.inject = function(prop) {
        var proto = this.prototype;
        var parent = {};

        var makeFn = function(name, fn) {
            return function() {
                var tmp = this._super;
                this._super = parent[name];
                var ret = fn.apply(this, arguments);
                this._super = tmp;
                return ret;
            };
        };

        for (var name in prop) {
            if (
                typeof prop[name] === 'function' &&
                typeof proto[name] === 'function' &&
                classNS.fnTest.test(prop[name])
            ) {
                parent[name] = proto[name];
                proto[name] = makeFn(name, prop[name]);
            }
            else {
                proto[name] = prop[name];
            }
        }
    };

    return Class;
};

// Add Class to global Phaser object
Phaser.Class = classNS.Class;

// Used to extend Phaser classes
Phaser.extend = function(prop) {
    var name;
    var proto = this.prototype;
    var base = this.prototype.base || this;

    function Class() {
        var name;
        if (this.init) {
            this.init.apply(this, arguments);
        }

        else {
            this.base.apply(this, arguments);
        }

        for (name in proto) {
            if (typeof proto[name] !== 'function' && !this[name]) {
                this[name] = classNS.copy(proto[name]);
            }
        }
        for (name in prop) {
            if (typeof prop[name] !== 'function' && !this[name]) {
                this[name] = classNS.copy(prop[name]);
            }
        }
    }

    Class.prototype = Object.create(base.prototype);

    var makeFn = function(name, fn) {
        var from = proto[name];
        if (name === 'init' && !from) {
            from = base;
        }
        return function() {
            var tmp = this._super;
            this._super = from;
            var ret = fn.apply(this, arguments);
            this._super = tmp;
            return ret;
        };
    };

    for (name in proto) {
        if (typeof proto[name] === 'function') {
            Class.prototype[name] = makeFn(name, proto[name]);
        }
        else {
            Class.prototype[name] = proto[name];
        }
    }

    for (name in prop) {
        if (typeof prop[name] === 'function') {
            Class.prototype[name] = makeFn(name, prop[name]);
        }
        else {
            Class.prototype[name] = prop[name];
        }
    }

    Class.prototype.constructor = Class;
    Class.prototype.base = base;

    Class.extend = Phaser.extend;

    return Class;
};

for (var i in Phaser) {
    if (Phaser[i].prototype instanceof Object) {
        Phaser[i].extend = Phaser.extend;
    }
}
