hrefHelper = (function(){
	var _change = function(hash) {
			var oldHref = window.location.href;
			window.location.href = oldHref.substr(0, oldHref.indexOf("#")) + "#" + hash;
		};
	
	return {
		change: _change
	};
})();
