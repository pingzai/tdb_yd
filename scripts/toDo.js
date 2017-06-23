/**
 * Created by KQ on 2016/12/15.
 */
var u_id=sessionStorage.u_id;
var s_id=sessionStorage.s_id;
$(function(){
    $("#userName").html(sessionStorage.name);
    //点击空白隐藏商品管理
    document.onclick = function(){
        window.parent.hideDiv();
    };
    $(".baby a").click(function(){
        window.location.href="commodityManagement.html";
    });
    $(".orderReminder a").click(function(){
        window.location.href="orderManagement.html";
    })
});
