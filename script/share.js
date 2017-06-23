/**
 * Created by jianghu on 2017/5/10.
 */
$(function(){
    //var http=window.localStorage.getItem('https');
    //var reg=/\//g;
    //function codeEmp(str){
    //    var codeArr=str;
    //    var arr=[];
    //    var arr01=[];
    //    $(codeArr).each(function(a,el){
    //        arr.push(codeArr[a].split('='))
    //    });
    //    $(arr).each(function(m,el){
    //        if(arr[m][0]!="code"&&arr[m][0]!="state"&&arr[m][0]!="from"&&arr[m][0]!="isappinstalled" ){
    //            arr01.push(arr[m].join('='))
    //        }
    //    });
    //    return "httpss://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19f4a60762c40c37&redirect_uri="+location.href.split("?")[0]+"?"+arr01.join('&')+"&response_type=code&scope=snsapi_userinfo&state=state1&connect_redirect=1#wechat_redirect";
    //}
    //$.ajax({
    //    url:http+"ShareHtml",
    //    type:'post',
    //    cache:false,
    //    data:JSON.stringify({'str':window.location.href}),
    //    dataType:'json',
    //    contentType:"application/json",
    //    success:function(data){
    //        var object = data.object;
    //        wx.config({
    //            debug : false,
    //            appId : object.appId,
    //            timestamp : object.timestamp,
    //            nonceStr : object.nonceStr,
    //            signature : object.signature,
    //            jsApiList : ["hideMenuItems","hideOptionMenu"]
    //        });
    //        wx.ready(function(){
    //            wx.hideMenuItems({
    //                menuList:["menuItem:share:appMessage","menuItem:share:timeline","menuItem:share:qq","menuItem:share:weiboApp","menuItem:favorite","menuItem:share:facebook","menuItem:share:QZone","menuItem:openWithQQBrowser","menuItem:openWithSafari","menuItem:copyUrl","menuItem:originPage"]
    //            });
    //        });
    //        wx.error(function(){
    //
    //        })
    //
    //    },
    //    error:function(){
    //
    //    }
    //});

});