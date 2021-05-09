$(function () { //获取处理友链数据
    //https://github.com/fangzhiwen/blog_db/issues/2#issuecomment-832448170
    $.getJSON("https://api.github.com/repos/fangzhiwen/fangzhiwen.github.io/issues/3/comments?per_page=100&client_id=0ab356d23cf208ee7460&client_secret=03529064ebdc87320feb16fd45b639c62ad149c4", function (source) {

        var data = [];
        var source1;
        source1 = source;
        // 以后每次更新的都在后面，此处倒序，按时间降序排
        source1.reverse();
        // 把所有的数据放到data的列表中
        $.each(source1, function (i, e) {
            data.push(JSON.parse(e.body));
        });
        // var data0 = data[0];
        $('.links-content').html("");

        // 随机排序过滤失效的
        let notValid = data[0].filter((item, a, b) => item.valid == 0);
        data = data[0].filter((item, a, b) => item.valid != 0).sort(function (a, b) {
            return Math.random() > .5 ? -1 : 1;
        });
        $('.links-content').append("<div class='friend-title-item'><br>大佬们<br><br><hr></div>");
        $.each(data, function (i, e) {
            var html = "<div class=\"friend-card-item\">";
            if (e.src == undefined) {
                html += "    <img class=\"ava\" src=\"/img/links/nopic.jpg\" title=\"图片链接不可用，使用的默认图片\">";
            } else {
                html += "    <img class=\"ava\" src=\"" + e.src + "\">";
            }
            html +=
                "<div class='text-desc' title=\""+e.desc+"\">    网址：<a href=\"" + e.url + "\" target=\"_blank\">" + e.name + "</a>" +
                "    <br>时间：" + e.date +
                "<br>简介：" + e.desc + "</div>" +
                "    </div>";

            $('.links-content').append(html);
        });

        // 过期的
        if (notValid.length > 0) {
            $('.links-content').append("<div class='friend-title-item'><br>异常的大佬们<br><br><hr></div></div>");
            $.each(notValid, function (i, e) {
                var html = "<div class=\"friend-card-item\">";
                html += "    <img class=\"ava\" src=\"/img/links/nopic.jpg\" title=\"图片链接不可用，使用的默认图片\">";
                html +=
                    "<div class='text-desc' title=\""+e.desc+"\">    网址：<a href=\"" + e.url + "\" target=\"_blank\">" + e.name + "</a>" +
                    "    <br>访问时间：" + e.stopTime +
                    "<br>简介：" + e.desc + "</div>" +
                    "    </div>";

                $('.links-content').append(html);
            })
        }

        $('.links-content').append("</div>");
    })
});
