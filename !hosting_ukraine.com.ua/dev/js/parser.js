window.parser = (function () {
    var _controls = {},
        _items,
        _menus = [],
        router = '',

        _parse = function (data, callback) {
            var entries = data.feed.entry,
                items = {};
            $.each(entries, function (index, entry) {
                var templID = entry.gsx$templid,
                    colName = entry.gsx$colname,
                    styleID = entry.gsx$styleid,
                    active = entry.gsx$active,
                    url_div = entry.gsx$urldiv,
                    url_hash = entry.gsx$urlhash,
                    cat1 = entry.gsx$cat1,
                    cat2 = entry.gsx$cat2,
                    cat3 = entry.gsx$cat3,
                    url = entry.gsx$url,
                    item = null;

                if (templID) templID = templID.$t;
                if (colName) colName = colName.$t;
                if (styleID) styleID = styleID.$t;
                if (active) active = active.$t;
                if (url_div) url_div = url_div.$t;
                if (url_hash) url_hash = url_hash.$t;
                if (cat1) cat1 = cat1.$t;
                if (cat2) cat2 = cat2.$t;
                if (cat3) cat3 = cat3.$t;
                if (url) url = url.$t;

                var hash_name = url_hash.split('=')[0];
                url_hash = +url_hash.split('=')[1];

                if (active == 1) {
                    item = {
                        templID: templID,
                        styleID: styleID,
                        colName: colName,
                        hash_name: hash_name,
                        url_div: url_div,
                        url_hash: url_hash,
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
            callback(_items);
        },

        _refreshMap = function () {
            $(_controls.select1).trigger('change');
        },

        _createMenu = function () {
            var select1 = $("<select>").appendTo(_controls.menuMap),
                select2 = $("<select>").appendTo(_controls.menuMap),
                select3 = $("<select>").appendTo(_controls.menuMap),
                index = 0;

            _controls.select1 = select1;

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
                } else {
                    $("option", select3).remove();
                    $(select3).show();
                    if (item2.length === 0) {
                        $(select3).hide();
                        mapWorker.show(item2);
                    } else {
                        $.each(item2, function (item3Name, item3) {
                            var item3Option = $("<option>", {
                                text: item3Name,
                                value: item3Name
                            }).appendTo(select3);
                        });

						$(select3).trigger('change');
						
						/*
						// Commented 20.10.2013 because this code brokes map refresh
						//		after menu interaction
						
                        if (!Nav.hasValues("map") && !window.allowShowingMap) {
                            $(select3).trigger('change');
                        } else {
                            window.allowShowingMap = true;
                        }
						*/
                    }

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

            _refreshMap();
        },

        _getItemByUrlHash = function (url_hash) {
            // A bit slow, I know
            for (var i in _items) {
                for (var k in _items[i]) {
                    for (var j in _items[i][k]) {
                        if (+_items[i][k][j].url_hash === url_hash) {
                            return _items[i][k][j];
                        }
                    }
                }
            }
            return null;
        },

        _getCatsByUrlHash = function (url_hash) {
            var cat1, cat2, cat3;
            out: for (var i in _items) {
                for (var k in _items[i]) {
                    for (var j in _items[i][k]) {
                        if (+_items[i][k][j].url_hash === url_hash) {
                            cat1 = i;
                            cat2 = k;
                            cat3 = j;
                            break out;
                        }
                    }
                }
            }

            return [cat1, cat2, cat3];
        },

        _init = function () {
            _controls.menuMap = $("#menu-map");
        };

    return {
        getItemByUrlHash: _getItemByUrlHash,
        getCatsByUrlHash: _getCatsByUrlHash,
        parse: _parse,
        init: _init,
        refreshMap: _refreshMap
    };
})();