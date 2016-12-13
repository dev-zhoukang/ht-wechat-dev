/**
 * Created by ZK on 16/12/1.
 */

//接口IP地址和端口
var baseUrl = 'http://119.29.77.36:8001/api/';

// var domainConfig = {};
// if (!$.cookie('downloadDomain')) {
//     $.ajax({
//         url: baseUrl + 'data/getDomainInfo',
//         type: 'POST',
//         data: {
//             platform: '2',
//         },
//         success: function (data) {
//             var download = data.p.domain.downloadDomain + '/';
//             domainConfig.downloadDomain = download;
//             $.cookie('downloadDomain', download, {
//                 expires: -1,
//             });
//         },
//         error: function () {
//
//         }
//     });
// }
// else {
//     domainConfig.downloadDomain = $.cookie('downloadDomain');
// }

//建立一個可存取到該file的url
function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}

function getQueryStringArgs() {
    var qs = (location.search.length > 0 ? location.search.substring(1) : ''),
        args = {},
        items = qs.length ? qs.split('&') : [],
        item = null,
        name = null,
        value = null,
        i = 0,
        len = items.length;
    for (i = 0; i < len; i ++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);

        if (name.length) {
            args[name] = value;
        }
    }

    return args;
}

// loading图
var loading = {
    $loadingContainer: $('<div style="background: rgba(255, 255, 255, .95); position: fixed; width: 100%; height: 100%; top: 0; left: 0;"></div>'),
    $loadImg: $('<img src="imgs/loding.gif" alt="" style="position: absolute; width: 90px; height: 90px; top: 50%; left: 50%; margin-left: -45px; margin-top: -55px">'),
    show: function () {
        this.$loadingContainer.append(this.$loadImg);
        $('body').append(this.$loadingContainer);
    },
    hide: function () {
        this.$loadingContainer.remove();
    }
};