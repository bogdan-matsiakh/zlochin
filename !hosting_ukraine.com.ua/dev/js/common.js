(function () {
    function App() {
    }

    App.prototype.arrayUnique = function (arr) {
        var hash = {}, result = [];
        for (var i = 0; i < arr.length; i++)
            if (!(arr[i] in hash)) { //it works with objects! in FF, at least
                hash[arr[i]] = true;
                result.push(arr[i]);
            }
        return result;
    };

    App.prototype.parseHtml = function (h) {
        return h.replace(/&lt;/gi, '<').replace(/&gt;/gi, '>');
    };

    App.prototype.parseTemplate = function (tpl, source) {
        source = source || {};
        tpl = this.parseHtml(tpl);

        for (var key in source) {
            tpl = tpl
                .replace(new RegExp("<%=" + key + "%>", 'g'), source[key])
                .replace(new RegExp("<%= " + key + " %>", 'g'), source[key]);
        }

        return tpl;
    };

    window.App = new App();
})();