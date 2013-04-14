parser = (function () {
    var _items = {
				"Зареєстровані злочини": {
					"усього": {
						"торік": {
							styleID: 1,
							templID: 1,
							colName: "col1\x3e\x3e1"
						},
						"поточний рік": {
							styleID: 1,
							templID: 1,
							colName: "col2\x3e\x3e1"
						},
						"динаміка, %": {
							styleID: 1,
							templID: 1,
							colName: "col3\x3e\x3e1"
						}
					},
					"тяжких та особливо тяжких": {
						"торік": {
							styleID: 1,
							templID: 1,
							colName: "col1\x3e\x3e1"
						},
						"поточний рік": {
							styleID: 1,
							templID: 1,
							colName: "col2\x3e\x3e1"
						},
						"динаміка, %": {
							styleID: 1,
							templID: 1,
							colName: "col3\x3e\x3e1"
						}
					}
				},
        _parse = function (data) {
            var elems = data.feed.entry;
                
            
        };
    
    
    
    return {
        parse : function (data) {
            _parse(data);
        }
    }
})()


function say(attr) {
    console.log(attr)
}
