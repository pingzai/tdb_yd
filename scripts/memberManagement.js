var u_id = sessionStorage.u_id;

var s_id = sessionStorage.s_id;
var http="https://www.railwaybaby.com/";
var mId;
$(function () {
    onload();
    $("#userName").html(sessionStorage.name);
    //$(document).on('click', '.normal', function (e) {
    //    var e = e || window.e;
    //    e.stopPropagation();
    //    $('#list').hide().next().hide();
    //    $('#list').show();
    //    $(this).animate({left: '-35px'}, 100, function () {
    //        $(this).siblings('.holdUp').animate({left: '0'}, 100)
    //    });
    //    var State = 1;
    //    if ($(this).html() == "正常") {
    //        State = 2;
    //    } else {
    //        State = 1;
    //    }
    //    //var sellerState = new Object();
    //    //sellerState.a_state = State;
    //    //sellerState.a_id = aId;
    //    //sellerState.uid = u_id;
    //    //sellerState.sid = s_id;
    //    //var update = JSON.stringify(sellerState);
    //    //$.ajax({
    //    //    url: http + "updateAdmin",
    //    //    type: "POST",
    //    //    data: update,
    //    //    dataType: "json",
    //    //    contentType: "application/json",
    //    //    success: function (data) {
    //    //        if (data.success == true) {
    //    //            //onload();
    //    //        } else {
    //    //            if (data.state == 1) {
    //    //                $(".mini").show();
    //    //                window.parent.showMask();
    //    //                $("#p2").html(data.msg);
    //    //                $("#p3").click(function () {
    //    //                    $(".mini").hide();
    //    //                    window.parent.hideMask();
    //    //                    window.parent.login();
    //    //                });
    //    //                return;
    //    //            }
    //    //            $(".mini").show();
    //    //            window.parent.showMask();
    //    //            $("#p2").html(data.msg);
    //    //            $("#p3").click(function () {
    //    //                $(".mini").hide();
    //    //                window.parent.hideMask();
    //    //            });
    //    //            return;
    //    //        }
    //    //    },
    //    //    error: function (e) {
    //    //        $(".mini").show();
    //    //        window.parent.showMask();
    //    //        $("#p2").html("未知错误");
    //    //        $("#p3").click(function () {
    //    //            $(".mini").hide();
    //    //            window.parent.hideMask();
    //    //        });
    //    //    }
    //    //});
    //});
    //$(document).on('click', '.holdUp', function (e) {
    //    var e = e || window.e;
    //    e.stopPropagation();
    //    $('#list').hide().next().hide();
    //    $('#list').show();
    //    $(this).animate({left: '35px'}, 200, function () {
    //        $(this).siblings('.normal').animate({left: '0'}, 100)
    //    });
    //    var State = 1;
    //    if ($(this).html() == "正常") {
    //        State = 2;
    //    } else {
    //        State = 1;
    //    }
    //    //var sellerState = new Object();
    //    //sellerState.a_state = State;
    //    //sellerState.a_id = aId;
    //    //sellerState.uid = u_id;
    //    //sellerState.sid = s_id;
    //    //var update = JSON.stringify(sellerState);
    //
    //    //$.ajax({
    //    //    url: http + "updateAdmin",
    //    //    type: "POST",
    //    //    data: update,
    //    //    dataType: "json",
    //    //    contentType: "application/json",
    //    //    success: function (data) {
    //    //        if (data.success == true) {
    //    //            //onload();
    //    //        } else {
    //    //            if (data.state == 1) {
    //    //                $(".mini").show();
    //    //                window.parent.showMask();
    //    //                $("#p2").html(data.msg);
    //    //                $("#p3").click(function () {
    //    //                    $(".mini").hide();
    //    //                    window.parent.hideMask();
    //    //                    window.parent.login();
    //    //                });
    //    //                return;
    //    //            }
    //    //            $(".mini").show();
    //    //            window.parent.showMask();
    //    //            $("#p2").html(data.msg);
    //    //            $("#p3").click(function () {
    //    //                $(".mini").hide();
    //    //                window.parent.hideMask();
    //    //            });
    //    //            return;
    //    //        }
    //    //    },
    //    //    error: function (e) {
    //    //        $(".mini").show();
    //    //        window.parent.showMask();
    //    //        $("#p2").html("未知错误");
    //    //        $("#p3").click(function () {
    //    //            $(".mini").hide();
    //    //            window.parent.hideMask();
    //    //        });
    //    //    }
    //    //});
    //});

    //搜索
    $("#searchMember").click(function(){
        var member=$("#search").val();
        var obj = new Object();
        obj.uid = u_id;
        obj.sid = s_id;
        obj.start = 1;
        obj.u_name = member;
        var objs = JSON.stringify(obj);
        var str = "";
        var state = "";
        $(".list-min").html(str);
        $.ajax({
            url: http + "queryAllUser",
            type: "POST",
            data: objs,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.success == true) {
                    for (var i = 0; i < data.object.length; i++) {
                        if (data.object[i].u_state == "1") {
                            data.object[i].u_state = "正常";
                            state = "挂起";

                        } else {
                            data.object[i].u_state = "挂起";
                            state = "正常";
                        }
                        str+=' <ul onclick="msg(' + data.object[i].u_id+')"  class="list-ul"><li>' + data.object[i].u_id + '</li>' +
                            '<li>' + data.object[i].u_name + '</li><li>' + data.object[i].u_phone + '</li><li>' + data.object[i].points + '</li>' +
                            '<li class="li1"><div><span class="normal">' + data.object[i].u_state + '</span> <span class="holdUp">'+ state + '</span> </div>' +
                            ' </li> </ul>'
                    }
                    $(".list-min").append(str);
                    $(".list-ul").on('click', function () {
                        $(this).addClass('active').siblings().removeClass('active');
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
                $("#list").append(pageStr);
                var pageCourt=data.totalpage;
                $(".tcdPageCode").createPage({
                    pageCount: pageCourt,
                    current: 1,
                    backFn: function (p) {
                        var str = "";
                        var state = "";
                        $.ajax({
                            url: http + "queryAllUser",
                            type: "POST",
                            data: JSON.stringify({"uid": u_id, "sid": s_id, "start": p,"u_name":member}),
                            dataType: "json",
                            contentType: "application/json",
                            success: function (data) {
                                if (data.success == true) {
                                    $(".list-min").html("");
                                    for (var i = 0; i < data.object.length; i++) {
                                        if (data.object[i].u_state == "1") {
                                            data.object[i].u_state = "正常";
                                            state = "挂起";

                                        } else {
                                            data.object[i].u_state = "挂起";
                                            state = "正常";
                                        }
                                        str += ' <ul onclick="msg(' + data.object[i].u_id + ')"  class="list-ul"><li>' + data.object[i].u_id + '</li>' +
                                            '<li>' + data.object[i].u_name + '</li><li>' + data.object[i].u_phone + '</li><li>' + data.object[i].points + '</li>' +
                                            '<li class="li1"><div><span class="normal">' + data.object[i].u_state + '</span> <span class="holdUp">' + state + '</span> </div>' +
                                            ' </li> </ul>'
                                    }
                                    $(".list-min").append(str);
                                    $(".list-ul").on('click', function () {
                                        $(this).addClass('active').siblings().removeClass('active');
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
        })

    })
});
//会员列表
function onload() {
    var obj = new Object();
    obj.uid = u_id;
    obj.sid = s_id;
    obj.start = 1;
    var objs = JSON.stringify(obj);
    var str = "";
    var state = "";
    $(".list-min").html(str);
    $.ajax({
        url: http + "queryAllUser",
        type: "POST",
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                for (var i = 0; i < data.object.length; i++) {
                    if (data.object[i].u_state == "1") {
                        data.object[i].u_state = "正常";
                        state = "挂起";

                    } else {
                        data.object[i].u_state = "挂起";
                        state = "正常";
                    }
                    str+=' <ul onclick="msg(' + data.object[i].u_id+')"  class="list-ul"><li>' + data.object[i].u_id + '</li>' +
                        '<li>' + data.object[i].u_name + '</li><li>' + data.object[i].u_phone + '</li><li>' + data.object[i].points + '</li>' +
                        '<li class="li1"><div><span class="normal">' + data.object[i].u_state + '</span> <span class="holdUp">'+ state + '</span> </div>' +
                        ' </li> </ul>'
                }
                $(".list-min").append(str);
                $(".list-ul").on('click', function () {
                    $(this).addClass('active').siblings().removeClass('active');
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
                    var str = "";
                    var state = "";
                    $.ajax({
                        url: http + "queryAllUser",
                        type: "POST",
                        data: JSON.stringify({"uid": u_id, "sid": s_id, "start": p}),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {
                            if (data.success == true) {
                                $(".list-min").html("");
                                for (var i = 0; i < data.object.length; i++) {
                                    if (data.object[i].u_state == "1") {
                                        data.object[i].u_state = "正常";
                                        state = "挂起";

                                    } else {
                                        data.object[i].u_state = "挂起";
                                        state = "正常";
                                    }
                                    str += ' <ul onclick="msg(' + data.object[i].u_id + ')"  class="list-ul"><li>' + data.object[i].u_id + '</li>' +
                                        '<li>' + data.object[i].u_name + '</li><li>' + data.object[i].u_phone + '</li><li>' + data.object[i].points + '</li>' +
                                        '<li class="li1"><div><span class="normal">' + data.object[i].u_state + '</span> <span class="holdUp">' + state + '</span> </div>' +
                                        ' </li> </ul>'
                                }
                                $(".list-min").append(str);
                                $(".list-ul").on('click', function () {
                                    $(this).addClass('active').siblings().removeClass('active');
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
    })
}
//查看订单详情
function msg(id) {
    window.location.href = "memberInfomation.html?id=" + id;
}