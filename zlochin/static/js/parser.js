parser = (function () {
    var _controls = {}, 
        _items,
        _menus = [],
        _parse = function (data) {
            var entries = data.feed.entry,
                items = {};
            $.each(entries, function(index, entry){
                var templID = entry.gsx$templid,
                    colName = entry.gsx$colname,
                    styleID = entry.gsx$styleid,
                    active = entry.gsx$active,
                    cat1 = entry.gsx$cat1,
                    cat2 = entry.gsx$cat2,
                    cat3 = entry.gsx$cat3,
                    item = null;
                
                if (templID) templID = templID.$t;
                if (colName) colName = colName.$t;
                if (styleID) styleID = styleID.$t;
                if (active) active = active.$t;
                if (cat1) cat1 = cat1.$t;
                if (cat2) cat2 = cat2.$t;
                if (cat3) cat3 = cat3.$t;
                
                if (active == 1) {
		            item = {
		                templID: templID,
		                styleID: styleID,
		                colName: colName
		            };
		            
		            if (cat1) {
		                if (!items[cat1]) {
		                    items[cat1] = {};
		                }
		                if (cat2) {
		                    if (!items[cat1][cat2]) {
		                        items[cat1][cat2] = {};
		                    }
		                    if (cat3) {
		                        items[cat1][cat2][cat3] = item;
		                    }
		                    else {
		                        items[cat1][cat2] = item;
		                    }
		                }
		                else {
		                    items[cat1] = item;
		                }
		            }
                }
            });
            _items = items;
            _createMenu();
        },
        _createMenu = function () {
            $.each(_items, function (itemName, item) {
                var itemH = $("<h3>", {
                	text: itemName
                }).appendTo(_controls.accordion);
                var itemDiv = $("<div>").appendTo(_controls.accordion);
                $.each(item, function(item2Name, item2){
                	if (item2.colName) {
                		var item2A = $("<a>", {
                			text: item2Name,
                			href: 'javascript: void(0);'
                		}).appendTo(itemDiv);
                		$("<br>").appendTo(itemDiv);
                		
                		$(item2A).click(function(){
                			mapWorker.show(item2);
                		});
                	}
                	else {
                		var item2Div = $("<div>").appendTo(itemDiv);
		                $.each(item2, function(item3Name, item3){
		                	var item3A = $("<a>", {
		            			text: item3Name,
		            			href: 'javascript: void(0);'
		            		}).appendTo(item2Div);
		            		$("<br>").appendTo(item2Div);
		            		
		            		$(item3A).click(function(){
		            			mapWorker.show(item3);
		            		});
		                });
                	}
                });
            });
        },
        _init = function () {
            _controls.accordion = $("#accordion");
        };
    return {
        parse: _parse,
        init: _init
    }
})();


function say(attr) {
    console.log(attr)
}
