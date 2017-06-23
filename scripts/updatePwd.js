/**
 * Created by KQ on 2017/2/28.
 */
var http = "https://www.railwaybaby.com/";
var u_id = sessionStorage.u_id;
var s_id = sessionStorage.s_id;
$(function () {
    $("#userName").html(sessionStorage.name);
    $("#update").click(function () {
        var update = $("#pwd").val();
        if(update==""){
            $(".mini").show();
            $("#p2").html("请填写密码");
            $("#p3").click(function () {
                $(".mini").hide();
            });
            return;
        }
        var obj = new Object();
        obj.a_id = u_id;
        obj.a_pwd = update;
        obj.uid = u_id;
        obj.sid = s_id;
        var objs = JSON.stringify(obj);
        $.ajax({
            url: http + "updateAdminPwd",
            type: "post",
            cache: false,
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
                    $("#pwd").val("");
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
                return;
            }
        });
    });
});