window.allowShowingMap = false;

function loadCitiesMenu(data) {
    // TODO: implement cities navigation by hash-based url
	
	parser.parseCitiesMenu(data, function (items) {
		if (success) {
			// TODO
		} else {
			window.allowShowingMap = true;
		}
	});
	
	/*
	// Commented 20.10.2013 because this is unused code
	
    $("#accordion").accordion({
        heightStyle: "content"
    });
	*/
}

$(function () {
	// TODO
	//parser.init();
    //$.getScript('https://spreadsheets.google.com/feeds/list/0As9SVzApMBjodHNIVTRTM09nUFFtZzV5aXhDQzZTbnc/1/public/values?alt=json-in-script&callback=loadCitiesMenu');

	var mapCenter = new google.maps.LatLng(50.452640442100915, 30.545898208618148),
		mapCenterZoom = 12;
	
	mapWorker.showMap({
		center: mapCenter,
		zoom: mapCenterZoom
	});
	
	// Process data from json file kyiv_2013_data.json
	var i;
	var getMaxCount = function (data) {
		var maxCount = 0;
		$(data).each(function (key, point) {
			if (point.count > maxCount) {
				maxCount = point.count;
			}
		});
		return maxCount;
	}
	var map = mapWorker.getMap();
	
	google.maps.event.addListener(map, 'dragend', function () {
		heatmap.draw();
	});
	
	var heatmap = new HeatmapOverlay(map, {
		radius: 15,
		visible: true,
		opacity: 60,
		legend: {
            position: 'br',
            title: 'Кількість злочинів'
        },
		"gradient": {
			0.20: "rgb(0,0,255)",
			0.40: "rgb(0,255,255)",
			0.60: "rgb(0,255,0)",
			0.80: "yellow",
			1.00: "rgb(255,0,0)"
		}
	});
	
	for (i = 0; i <= 12; i++) {
		$("#crimes-count-" + i).html(kyiv_2013_data.totals[i]);
		if (i != 0) {
			(function (i) {
				$("#col" + i).change(function (e) {
					map.setCenter(mapCenter);
					map.setZoom(mapCenterZoom);
					heatmap.clear();
					if ($(e.target).prop("checked")) {
						var maxCount = getMaxCount(kyiv_2013_data.points[i]);
						heatmap.setDataSet({
							max: maxCount,
							data: kyiv_2013_data.points[i]
						});
					}
				});
			})(i);
		}
	}
	
	google.maps.event.addListenerOnce(map, "idle", function() {
		$("#col1").prop("checked", true);
		$("#col1").trigger("change");
	});
	
	/*
	// Commented 20.10.2013 because this is unused code
	
    $("#toggle_discus").click(function () {
        if ($(document.body).hasClass('show-discus')) {
            $(this).html('Показати коментарі');
            $(document.body).removeClass('show-discus');
        } else {
            $(this).html('Приховати коментарі');
            $(document.body).addClass('show-discus');
        }
    });
	*/

    // Main menu
	/*
	// Commented 20.10.2013 because this is unused code
	
    $("#menu-main").click(function () {
        $("#about-view").fadeOut(500, function () {
            $("#contact-view").fadeOut(500, function () {
                $("#map-view").fadeIn(500);
                parser.refreshMap();
            });
        });
    });
    $("#menu-about").click(function () {
        $("#map-view").fadeOut(500, function () {
            $("#contact-view").fadeOut(500, function () {
                $("#about-view").fadeIn(500);
            });
        });
    });
    $("#menu-contact").click(function () {
        $("#map-view").fadeOut(500, function () {
            $("#about-view").fadeOut(500, function () {
                $("#contact-view").fadeIn(500);
            });
        });
    });
	*/
});
