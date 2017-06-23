var verifyCode;
var http="https://www.railwaybaby.com/";
$(function () {
    createCode();
    //点击登录
    $("#userSubmit").click(function () {
        var pwd = $("#userPwd").val();
        var code = $("#userCode").val();
        code=code.toUpperCase();
        var phone = $("#userName").val();
        var param = new Object();
        param.a_pwd  = pwd;
        param.code = code;
        param.a_uname = phone;
        param.cverifycode = verifyCode;
        var jsonString = JSON.stringify(param);
        if (phone.length < 3 || phone.length > 16) {
            //alert("用户名不规范");
            $(".mini").show();
            $("#p2").html("用户名不规范");
            $("#p3").click(function () {
                $(".mini").hide();
            });
            return;
        }
        if (pwd.length < 6 || pwd.length > 16) {
           // alert("请输入6到16位的密码");
            $(".mini").show();
            $("#p2").html("请输入6到16位的密码");
            $("#p3").click(function () {
                $(".mini").hide();
            });
            return;
        }

        $.ajax({
            url: http+"adminLogin",
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: jsonString,
            catch: false,
            success: function (data) {
                if (data.success == true) {
                    sessionStorage.setItem("u_id", data.object.a_id);
                    sessionStorage.setItem("s_id", data.object.sid);
                    window.location.href="index.html";
                }
                else {
                    $(".mini").show();
                    $("#p2").html(data.msg);
                    $("#p3").click(function () {
                        $(".mini").hide();
                    });
                }
            },
            error: function () {
                $(".mini").show();
                $("#p2").html("未知错误");
                $("#p3").click(function () {
                    $(".mini").hide();
                });
            }
        });
    });
    //回车登录
    document.onkeydown = function (e) {
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {
            //window.location.href="index.html";
            var pwd = $("#userPwd").val();
            var code = $("#userCode").val();
            code=code.toUpperCase();
            var phone = $("#userName").val();
            var param = new Object();
            param.a_pwd  = pwd;
            param.code = code;
            param.a_uname = phone;
            param.cverifycode = verifyCode;
            var jsonString = JSON.stringify(param);
            if (phone.length < 3 || phone.length > 16) {
                //alert("用户名不规范");
                $(".mini").show();
                $("#p2").html("用户名不规范");
                $("#p3").click(function () {
                    $(".mini").hide();
                });
                return;
            }
            if (pwd.length < 6 || pwd.length > 16) {
                // alert("请输入6到16位的密码");
                $(".mini").show();
                $("#p2").html("请输入6到16位的密码");
                $("#p3").click(function () {
                    $(".mini").hide();
                });
                return;
            }
            $.ajax({
                url: http+"adminLogin",
                type: "post",
                dataType: "json",
                contentType: "application/json",
                data: jsonString,
                catch: false,
                success: function (data) {
                    if (data.success == true) {
                        sessionStorage.setItem("u_id", data.object.a_id);
                        sessionStorage.setItem("s_id", data.object.sid);
                        window.location.href="index.html";
                    }
                    else {
                        $(".mini").show();
                        $("#p2").html(data.msg);
                        $("#p3").click(function () {
                            $(".mini").hide();
                        });
                    }
                },
                error: function () {
                    $(".mini").show();
                    $("#p2").html("未知错误");
                    $("#p3").click(function () {
                        $(".mini").hide();
                    });
                }
            });
        }
    }
});
function createCode() {
    $.ajax({
        url: http+"createVerifyCode",
        type: "get",
        cache: false,
        success: function (data) {
            verifyCode = data;
            var src = http+"getVerifyCode/" + data;
            $("#src").attr("src", src);
        },
        error: function (e) {
            //alert("获取验证码失败");
            $(".mini").show();
            $("#p2").html("获取验证码失败");
            $("#p3").click(function () {
                $(".mini").hide();
            });
        }
    });
};
