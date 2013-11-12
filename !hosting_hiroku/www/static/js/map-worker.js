mapWorker = (function () {
    var _townCenter = new google.maps.LatLng(48.518844877014486, 30.76445803124999),
    	_map = null,
    	_layer = null,
    	_logoOverlay = null,
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
					from: "1JLNhoP4rNdnGHk6UTGeVAqkivHdfSfckO-PaN8I",
					where: ""
				},
				options: {
					styleId: data.styleID,
					templateId: data.templID
				}
			});
			
			_showLogo();
			_showLegend();
        },
        _showLogo = function(){
        	var div = document.createElement('div'),
        		img = document.createElement('img');
			_map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(div);
			div.style.border = 'none';
			div.style.borderWidth = '0px';
			div.style.position = 'absolute';
			img.src = '../static/images/logo.png';
			img.style.width = '200';
			img.style.height = '101';
			div.appendChild(img);
        },
        _showLegend = function(){
        	var div = document.createElement('div'),
        		img = document.createElement('img');
			_map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(div);
			div.style.border = 'none';
			div.style.borderWidth = '0px';
			div.style.position = 'absolute';
			img.src = '../static/images/legend.png';
			img.style.width = '82';
			img.style.height = '91';
			div.appendChild(img);
        };
    return {
        show : _show
    }
})();
