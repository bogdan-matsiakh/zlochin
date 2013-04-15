dataHelper = (function () {
    var _getLegend = function(url, callback) {
    		$.ajax("/site", {
    			type: 'POST',
    			data: {
    				url: url
    			},
    			success: function(data) {
    				if (callback instanceof Function) callback(data);
    			}
    		});
    	}
    return {
        getLegend : _getLegend
    }
})();
