mapWorker = (function () {
    var _countryCenter = new google.maps.LatLng(49.018844877014486, 31.36445803124999),
		_countryZoom = 6,
        _map = null,
        _layer = null,
        _logoOverlay = null,
        _show = function (data) {
            //console.log('Showing map:', data);
            _showMap({
				center: _countryCenter,
				zoom: _countryZoom
			});

            Nav.clearHashParameterList();
            Nav.createNewHashParameter(data.hash_name);
            Nav.clear(data.hash_name);
            Nav.addValue(data.hash_name, data.url_hash);

            _layer = new google.maps.FusionTablesLayer({
                map: _map,
                heatmap: { enabled: false },
                query: {
                    select: data.url_hash,
                    from: "1JLNhoP4rNdnGHk6UTGeVAqkivHdfSfckO-PaN8I",
                    where: ""
                },
                options: {
                    styleId: data.styleID,
                    templateId: data.templID
                }
            });

            // _showLogo();     // закоментували 20130901, бо в шапці і так є це лого!
            _showLegend();
        },
		_showMap = function (args) {
            _map = new google.maps.Map(document.getElementById('map'), {
                center: args.center,
                zoom: args.zoom,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
				styles: [{
				featureType: "landscape.man_made",
				elementType: "geometry.fill",
				stylers: [{
						//color: '#F4F6F6',
						saturation: 0,
						lightness: 60,
						
					}]
				}, {
					featureType: "road.highway",
					elementType: "geometry.fill",
					stylers: [{
						color: '#F4EAA4'
						
						
					}]
				}, {
					featureType: "landscape.natural",
					elementType: "geometry.fill",
					stylers: [{
						lightness: 25
						
					}]	
				},  {
					featureType: "landscape.man_made",
					elementType: "geometry.stroke",
					stylers: [{
						color: '#CDCDCB'
						
									
						
					}]
				},  {
					featureType: "all",
					elementType: "geometry.fill",
					stylers: [{
						Lightness: 15
						
						
					}]
				}]
            });
        },
        _showLogo = function () {
            var div = document.createElement('div'),
                img = document.createElement('img');
            _map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(div);
            div.style.border = 'none';
            div.style.borderWidth = '0px';
            div.style.position = 'absolute';
            img.src = 'images/logo.png';
            img.style.width = '200';
            img.style.height = '100';
            div.appendChild(img);
        },
        _showLegend = function () {
            var div = document.createElement('div'),
                img = document.createElement('img');
            _map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(div);
            div.style.border = 'none';
            div.style.borderWidth = '0px';
            div.style.position = 'absolute';
            img.src = 'images/legend.png';
            img.style.width = '82';
            img.style.height = '91';
            div.appendChild(img);
        },
		_getMap = function () {
			return _map;
		};
    return {
        show: _show,
		showMap: _showMap,
		getMap: _getMap
    }
})();
