/**
 * Created by Administrator on 2016/12/22.
 */
var http = "https://www.railwaybaby.com/";
var calssId;
var u_id = sessionStorage.u_id;
var s_id = sessionStorage.s_id;
var fId;
var updateId;
var updateState;
$(function () {
    $("#userName").html(sessionStorage.name);
    onload();
    //提交数据之前的类目添加
    $(document).on('click', '.app', function () {
        var num = parseInt($(this).attr('data-num'));
        var arr = ['二', '三', '四', '五', '六', '七', '八', '九', '十'];
        if (num == 1) {
            $('#list').append("<li class='li'><span style='width: 194px;margin-left: 50px;position: relative;'><img class='span2' data-fangxiang='0' src='images/right.png' alt=''/></span><span><input type='text'/></span><span>" + num + "级目录</span><span style='position: relative;'><div><span class='normal'>正常</span><span class='holdUp'>挂起</span></div></span><span class='add'>保存</span><div class='app btn' data-num='2'>添加2级目录</div></li>")
        } else {
            $(this).before("<ul><li class='li'><span style='width: 194px;margin-left: 50px;position: relative;'><img style='left:" + num * 10 + "px' class='span2' data-fangxiang='0' src='images/right.png' alt=''/></span><span><input type='text'/></span><span>" + num + "级目录</span><span style='position: relative;'><div><span class='normal'>正常</span><span class='holdUp'>挂起</span></div></span><span class='add'>保存</span><div class='app btn' data-num=" + (num + 1) + ">添加" + (num + 1) + "级目录</div></li></ul>")
        }
    });
    //状态切换
    $(document).on('click', '.normal', function (e) {
        if(confirm("确定修改其状态？")) {
            var e = e || window.e;
            e.stopPropagation();
            $(this).animate({left: '-35px'}, 100, function () {
                $(this).siblings('.holdUp').animate({left: '0'}, 100)
            });
            var state = $(this).html();
            var id = $(this).attr('dataId');
            if (state == "正常") {
                state = 2
            } else {
                state = 1
            }
            if (fId == undefined) {
                fId = 0;
            }
            var obj = new Object();
            obj.c_id = id;
            obj.fid = fId;
            obj.c_state = state;
            obj.uid = u_id;
            obj.sid = s_id;
            var objs = JSON.stringify(obj);
            $.ajax({
                url: http + "updateClass",
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
                            window.location.href = "categoryManagement.html";
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
                            window.location.href = "categoryManagement.html";
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
        if(confirm("确定修改其状态？")) {
            var e = e || window.e;
            e.stopPropagation();
            $(this).animate({left: '34px'}, 100, function () {
                $(this).siblings('.normal').animate({left: '0'}, 100)
            });
            var id = $(this).attr('dataId');
            var state = $(this).html();
            if (state == "挂起") {
                state = 1
            } else {
                state = 2
            }
            var obj = new Object();
            obj.c_id = id;
            obj.c_state = state;
            obj.uid = u_id;
            obj.sid = s_id;
            var objs = JSON.stringify(obj);
            $.ajax({
                url: http + "updateClass",
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
                            window.location.href = "categoryManagement.html";
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
                            window.location.href = "categoryManagement.html";
                        });

                        return;
                    }
                }
                ,
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
    //修改类目名称
    $(document).on('click', '.updateName', function (e) {
        var e = e || window.e;
        e.stopPropagation();
        if (fId == undefined) {
            fId = 0
        }
        var name = $(this).parent().find('input').val();
        var obj = new Object();
        obj.fid = fId;
        obj.c_id = updateId;
        obj.c_name = name;
        //obj.c_state = updateState;
        obj.uid = u_id;
        obj.sid = s_id;
        var objs = JSON.stringify(obj);
        $.ajax({
            url: http + "updateClass",
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
                        //window.location.href = "categoryManagement.html"
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
    });
    //类目展开与收缩
    $(document).on('click', '.span2', function () {
        if ($(this).attr('data-fangxiang') == 0) {
            $(this).attr('src', 'images/select.png');
            $(this).parent().siblings('.btn').show();
            $(this).attr('data-fangxiang', 1);
            $(this).parent().parent().find('ul').show();
        } else {
            $(this).attr('src', 'images/right.png');
            $(this).parent().parent().find('ul').hide();
            $(this).parent().siblings('.btn').hide();
            $(this).attr('data-fangxiang', 0)
        }
    });
    //保存类目
    $(document).on('click', '.add', function () {
        var name = $(this).parent().find("input").val();
        if (name == "") {
            $(".mini").show();
            window.parent.showMask();
            $("#p2").html("请填写类目名称");
            $("#p3").click(function () {
                $(".mini").hide();
                window.parent.hideMask();
            });
            return;
        }
        var lev = $(this).prev().prev().html().split("级")[0];
        var obj = new Object();
        if (lev == "1") {
            obj.fid = 0;
            obj.c_lev = lev;
            obj.c_name = name;
            obj.uid = u_id;
            obj.sid = s_id;
        } else {
            obj.fid = fId;
            obj.c_lev = lev;
            obj.c_name = name;
            obj.c_rid = calssId;
            obj.uid = u_id;
            obj.sid = s_id;
        }
        var objs = JSON.stringify(obj);
        $.ajax({
            url: http + "addClass",
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
                        window.location.href = "categoryManagement.html"
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
    });
});
//保存修改后类目名称,状态
//    $(document).on('click', '.updateName', function () {
//        var name = $(this).parent().find("input").val();
//        var style = $(this).prev().find(".normal").attr("style");
//        var state = $(this).prev().find(".normal").html();
//        if (state == "正常") {
//            if (style == undefined) {
//                //state = $(this).prev().find(".normal").html();
//                if (state == "正常") {
//                    state = 1
//                } else {
//                    state = 2
//                }
//            }
//            if (style != undefined) {
//                if (style.indexOf("-") != -1) {
//                    state = 2;
//                } else {
//                    state = 1;
//                }
//            }
//        }else{
//            if (state == "正常") {
//                state = 1
//            } else {
//                state = 2
//            }
//            if (style != undefined) {
//                if (style.indexOf("-") != -1) {
//                    state = 1;
//                } else {
//                    state = 2;
//                }
//            }
//        }
//        //alert(style)
//        //alert(state)
//        //return;
//        if (name == "") {
//            $(".mini").show();
//            window.parent.showMask();
//            $("#p2").html("请填写类目名称");
//            $("#p3").click(function () {
//                $(".mini").hide();
//                window.parent.hideMask();
//            });
//            return;
//        }
//        if (fId == undefined) {
//            fId = 0;
//        }
//        var obj = new Object();
//        obj.c_id = updateId;
//        obj.fid = fId;
//        obj.c_name = name;
//        obj.uid = u_id;
//        obj.sid = s_id;
//        obj.c_state = state;
//        var objs = JSON.stringify(obj);
//        $.ajax({
//            url: http + "updateClass",
//            type: "post",
//            cache: false,
//            data: objs,
//            dataType: "json",
//            contentType: "application/json",
//            success: function (data) {
//                if (data.success == true) {
//                    $(".mini").show();
//                    window.parent.showMask();
//                    $("#p2").html(data.msg);
//                    $("#p3").click(function () {
//                        $(".mini").hide();
//                        window.parent.hideMask();
//                        window.location.href = "categoryManagement.html";
//                    });
//                } else {
//                    $(".mini").show();
//                    window.parent.showMask();
//                    $("#p2").html(data.msg);
//                    $("#p3").click(function () {
//                        $(".mini").hide();
//                        window.parent.hideMask();
//                        window.location.href = "categoryManagement.html";
//                    });
//
//                    return;
//                }
//            },
//            error: function (e) {
//                $(".mini").show();
//                window.parent.showMask();
//                $("#p2").html("未知错误");
//                $("#p3").click(function () {
//                    $(".mini").hide();
//                    window.parent.hideMask();
//                });
//            }
//        });
//    });
//});
//显示一级类目列表
function onload() {
    var obj = new Object();
    obj.c_lev = 1;
    obj.uid = u_id;
    obj.sid = s_id;
    var objs = JSON.stringify(obj);
    var str = '';
    $('#list').append(str);
    $.ajax({
        url: http + "queryClass",
        type: "post",
        cache: false,
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                for (var i = 0; i < data.object.length; i++) {
                    var normal;
                    var holdUp;
                    if (data.object[i].c_state == "1") {
                        normal = "正常";
                        holdUp = "挂起"
                    } else {
                        normal = "挂起";
                        holdUp = "正常"
                    }
                    str += "<li class='li'><span id=" + data.object[i].c_id + " onclick='getId(" + data.object[i].c_id + "," + data.object[i].c_lev + ")' style='width: 194px;margin-left: 50px;position: relative;'><img class='span2' data-fangxiang='0' src='images/right.png'/></span>" +
                        "<input class='classInput' type='text' value=" + data.object[i].c_name + ">" +
                            //"<span>" + data.object[i].c_name + "</span>" +
                        "<span>" + data.object[i].c_lev + "级类目</span>" +
                        "<span style='position: relative;'><div><span class='normal' dataId=" + data.object[i].c_id + ">" + normal + "</span><span dataId=" + data.object[i].c_id + " class='holdUp'>" + holdUp + "</span></div></span>" +
                        "<span style='width:70px;margin-left:62px;' class='updateName' onclick='updateName(" + data.object[i].c_id + "," + data.object[i].c_state + ")'>保存</span>" +
                        "<span class='del' onclick='del(" + data.object[i].c_id + ")'>删除</span><div class='app btn' data-num='2'>添加2级目录</div></li>"
                }
                $('#list').append(str);
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

//显示下级类目
function getId(id, lev) {
    if (lev == 1) {
        fId = id;
    }
    var upDown = $('#' + id).find("img").attr("data-fangxiang");
    if (upDown == "0") {
        calssId = id;
        lev = parseInt(lev) + 1;
        var obj = new Object();
        obj.c_lev = lev;
        obj.c_rid = calssId;
        obj.uid = u_id;
        obj.sid = s_id;
        var objs = JSON.stringify(obj);
        var str = '';
        $('#' + id).parent().find("ul").remove();
        $.ajax({
            url: http + "queryClass",
            type: "post",
            cache: false,
            data: objs,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.success == true) {
                    for (var i = 0; i < data.object.length; i++) {
                        var normal;
                        var holdUp;
                        if (data.object[i].c_state == "1") {
                            normal = "正常";
                            holdUp = "挂起"
                        } else {
                            normal = "挂起";
                            holdUp = "正常"
                        }
                        var num = data.object[i].c_lev;
                        str += "<ul><li class='li'><span id=" + data.object[i].c_id + " onclick='getId(" + data.object[i].c_id + "," + data.object[i].c_lev + ")' style='width: 194px;margin-left: 50px;position: relative;'><img style='left:" + num * 10 + "px' class='span2' data-fangxiang='0' src='images/right.png' alt=''/></span>" +
                            "<input class='classInput' type='text' value=" + data.object[i].c_name + ">" +
                                //"<span>" + data.object[i].c_name + "</span>" +
                            "<span>" + data.object[i].c_lev + "级目录</span>" +
                            "<span style='position: relative;'><div><span class='normal' dataId=" + data.object[i].c_id + ">" + normal + "</span><span dataId=" + data.object[i].c_id + " class='holdUp'>" + holdUp + "</span></div></span>" +
                            "<span class='updateName' style='width:70px;margin-left:62px;' onclick='updateName(" + data.object[i].c_id + "," + data.object[i].c_state + ")'>保存</span>" +
                            "<span class='del' onclick='del(" + data.object[i].c_id + ")'>删除</span><div class='app btn' data-num=" + (num + 1) + ">添加" + (num + 1) + "级目录</div></li></ul>"
                    }
                    $('#' + id).parent().find(".app").before(str);
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
}

//删除类目
function del(id) {
    if(confirm("确定要删除？")) {
        if (fId == undefined) {
            fId = 0
        }
        var obj = new Object();
        obj.c_id = id;
        obj.fid = fId;
        obj.uid = u_id;
        obj.sid = s_id;
        var objs = JSON.stringify(obj);
        $.ajax({
            url: http + "deleteClass",
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
                        window.location.href = "categoryManagement.html";
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
}

//修改类目名称
function updateName(id, state) {
    updateId = id;
    updateState = state;
}