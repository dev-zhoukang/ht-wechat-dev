/**
 * Created by ZK on 16/12/1.
 */

//接口IP地址和端口
var baseUrl = 'http://wx.hoootao.com/api/';

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

//注意: 依赖base.css样式 和 jQuery框架
var zkUploadHint = {
    $container: $('<div class="upload-container"></div>').css('opacity', 0),
    $clock: $('<div class="clock"></div>'),
    $progressBar: $('<div class="progress-bar"></div>'),
    $hintTop: $('<p class="hint-top">资料提交中...</p>'),
    $hintBottom: $('<p class="hint-bottom">公共WIFi网络速度可能较慢<br />建议您使用4G网络上传</p>'),
    show: function () {
        var $contentView = $('<div class="content-view"></div>'),
            $progressContainer = $('<div class="progress-container"></div>');
        $progressContainer.append(this.$progressBar);
        $contentView.append(this.$clock).append(this.$hintTop).append($progressContainer).append(this.$hintBottom);
        this.$container.append($contentView);
        $('body').append(this.$container);
        this.$container.animate({
            'opacity': 1,
        }, 200);
    },
    error: function () {
        this.$clock.css({
            'background': 'url("../imgs/upload-error.png") no-repeat top center / 35px 35px'
        });
        this.$progressBar.css('background', 'red');
    },
    hide: function () {
        var $this = this;
        this.$container.animate({
            'opacity': 0
        }, 250, function () {
            $this.$container.remove();
        })
    }
};

// <div class="upload-container">
//     <div class="content-view">
//     <div class="clock"></div>
//     <p class="hint-top">资料提交中...</p>
//     <div class="progress-container">
//     <div class="progress-bar"></div>
//     </div>
//     <p class="hint-bottom">公共WIFi网络速度可能较慢<br />建议您使用4G网络上传</p>
//     </div>
//     </div>