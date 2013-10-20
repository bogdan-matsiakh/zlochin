function showMap(settings) {
	var min, max;
	// To know when min and max where already fetched from server
	var countDown = 2;
    
	var queryMax = "SELECT MAXIMUM ('" + settings['fusionTable']['dataColumn'] + "') FROM " + settings['fusionTable']['url'];
    var queryMin = "SELECT MINIMUM ('" + settings['fusionTable']['dataColumn'] + "') FROM " + settings['fusionTable']['url'];
	
	var queryMaxUrl = constructUrl(queryMax);
	var queryMinUrl = constructUrl(queryMin);
	
	function constructUrl(sqlQuery) {
	    var encodedQuery = encodeURIComponent(sqlQuery);
		// Construct the URL
		var url = ['https://www.googleapis.com/fusiontables/v1/query'];
		url.push('?sql=' + encodedQuery);
		url.push('&key=' + settings['fusionTable']['apiKey']);
		url.push('&callback=?');
		return url;
	}

    $.ajax({
		url: queryMaxUrl.join(''),
		dataType: 'jsonp',
		success: function (data) {
			maxCallback(data);
		}
    });
	$.ajax({
		url: queryMinUrl.join(''),
		dataType: 'jsonp',
		success: function (data) {
			minCallback(data);
		}
    });
	
	//TODO: generalize callbacks
	function maxCallback(data){
		max = +data['rows'][0][0];
		countDown--;
		if (countDown == 0) {
			showMapContinued(settings);
		}
	}
	
	function minCallback(data){
		min = +data['rows'][0][0];
		countDown--;
		if (countDown == 0) {
			showMapContinued(settings);
		}
	}

    function showMapContinued(settings) {
		// Preparing colors and corresponding values
		var colors = settings['colors'];
		var minMaxGradient = [];
		var step = (max-min)/colors.length;
		for (var i=min+step; i<max; i+=step) {
			console.log(i);
			minMaxGradient.push(Math.round(i/100) * 100); // round to hundreds
		}
	
		// Create Google map
        var map = new google.maps.Map(document.getElementById(settings['mapSettings']['renderAt']), {
            center: new google.maps.LatLng(settings['mapSettings']['latitude'], settings['mapSettings']['longitude']),
            zoom: settings['mapSettings']['zoom'],
    		mapTypeId: settings['mapSettings']['mapTypeId']
        });
    
        var infoWindow = new google.maps.InfoWindow();
    
		var styles = getStyles();
		function getStyles() {
			var defOpacity = 0.8;
			var result = [];
			var dataColumn = settings['fusionTable']['dataColumn'];
			result.push({
				where: "'" + dataColumn +"' < " + minMaxGradient[0],
				polygonOptions: {
    					fillColor: colors[0],
						fillOpacity: defOpacity	
    				}
				}
			);
			for (var i=0; i<colors.length-2; i++) {
				result.push({
					where: "'" + dataColumn +"' >= " + minMaxGradient[i] + " AND '" + dataColumn +"' < " + minMaxGradient[i+1],
					polygonOptions: {
							fillColor: colors[i+1],
							fillOpacity: defOpacity							
						}
					}
				);
			}
			result.push({
				where: "'" + dataColumn +"' >= " + minMaxGradient[colors.length-2],
				polygonOptions: {
    					fillColor: colors[colors.length-1],
						fillOpacity: defOpacity	
    				}
				}
			);
			return result;
		}
	
    	// Initialize the first layer
        var firstLayer = new google.maps.FusionTablesLayer({
    		query: {
                select: settings['fusionTable']['geoColumn'],
                from: settings['fusionTable']['url']
            },
    		styles: styles,
    		map: map,
            suppressInfoWindows: true
        });
        google.maps.event.addListener(firstLayer, 'click', function(e) {
    		// Open the info window at the clicked location
			infoWindow.setOptions({
    			content: getInfo(e),
    			position: e.latLng,
    			pixelOffset: e.pixelOffset
    		});
    		infoWindow.open(map);
        });
    	  
    	function getInfo(e) {
    		var result = "";
    		result += "<div class='googft-info-window' style='font-family:sans-serif;width:500px;'>";
    		result += "<b>Адмін. одиниця:</b> " + e.row['1'].value + ", стан на 2011 р.<hr>";
    		result += "<b>Усього зареєстровано злочинів:</b> " + e.row['3'].value + " <i>(станом на 2011)</i><br>";
    		result += "<!--<b>Усього зареєстровано злочинів:</b> " + e.row['4'].value + " <i>(станом на 2012)</i><br>--\>";
    		result += "<!--<b>Динаміка злочинності:</b> " + e.row['5'].value + "%<br>--\>";
    		result += "<br /><font size=\"1\" color=\"#666666\" text-align=\"right\">Дані отримано з сайту МВС, станом на 20.11.2012</font><br>";
    		result += "<a href=\"http://zloch.in.ua\" target=\"_blank\">Zloch.in.ua</a> | ";
    		result += "Лінк на карту: <a href=\"http://" + e.row['3url'].value + "\" target=\"_blank\">" + e.row['3url'].value + "</a><br> ";
    		result += "Код на сайт (зеленим) <font size=\"1\">в разі потреби відкорегуйте висоту/ширину</font><br> ";
    		result += "<nobr><font size=\"1\" color=\"green\">&lt;iframe  width=\"100%\" height=\"600\" scrolling=\"no\" frameborder=\"no\" src=\"http://" + e.row['3url'].value + "\"&gt;&lt;/iframe&gt;</font></nobr>";
    		result += "</div>";
    		return result;
    	}
		
		addLegend(map);
		
		// Initialize the legend
		function addLegend(map) {
			var legendWrapper = document.createElement('div');
			legendWrapper.id = 'legendWrapper';
			legendWrapper.index = 1;
			map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendWrapper);
			legendContent(legendWrapper);
		}

		// Update the legend content
		function updateLegend() {
			var legendWrapper = document.getElementById('legendWrapper');
			var legend = document.getElementById('legend');
			legendWrapper.removeChild(legend);
			legendContent(legendWrapper);
		}

		// Generate the content for the legend
		function legendContent(legendWrapper) {
			var legend = document.createElement('div');
			legend.id = 'legend';
	
			var title = document.createElement('p');
			title.innerHTML = 'Легенда';
			legend.appendChild(title);
	
			for (var i=0; i<colors.length; i++) {
				var legendItem = document.createElement('div');
	
				var color = document.createElement('span');
				color.setAttribute('class', 'color');
				color.style.backgroundColor = colors[i];
				legendItem.appendChild(color);
			
				var minMax = document.createElement('span');
				if (i==0) {
					minMax.innerHTML = ' <= ' + minMaxGradient[i];
				} else if (i < colors.length-1) {
					minMax.innerHTML = minMaxGradient[i-1] + ' — ' + minMaxGradient[i];
				} else if (i==colors.length-1) {
					minMax.innerHTML = ' > ' + minMaxGradient[i-1];
				}
				legendItem.appendChild(minMax);
	
				legend.appendChild(legendItem);
			}

			legendWrapper.appendChild(legend);
		}
    }
}