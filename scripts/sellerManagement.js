/**
 * Created by KQ on 2016/12/20.
 */
var http = "https://www.railwaybaby.com/";
var u_id = sessionStorage.u_id;
var s_id = sessionStorage.s_id;
$(function () {
    $("#userName").html(sessionStorage.name);
    onload();
    $(".addSeller").click(function () {
        window.location.href = "sellerMsg.html";
    });
    //搜索
    $("#find").click(function () {
        var name = $("#orderNum").val();
        //if(name==""){
        //    onload();
        //}
        var str = "";
        var state = "";
        $(".list-min").html(str);
        var obj = new Object();
        obj.uid = u_id;
        obj.sid = s_id;
        obj.start = 1;
        obj.s_name = name;
        var objs = JSON.stringify(obj);
        $.ajax({
            url: http + "querySellers",
            type: "POST",
            data: objs,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.success == true) {
                    for (var i = 0; i < data.object.length; i++) {
                        if (data.object[i].s_state == "1") {
                            data.object[i].s_state = "正常";
                            state = "挂起";

                        } else {
                            data.object[i].s_state = "挂起";
                            state = "正常";
                        }
                        str += '<ul onclick="lookMsg(' + data.object[i].s_id + ')" class="list-ul"><li style="width: 15%"></li>' +
                            '<li style="width: 10%">' + data.object[i].s_id + '</li>' +
                            '<li style="width: 55%">' + data.object[i].s_name + '</li>' +
                            '<li class="li1">' +
                            '<div><span class="normal">' + data.object[i].s_state + '</span>' +
                            '<span class="holdUp">' + state + '</span> </div> ' +
                            '</li> </ul>'
                    }
                    $(".list-min").append(str);
                    $(".list-ul").on('click', function () {
                        $(this).addClass('active').siblings().removeClass('active');
                    });
                    //修改卖家状态
                    $(".normal").on('click', function (e) {
                        if(confirm("确定修改其状态？")) {
                            var State = 1;
                            var seller = $(this).parent().parent().siblings().eq(1).html();
                            if ($(this).html() == "挂起") {
                                State = 1;
                            } else {
                                State = 2;
                            }
                            var e = e || window.e;
                            e.stopPropagation();
                            $(this).animate({left: '-35px'}, 100, function () {
                                $(this).siblings('.holdUp').animate({left: '0'}, 100)
                            });
                            var sellerState = new Object();
                            sellerState.s_state = State;
                            sellerState.s_id = seller;
                            sellerState.uid = u_id;
                            sellerState.sid = s_id;
                            var update = JSON.stringify(sellerState);
                            $.ajax({
                                url: http + "updateSeller",
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
                                        onload();
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
                    $(".holdUp").on('click', function (e) {
                        if(confirm("确定修改其状态？")) {
                            var seller = $(this).parent().parent().siblings().eq(1).html();
                            var State = 1;
                            if ($(this).html() == "挂起") {
                                State = 1;
                            } else {
                                State = 2;
                            }
                            var e = e || window.e;
                            e.stopPropagation();
                            $(this).animate({left: '35px'}, 100, function () {
                                $(this).siblings('.normal').animate({left: '0'}, 100)
                            });
                            var sellerState = new Object();
                            sellerState.s_state = State;
                            sellerState.s_id = seller;
                            sellerState.uid = u_id;
                            sellerState.sid = s_id;
                            var update = JSON.stringify(sellerState);
                            $.ajax({
                                url: http + "updateSeller",
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
                    $(".tcdPageCode").remove();
                    var pageStr='';
                    pageStr='<div class="tcdPageCode"></div>';
                    $(".container").append(pageStr);
                    var pageCourt=data.totalpage;
                    $(".tcdPageCode").createPage({
                        pageCount: pageCourt,
                        current: 1,
                        backFn: function (p) {
                            var str = "";
                            var state = "";
                            $(".list-min").html(str);
                            $.ajax({
                                url: http + "querySellers",
                                type: "POST",
                                data: JSON.stringify({"uid":u_id,"sid":s_id,"start":p,"s_name":name}),
                                dataType: "json",
                                contentType: "application/json",
                                success: function (data) {
                                    for (var i = 0; i < data.object.length; i++) {
                                        if (data.object[i].s_state == "1") {
                                            data.object[i].s_state = "正常";
                                            state = "挂起";

                                        } else {
                                            data.object[i].s_state = "挂起";
                                            state = "正常";
                                        }
                                        str += '<ul onclick="lookMsg(' + data.object[i].s_id + ')" class="list-ul"><li style="width: 15%"></li>' +
                                            '<li style="width: 10%">' + data.object[i].s_id + '</li>' +
                                            '<li style="width: 55%">' + data.object[i].s_name + '</li>' +
                                            '<li class="li1">' +
                                            '<div><span class="normal">' + data.object[i].s_state + '</span>' +
                                            '<span class="holdUp">' + state + '</span> </div> ' +
                                            '</li> </ul>'
                                    }
                                    $(".list-min").append(str);
                                    $(".list-ul").on('click', function () {
                                        $(this).addClass('active').siblings().removeClass('active');
                                    });
                                    //修改卖家状态
                                    $(".normal").on('click', function (e) {
                                        if(confirm("确定修改其状态？")) {
                                            var State = 1;
                                            var seller = $(this).parent().parent().siblings().eq(1).html();
                                            if ($(this).html() == "挂起") {
                                                State = 1;
                                            } else {
                                                State = 2;
                                            }
                                            var e = e || window.e;
                                            e.stopPropagation();
                                            $(this).animate({left: '-35px'}, 100, function () {
                                                $(this).siblings('.holdUp').animate({left: '0'}, 100)
                                            });
                                            var sellerState = new Object();
                                            sellerState.s_state = State;
                                            sellerState.s_id = seller;
                                            sellerState.uid = u_id;
                                            sellerState.sid = s_id;
                                            var update = JSON.stringify(sellerState);
                                            $.ajax({
                                                url: http + "updateSeller",
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
                                                        onload();
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
                                    $(".holdUp").on('click', function (e) {
                                        if(confirm("确定修改其状态？")) {
                                            var seller = $(this).parent().parent().siblings().eq(1).html();
                                            var State = 1;
                                            if ($(this).html() == "挂起") {
                                                State = 1;
                                            } else {
                                                State = 2;
                                            }
                                            var e = e || window.e;
                                            e.stopPropagation();
                                            $(this).animate({left: '35px'}, 100, function () {
                                                $(this).siblings('.normal').animate({left: '0'}, 100)
                                            });
                                            var sellerState = new Object();
                                            sellerState.s_state = State;
                                            sellerState.s_id = seller;
                                            sellerState.uid = u_id;
                                            sellerState.sid = s_id;
                                            var update = JSON.stringify(sellerState);
                                            $.ajax({
                                                url: http + "updateSeller",
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
                                }
                            })
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
                    //alert("查询失败");
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
    })
});
//卖家列表
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
        url: http + "querySellers",
        type: "POST",
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                for (var i = 0; i < data.object.length; i++) {
                    if (data.object[i].s_state == "1") {
                        data.object[i].s_state = "正常";
                        state = "挂起";

                    } else {
                        data.object[i].s_state = "挂起";
                        state = "正常";
                    }
                    str += '<ul onclick="lookMsg(' + data.object[i].s_id + ')" class="list-ul"><li style="width: 15%"></li>' +
                        '<li style="width: 10%">' + data.object[i].s_id + '</li>' +
                        '<li style="width: 55%">' + data.object[i].s_name + '</li>' +
                        '<li class="li1">' +
                        '<div><span class="normal">' + data.object[i].s_state + '</span>' +
                        '<span class="holdUp">' + state + '</span> </div> ' +
                        '</li> </ul>'
                }
                $(".list-min").append(str);
                $(".list-ul").on('click', function () {
                    $(this).addClass('active').siblings().removeClass('active');
                });
                //修改卖家状态
                $(".normal").on('click', function (e) {
                    if(confirm("确定修改其状态？")) {
                        var State = 1;
                        var seller = $(this).parent().parent().siblings().eq(1).html();
                        if ($(this).html() == "挂起") {
                            State = 1;
                        } else {
                            State = 2;
                        }
                        var e = e || window.e;
                        e.stopPropagation();
                        $(this).animate({left: '-35px'}, 100, function () {
                            $(this).siblings('.holdUp').animate({left: '0'}, 100)
                        });
                        var sellerState = new Object();
                        sellerState.s_state = State;
                        sellerState.s_id = seller;
                        sellerState.uid = u_id;
                        sellerState.sid = s_id;
                        var update = JSON.stringify(sellerState);
                        $.ajax({
                            url: http + "updateSeller",
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
                                    onload();
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
                $(".holdUp").on('click', function (e) {
                    if(confirm("确定修改其状态？")) {
                        var seller = $(this).parent().parent().siblings().eq(1).html();
                        var State = 1;
                        if ($(this).html() == "挂起") {
                            State = 1;
                        } else {
                            State = 2;
                        }
                        var e = e || window.e;
                        e.stopPropagation();
                        $(this).animate({left: '35px'}, 100, function () {
                            $(this).siblings('.normal').animate({left: '0'}, 100)
                        });
                        var sellerState = new Object();
                        sellerState.s_state = State;
                        sellerState.s_id = seller;
                        sellerState.uid = u_id;
                        sellerState.sid = s_id;
                        var update = JSON.stringify(sellerState);
                        $.ajax({
                            url: http + "updateSeller",
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
                //$(".tcdPageCode").remove();
                //var pageStr='';
                //pageStr='<div class="tcdPageCode"></div>';
                //$(".list").append(pageStr);
                var pageCourt=data.totalpage;
                $(".tcdPageCode").createPage({
                    pageCount: pageCourt,
                    current: 1,
                    backFn: function (p) {
                        var str = "";
                        var state = "";
                        $(".list-min").html(str);
                        $.ajax({
                            url: http + "querySellers",
                            type: "POST",
                            data: JSON.stringify({"uid":u_id,"sid":s_id,"start":p}),
                            dataType: "json",
                            contentType: "application/json",
                            success: function (data) {
                                for (var i = 0; i < data.object.length; i++) {
                                    if (data.object[i].s_state == "1") {
                                        data.object[i].s_state = "正常";
                                        state = "挂起";

                                    } else {
                                        data.object[i].s_state = "挂起";
                                        state = "正常";
                                    }
                                    str += '<ul onclick="lookMsg(' + data.object[i].s_id + ')" class="list-ul"><li style="width: 15%"></li>' +
                                        '<li style="width: 10%">' + data.object[i].s_id + '</li>' +
                                        '<li style="width: 55%">' + data.object[i].s_name + '</li>' +
                                        '<li class="li1">' +
                                        '<div><span class="normal">' + data.object[i].s_state + '</span>' +
                                        '<span class="holdUp">' + state + '</span> </div> ' +
                                        '</li> </ul>'
                                }
                                $(".list-min").append(str);
                                $(".list-ul").on('click', function () {
                                    $(this).addClass('active').siblings().removeClass('active');
                                });
                                //修改卖家状态
                                $(".normal").on('click', function (e) {
                                    if(confirm("确定修改其状态？")) {
                                        var State = 1;
                                        var seller = $(this).parent().parent().siblings().eq(1).html();
                                        if ($(this).html() == "挂起") {
                                            State = 1;
                                        } else {
                                            State = 2;
                                        }
                                        var e = e || window.e;
                                        e.stopPropagation();
                                        $(this).animate({left: '-35px'}, 100, function () {
                                            $(this).siblings('.holdUp').animate({left: '0'}, 100)
                                        });
                                        var sellerState = new Object();
                                        sellerState.s_state = State;
                                        sellerState.s_id = seller;
                                        sellerState.uid = u_id;
                                        sellerState.sid = s_id;
                                        var update = JSON.stringify(sellerState);
                                        $.ajax({
                                            url: http + "updateSeller",
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
                                                    onload();
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
                                $(".holdUp").on('click', function (e) {
                                    if(confirm("确定修改其状态？")) {
                                        var seller = $(this).parent().parent().siblings().eq(1).html();
                                        var State = 1;
                                        if ($(this).html() == "挂起") {
                                            State = 1;
                                        } else {
                                            State = 2;
                                        }
                                        var e = e || window.e;
                                        e.stopPropagation();
                                        $(this).animate({left: '35px'}, 100, function () {
                                            $(this).siblings('.normal').animate({left: '0'}, 100)
                                        });
                                        var sellerState = new Object();
                                        sellerState.s_state = State;
                                        sellerState.s_id = seller;
                                        sellerState.uid = u_id;
                                        sellerState.sid = s_id;
                                        var update = JSON.stringify(sellerState);
                                        $.ajax({
                                            url: http + "updateSeller",
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
                            }
                        })
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
                //alert("查询失败");
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
//查看详细信息
function lookMsg(id) {
    window.location.href = "sellerMsg.html?id=" + id;
}