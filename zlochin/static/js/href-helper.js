hrefHelper = (function(){
	var _getHash = function(hash) {
			var oldHref = window.location.href;
			return oldHref.substr(oldHref.indexOf("#") + 1);
		};
	
	return {
		getHash: _getHash
	};
})();
