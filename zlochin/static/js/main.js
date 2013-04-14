function loadList(data) {
	parser.parse(data);
	$("#accordion").accordion({
    	heightStyle: "content"
    });
}

// <=== ENTRY POINT :)
$(function() {
	$.getScript('https://spreadsheets.google.com/feeds/list/0As9SVzApMBjodHNIVTRTM09nUFFtZzV5aXhDQzZTbnc/od6/public/values?alt=json-in-script&callback=loadList');
	parser.init();
});
