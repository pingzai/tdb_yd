/**
 * Created by KQ on 2016/12/15.
 */
var u_id = sessionStorage.u_id;
var s_id = sessionStorage.s_id;
var http = "https://www.railwaybaby.com/";
var url = location.search;
var orderId;
var orderState;
$(function () {
    $("#userName").html(sessionStorage.name);
    orderId = url.split("=")[1];
    onload();
    //条件筛选
    $(".condition").click(function () {
        $(this).hide();
        $(".partThree").slideDown(150);
        $(".partFour").fadeIn(150);
    });
    //收起
    $(".partFour").click(function () {
        $(this).hide();
        $(".partThree").slideUp(150);
        $(".condition").fadeIn(150);
    });
    $("#back").click(function () {
        window.location.href = "orderManagement.html";
    });
    $("#send").click(function () {
        updateState();
    });
});
function onload() {
    var obj = new Object();
    obj.o_id = orderId;
    obj.uid = u_id;
    obj.sid = s_id;
    var objs = JSON.stringify(obj);
    var str = '';
    $("#li").html("");
    $.ajax({
        url: http + "queryOrderAdminByOid",
        type: "POST",
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                var date = new Date(data.object.o_time * 1000);
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = date.getDate() + ' ';
                var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                data.object.o_time = Y + M + D + h + ":" + m;
                orderState = data.object.o_state;
                $("#num").html(data.object.o_id);
                $("#mai").html(data.object.u_name);
                $("#time").html(data.object.o_time);
                $("#seller").html(data.object.s_name);
                //$(".discount").html("已优惠："+data.object.o_balance);
                $("#money").html(data.object.o_price);
                $("#express").html(data.object.o_blog);
                $("#msg").html(data.object.rec_address + "     " + data.object.rec_name + "      " + data.object.rec_phone);
                $("#number").val(data.object.o_awb);
                for (var i = 0; i < data.object.list.length; i++) {
                    str = '<div class="partContent"><div class="img"><img src=' + data.object.list[i].i_cover + '></div>' +
                        '<div style="margin-left: 10px;width: 200px;text-align: center">' + data.object.list[i].g_id + '</div>' +
                        '<div style="margin-left: 10px;width: 200px;text-align: center">' + data.object.list[i].i_name + '</div> ' +
                        '<div style="margin-left: 10px;width: 200px;text-align: center">' + data.object.list[i].g_name + '</div>' +
                        ' <div style="margin-left: 10px;width: 150px;text-align: center">X ' + data.object.list[i].g_count + '</div>' +
                        ' <div><p class="price">' + data.object.list[i].g_price + '</p><p>' + data.object.list[i].g_rprice + '</p></div>' +
                        ' </div>';
                    $("#li").append(str);
                }
                $(".partContent").each(function(){
                    if($(this).find(".price").next().html()==""){
                        $(this).find(".price").removeAttr("class")
                    }
                });
                if (orderState == 1) {
                    $("#send").hide();
                    $("#number").attr('disabled', 'disabled');
                    //$("#send").show();
                    //$("#send").html("发货");
                    //$("#number").removeAttr('disabled')
                }
                if (orderState == 2) {
                    $("#send").show();
                    $("#send").html("发货");
                    $("#number").removeAttr('disabled')
                }
                if (orderState == 3) {
                    $("#send").hide();
                    $("#number").attr('disabled', 'disabled')
                }
                if (orderState == 4) {
                    $("#send").hide();
                    $("#number").attr('disabled', 'disabled')
                }
                if (orderState == 5) {
                    $("#send").show();
                    $("#send").html("退款");
                    $("#number").removeAttr('disabled')
                }
                if (orderState == 6) {
                    $("#send").hide();
                    $("#number").attr('disabled', 'disabled')
                }
                if (orderState == 7) {
                    $("#send").show();
                    $("#send").html("重新退款");
                    $("#number").removeAttr('disabled')
                }
                if (orderState == 8) {
                    $("#send").hide();
                    $("#number").attr('disabled', 'disabled')
                }
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
    });
}
//修改订单状态
function updateState() {
    var state = 0;
    var num=$("#number").val();
    if(num==""){
        $(".mini").show();
        window.parent.showMask();
        $("#p2").html("请填写物流单号");
        $("#p3").click(function () {
            $(".mini").hide();
            window.parent.hideMask();
        });
        return;
    }
    var html = $("#send").html();
    if (html == "发货") {
        state = 3
    }
    if (html == "退款") {
        state = 6
    }
    if (html == "重新退款") {
        state = 6
    }
    var number=$("#number").val();
    var company=$("#company").val();
    var obj = new Object();
    obj.o_id = orderId;
    obj.state = state;
    obj.uid = u_id;
    obj.sid = s_id;
    obj.o_awb = number;
    var objs = JSON.stringify(obj);
    $.ajax({
        url: http + "updateOrderAdmin",
        type: "POST",
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                $(".mini").show();
                window.parent.showMask();
                $("#p2").html(data.msg);
                $("#p3").click(function () {
                    $(".mini").hide();
                    window.parent.hideMask();
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
    });
}