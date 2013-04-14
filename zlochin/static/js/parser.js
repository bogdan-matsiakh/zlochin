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
            say(_items)
            _createMenu();
        },
        _createMenu = function () {
           // say('createmenu')
            var header = $("<h3>"),
                content = $('<div>'),
                elem,
                obj;
            $.each(_items, function (key, value) {
                say('key');
                say(key);
                say('value');
                say(value);
                elem = header.clone().text(key); 
                elem.appendTo(_controls.accordion);
                $(_controls.accordion).append(content.clone());
                obj = {
                    title :key,
                    obj : value,
                    dom : elem,
                    children : []
                };
                _menus.push(obj);
                 
            });
            _createSubmenu()
        },
        _createSubmenu = function (menu, js) {
            var header = $("<h4>"),
                template = $("#templates").find('.radiobutton'),
                input,
                label,
                elem,
                obj,
                i, max;
            _menus[1] = [];
            
            $.each(_menus, function (key, value) {
                say('key');
                say(key);
                say('value');
                say(value);
                if (value.colName) {
                    item = template.clone();
                    item.find('label').text(key);
                    item.find('label').attr('for', key);
                    item.find('input').attr('id', key);
                    //elem = elem.html();
                    item.click(function () {
                        mapWorker.show(key) 
                    });
                    $(menu.dom).after(item);
                    return false;
                } else {
                    say('else')
                    item = header.clone().text(key);
                    $(menu.dom).after(item);
                    obj = {
                        title :key,
                        obj : value,
                        dom : item,
                        children : []
                    };
                    _createSubmenu(value, obj);
                }
            });
            
            
            /*
            $.each(_menus, function (key, value) {
                say('sub key');
                say(key);
                say('sub value');
                say(value);
                if (typeof value != 'object') {
                    return;
                }
                if (value.colName || value.styleID || value.templID) {
                    say('in');
                    elem = item.clone();
                    
                    elem.find('label').text(key);
                    elem.find('label').attr('for', key);
                    elem.find('input').attr('id', key);
                    //elem = elem.html();
                    elem.click(function () {
                        mapWorker.show(key) 
                    });
                } else {
                    say('else')
                    elem = header.text(key);
                }
                
            });
            */
        },
        _init = function () {
            _controls = {
                accordion : $("#accordion")
            }
        };
    return {
        parse :_parse,
        init : _init
    }
})();


function say(attr) {
    console.log(attr)
}
