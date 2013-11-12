(function () {
    function Nav() {
        this.hashes = {};
    }

    Nav.prototype.go = function (url) {
        document.location = url;
    };

    Nav.prototype.tryInitialize = function (callback, fail_callback) {
        callback = callback || function () {
        };

        if (document.location.hash !== '') {
            var hash_parts = document.location.hash.replace('#', '').split('&');
            var splitted, key, values;
            for (var i = 0, len = hash_parts.length; i < len; ++i) {
                splitted = hash_parts[i].split('=');
                key = splitted[0];
                values = splitted[1].split(',');

                this.createNewHashParameter(key);
                this.addValue(key, values);
            }

            // If-hash-is-not-empty callback
            callback(true);
        } else {
            callback(false);
        }
    };

    Nav.prototype.updateHash = function () {
        var hash = '';
        for (var key in this.hashes) {
            hash += key + '=' + this.hashes[key].join(',') + '&';
        }
        hash = hash.substr(0, hash.length - 1);
        document.location.hash = hash;
    };

    Nav.prototype.createNewHashParameter = function (name) {
        if (this.hashes[name] === undefined) {
            this.hashes[name] = [];
        }
    };

    Nav.prototype.addValue = function (name, val) {
        if ($.isArray(val)) {
            for (var i = 0, len = val.length; i < len; ++i) {
                val[i] = '' + val[i];
            }
            this.hashes[name] = this.hashes[name].concat(val);
        } else {
            this.hashes[name].push('' + val);
        }

        this.hashes[name] = App.arrayUnique(this.hashes[name]);
        this.updateHash();
    };

    Nav.prototype.getValues = function (name) {
        return this.hashes[name];
    };

    Nav.prototype.removeValue = function (name, val) {
        var pos = $.inArray(val, this.hashes[name]);
        if (pos !== -1) {
            this.hashes[name].splice(pos, 1);
            this.updateHash();
        }
    };

    Nav.prototype.hasValues = function (name) {
        if (this.hashes[name]) {
            return this.hashes[name].length > 0;
        }
        return false;
    };

    Nav.prototype.clearHashParameterList = function () {
        this.hashes = {};
    };

    Nav.prototype.getFirstHashParameter = function () {
        for (var key in this.hashes) {
            return key;
        }
        return '';
    };

    Nav.prototype.clear = function (name) {
        if ($.isArray(this.hashes[name])) {
            this.hashes[name] = [];
        }
    };

    window.Nav = new Nav();
})();