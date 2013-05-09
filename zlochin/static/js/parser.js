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
                    url = entry.gsx$url,
                    item = null;
                
                if (templID) templID = templID.$t;
                if (colName) colName = colName.$t;
                if (styleID) styleID = styleID.$t;
                if (active) active = active.$t;
                if (cat1) cat1 = cat1.$t;
                if (cat2) cat2 = cat2.$t;
                if (cat3) cat3 = cat3.$t;
                if (url) url = url.$t;
                
                if (active == 1) {
		            item = {
		                templID: templID,
		                styleID: styleID,
		                colName: colName,
		                url: url
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
        
        _getItemHash = function (item) {
        	return item.styleID + "-" + item.templID + "-" + item.colName;
        },
        
        _createMenu = function () {
        	var select1 = $("<select>").appendTo(_controls.menuMap),
	        	select2 = $("<select>").appendTo(_controls.menuMap),
	        	select3 = $("<select>").appendTo(_controls.menuMap),
	        	index = 0;
        	$.each(_items, function (item1Name, item1) {
        		var item1Option = $("<option>", {
			        	text: item1Name,
			        	value: item1Name
			        }).appendTo(select1);
			    index++;
        	});
			
			$(select3).change(function () {
				var item3 = _items[$(select1).val()][$(select2).val()][$(select3).val()];
				mapWorker.show(item3);
			});
			
			$(select2).change(function () {
				var item1 = _items[$(select1).val()],
					item2 = _items[$(select1).val()][$(select2).val()];
				
				if (item2.colName) {
					$(select3).hide();
					mapWorker.show(item2);
				}
				else {
					$("option", select3).remove();
					$(select3).show();
					$.each(item2, function (item3Name, item3) {
						var item3Option = $("<option>", {
								text: item3Name,
								value: item3Name/*,
								'class': ((item3.url === '') ? 'red' : 'green')*/
							}).appendTo(select3);
					});
					$(select3).trigger('change');
				}
				
				
			});
			
			$(select1).change(function () {
				var item1 = _items[$(select1).val()];
				$("option", select2).remove();
				$.each(item1, function (item2Name, item2) {
					var item2Option = $("<option>", {
					    	text: item2Name,
					    	value: item2Name
					    }).appendTo(select2);
				});
				$(select2).trigger('change');
			});
			
			$(select1).trigger('change');
        },
        
        /*_createMenu_old = function () {
        	var urlHash = hrefHelper.getHash(), // For later url dispatching
        		itemIndex = 0;
            $.each(_items, function (item1Name, item1) {
                var item1H = $("<h3>", {
		            	text: item1Name
		            }).appendTo(_controls.accordion),
                	item1Div = $("<div>").appendTo(_controls.accordion);
                $.each(item1, function(item2Name, item2){
                	if (item2.colName) {
                		var item2Hash = _getItemHash(item2),
		            		item2A = $("<a>", {
		            			text: item2Name,
		            			href: "#" + item2Hash
		            		}).appendTo($("<div>").appendTo(item1Div));
                		
                		if (item2.url === '') {
                            item1H.addClass('red');
                        } else {
                            item1H.addClass('green');
                        }
                		
                		$(item2A).click(function(){
                			_clickMenu(item2A, item2);
                		});
                		
	            		if ((urlHash == item2Hash) || (itemIndex === 0)) {
		            		$(item2A).click();
	            		}
	            		
	            		itemIndex++;
                	}
                	else {
                		$("<div>", {
                			text: item2Name,
                			'class': 'margin-bottom'
                		}).appendTo(item1Div);
                		
                		var item2Div = $("<div>").appendTo(item1Div);
                		
		                $.each(item2, function(item3Name, item3) {
		                	var item3Hash = _getItemHash(item3),
				            	item3A = $("<a>", {
				        			text: item3Name,
				        			href: "#" + item3Hash,
				        			'class': 'margin-left'
				        		}).appendTo($("<div>").appendTo(item2Div));
		            		if (item3.url === '') {
		            		    item1H.addClass('red');
		            		} else {
		            		    item1H.addClass('green');
		            		}
		            		
		            		$(item3A).click(function(){
		            			_clickMenu(item3A, item3);
		            		});
		            		
		            		if ((urlHash == item3Hash) || (itemIndex === 0)) {
			            		$(item3A).click();
		            		}
		            		
		            		itemIndex++;
		                });
		                $("<div>", {
                			'class': 'margin-bottom'
                		}).appendTo(item1Div);
                	}
                });
            });
        },
        
        _clickMenu = function(el, data) {
        	mapWorker.show(data);
        	$("a", _controls.accordion).removeClass("selected");
        	$(el).addClass("selected");
        },*/
        
        _init = function () {
            _controls.accordion = $("#accordion");
            _controls.menuMap = $("#menu-map");
        };
    return {
        parse: _parse,
        init: _init
    }
})();

function say(attr) {
    console.log(attr)
}
