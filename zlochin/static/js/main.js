function loadList(data) {
	parser.parse(data);
	$( "#accordion" ).accordion({
    	heightStyle: "fill"
    });
    $( "#accordion-resizer" ).resizable({
		minHeight: 140,
		minWidth: 200,
		resize: function() {
			$( "#accordion" ).accordion( "refresh" );
		}
    });
    $('input').button();
}

// <=== ENTRY POINT :)
$(function() {
	$.getScript('https://spreadsheets.google.com/feeds/list/0As9SVzApMBjodHNIVTRTM09nUFFtZzV5aXhDQzZTbnc/od6/public/values?alt=json-in-script&callback=loadList');
	
	parser.init();
	mapWorker.show({
		colName: 'col210',
		styleID: 3,
		templID: 4
	});
});
