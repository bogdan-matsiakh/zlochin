// Parse GET parameters with regular expression
// index2.html?fusionTableUrl=1dxkUZjFnfdHTUyZKLw-8__lcoaI0tll0tebMgWs&geoColumn=210&dataColumn=6&apiKey=AIzaSyBBdl_Q24pPQvAxKNAcR3PxhEIyGqZoE-I&zoom=6&lat=48.4&long=30.1&txt01
// urlParams = {
//     fusionTableUrl = ...,
//     geoColumn = 210,
//     dataColumn = 6,
//     apiKey = ...,
//     zoom = 6,
//     lat = 48.4,
//     long = 30.1,
//     txt01 = 'sd;g;ajdgakl'
// }
var urlParams;
(window.onpopstate = function () {
	var match,
		pl     = /\+/g,  // Regex for replacing addition symbol with a space
		search = /([^&=]+)=?([^&]*)/g,
		decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
		query  = window.location.search.substring(1);

	urlParams = {};
	while (match = search.exec(query))
	   urlParams[decode(match[1])] = decode(match[2]);
})();
