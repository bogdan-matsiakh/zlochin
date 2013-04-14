mapWorker = (function () {
    var _townCenter = new google.maps.LatLng(46.918844877014486, 30.76445803124999),
    	_map = null,
    	_layer = null,
        _show = function (data) {
            _map = new google.maps.Map(document.getElementById('map'), {
				center: _townCenter,
				zoom: 6,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});

			_layer = new google.maps.FusionTablesLayer({
				map: _map,
				heatmap: { enabled: false },
				query: {
					select: data.colName,
					from: "1w0ufexIfgcSjm21d9EM2qICIa6jsyRM4ihHPE6o",
					where: ""
				},
				options: {
					styleId: data.styleID,
					templateId: data.templID
				}
			});
        };
    return {
        show : function (data) {
            _show(data);
        }
    }
})()


function say(attr) {
    console.log(attr)
}
