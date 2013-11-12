window.allowShowingMap = false;

function loadList(data) {
    Nav.tryInitialize(function (success) {
        parser.parse(data, function (items) {
            if (success) {
                var url_hash = +Nav.getValues(Nav.getFirstHashParameter())[0];
                if (!isNaN(url_hash)) {
                    mapWorker.show(parser.getItemByUrlHash(url_hash));
                    var cats = parser.getCatsByUrlHash(url_hash);
                    $('select:eq(0)').val(cats[0]);
                    $('select:eq(1)').val(cats[1]);
                    $('select:eq(2)').val(cats[2]);
                }
            } else {
                window.allowShowingMap = true;
            }
        });
    });

    $("#accordion").accordion({
        heightStyle: "content"
    });
}

$(function () {
	parser.init();
    $.getScript('https://spreadsheets.google.com/feeds/list/0As9SVzApMBjodHNIVTRTM09nUFFtZzV5aXhDQzZTbnc/1/public/values?alt=json-in-script&callback=loadList');

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

(function () {
})();