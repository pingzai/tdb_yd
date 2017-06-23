
/*signature: "a1c2a9768834e5c00bf167a5b2624989c9095bce", appid: "wx19f4a60762c40c37", jsapi_ticket: "9KwiourQPRN3vx3Nn1c_iY6pjwluThTvCQuLjyr6EGpl3xpDbLQYT-CP0D3yJtbysQz4bMZXjZsAn2e_6twI6A", url: "http://www.baidu.com", nonceStr: "239230f5-0029-4458-a090-57b769c094b8"*/
$(function(){
    String.prototype.getQuery = function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = this.substr(this.indexOf("\?")+1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    } ;

    var httpcode = window.location.href.getQuery("code");

    var http="https://www.railwaybaby.com/";
    var code=window.localStorage.getItem('code') ? window.localStorage.getItem('code'):httpcode;

      var url=location.href.split('#')[0].split("&")[0];
  $.ajax({
    type:"post",
    url:"https://www.railwaybaby.com/share",
    async:true,
    contentType:"application/json",
    data:JSON.stringify({"url":url,"code":code}),
    dataType:"json",
    success:function(data){
      if(!data.success){
          alert(data.msg);
          return ;
      }
     var appid = data.object.appid;
     var timestamp = data.object.timestamp;
     var signature = data.object.signature;
     var nonceStr =  data.object.nonceStr ;
     // var shareTitle = "一起分享吧！";
     var imgUrl = $(".lazy").attr("src");
     var link1 = window.location.href;
     var i_id = $(".goods-information").attr("data-iid");
     var title = $(".conter").text();
     var desc = "铁道宝";
     var link = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19f4a60762c40c37&redirect_uri=https://www.railwaybaby.com/html/goods-information.html?id="+i_id+"&response_type=code&scope=snsapi_userinfo&state=state1&connect_redirect=1#wechat_redirect"
/*https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19f4a60762c40c37&redirect_uri=http://www.railwaybaby.com/html/goods-information.html?id=94&response_type=code&scope=snsapi_userinfo&state=state1&connect_redirect=1#wechat_redirect*/



     wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId:appid, // 必填，公众号的唯一标识
          timestamp:timestamp, // 必填，生成签名的时间戳
          nonceStr:nonceStr, // 必填，生成签名的随机串
          signature:signature,// 必填，签名，见附录1
          jsApiList: ['onMenuShareAppMessage',
          'onMenuShareTimeline',] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      }); 
     

        wx.ready(function () {
// 分享给朋友
    wx.onMenuShareAppMessage({
    title: 'title', // 商品名
    desc: desc, // 店铺名
    link: 'link', // 商品购买地址
    imgUrl: imgUrl, // 分享的图标
    fail: function (res) {
//    alert(JSON.stringify(res));
    }
    });
// 分享到朋友圈
    wx.onMenuShareTimeline({
    title: 'title', // 商品名
    link: 'link', // 商品购买地址
    imgUrl: imgUrl, // 分享的图标
    fail: function (res) {
//    alert(JSON.stringify(res));
    }
    });
    });






    },
    error:function(){
      console.log('error');
    }

});
});











