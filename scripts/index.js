var u_id = sessionStorage.u_id;
var s_id = sessionStorage.s_id;
var http = "https://www.railwaybaby.com/";
$(function () {
    if (u_id == undefined || u_id == null) {
        location.href = "login.html";
    }
    if (u_id == 1) {
        $(".homeNav ul li").show();
    }
    onload();
    //点击li选中状态
    $(".homeNav li").click(function () {
        $(this).addClass("clickLi").siblings().removeClass("clickLi");
        $(".chose").hide();
        var content = $(this).children().html();
        if (content == "待办事项") {
            $("#main_iframe").attr("src", "toDo.html");
        }
        if (content == "订单管理") {
            $("#main_iframe").attr("src", "orderManagement.html");
        }
        if (content == "商品管理") {
            if ($("#btn3").attr("state") == "0") {
                //alert($(".homeNav>ul>li").length)
                //if($(".homeNav>ul>li").length>12) {
                //    $("#all").removeAttr("style");
                //}
                $("#partTwo").slideDown();
                $("#btn3").attr("state", "1");
                $("#btn3").removeClass("clickLi");
            } else {
                $("#partTwo").slideUp();
                $("#btn3").attr("state", "0");
                //$("#all").css01('height','501px');
            }
            $("#partTwo>li").click(function () {
                if ($(this).html() == "已上架") {
                    $("#main_iframe").attr("src", "commodityManagement.html");
                } else {
                    $("#main_iframe").attr("src", "warehouseManagement.html");
                }
            })
        }
        if (content == "类目管理") {
            $("#main_iframe").attr("src", "categoryManagement.html");
        }
        if (content == "区域管理") {
            $("#main_iframe").attr("src", "regionalManagement.html");
        }
        if (content == "卖家管理") {
            $("#main_iframe").attr("src", "sellerManagement.html");
        }
        if (content == "管理员管理") {
            $("#main_iframe").attr("src", "adminManagement.html");
        }
        if (content == "会员管理") {
            $("#main_iframe").attr("src", "memberManagement.html");
        }
        if (content == "营销管理") {
            $("#btn8").removeClass("clickLi");
            if ($("#btn8").attr("state") == "0") {
                //if($(".homeNav>ul>li").length>12) {
                //    $("#all").removeAttr("style");
                //}
                $("#twoPart").slideDown();
                $("#btn8").attr("state", "1")
            } else {
                $("#twoPart").slideUp();
                $("#btn8").attr("state", "0");
                //$("#all").css01('height','501px');
            }
            $("#twoPart>li").click(function () {
                if ($(this).html() == "红包管理") {
                    $("#main_iframe").attr("src", "marketingManagement.html");
                } else {
                    $("#main_iframe").attr("src", "marketingActivity.html");
                }
            })
        }
        if (content == "首页管理") {
            $("#main_iframe").attr("src", "advertising.html");
        }
        if (content == "分销统计") {
            $("#main_iframe").attr("src", "distribution.html");
        }
    });
//修改密码
    $("#updatePwd").click(function () {
        $("#main_iframe").attr("src", "updatePwd.html");
    });
    //退出
    $("#exit").click(function () {
        sessionStorage.removeItem("u_id");
        sessionStorage.removeItem("s_id");
        window.location.href = "login.html";
    });
});
//获取权限跟用户名
function onload() {
    //if($(".homeNav>ul>li").length<12){
    //       $("#all").css01('height','501px');
    //}
    if (u_id == 1) {
        $(".homeNav ul li").show();
    }
    var array = "";
    var obj = new Object();
    obj.a_id = u_id;
    obj.uid = u_id;
    obj.sid = s_id;
    var objs = JSON.stringify(obj);
    $.ajax({
        url: http + "queryAdminByAid",
        type: "POST",
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                $("#btn1").show();
                $("#btn7").show();
                $("#btn8").show();
                $("#twoPart li").show();
                sessionStorage.setItem("name", data.object.a_name);
                array = data.object.a_role;
                if (array.indexOf("1") != -1) {
                    $("#btn2").show();
                }
                if (array.indexOf("2") != -1) {
                    $("#btn3").show();
                    $("#partTwo li").show();
                }
                if (array.indexOf("3") != -1) {
                    $("#btn4").show();
                }
                if (array.indexOf("4") != -1) {
                    $("#btn5").show();
                }
                if (array.indexOf("5") != -1) {
                    $("#btn6").show();
                }
                if (array.indexOf("6") != -1) {
                    $("#btn9").show();
                }
                if (array.indexOf("7") != -1) {
                    $("#btn10").show();
                }
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
/*--显示遮罩层--*/
function showMask() {
    $(".maskBox").css("display", "block");
}

/*--隐藏遮罩层--*/
function hideMask() {
    $(".maskBox").css("display", "none");
}
function hideDiv() {
    $(".chose").hide();
}
function login(){
    window.location.href = "login.html";
}


