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
            });
            _items = items;
            say(_items)
            _createMenu();
        },
        _createMenu = function () {
            say('createmenu')
            var header = $("<h3>"),
                content = $('<div>'),
                elem,
                obj;
                                
            for (property in _items) {
                if (_items.hasOwnProperty(property)) {
                    elem = header.clone().text(property); 
                    elem.appendTo(_controls.accordion);
                    $(_controls.accordion).append(content.clone());
                    obj = {
                        title :property,
                        dom : elem,
                        children : []
                    };
                    _menus.push(obj);
                    _createSubmenu(obj)
                }
            }
        },
        _createSubmenu = function (menu) {
            say('in create submenu');
            var title = $("<h4>"),
                elem,
                obj;
                
            for (property in _items[menu.title]) {
                say('submenu property: ' + property)
                elem = title.clone().text(property);
                $(menu.dom).next().append(elem);
                obj = {
                    title :property,
                    dom : elem,
                    children : []
                }
                menu.children.push(obj)
            }
        },
        _init = function () {
            _controls = {
                accordion : $("#accordion")
            }
        };
    return {
        parse : function (data) {
            _parse(data);
        },
        init : _init
    }
})()


function say(attr) {
    console.log(attr)
}
