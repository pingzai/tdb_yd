/**
 * Created by KQ on 2017/3/15.
 */
var u_id = sessionStorage.u_id;
var s_id = sessionStorage.s_id;
var http = "https://www.railwaybaby.com/";
var url = location.search;
var mId;
$(function () {
    $("#userName").html(sessionStorage.name);
    mId = url.split("=")[1];
    $("#back").click(function () {
        window.location.href = "memberManagement.html";
    });
    onload();

});
function onload() {
    var obj = new Object();
    obj.uid = u_id;
    obj.sid = s_id;
    obj.u_id = mId;
    var objs = JSON.stringify(obj);
    var str = "";
    $("#ul").html(str);
    $.ajax({
        url: http + "queryUserById",
        type: "POST",
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                if (data.object.u_state == 1) {
                    data.object.u_state = "正常"
                } else {
                    data.object.u_state = "挂起"
                }
                $("#num").html(data.object.u_id);
                $("#mai").html(data.object.u_name);
                $("#time").html(data.object.u_state);
                $("#seller").html(data.object.u_phone);
                for (var i = 0; i < data.object.order.length; i++) {
                    var date = new Date(data.object.order[i].o_time * 1000);
                    var Y = date.getFullYear() + '-';
                    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                    var D = date.getDate() + ' ';
                    var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                    var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                    data.object.order[i].o_time = Y + M + D + h + ":" + m;
                    str += '<li><div class="orderTitle"><span>订单号：' + data.object.order[i].o_id + '</span><span>订单创建时间：' + data.object.order[i].o_time + '</span>';
                    for (var x = 0; x < data.object.order[i].list.length; x++) {
                        var price;
                        if (data.object.order[i].list[x].g_rprice == "") {
                            price = data.object.order[i].list[x].g_price
                        }
                        if (data.object.order[i].list[x].g_rprice != "") {
                            price = data.object.order[i].list[x].g_rprice
                        }
                        str += '</div><div class="partContent"><div class="img"><img src=' + data.object.order[i].list[x].i_cover + '></div>' +
                            '<div class="commodityName">' + data.object.order[i].list[x].g_name + '</div> ' +
                            '<div class="commodityNumber">X' + data.object.order[i].list[x].g_count + '</div>' +
                            '<div class="commodityPrice"><p class="price">' + data.object.order[i].list[x].g_price + '</p><p>' + data.object.order[i].list[x].g_rprice + '</p></div>';
                            //'<div class="commodityRprice">' + data.object.order[i].list[x].g_rprice + '</div> ';
                    }
                    if (data.object.order[i].o_state == 1) {
                        data.object.order[i].o_state = "待付款"
                    }
                    str += '<div class="buyerTel">' + data.object.u_phone + '</div><div class="buyerName">' + data.object.u_name + '</div><div class="oPrice">' + data.object.order[i].o_price + '</div>' +
                        '<div class="orderState">' + data.object.order[i].o_state + '</div> </div></li>'
                }

                $("#ul").append(str);
                $(".partContent").each(function(){
                    if($(this).find(".price").next().html()==""){
                        $(this).find(".price").removeAttr("class")
                    }
                });
            } else {
                if (data.state == 1) {
                    $(".mini").show();
                    window.parent.showMask();
                    $("#p2").html(data.msg);
                    $("#p3").click(function () {
                        $(".mini").hide();
                        window.parent.hideMask();
                        window.parent.login();
                    });
                    return;
                }

                $(".mini").show();
                window.parent.showMask();
                $("#p2").html(data.msg);
                $("#p3").click(function () {
                    $(".mini").hide();
                    window.parent.hideMask();
                });
                return;
            }
        },
        error: function (e) {
            $(".mini").show();
            window.parent.showMask();
            $("#p2").html("未知错误");
            $("#p3").click(function () {
                $(".mini").hide();
                window.parent.hideMask();
            });
        }
    })
}