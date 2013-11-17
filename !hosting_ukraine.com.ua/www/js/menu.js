(function () {
    var menu_items = [];
    var menu_item_tpl = '<a class="affectless-link" title="<%=title%>" href="<%=url%>.html">\
        <div style="width: <%=width%>px" class="m-item"><%=name%></div>\
    </a>';

    var menu_width = 755;   // ширина меню
    var margin = 5;         // відстань в пх між пунктами меню

    window.loadMenu = function (data) {
        var name, url, title;
        var amount = data.feed.entry.length;

        $.each(data.feed.entry, function (k, v) {
            name = v.gsx$name.$t;
            url = v.gsx$url.$t;
            title = v.gsx$title.$t;
            $('.menu').append(App.parseTemplate(menu_item_tpl, {
                name: name,
                url: url,
                title: title,
                width: menu_width / amount - margin * (amount - 1) - 4
            }));
        });
    }

    $(function () {
        $.getScript('https://spreadsheets.google.com/feeds/list/0As9SVzApMBjodHNIVTRTM09nUFFtZzV5aXhDQzZTbnc/2/public/values?alt=json-in-script&callback=loadMenu');
    });
})();