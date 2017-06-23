/**
 * Created by KQ on 2016/12/20.
 */
var http = "https://www.railwaybaby.com/";
var aId;
var thirdId;
var fourId;
var ProvinceId;
var ThirdId;
var u_id = sessionStorage.u_id;
var s_id = sessionStorage.s_id;
$(function () {
    $("#userName").html(sessionStorage.name);
    onload();
    //添加二级城市
    $("#second").click(function () {
        var str = '';
        str = '<li><input type="text"><div class="pic">' +
            '<span class="right"><img src="images/Determine.png"></span>' +
            '<span class="error"><img src="images/X.png"></span>' +
            '</div> </li>';
        $("#province").append(str);
        $("#province li").click(function () {
            $(this).find("span").show();
            $(this).siblings().find('span').hide();
        });
        //确认添加
        $(".right").click(function () {
            var aName = $(this).parent().parent().find("input").val();
            if (aName == "") {
                //alert("请填写信息");
                $(".mini").show();
                window.parent.showMask();
                $("#p2").html("请填写信息");
                $("#p3").click(function () {
                    $(".mini").hide();
                    window.parent.hideMask();
                });
                return;
            }
            var obj = new Object();
            obj.a_rid = aId;
            obj.a_lev = 2;
            obj.a_name = aName;
            obj.uid = u_id;
            obj.sid = s_id;
            var objs = JSON.stringify(obj);
            $.ajax({
                url: http + "addArea",
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
                        //局部刷新
                        var obj = new Object();
                        obj.a_rid = aId;
                        obj.a_lev = 2;
                        obj.uid = u_id;
                        obj.sid = s_id;
                        var objs = JSON.stringify(obj);
                        var str = '';
                        $("#province").html(str);
                        $.ajax({
                            url: http + "queryArea",
                            type: "POST",
                            data: objs,
                            dataType: "json",
                            contentType: "application/json",
                            success: function (data) {
                                if (data.success == true) {
                                    $(".province").show();
                                    for (var i = 0; i < data.object.length; i++) {
                                        str += '<li>' + data.object[i].a_name + '<div class="pic">' +
                                            '<span class="one" onclick="lookCity(' + data.object[i].a_id + ')"><img src="images/sub.png"></span>' +
                                            '<span class="two" onclick="updateProvince(' + data.object[i].a_id + ',' + data.object[i].a_state + ')"><input type="hidden" value=' + data.object[i].a_state + '><img src="images/Hang.png"></span>' +
                                            ' <span class="three" onclick="delSecond(' + data.object[i].a_id + ')"><img src="images/X.png"></span> ' +
                                            '</div> </li>';
                                    }
                                    $("#province").append(str);
                                    $("#province li").each(function () {
                                        var htmls = $(this).html();
                                        htmls = htmls.replace(/[^\u4e00-\u9fa5]/gi, "");
                                        if (htmls.length > 5 && htmls.length < 9) {
                                            $(this).css("font-size", "11px");
                                        }
                                        if (htmls.length > 8) {
                                            $(this).css("font-size", "8px");
                                        }
                                    });
                                    $("#province li input[type=hidden]").each(function () {
                                        if ($(this).val() == "2") {
                                            $(this).next().attr('src', 'images/normal.png');
                                            $(this).parent().parent().parent().css('background', '#e6e6e6');
                                            $(this).parent().parent().parent().css('border', '1px solid #333')
                                        }
                                    });
                                    $("#province li").click(function () {
                                        $(this).removeClass('clickDiv');
                                        $(this).siblings().addClass('clickDiv');
                                        $(this).find("span").show();
                                        $(this).siblings().find('span').hide();
                                    })
                                } else {
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
                        $(this).parent().parent().remove();
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
        });
        //取消添加
        $(".error").click(function () {
            $(this).parent().parent().remove();
        });

    });
    //添加三级城市
    $("#third").click(function () {
        var str = '';
        str = '<li><input type="text"><div class="pic">' +
            '<span class="rights"><img src="images/Determine.png"></span>' +
            '<span class="errors"><img src="images/X.png"></span>' +
            '</div> </li>';
        $("#city").append(str);
        $("#city li").click(function () {
            $(this).find("span").show();
            $(this).siblings().find('span').hide();
        });
        //确认添加
        $(".rights").click(function () {
            var aName = $(this).parent().parent().find("input").val();
            if (aName == "") {
                $(".mini").show();
                window.parent.showMask();
                $("#p2").html("请填写信息");
                $("#p3").click(function () {
                    $(".mini").hide();
                    window.parent.hideMask();
                });
                return;
            }
            var obj = new Object();
            obj.a_rid = thirdId;
            obj.a_lev = 3;
            obj.a_name = aName;
            obj.uid = u_id;
            obj.sid = s_id;
            var objs = JSON.stringify(obj);
            $.ajax({
                url: http + "addArea",
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
                        //局部刷新
                        var obj = new Object();
                        obj.a_rid = thirdId;
                        obj.a_lev = 3;
                        obj.uid = u_id;
                        obj.sid = s_id;
                        var objs = JSON.stringify(obj);
                        var str = '';
                        $("#city").html(str);
                        $.ajax({
                            url: http + "queryArea",
                            type: "POST",
                            data: objs,
                            dataType: "json",
                            contentType: "application/json",
                            success: function (data) {
                                if (data.success == true) {
                                    for (var i = 0; i < data.object.length; i++) {
                                        str += '<li>' + data.object[i].a_name + '<div class="pic">' +
                                            '<span class="twos" onclick="updateThird(' + data.object[i].a_id + ',' + data.object[i].a_state + ')"><input type="hidden" value=' + data.object[i].a_state + '><img src="images/Hang.png"></span>' +
                                            ' <span class="threes" onclick="delThird(' + data.object[i].a_id + ')"><img src="images/X.png"></span> ' +
                                            '</div> </li>';
                                    }
                                    $("#city").append(str);
                                    $("#city li").each(function () {
                                        var htmls = $(this).html();
                                        htmls = htmls.replace(/[^\u4e00-\u9fa5]/gi, "");
                                        if (htmls.length > 5 && htmls.length < 9) {
                                            $(this).css("font-size", "11px");
                                        }
                                        if (htmls.length > 8) {
                                            $(this).css("font-size", "8px");
                                        }
                                    });
                                    $("#city li input").each(function () {
                                        if ($(this).val() == "2") {
                                            $(this).next().attr('src', 'images/normal.png');
                                            $(this).parent().parent().parent().css('background', '#e6e6e6')
                                            $(this).parent().parent().parent().css('border', '1px solid #333')
                                        }
                                    });
                                    $("#city li").click(function () {
                                        $(this).removeClass('clickDiv');
                                        $(this).siblings().addClass('clickDiv');
                                        $(this).find("span").show();
                                        $(this).siblings().find('span').hide();
                                    })
                                } else {
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
                        $(this).parent().parent().remove();
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
        });
        //取消添加
        $(".errors").click(function () {
            $(this).parent().parent().remove();
        });

    });
    //添加四级级城市
    $("#fourth").click(function () {
        var str = '';
        str = '<li><input type="text"><div class="pic">' +
            '<span class="rightss"><img src="images/Determine.png"></span>' +
            '<span class="errorss"><img src="images/X.png"></span>' +
            '</div> </li>';
        $("#littleCity").append(str);
        $("#littleCity li").click(function () {
            $(this).find("span").show();
            $(this).siblings().find('span').hide();
        });
        //确认添加
        $(".rightss").click(function () {
            var aName = $(this).parent().parent().find("input").val();
            if (aName == "") {
                $(".mini").show();
                window.parent.showMask();
                $("#p2").html("请填写信息");
                $("#p3").click(function () {
                    $(".mini").hide();
                    window.parent.hideMask();
                });
                return;
            }
            var obj = new Object();
            obj.a_rid = fourId;
            obj.a_lev = 4;
            obj.a_name = aName;
            obj.uid = u_id;
            obj.sid = s_id;
            var objs = JSON.stringify(obj);
            $.ajax({
                url: http + "addArea",
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
                        //局部刷新
                        var obj = new Object();
                        obj.a_rid = fourId;
                        obj.a_lev = 4;
                        obj.uid = u_id;
                        obj.sid = s_id;
                        var objs = JSON.stringify(obj);
                        var str = '';
                        $("#littleCity").html(str);
                        $.ajax({
                            url: http + "queryArea",
                            type: "POST",
                            data: objs,
                            dataType: "json",
                            contentType: "application/json",
                            success: function (data) {
                                if (data.success == true) {
                                    for (var i = 0; i < data.object.length; i++) {
                                        str += '<li>' + data.object[i].a_name + '<div class="pic">' +
                                            '<span class="twos" onclick="updateFour(' + data.object[i].a_id + ',' + data.object[i].a_state + ')"><input type="hidden" value=' + data.object[i].a_state + '><img src="images/Hang.png"></span>' +
                                            ' <span class="threes" onclick="delFour(' + data.object[i].a_id + ')"><img src="images/X.png"></span> ' +
                                            '</div> </li>';
                                    }
                                    $("#littleCity").append(str);
                                    $("#littleCity li").each(function () {
                                        var htmls = $(this).html();
                                        htmls = htmls.replace(/[^\u4e00-\u9fa5]/gi, "");
                                        if (htmls.length > 5 && htmls.length < 9) {
                                            $(this).css("font-size", "11px");
                                        }
                                        if (htmls.length > 8) {
                                            $(this).css("font-size", "8px");
                                        }
                                    });
                                    $("#littleCity li input").each(function () {
                                        if ($(this).val() == "2") {
                                            $(this).next().attr('src', 'images/normal.png');
                                            $(this).parent().parent().parent().css('background', '#e6e6e6')
                                            $(this).parent().parent().parent().css('border', '1px solid #333')
                                        }
                                    });
                                    $("#littleCity li").click(function () {
                                        $(this).removeClass('clickDiv');
                                        $(this).siblings().addClass('clickDiv');
                                        $(this).find("span").show();
                                        $(this).siblings().find('span').hide();
                                    })
                                } else {
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
                        $(this).parent().parent().remove();
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
        });
        //取消添加
        $(".errorss").click(function () {
            $(this).parent().parent().remove();
        });

    });
});
//国家列表
function onload() {
    var obj = new Object();
    obj.a_lev = 1;
    obj.uid = u_id;
    obj.sid = s_id;
    var objs = JSON.stringify(obj);
    var str = '';
    $.ajax({
        url: http + "queryArea",
        type: "POST",
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                for (var i = 0; i < data.object.length; i++) {
                    str += '<div onclick="loogMsg(' + data.object[i].a_id + ')" class="country">' + data.object[i].a_name + '</div>';
                }
                $(".tops").append(str);
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
                $(".province").show();
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
//查看二级城市
function loogMsg(id) {
    $("#city li").remove();
    $("#third").hide();
    $("#littleCity li").remove();
    aId = id;
    var obj = new Object();
    obj.a_rid = aId;
    obj.a_lev = 2;
    obj.uid = u_id;
    obj.sid = s_id;
    var objs = JSON.stringify(obj);
    var str = '';
    $("#province").html(str);
    $.ajax({
        url: http + "queryArea",
        type: "POST",
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                $(".province").show();
                for (var i = 0; i < data.object.length; i++) {
                    str += '<li>' + data.object[i].a_name + '<div class="pic">' +
                        '<span class="one" onclick="lookCity(' + data.object[i].a_id + ')"><img src="images/sub.png"></span>' +
                        '<span class="two" onclick="updateProvince(' + data.object[i].a_id + ',' + data.object[i].a_state + ')"><input type="hidden" value=' + data.object[i].a_state + '><img src="images/Hang.png"></span>' +
                        ' <span class="three" onclick="delSecond(' + data.object[i].a_id + ')"><img src="images/X.png"></span> ' +
                        '</div> </li>';
                }
                $("#province").append(str);
                $("#province li").each(function () {
                    var htmls = $(this).html();
                    htmls = htmls.replace(/[^\u4e00-\u9fa5]/gi, "");
                    if (htmls.length > 5 && htmls.length < 9) {
                        $(this).css("font-size", "11px");
                    }
                    if (htmls.length > 8) {
                        $(this).css("font-size", "8px");
                    }
                });

                $("#province li input").each(function () {
                    if ($(this).val() == "2") {
                        $(this).next().attr('src', 'images/normal.png');
                        $(this).parent().parent().parent().css('background', '#e6e6e6');
                        $(this).parent().parent().parent().css('border', '1px solid #333')
                    }
                });
                $("#province li").click(function () {
                    $(this).removeClass('clickDiv');
                    $(this).siblings().addClass('clickDiv');
                    $(this).find("span").show();
                    $(this).siblings().find('span').hide();
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

                if (data.object == null) {
                } else {
                    $(".mini").show();
                    window.parent.showMask();
                    $("#p2").html(data.msg);
                    $("#p3").click(function () {
                        $(".mini").hide();
                        window.parent.hideMask();
                    });
                }
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
//修改二级城市状态
function updateProvince(id, state) {
    ProvinceId = id;
    if (state == "1") {
        state = 2
    } else {
        state = 1
    }
    var obj = new Object();
    obj.a_id = ProvinceId;
    obj.a_state = state;
    obj.uid = u_id;
    obj.sid = s_id;
    var objs = JSON.stringify(obj);
    $.ajax({
        url: http + "updateArea",
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
                //局部刷新
                var obj = new Object();
                obj.a_rid = aId;
                obj.a_lev = 2;
                obj.uid = u_id;
                obj.sid = s_id;
                var objs = JSON.stringify(obj);
                var str = '';
                $("#province").html(str);
                $.ajax({
                    url: http + "queryArea",
                    type: "POST",
                    data: objs,
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        if (data.success == true) {
                            $(".province").show();
                            for (var i = 0; i < data.object.length; i++) {
                                str += '<li>' + data.object[i].a_name + '<div class="pic">' +
                                    '<span class="one" onclick="lookCity(' + data.object[i].a_id + ')"><img src="images/sub.png"></span>' +
                                    '<span class="two" onclick="updateProvince(' + data.object[i].a_id + ',' + data.object[i].a_state + ')"><input type="hidden" value=' + data.object[i].a_state + '><img src="images/Hang.png"></span>' +
                                    ' <span class="three" onclick="delSecond(' + data.object[i].a_id + ')"><img src="images/X.png"></span> ' +
                                    '</div> </li>';
                            }
                            $("#province").append(str);
                            $("#province li").each(function () {
                                var htmls = $(this).html();
                                htmls = htmls.replace(/[^\u4e00-\u9fa5]/gi, "");
                                if (htmls.length > 5 && htmls.length < 9) {
                                    $(this).css("font-size", "11px");
                                }
                                if (htmls.length > 8) {
                                    $(this).css("font-size", "8px");
                                }
                            });
                            $("#province li input").each(function () {
                                if ($(this).val() == "2") {
                                    $(this).next().attr('src', 'images/normal.png');
                                    $(this).parent().parent().parent().css('background', '#e6e6e6')
                                    $(this).parent().parent().parent().css('border', '1px solid #333')
                                }
                            });
                            $("#province li").click(function () {
                                $(this).removeClass('clickDiv');
                                $(this).siblings().addClass('clickDiv');
                                $(this).find("span").show();
                                $(this).siblings().find('span').hide();
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
//删除二级地区
function delSecond(id) {
    if(confirm("确定要删除？")) {
        var obj = new Object();
        obj.a_id = id;
        obj.uid = u_id;
        obj.sid = s_id;
        var objs = JSON.stringify(obj);
        $.ajax({
            url: http + "deleteArea",
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
                    //局部刷新
                    var obj = new Object();
                    obj.a_rid = aId;
                    obj.a_lev = 2;
                    obj.uid = u_id;
                    obj.sid = s_id;
                    var objs = JSON.stringify(obj);
                    var str = '';
                    $("#province").html(str);
                    $.ajax({
                        url: http + "queryArea",
                        type: "POST",
                        data: objs,
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {
                            if (data.success == true) {
                                $(".province").show();
                                for (var i = 0; i < data.object.length; i++) {
                                    str += '<li>' + data.object[i].a_name + '<div class="pic">' +
                                        '<span class="one" onclick="lookCity(' + data.object[i].a_id + ')"><img src="images/sub.png"></span>' +
                                        '<span class="two" onclick="updateProvince(' + data.object[i].a_id + ',' + data.object[i].a_state + ')"><input type="hidden" value=' + data.object[i].a_state + '><img src="images/Hang.png"></span>' +
                                        ' <span class="three" onclick="delSecond(' + data.object[i].a_id + ')"><img src="images/X.png"></span> ' +
                                        '</div> </li>';
                                }
                                $("#province").append(str);
                                $("#province li").each(function () {
                                    var htmls = $(this).html();
                                    htmls = htmls.replace(/[^\u4e00-\u9fa5]/gi, "");
                                    if (htmls.length > 5 && htmls.length < 9) {
                                        $(this).css("font-size", "11px");
                                    }
                                    if (htmls.length > 8) {
                                        $(this).css("font-size", "8px");
                                    }
                                });
                                $("#province li input").each(function () {
                                    if ($(this).val() == "2") {
                                        $(this).next().attr('src', 'images/normal.png');
                                        $(this).parent().parent().parent().css('background', '#e6e6e6')
                                        $(this).parent().parent().parent().css('border', '1px solid #333')
                                    }
                                });
                                $("#province li").click(function () {
                                    $(this).removeClass('clickDiv');
                                    $(this).siblings().addClass('clickDiv');
                                    $(this).find("span").show();
                                    $(this).siblings().find('span').hide();
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
}
//查询三级地区
function lookCity(id) {
    $(".foot").show();
    $(".foots").hide();
    $("#third").show();
    thirdId = id;
    var obj = new Object();
    obj.a_rid = thirdId;
    obj.a_lev = 3;
    obj.uid = u_id;
    obj.sid = s_id;
    var objs = JSON.stringify(obj);
    var str = '';
    $("#city").html(str);
    $.ajax({
        url: http + "queryArea",
        type: "POST",
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                for (var i = 0; i < data.object.length; i++) {
                    str += '<li>' + data.object[i].a_name + '<div class="pic">' +
                        '<span class="one" onclick="lookCityFour(' + data.object[i].a_id + ')"><img src="images/sub.png"></span>' +
                        '<span class="two" onclick="updateThird(' + data.object[i].a_id + ',' + data.object[i].a_state + ')"><input type="hidden" value=' + data.object[i].a_state + '><img src="images/Hang.png"></span>' +
                        ' <span class="three" onclick="delThird(' + data.object[i].a_id + ')"><img src="images/X.png"></span> ' +
                        '</div> </li>';
                }
                $("#city").append(str);
                $("#city li").each(function () {
                    var htmls = $(this).html();
                    htmls = htmls.replace(/[^\u4e00-\u9fa5]/gi, "");
                    if (htmls.length > 5 && htmls.length < 9) {
                        $(this).css("font-size", "11px");
                    }
                    if (htmls.length > 8) {
                        $(this).css("font-size", "8px");
                    }
                });
                $("#city li input").each(function () {
                    if ($(this).val() == "2") {
                        $(this).next().attr('src', 'images/normal.png');
                        $(this).parent().parent().parent().css('background', '#e6e6e6');
                        $(this).parent().parent().parent().css('border', '1px solid #333')
                    }
                });
                $("#city li").click(function () {
                    $(this).removeClass('clickDiv');
                    $(this).siblings().addClass('clickDiv');
                    $(this).find("span").show();
                    $(this).siblings().find('span').hide();
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
                if (data.object == null) {
                } else {
                    $(".mini").show();
                    window.parent.showMask();
                    $("#p2").html(data.msg);
                    $("#p3").click(function () {
                        $(".mini").hide();
                        window.parent.hideMask();
                    });
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
    })
}
//修改三级地区的状态
function updateThird(id, state) {
    ThirdId = id;
    if (state == "1") {
        state = 2
    } else {
        state = 1
    }
    var obj = new Object();
    obj.a_id = ThirdId;
    obj.a_state = state;
    obj.uid = u_id;
    obj.sid = s_id;
    var objs = JSON.stringify(obj);
    $.ajax({
        url: http + "updateArea",
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
                //局部刷新
                var obj = new Object();
                obj.a_rid = thirdId;
                obj.a_lev = 3;
                obj.uid = u_id;
                obj.sid = s_id;
                var objs = JSON.stringify(obj);
                var str = '';
                $("#city").html(str);
                $.ajax({
                    url: http + "queryArea",
                    type: "POST",
                    data: objs,
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        if (data.success == true) {
                            for (var i = 0; i < data.object.length; i++) {
                                str += '<li>' + data.object[i].a_name + '<div class="pic">' +
                                    '<span class="twos" onclick="updateThird(' + data.object[i].a_id + ',' + data.object[i].a_state + ')"><input type="hidden" value=' + data.object[i].a_state + '><img src="images/Hang.png"></span>' +
                                    ' <span class="threes" onclick="delThird(' + data.object[i].a_id + ')"><img src="images/X.png"></span> ' +
                                    '</div> </li>';
                            }
                            $("#city").append(str);
                            $("#city li").each(function () {
                                var htmls = $(this).html();
                                htmls = htmls.replace(/[^\u4e00-\u9fa5]/gi, "");
                                if (htmls.length > 5 && htmls.length < 9) {
                                    $(this).css("font-size", "11px");
                                }
                                if (htmls.length > 8) {
                                    $(this).css("font-size", "8px");
                                }
                            });
                            $("#city li input").each(function () {
                                if ($(this).val() == "2") {
                                    $(this).next().attr('src', 'images/normal.png');
                                    $(this).parent().parent().parent().css('background', '#e6e6e6');
                                    $(this).parent().parent().parent().css('border', '1px solid #333')
                                }
                            });
                            $("#city li").click(function () {
                                $(this).removeClass('clickDiv');
                                $(this).siblings().addClass('clickDiv');
                                $(this).find("span").show();
                                $(this).siblings().find('span').hide();
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
//删除三级城市
function delThird(id) {
    if(confirm("确定要删除？")) {
        var obj = new Object();
        obj.a_id = id;
        obj.uid = u_id;
        obj.sid = s_id;
        var objs = JSON.stringify(obj);
        $.ajax({
            url: http + "deleteArea",
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
                    //局部刷新
                    var obj = new Object();
                    obj.a_rid = thirdId;
                    obj.a_lev = 3;
                    obj.uid = u_id;
                    obj.sid = s_id;
                    var objs = JSON.stringify(obj);
                    var str = '';
                    $("#city").html(str);
                    $.ajax({
                        url: http + "queryArea",
                        type: "POST",
                        data: objs,
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {
                            if (data.success == true) {
                                for (var i = 0; i < data.object.length; i++) {
                                    str += '<li>' + data.object[i].a_name + '<div class="pic">' +
                                        '<span class="twos" onclick="updateThird(' + data.object[i].a_id + ',' + data.object[i].a_state + ')"><input type="hidden" value=' + data.object[i].a_state + '><img src="images/Hang.png"></span>' +
                                        ' <span class="threes" onclick="delThird(' + data.object[i].a_id + ')"><img src="images/X.png"></span> ' +
                                        '</div> </li>';
                                }
                                $("#city").append(str);
                                $("#city li").each(function () {
                                    var htmls = $(this).html();
                                    htmls = htmls.replace(/[^\u4e00-\u9fa5]/gi, "");
                                    if (htmls.length > 5 && htmls.length < 9) {
                                        $(this).css("font-size", "11px");
                                    }
                                    if (htmls.length > 8) {
                                        $(this).css("font-size", "8px");
                                    }
                                });
                                $("#city li input").each(function () {
                                    if ($(this).val() == "2") {
                                        $(this).next().attr('src', 'images/normal.png');
                                        $(this).parent().parent().parent().css('background', '#e6e6e6');
                                        $(this).parent().parent().parent().css('border', '1px solid #333')
                                    }
                                });
                                $("#city li").click(function () {
                                    $(this).removeClass('clickDiv');
                                    $(this).siblings().addClass('clickDiv');
                                    $(this).find("span").show();
                                    $(this).siblings().find('span').hide();
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
}
//查看四级城市
function lookCityFour(id) {
    $(".foots").show();
    $("#littleCity li").remove();
    //$("#fourth").hide();
    fourId = id;
    var obj = new Object();
    obj.a_rid = fourId;
    obj.a_lev = 4;
    obj.uid = u_id;
    obj.sid = s_id;
    var objs = JSON.stringify(obj);
    var str = '';
    $("#littleCity").html(str);
    $.ajax({
        url: http + "queryArea",
        type: "POST",
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                for (var i = 0; i < data.object.length; i++) {
                    str += '<li>' + data.object[i].a_name + '<div class="pic">' +
                            //'<span class="one" onclick="lookCityFour(' + data.object[i].a_id + ')"><img src="images/sub.png"></span>' +
                        '<span class="twos" onclick="updateFour(' + data.object[i].a_id + ',' + data.object[i].a_state + ')"><input type="hidden" value=' + data.object[i].a_state + '><img src="images/Hang.png"></span>' +
                        ' <span class="threes" onclick="delFour(' + data.object[i].a_id + ')"><img src="images/X.png"></span> ' +
                        '</div> </li>';
                }
                $("#littleCity").append(str);
                $("#littleCity li").each(function () {
                    var htmls = $(this).html();
                    htmls = htmls.replace(/[^\u4e00-\u9fa5]/gi, "");
                    if (htmls.length > 5 && htmls.length < 9) {
                        $(this).css("font-size", "11px");
                    }
                    if (htmls.length > 8) {
                        $(this).css("font-size", "8px");
                    }
                });
                $("#littleCity li input").each(function () {
                    if ($(this).val() == "2") {
                        $(this).next().attr('src', 'images/normal.png');
                        $(this).parent().parent().parent().css('background', '#e6e6e6');
                        $(this).parent().parent().parent().css('border', '1px solid #333')
                    }
                });
                $("#littleCity li").click(function () {
                    $(this).removeClass('clickDiv');
                    $(this).siblings().addClass('clickDiv');
                    $(this).find("span").show();
                    $(this).siblings().find('span').hide();
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
                if (data.object == null) {
                } else {
                    $(".mini").show();
                    window.parent.showMask();
                    $("#p2").html(data.msg);
                    $("#p3").click(function () {
                        $(".mini").hide();
                        window.parent.hideMask();
                    });
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
    })
}
//修改四级地区的状态
function updateFour(id, state) {
    if (state == "1") {
        state = 2
    } else {
        state = 1
    }
    var obj = new Object();
    obj.a_id = id;
    obj.a_state = state;
    obj.uid = u_id;
    obj.sid = s_id;
    var objs = JSON.stringify(obj);
    $.ajax({
        url: http + "updateArea",
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
                //局部刷新
                var obj = new Object();
                obj.a_rid = fourId;
                obj.a_lev = 4;
                obj.uid = u_id;
                obj.sid = s_id;
                var objs = JSON.stringify(obj);
                var str = '';
                $("#littleCity").html(str);
                $.ajax({
                    url: http + "queryArea",
                    type: "POST",
                    data: objs,
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        if (data.success == true) {
                            for (var i = 0; i < data.object.length; i++) {
                                str += '<li>' + data.object[i].a_name + '<div class="pic">' +
                                    '<span class="twos" onclick="updateFour(' + data.object[i].a_id + ',' + data.object[i].a_state + ')"><input type="hidden" value=' + data.object[i].a_state + '><img src="images/Hang.png"></span>' +
                                    ' <span class="threes" onclick="delFour(' + data.object[i].a_id + ')"><img src="images/X.png"></span> ' +
                                    '</div> </li>';
                            }
                            $("#littleCity").append(str);
                            $("#littleCity li").each(function () {
                                var htmls = $(this).html();
                                htmls = htmls.replace(/[^\u4e00-\u9fa5]/gi, "");
                                if (htmls.length > 5 && htmls.length < 9) {
                                    $(this).css("font-size", "11px");
                                }
                                if (htmls.length > 8) {
                                    $(this).css("font-size", "8px");
                                }
                            });
                            $("#littleCity li input").each(function () {
                                if ($(this).val() == "2") {
                                    $(this).next().attr('src', 'images/normal.png');
                                    $(this).parent().parent().parent().css('background', '#e6e6e6');
                                    $(this).parent().parent().parent().css('border', '1px solid #333')
                                }
                            });
                            $("#littleCity li").click(function () {
                                $(this).removeClass('clickDiv');
                                $(this).siblings().addClass('clickDiv');
                                $(this).find("span").show();
                                $(this).siblings().find('span').hide();
                            })
                        } else {
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
//删除四级城市
function delFour(id) {
    if(confirm("确定要删除？")) {
        var obj = new Object();
        obj.a_id = id;
        obj.uid = u_id;
        obj.sid = s_id;
        var objs = JSON.stringify(obj);
        $.ajax({
            url: http + "deleteArea",
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
                    //局部刷新
                    var obj = new Object();
                    obj.a_rid = fourId;
                    obj.a_lev = 4;
                    obj.uid = u_id;
                    obj.sid = s_id;
                    var objs = JSON.stringify(obj);
                    var str = '';
                    $("#littleCity").html(str);
                    $.ajax({
                        url: http + "queryArea",
                        type: "POST",
                        data: objs,
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {
                            if (data.success == true) {
                                for (var i = 0; i < data.object.length; i++) {
                                    str += '<li>' + data.object[i].a_name + '<div class="pic">' +
                                        '<span class="twos" onclick="updateFour(' + data.object[i].a_id + ',' + data.object[i].a_state + ')"><input type="hidden" value=' + data.object[i].a_state + '><img src="images/Hang.png"></span>' +
                                        ' <span class="threes" onclick="delFour(' + data.object[i].a_id + ')"><img src="images/X.png"></span> ' +
                                        '</div> </li>';
                                }
                                $("#littleCity").append(str);
                                $("#littleCity li").each(function () {
                                    var htmls = $(this).html();
                                    htmls = htmls.replace(/[^\u4e00-\u9fa5]/gi, "");
                                    if (htmls.length > 5 && htmls.length < 9) {
                                        $(this).css("font-size", "11px");
                                    }
                                    if (htmls.length > 8) {
                                        $(this).css("font-size", "8px");
                                    }
                                });
                                $("#littleCity li input").each(function () {
                                    if ($(this).val() == "2") {
                                        $(this).next().attr('src', 'images/normal.png');
                                        $(this).parent().parent().parent().css('background', '#e6e6e6');
                                        $(this).parent().parent().parent().css('border', '1px solid #333')
                                    }
                                });
                                $("#littleCity li").click(function () {
                                    $(this).removeClass('clickDiv');
                                    $(this).siblings().addClass('clickDiv');
                                    $(this).find("span").show();
                                    $(this).siblings().find('span').hide();
                                })
                            } else {
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
}