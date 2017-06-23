/**
 * Created by KQ on 2016/12/15.
 */
var http = "https://www.railwaybaby.com/";
var u_id = sessionStorage.u_id;
var s_id = sessionStorage.s_id;
var calssId;
var classLev;
var cId;
$(function () {
    $("#userName").html(sessionStorage.name);
    onload();
    seller();
    //点击空白隐藏商品管理
    document.onclick = function () {
        window.parent.hideDiv();
    };
    //条件筛选
    $(".condition").click(function () {
        $(this).hide();
        $(".partThree").slideDown(150);
        $(".partFour").fadeIn(150);
        $(".partThree input").val("");
        //$(".mb").show();
        //window.parent.showMask();
    });
    //收起
    $(".partFour").click(function () {
        $(this).hide();
        $(".partThree").slideUp(150);
        $(".condition").fadeIn(150);
        //$(".mb").hide();
        //window.parent.hideMask();
    });
    //选取类目
    $("#class").click(function () {
        $(".mb").show();
        $(".allClass").show();
        var obj = new Object();
        obj.c_lev = 1;
        obj.uid = u_id;
        obj.sid = s_id;
        var objs = JSON.stringify(obj);
        var str = '';
        str = '<div class="qq"></div>';
        $('.allClass').find("div").remove();
        $('.allClass').append(str);
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
                        str = '<a onclick="getId(' + data.object[i].c_id + ',' + data.object[i].c_lev + ')">' + data.object[i].c_name + '</a>';
                        $('.qq').append(str);
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
    });
    $(document).on('click', '.qq>a', function (e) {
        var strName = $(this).html();
        $(this).parent().nextAll().remove();
        var obj = new Object();
        obj.c_lev = classLev;
        obj.c_rid = calssId;
        obj.uid = u_id;
        obj.sid = s_id;
        var objs = JSON.stringify(obj);
        var str = '';
        var str1 = '';
        str1 = '<div class="qq"></div>';
        $('.allClass').append(str1);
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
                        str = '<a onclick="getId(' + data.object[i].c_id + ',' + data.object[i].c_lev + ')">' + data.object[i].c_name + '</a>';
                        $('.allClass div:last-child').append(str);
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
                    var msg = data.object;
                    if (msg == null) {
                        cId = calssId;
                        $('.allClass div:last-child').remove();
                        $("#class").val(strName);
                        $(".mb").hide();
                        $(".allClass").hide();
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
    });
    //点击li背景色
    $(".list li").click(function () {
        $(this).addClass("clickLi").siblings().removeClass("clickLi");
        window.location.href = "commodityMsg.html";
    });
    $(".add").click(function () {
        window.location.href = "addCommodity.html";
    });
    //输入框搜索
    $(".find").click(function () {
        var i_name = $("#name").val();
        //if(i_name==""){
        //    onload();
        //}
        var obj = new Object();
        obj.i_state = 1;
        obj.uid = u_id;
        obj.sid = s_id;
        obj.i_name = i_name;
        obj.start = 1;
        var objs = JSON.stringify(obj);
        var str = '';
        $("#list").html(str);
        $.ajax({
            url: http + "queryInfo",
            type: "POST",
            data: objs,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.success == true) {
                    for (var i = 0; i < data.object.length; i++) {
                        str += '<li name=' + data.object[i].i_id + '><div class="partContent"><div class="img"><img src=' + data.object[i].i_cover + '></div>' +
                            '<div class="storeName">' + data.object[i].i_id + '</div><div class="storeNames">' + data.object[i].i_name + '</div><div>' + data.object[i].c_name + '</div><div>' + data.object[i].s_name + '</div></div></li>'
                    }
                    $("#list").append(str);
                    //查看详情
                    $("#list li").click(function () {
                        var iId = $(this).attr('name');
                        window.location.href = "addCommodity.html?id=" + iId;
                    })
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
                $(".tcdPageCode").remove();
                var pageStr='';
                pageStr='<div class="tcdPageCode"></div>';
                $(".content").append(pageStr);
                var pageCourt=data.totalpage;
                $(".tcdPageCode").createPage({
                    pageCount: pageCourt,
                    current: 1,
                    backFn: function (p) {
                        var str='';
                        $("#list").html("");
                        $.ajax({
                            url: http + "queryInfo",
                            type: "POST",
                            data: JSON.stringify({"uid": u_id, "sid": s_id, "start": p,"i_state":1,"i_name":i_name}),
                            dataType: "json",
                            contentType: "application/json",
                            success: function (data) {
                                if (data.success == true) {
                                    for (var i = 0; i < data.object.length; i++) {
                                        str += '<li name=' + data.object[i].i_id + '><div class="partContent"><div class="img"><img src=' + data.object[i].i_cover + '></div>' +
                                            '<div class="storeName">' + data.object[i].i_id + '</div><div class="storeNames">' + data.object[i].i_name + '</div><div>' + data.object[i].c_name + '</div><div>' + data.object[i].s_name + '</div></div></li>'
                                    }
                                    $("#list").append(str);
                                    //查看详情
                                    $("#list li").click(function () {
                                        var iId = $(this).attr('name');
                                        window.location.href = "addCommodity.html?id=" + iId;
                                    })
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
                            }
                        })
                    }
                })
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
    //下拉框搜索
    $(".searchBtn").click(function () {
        var s_name = $("#seller").val();
        var i_name = $("#i_name").val();
        var c_id = cId;
        var obj = new Object();
        if (s_name != "") {
            obj.s_name = s_name;
        }
        obj.i_state = 1;
        obj.start = 1;
        obj.uid = u_id;
        obj.sid = s_id;
        if (i_name != "") {
            obj.i_name = i_name;
        }
        if (c_id != "") {
            obj.c_id = c_id;
        }
        var objs = JSON.stringify(obj);
        var str = '';
        $("#list").html(str);
        $.ajax({
            url: http + "queryInfo",
            type: "POST",
            data: objs,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.success == true) {
                    for (var i = 0; i < data.object.length; i++) {
                        str += '<li name=' + data.object[i].i_id + '><div class="partContent"><div class="img"><img src=' + data.object[i].i_cover + '></div>' +
                            '<div class="storeName">' + data.object[i].i_id + '</div><div class="storeNames">' + data.object[i].i_name + '</div><div>' + data.object[i].c_name + '</div><div>' + data.object[i].s_name + '</div></div></li>'
                    }
                    $("#list").append(str);
                    //查看详情
                    $("#list li").click(function () {
                        var iId = $(this).attr('name');
                        window.location.href = "addCommodity.html?id=" + iId;
                    })
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
                $(".tcdPageCode").remove();
                var pageStr='';
                pageStr='<div class="tcdPageCode"></div>';
                $(".content").append(pageStr);
                var pageCourt=data.totalpage;
                $(".tcdPageCode").createPage({
                    pageCount: pageCourt,
                    current: 1,
                    backFn: function (p) {
                        var str='';
                        $("#list").html("");
                        $.ajax({
                            url: http + "queryInfo",
                            type: "POST",
                            data: JSON.stringify({"uid": u_id, "sid": s_id, "start": p,"i_state":1,"i_name":i_name,"c_id":c_id,"s_name":s_name}),
                            dataType: "json",
                            contentType: "application/json",
                            success: function (data) {
                                if (data.success == true) {
                                    for (var i = 0; i < data.object.length; i++) {
                                        str += '<li name=' + data.object[i].i_id + '><div class="partContent"><div class="img"><img src=' + data.object[i].i_cover + '></div>' +
                                            '<div class="storeName">' + data.object[i].i_id + '</div><div class="storeNames">' + data.object[i].i_name + '</div><div>' + data.object[i].c_name + '</div><div>' + data.object[i].s_name + '</div></div></li>'
                                    }
                                    $("#list").append(str);
                                    //查看详情
                                    $("#list li").click(function () {
                                        var iId = $(this).attr('name');
                                        window.location.href = "addCommodity.html?id=" + iId;
                                    })
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
                            }
                        })
                    }
                })
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
    $(".close").click(function () {
        $(".mb").hide();
        $(".allClass").hide();
    })
});
function onload() {
    var obj = new Object();
    obj.i_state = 1;
    obj.uid = u_id;
    obj.sid = s_id;
    obj.start = 1;
    var objs = JSON.stringify(obj);
    var str = '';
    $.ajax({
        url: http + "queryInfo",
        type: "POST",
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                for (var i = 0; i < data.object.length; i++) {
                    str += '<li name=' + data.object[i].i_id + '><div class="partContent"><div class="img"><img src=' + data.object[i].i_cover + '></div>' +
                        '<div class="storeName">' + data.object[i].i_id + '</div><div class="storeNames">' + data.object[i].i_name + '</div><div>' + data.object[i].c_name + '</div><div>' + data.object[i].s_name + '</div></div></li>'
                }
                $("#list").append(str);
                //查看详情
                $("#list li").click(function () {
                    var iId = $(this).attr('name');
                    window.location.href = "addCommodity.html?id=" + iId;
                })
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
            var pageCourt=data.totalpage;
            $(".tcdPageCode").createPage({
                pageCount: pageCourt,
                current: 1,
                backFn: function (p) {
                    var str='';
                    $("#list").html("");
                    $.ajax({
                        url: http + "queryInfo",
                        type: "POST",
                        data: JSON.stringify({"uid": u_id, "sid": s_id, "start": p,"i_state":1}),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {
                            if (data.success == true) {
                                for (var i = 0; i < data.object.length; i++) {
                                    str += '<li name=' + data.object[i].i_id + '><div class="partContent"><div class="img"><img src=' + data.object[i].i_cover + '></div>' +
                                        '<div class="storeName">' + data.object[i].i_id + '</div><div class="storeNames">' + data.object[i].i_name + '</div><div>' + data.object[i].c_name + '</div><div>' + data.object[i].s_name + '</div></div></li>'
                                }
                                $("#list").append(str);
                                //查看详情
                                $("#list li").click(function () {
                                    var iId = $(this).attr('name');
                                    window.location.href = "addCommodity.html?id=" + iId;
                                })
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
                        }
                    })
                }
            })
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
//获取卖家
function seller() {
    var obj = new Object();
    obj.i_state = 1;
    obj.uid = u_id;
    obj.sid = s_id;
    var objs = JSON.stringify(obj);
    var str = '';
    var strs = '';
    $("#seller").html(str);
    strs = '<option></option>'
    $.ajax({
        url: http + "querySellers",
        type: "POST",
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                for (var i = 0; i < data.object.length; i++) {
                    str += '<option value=' + data.object[i].s_name + '>' + data.object[i].s_name + '</option>';
                }
                str = strs + str;
                $("#seller").append(str);
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
//查询下级类目
function getId(id, lev) {
    calssId = id;
    lev = parseInt(lev) + 1;
    classLev = lev;
}
