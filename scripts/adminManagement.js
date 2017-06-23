var http = "https://www.railwaybaby.com/";
var u_id = sessionStorage.u_id;
var s_id = sessionStorage.s_id;
var aId;
$(function () {
    $("#userNames").html(sessionStorage.name);
    onload();
    //搜索
    $("#searchAdmin").click(function () {
        search();
        $('#list').hide().next().hide();
        $('#list').show();
    });
    $(document).on('click', '.normal', function (e) {
        if(confirm("确定修改管理员状态？")) {
            var e = e || window.e;
            e.stopPropagation();
            $('#list').hide().next().hide();
            $('#list').show();
            $(this).animate({left: '-35px'}, 100, function () {
                $(this).siblings('.holdUp').animate({left: '0'}, 100)
            });
            var State = 1;
            if ($(this).html() == "正常") {
                State = 2;
            } else {
                State = 1;
            }
            var sellerState = new Object();
            sellerState.a_state = State;
            sellerState.a_id = aId;
            sellerState.uid = u_id;
            sellerState.sid = s_id;
            var update = JSON.stringify(sellerState);
            $.ajax({
                url: http + "updateAdmin",
                type: "POST",
                data: update,
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    if (data.success == true) {
                        //onload();
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
    });
    $(document).on('click', '.holdUp', function (e) {
        if(confirm("确定修改管理员状态？")) {
            var e = e || window.e;
            e.stopPropagation();
            $('#list').hide().next().hide();
            $('#list').show();
            $(this).animate({left: '35px'}, 200, function () {
                $(this).siblings('.normal').animate({left: '0'}, 100)
            });
            var State = 1;
            if ($(this).html() == "正常") {
                State = 2;
            } else {
                State = 1;
            }
            var sellerState = new Object();
            sellerState.a_state = State;
            sellerState.a_id = aId;
            sellerState.uid = u_id;
            sellerState.sid = s_id;
            var update = JSON.stringify(sellerState);
            $.ajax({
                url: http + "updateAdmin",
                type: "POST",
                data: update,
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    if (data.success == true) {
                        //onload();
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
    });
    $(".back").click(function () {
        $('#list').hide().next().hide();
        $('#list').show();
        onload();
    });
    //修改密码
    $("#update").click(function () {
        var passWorld = $("#passWorld").val();
        if(passWorld==""){
            $(".mini").show();
            $("#p2").html("请填写密码");
            $("#p3").click(function () {
                $(".mini").hide();
            });
            return;
        }
        var obj = new Object();
        obj.uid = u_id;
        obj.sid = s_id;
        obj.a_pwd = passWorld;
        obj.a_id = aId;
        var objs = JSON.stringify(obj);
        if (u_id != aId && u_id != 1) {
            $(".mini").show();
            $("#p2").html("您没有此权限");
            $("#p3").click(function () {
                $(".mini").hide();
            });
            return;
        }
        $.ajax({
            url: http + "updateAdminPwd",
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: objs,
            catch: false,
            success: function (data) {
                if (data.success == true) {
                    $(".mini").show();
                    $("#p2").html(data.msg);
                    $("#p3").click(function () {
                        $(".mini").hide();
                    });
                }
                else {
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
//$(".list-ul").on('click',function(){
//    $(this).addClass('active').siblings().removeClass('active');
//    $('#list').hide().next().show();
//    $('#houtaiName').val($(this).find('.list1').text());
//    $('#phone').val($(this).find('.list2').text());
//    var str=$(this).find('.list3').text();
//    var arr=[];
//    arr=str.split(",");
//    var quanxian=document.getElementById('quanxian');
//    var checkBoxs=quanxian.getElementsByTagName("input");
//    for(var i=0;i<checkBoxs.length;i++){
//        for(var j=0;j<arr.length;j++){
//            if(arr[j]==checkBoxs[i].parentNode.innerHTML.split('>')[1]){
//               checkBoxs[i].checked='checked';
//            }
//        }
//    }
//});
    $('#append').on('click', function () {
        $('#list').hide().next().show();
        $("input[type=text]").val("");
        $("textarea").val("");
        $("#quanxian input[type=checkbox]").removeAttr("checked");
        $(".save").attr("state", "0");
        $("#update").hide();
        $(".part").removeAttr("style");
        $("#userName").attr('disabled',false);
    });
//新增管理员
    $(".save").click(function () {
        send();
    });
});
//获取管理员列表
function onload() {
    var obj = new Object();
    obj.uid = u_id;
    obj.sid = s_id;
    obj.start = 1;
    var objs = JSON.stringify(obj);
    var str = '';
    $(".list-min").html(str);
    $.ajax({
        url: http + "queryAllAdmin",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        data: objs,
        catch: false,
        success: function (data) {
            if (data.success == true) {
                for (var i = 0; i < data.object.length; i++) {
                    var state = "";
                    if (data.object[i].a_state == "1") {
                        data.object[i].a_state = "正常";
                        state = "挂起";

                    } else {
                        data.object[i].a_state = "挂起";
                        state = "正常";
                    }
                    data.object[i].a_role = data.object[i].a_role.substring(0, data.object[i].a_role.length - 1).replace("", "");
                    data.object[i].a_role = data.object[i].a_role.replace("1", "订单管理");
                    data.object[i].a_role = data.object[i].a_role.replace("2", "商品管理");
                    data.object[i].a_role = data.object[i].a_role.replace("3", "类目管理");
                    data.object[i].a_role = data.object[i].a_role.replace("4", "区域管理");
                    data.object[i].a_role = data.object[i].a_role.replace("5", "广告管理");
                    data.object[i].a_role = data.object[i].a_role.replace("6", "分销管理");
                    data.object[i].a_role = data.object[i].a_role.replace("7", "会员管理");
                    str = '<ul class="list-ul" onclick="getInfo(' + data.object[i].a_id + ')">' +
                        '<li style="margin-left: 100px;width: 255px">' + data.object[i].a_name + '</li>' +
                        '<li class="list2">' + data.object[i].a_phone + '</li>' +
                        '<li class="list3">' + data.object[i].a_role + '</li> ' +
                        '<li class="li1 list4" style="width: 80px"> <div style="z-index: 999"> <span class="normal">' + data.object[i].a_state + '</span> <span class="holdUp">' + state + '</span> </div> </li> </ul>'
                    $(".list-min").append(str);
                }
            }
            else {
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
                $("#p2").html(data.msg);
                $("#p3").click(function () {
                    $(".mini").hide();
                });
            }
            var pageCourt=data.totalpage;
            $(".tcdPageCode").createPage({
                pageCount: pageCourt,
                current: 1,
                backFn: function (p) {
                    var str = '';
                    $.ajax({
                        url: http + "queryAllAdmin",
                        type: "post",
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify({"uid": u_id, "sid": s_id, "start": p}),
                        catch: false,
                        success: function (data) {
                            if (data.success == true) {
                                $(".list-min").html("");
                                for (var i = 0; i < data.object.length; i++) {
                                    var state = "";
                                    if (data.object[i].a_state == "1") {
                                        data.object[i].a_state = "正常";
                                        state = "挂起";

                                    } else {
                                        data.object[i].a_state = "挂起";
                                        state = "正常";
                                    }
                                    data.object[i].a_role = data.object[i].a_role.substring(0, data.object[i].a_role.length - 1).replace("", "");
                                    data.object[i].a_role = data.object[i].a_role.replace("1", "订单管理");
                                    data.object[i].a_role = data.object[i].a_role.replace("2", "商品管理");
                                    data.object[i].a_role = data.object[i].a_role.replace("3", "类目管理");
                                    data.object[i].a_role = data.object[i].a_role.replace("4", "区域管理");
                                    data.object[i].a_role = data.object[i].a_role.replace("5", "广告管理");
                                    data.object[i].a_role = data.object[i].a_role.replace("6", "分销管理");
                                    data.object[i].a_role = data.object[i].a_role.replace("7", "会员管理");
                                    str = '<ul class="list-ul" onclick="getInfo(' + data.object[i].a_id + ')">' +
                                        '<li style="margin-left: 100px;width: 255px">' + data.object[i].a_name + '</li>' +
                                        '<li class="list2">' + data.object[i].a_phone + '</li>' +
                                        '<li class="list3">' + data.object[i].a_role + '</li> ' +
                                        '<li class="li1 list4" style="width: 80px"> <div style="z-index: 999"> <span class="normal">' + data.object[i].a_state + '</span> <span class="holdUp">' + state + '</span> </div> </li> </ul>'
                                    $(".list-min").append(str);
                                }
                            }
                            else {
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
                                $("#p2").html(data.msg);
                                $("#p3").click(function () {
                                    $(".mini").hide();
                                });
                            }
                        }
                    })
                }
            })
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
//查看详情
function getInfo(id) {
$("#update").show();
    aId = id;
    $('#list').hide().next().show();
    $("#quanxian input[type=checkbox]").removeAttr("checked");
    $(".save").attr("state", "1");
    $("#userName").addClass("update");
    $("#passWorld").val("******");
    var obj = new Object();
    obj.uid = u_id;
    obj.sid = s_id;
    obj.a_id = id;
    var role = [];
    var objs = JSON.stringify(obj);
    $("#userName").attr('disabled',true);
    $("#userName").css('background',"#fff");
    $.ajax({
        url: http + "queryAdminByAid",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        data: objs,
        catch: false,
        success: function (data) {
            if (data.success == true) {
                $("#houtaiName").val(data.object.a_name);
                $("#tel").val(data.object.a_phone);
                role = (data.object.a_role.split(","));
                $("#note").val(data.object.a_note);
                $("#userName").val(data.object.a_uname);
                for (var i = 0; i < role.length; i++) {
                    if (role[i] != "") {
                        $('#' + i).prop("checked", "checked");
                    }
                }
            }
            else {
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
function send() {
    var send = $(".save").attr("state");
    //添加管理员
    if (send == 0) {
        var idsstr = "";
        var isc = "";
        $("#quanxian input[name=check]").each(function () {
            idsstr += $(this).val() + ","; //获取所有checkbox的值
            if ($(this).prop("checked")) {//如果被选中
                isc += $(this).val() + ",";//获取被选中的值
            }
        });
        //isc = isc.substring(0, isc.length - 1).replace("", "");
        var houtaiName = $("#houtaiName").val();
        var tel = $("#tel").val();
        var userName = $("#userName").val();
        var passWorld = $("#passWorld").val();
        var note = $("#note").val();
        var a_role = isc;
        if(houtaiName==""||tel==""||userName==""||passWorld==""){
            $(".mini").show();
            $("#p2").html("请将信息填写完整");
            $("#p3").click(function () {
                $(".mini").hide();
            });
            return;
        }
        var obj = new Object();
        obj.uid = u_id;
        obj.sid = s_id;
        obj.a_name = houtaiName;
        obj.a_phone = tel;
        obj.a_role = isc;
        obj.a_note = note;
        obj.a_uname = userName;
        obj.a_pwd = passWorld;
        var objs = JSON.stringify(obj);
        $.ajax({
            url: http + "addAdmin",
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: objs,
            catch: false,
            success: function (data) {
                if (data.success == true) {
                    $(".mini").show();
                    $("#p2").html(data.msg);
                    $("#p3").click(function () {
                        $(".mini").hide();
                    });
                }
                else {
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
                    $("#p2").html(data.msg);
                    $("#p3").click(function () {
                        $(".mini").hide();
                    });
                    return;
                }
            },
            error: function () {
                $(".mini").show();
                $("#p2").html("未知错误");
                $("#p3").click(function () {
                    $(".mini").hide();
                });
                return;
            }
        });
    } else {
        //修改管理员信息
        var idsstr = "";
        var isc = "";
        $("#quanxian input[name=check]").each(function () {
            idsstr += $(this).val() + ","; //获取所有checkbox的值
            if ($(this).prop("checked")) {//如果被选中
                isc += $(this).val() + ",";//获取被选中的值
            }
        });
        //isc = isc.substring(0, isc.length - 1).replace("", "");
        var houtaiName = $("#houtaiName").val();
        var tel = $("#tel").val();
        var userName = $("#userName").val();
        //if ($("#passWorld").val() != "******") {
        //    var passWorld = $("#passWorld").val();
        //}
        var note = $("#note").val();
        var a_role = isc;
        if(houtaiName==""||tel==""||userName==""){
            $(".mini").show();
            $("#p2").html("请将信息填写完整");
            $("#p3").click(function () {
                $(".mini").hide();
            });
            return;
        }
        var obj = new Object();
        obj.uid = u_id;
        obj.sid = s_id;
        obj.a_name = houtaiName;
        obj.a_phone = tel;
        obj.a_role = isc;
        obj.a_note = note;
        obj.a_uname = userName;
        obj.a_id = aId;
        //obj.a_pwd = passWorld;
        var objs = JSON.stringify(obj);
        $.ajax({
            url: http + "updateAdmin",
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: objs,
            catch: false,
            success: function (data) {
                if (data.success == true) {
                    sessionStorage.name=houtaiName;
                    $("#userName").html(sessionStorage.name);
                    $(".mini").show();
                    $("#p2").html(data.msg);
                    $("#p3").click(function () {
                        $(".mini").hide();
                    });

                }
                else {
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
//搜索
function search() {
    var search = $("#search").val();
    //if(search==""){
    //    onload();
    //}
    var obj = new Object();
    obj.uid = u_id;
    obj.sid = s_id;
    obj.search = search;
    obj.start = 1;
    var str = "";
    var objs = JSON.stringify(obj);
    $.ajax({
        url: http + "queryAllAdmin",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        data: objs,
        catch: false,
        success: function (data) {
            if (data.success == true) {
                $(".list-min").html("");
                for (var i = 0; i < data.object.length; i++) {
                    var state = "";
                    if (data.object[i].a_state == "1") {
                        data.object[i].a_state = "正常";
                        state = "挂起";

                    } else {
                        data.object[i].a_state = "挂起";
                        state = "正常";
                    }
                    data.object[i].a_role = data.object[i].a_role.substring(0, data.object[i].a_role.length - 1).replace("", "");
                    data.object[i].a_role = data.object[i].a_role.replace("1", "订单管理");
                    data.object[i].a_role = data.object[i].a_role.replace("2", "商品管理");
                    data.object[i].a_role = data.object[i].a_role.replace("3", "类目管理");
                    data.object[i].a_role = data.object[i].a_role.replace("4", "区域管理");
                    data.object[i].a_role = data.object[i].a_role.replace("5", "广告管理");
                    data.object[i].a_role = data.object[i].a_role.replace("6", "分销管理");
                    data.object[i].a_role = data.object[i].a_role.replace("7", "会员管理");
                    str = '<ul class="list-ul" onclick="getInfo(' + data.object[i].a_id + ')">' +
                        '<li style="margin-left: 100px;width: 255px">' + data.object[i].a_name + '</li>' +
                        '<li class="list2">' + data.object[i].a_phone + '</li>' +
                        '<li class="list3">' + data.object[i].a_role + '</li> ' +
                        '<li class="li1 list4" style="width: 80px"> <div style="z-index: 999"> <span class="normal">' + data.object[i].a_state + '</span> <span class="holdUp">' + state + '</span> </div> </li> </ul>'
                    $(".list-min").append(str);
                }

            }
            else {
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
                $("#p2").html(data.msg);
                $("#p3").click(function () {
                    $(".mini").hide();
                });
            }
            $(".tcdPageCode").remove();
            var pageStr='';
            pageStr='<div class="tcdPageCode"></div>';
            $("#list").append(pageStr);
            var pageCourt=data.totalpage;
            $(".tcdPageCode").createPage({
                pageCount: pageCourt,
                current: 1,
                backFn: function (p) {
                    var str = '';
                    //$(".list-min").html(str);
                    $.ajax({
                        url: http + "queryAllAdmin",
                        type: "post",
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify({"uid": u_id, "sid": s_id, "start": p,"search":search}),
                        catch: false,
                        success: function (data) {
                            if (data.success == true) {
                                $(".list-min").html("");
                                for (var i = 0; i < data.object.length; i++) {
                                    var state = "";
                                    if (data.object[i].a_state == "1") {
                                        data.object[i].a_state = "正常";
                                        state = "挂起";

                                    } else {
                                        data.object[i].a_state = "挂起";
                                        state = "正常";
                                    }
                                    data.object[i].a_role = data.object[i].a_role.substring(0, data.object[i].a_role.length - 1).replace("", "");
                                    data.object[i].a_role = data.object[i].a_role.replace("1", "订单管理");
                                    data.object[i].a_role = data.object[i].a_role.replace("2", "商品管理");
                                    data.object[i].a_role = data.object[i].a_role.replace("3", "类目管理");
                                    data.object[i].a_role = data.object[i].a_role.replace("4", "区域管理");
                                    data.object[i].a_role = data.object[i].a_role.replace("5", "广告管理");
                                    data.object[i].a_role = data.object[i].a_role.replace("6", "分销管理");
                                    data.object[i].a_role = data.object[i].a_role.replace("7", "会员管理");
                                    str = '<ul class="list-ul" onclick="getInfo(' + data.object[i].a_id + ')">' +
                                        '<li style="margin-left: 100px;width: 255px">' + data.object[i].a_name + '</li>' +
                                        '<li class="list2">' + data.object[i].a_phone + '</li>' +
                                        '<li class="list3">' + data.object[i].a_role + '</li> ' +
                                        '<li class="li1 list4" style="width: 80px"> <div style="z-index: 999"> <span class="normal">' + data.object[i].a_state + '</span> <span class="holdUp">' + state + '</span> </div> </li> </ul>'
                                    $(".list-min").append(str);
                                }
                            }
                            else {
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
                                $("#p2").html(data.msg);
                                $("#p3").click(function () {
                                    $(".mini").hide();
                                });
                            }
                        }
                    })
                }
            })
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