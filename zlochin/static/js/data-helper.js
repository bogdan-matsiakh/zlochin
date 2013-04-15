dataHelper = (function () {
    var _getLegend = function(url, callback) {
    		$.ajax("/site", {
    			type: "GET",
    			data: {
    				url: url
    			},
    			success: function(data) {
    			    say(data);
    				if (callback instanceof Function) callback(data);
    			}
    		});
    	}
    return {
        getLegend : _getLegend
    }
})();
