/**
 * Created by KQ on 2016/12/21.
 */
var http = "https://www.railwaybaby.com/";
var sellerId;
var url = location.search;
var u_id = sessionStorage.u_id;
var s_id = sessionStorage.s_id;
$(function () {
    $("#userName").html(sessionStorage.name);
    if (url.indexOf("?") != -1) {
        sellerId = url.split("=")[1];
        onload();
    }
    $('input').val("");
    $('textarea').val("");
    $(".back").click(function () {
        window.location.href = "sellerManagement.html";
    });
    //新增卖家
    $(".send").click(function () {
        if (url.indexOf("?") == -1) {
            add();
        }
    });
    //修改卖家信息
    $(".send").click(function () {
        if (url.indexOf("?") != -1) {
            update();
        }
    });
});
//新增卖家
function add() {
    var obj = new Object();
    var name = $("#name").val();
    var s_address = $("#address").val();
    var s_phone1 = $("#tel").val();
    var s_phone2 = $("#phone").val();
    var s_note = $("#note").val();
    if(name==""||s_address==""||s_phone1==""||s_phone2==""){
        $(".mini").show();
        window.parent.showMask();
        $("#p2").html("请填写完整信息");
        $("#p3").click(function () {
            $(".mini").hide();
            window.parent.hideMask();
        });
        return;
    }
    obj.s_name = name;
    obj.s_address = s_address;
    obj.s_phone1 = s_phone1;
    obj.s_phone2 = s_phone2;
    obj.s_note = s_note;
    obj.uid = u_id;
    obj.sid = s_id;
    var objs = JSON.stringify(obj);
    $.ajax({
        url: http + "addSeller",
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
                //alert("添加失败");
                $(".mini").show();
                window.parent.showMask();
                $("#p2").html("添加失败");
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
function s(e, a) {
    if (e && e.preventDefault)
        e.preventDefault();
    else
        window.event.returnValue = false;
    a.focus();

}
//显示卖家信息
function onload() {
    $(".li1").show();
    $(".li2").show();
    var obj = new Object();
    obj.s_id = sellerId;
    obj.uid = u_id;
    obj.sid = s_id;
    var objs = JSON.stringify(obj);
    $.ajax({
        url: http + "querySellerById",
        type: "POST",
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                if (data.object.s_state == 1) {
                    data.object.s_state = "正常";
                } else {
                    data.object.s_state = "挂起";
                }
                $("#number").val(data.object.s_id);
                $("#name").val(data.object.s_name);
                $("#tel").val(data.object.s_phone1);
                $("#phone").val(data.object.s_phone2);
                $("#address").val(data.object.s_address);
                $("#note").val(data.object.s_note);
                $("#state").val(data.object.s_state)
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
                //alert("查询失败");
                $(".mini").show();
                window.parent.showMask();
                $("#p2").html(data.msg);
                $("#p3").click(function () {
                    $(".mini").hide();
                    window.parent.hideMask();
                });
                //window.location.href="sellerManagement.html";
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
//修改卖家信息
function update() {
    var obj = new Object();
    var name = $("#name").val();
    var s_address = $("#address").val();
    var s_phone1 = $("#tel").val();
    var s_phone2 = $("#phone").val();
    var s_note = $("#note").val();
    if(name==""||s_address==""||s_phone1==""||s_phone2==""){
        $(".mini").show();
        window.parent.showMask();
        $("#p2").html("请填写完整信息");
        $("#p3").click(function () {
            $(".mini").hide();
            window.parent.hideMask();
        });
        return;
    }
    obj.s_name = name;
    obj.uid = u_id;
    obj.sid = s_id;
    obj.s_id = sellerId;
    obj.s_address = s_address;
    obj.s_phone1 = s_phone1;
    obj.s_phone2 = s_phone2;
    obj.s_note = s_note;
    var objs = JSON.stringify(obj);
    $.ajax({
        url: http + "updateSeller",
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
                onload();
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