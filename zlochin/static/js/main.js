function loadList(data) {
	parser.parse(data);
	$("#accordion").accordion({
    	heightStyle: "content"
    });
}

// <=== ENTRY POINT :)
$(function() {
	$.getScript('https://spreadsheets.google.com/feeds/list/0As9SVzApMBjodHNIVTRTM09nUFFtZzV5aXhDQzZTbnc/od6/public/values?alt=json-in-script&callback=loadList');
	
	$("#toggle_discus").click(function () {
	    if ($(document.body).hasClass('show-discus')) {
    	    $(this).html('Показати коментарі');
    	    $(document.body).removeClass('show-discus');
	    } else {
	        $(this).html('Приховати коментарі');
	        $(document.body).addClass('show-discus');
	    }
	})
	
	parser.init();
});
