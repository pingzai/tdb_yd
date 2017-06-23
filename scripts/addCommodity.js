/**
 /**
 * Created by KQ on 2016/12/16.
 */
var http = "https://www.railwaybaby.com/";
var iId;
var url = location.search;
var u_id = sessionStorage.u_id;
var s_id = sessionStorage.s_id;
//var sellerName;
var calssId;
var classLev;
var cId;
var contune = 0;
var TempArr = [];
var areaId;
//var areaId;
$(function () {
    $('input[type=text]').val('');
    $("#userName").html(sessionStorage.name);
    $("#liState").hide();
    $("input[type=checkbox]").removeAttr("checked");
    onload();
    area();
    if (url.indexOf("CK") != -1) {
        $(".titlePart li select").css("margin-left", "70px");
    }


    //条件筛选
    $(".condition").click(function () {
        $(this).hide();
        $(".partThree").slideDown(150);
        $(".partFour").fadeIn(150);
    });
    //返回
    $("#back").click(function () {
        if (url.indexOf("CK") != -1) {
            window.location.href = "warehouseManagement.html";
        } else {
            window.location.href = "commodityManagement.html";
        }
    });
    //收起
    $(".partFour").click(function () {
        $(this).hide();
        $(".partThree").slideUp(150);
        $(".condition").fadeIn(150);
    });
    $(".addBtn").click(function () {
        $(".titlePart li select").css("margin-left", "70px");
        var str = '';
        if (url != "") {
            str = '<tr><td style="text-align: right !important;">分类</td><td><input style="width: 70px !important;" class="g_name" type="text"></td><td>库存</td><td><input class="s_counts" type="text">' +
                '</td> <td>货号</td><td><input type="text" class="s_number"></td><td>单价</td><td><input class="g_price" type="text"></td><td style="width: 40px">优惠价</td> <td><input class="g_rprice" type="text"></td> <td class="addGoods">确认添加</td><td><img class="delAdd" style="margin-top: 1px" src="images/X.png"></td></tr>';
            $("#tbody").append(str);
        } else {
            str = '<tr><td><img class="delAdd" src="images/X.png">分类</td><td><input class="g_name" type="text"></td><td>库存</td><td><input class="s_counts" type="text">' +
                '</td> <td>货号</td><td><input type="text" class="s_number"></td><td>单价</td><td><input class="g_price" type="text"></td><td>优惠价</td> <td><input class="g_rprice" type="text"></td></tr>';
            $("#tbody").append(str);
        }
    });
    //删除小分类
    $(document).on('click', '.delAdd', function () {
        $(this).parent().parent().remove();
    });
    //详情里面添加分类
    $(document).on('click', '.addGoods', function () {
        var g_name = $(this).parent().find(".g_name").val();
        var s_counts = $(this).parent().find(".s_counts").val();
        var g_price = $(this).parent().find(".g_price").val();
        var g_rprice = $(this).parent().find(".g_rprice").val();
        var g_gid = $(this).parent().find(".s_number").val();
        if (g_name == "" || s_counts == "" || g_price == "") {
            //alert("请将信息填写完整");
            $(".mini").show();
            window.parent.showMask();
            $("#p2").html("请将信息填写完整");
            $("#p3").click(function () {
                $(".mini").hide();
                window.parent.hideMask();
            });
            return;
        }
        var obj = new Object();
        obj.g_name = g_name;
        obj.s_counts = s_counts;
        obj.g_price = g_price;
        obj.g_gid = g_gid;
        obj.g_rprice = g_rprice;
        obj.i_id = iId;
        obj.uid = u_id;
        obj.sid = s_id;
        var objs = JSON.stringify(obj);
        $.ajax({
            url: http + "addGoodsMsg",
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
                    msg();
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
    $(document).on('click', 'a', function (e) {
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
                    if (data.object == null) {
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

    //添加商品
    $("#add").click(function () {
        if (url == "") {
            add();
        } else {
            update();
        }
    });
    //修改封面
    $("#fileOne").change(function () {
        if (url != "") {
            var target = document.getElementById("fileOne").files[0];
            var addMsg = new FormData();
            addMsg.append("uid", u_id);
            addMsg.append("sid", s_id);
            addMsg.append("type", 2);
            addMsg.append("o_id", iId);
            addMsg.append("file", target);
            $.ajax({
                url: http + "upload",
                type: "POST",
                data: addMsg,
                cache: false,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data.success == true) {
                        $(".mini").show();
                        window.parent.showMask();
                        $("#p2").html(data.msg);
                        $("#p3").click(function () {
                            $(".mini").hide();
                            window.parent.hideMask();
                        });
                        //msg();
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
    //上传详情图片
    $(".foot input[type=file]").change(function () {
        if (url != "") {
            var fileId = $(this).attr("id");
            var target = document.getElementById(fileId).files[0];
            var addMsg = new FormData();
            addMsg.append("uid", u_id);
            addMsg.append("sid", s_id);
            addMsg.append("type", 3);
            addMsg.append("o_id", iId);
            addMsg.append("file", target);
            $.ajax({
                url: http + "upload",
                type: "POST",
                data: addMsg,
                cache: false,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data.success == true) {
                        $(".mini").show();
                        window.parent.showMask();
                        $("#p2").html(data.msg);
                        $("#p3").click(function () {
                            $(".mini").hide();
                            window.parent.hideMask();
                        });
                        //   msg();
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
    //删除详情图片
    $(".delPic").click(function () {
        var src = $(this).prev().find("img").attr("src");
        if (src == undefined || src.indexOf("file_name") == -1) {
            $(this).prev().find("img").removeAttr("src");
            return;
        }
        var obj = new Object();
        obj.i_id = iId;
        obj.uid = u_id;
        obj.sid = s_id;
        obj.i_say = src;
        var objs = JSON.stringify(obj);
        var picId = $(this).prev().find("img").attr("id");
        $.ajax({
            url: http + "updateGoodsSay",
            type: "POST",
            data: objs,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.success == true) {
                    $('#' + picId).removeAttr("src");
                    $(".mini").show();
                    window.parent.showMask();
                    $("#p2").html("删除成功");
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
    $(".close").click(function () {
        $(".mb").hide();
        $(".allClass").hide();
    })

    $("#makeupCo").click(function () {
        $("#typenum").css({"display": ""});
    });
    $("#makeupCo").keyup(function () {
        var obj = new Object();
        obj.uid = u_id;
        obj.sid = s_id;
        obj.a_name = $(this).val();
        var objs = JSON.stringify(obj);
        var str = '';
        $("#typenum").html(str);
        $.ajax({
            url: http + "queryByName",
            type: "POST",
            data: objs,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.success == true) {
                    TempArr = [];
                    TempArr = data.object;
                    for (var i = 0; i < data.object.length; i++) {
                        str += '<option value=' + data.object[i].a_id + '>' + data.object[i].a_name + '</option>';
                    }
                    $("#typenum").append(str);
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
    })
});
//获取所有卖家
function onload() {
    var obj = new Object();
    obj.i_state = 1;
    obj.uid = u_id;
    obj.sid = s_id;
    var objs = JSON.stringify(obj);
    var str = '';
    $("#seller").html(str);
    $.ajax({
        url: http + "querySellers",
        type: "POST",
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                for (var i = 0; i < data.object.length; i++) {
                    str += '<option value=' + data.object[i].s_id + '>' + data.object[i].s_name + '</option>';
                }
                $("#seller").append(str);
                //商品详情
                if (url.indexOf("?") != -1) {
                    iId = url.split("=")[1];
                    $("#state").removeAttr("disabled");
                    msg();
                    $("#liState").show();
                    $("#showImg").css('margin-top', '-200px');
                    $(document).on('click', '.g_state', function () {
                        if ($(this).html() == "上架") {
                            $(this).html("下架")
                        } else {
                            $(this).html("上架")
                        }
                    });
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
}
function area() {
    var obj = new Object();
    obj.uid = u_id;
    obj.sid = s_id;
    var objs = JSON.stringify(obj);
    var str = '';
    $("#typenum").html(str);
    $.ajax({
        url: http + "queryByName",
        type: "POST",
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                TempArr = [];
                TempArr = data.object;
                for (var i = 0; i < data.object.length; i++) {
                    str += '<option value=' + data.object[i].a_id + '>' + data.object[i].a_name + '</option>';
                }
                $("#typenum").append(str);
                //$("#typenum option").each(function(index, el) {
                //    //TempArr=[];
                //    TempArr[index] = $("#typenum option").text();
                //    console.log(JSON.stringify(TempArr))
                //});
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
//新增商品
function add() {
    var i_type = $(".since:checked").val();
    if (i_type == undefined) {
        i_type = 1
    } else {
        i_type = 2
    }
    var arr = [];
    var listMsg = [];
    var i_name = $("#name").val();
    var z = /^[a-zA-Z0-9]*$/;
    var reg=/^[a-zA-Z\u4e00-\u9fa5][a-zA-Z0-9\u4e00-\u9fa5]*$/;
    if(i_name.length>30){
        $(".mini").show();
        window.parent.showMask();
        $("#p2").html("商品名称长于30个字符");
        $("#p3").click(function () {
            $(".mini").hide();
            window.parent.hideMask();
        });
        return;
    }
    //if (!reg.test(i_name)) {
    //    $(".mini").show();
    //    window.parent.showMask();
    //    $("#p2").html("商品名称不能有特殊字符");
    //    $("#p3").click(function () {
    //        $(".mini").hide();
    //        window.parent.hideMask();
    //    });
    //    return;
    //}
    var sell = parseInt($("#sell").val());
    var num = /^[1-9]\d*$/;
    if (!num.test(sell)) {
        $(".mini").show();
        window.parent.showMask();
        $("#p2").html("上架销量请填写数字");
        $("#p3").click(function () {
            $(".mini").hide();
            window.parent.hideMask();
        });
        return;
    }

    //var state=1;
    var sid = parseInt($("#seller").val());
    var nlen = $('#tbody tr').length;
    var aa = "";
    if (i_name == "" || sell == "" || sid == "" || cId == "") {
        $(".mini").show();
        window.parent.showMask();
        $("#p2").html("请将信息填写完整");
        $("#p3").click(function () {
            $(".mini").hide();
            window.parent.hideMask();
        });
        return;
    }
    var num1 = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
    for (var i = 0; i < nlen; i++) {
        //var msg = new Object();
        var obj = $('#tbody tr').eq(i);
        if(obj.find('input.s_number').val()!="") {
            if (!z.test(obj.find('input.s_number').val())) {
                $(".mini").show();
                window.parent.showMask();
                $("#p2").html("货号只能是数字、字母");
                $("#p3").click(function () {
                    $(".mini").hide();
                    window.parent.hideMask();
                });
                return false;
            }
        }
        if (obj.find('input.g_name').val() == "" || obj.find('input.g_price').val() == "" || obj.find('input.s_counts').val() == "") {
            //alert("请将信息填写完整");
            $(".mini").show();
            window.parent.showMask();
            $("#p2").html("请将信息填写完整");
            $("#p3").click(function () {
                $(".mini").hide();
                window.parent.hideMask();
            });
            return false;
        }
        if (!num.test(obj.find('input.s_counts').val())) {
            $(".mini").show();
            window.parent.showMask();
            $("#p2").html("库存请填写数字");
            $("#p3").click(function () {
                $(".mini").hide();
                window.parent.hideMask();
            });
            return false;
        }
        if(obj.find('input.g_price').val().indexOf(".")!=-1&&obj.find('input.g_price').val().split(".")[1].length>2){
            $(".mini").show();
            window.parent.showMask();
            $("#p2").html("价格填写格式不正确");
            $("#p3").click(function () {
                $(".mini").hide();
                window.parent.hideMask();
            });
            return false;
        }
        if(obj.find('input.g_rprice').val()!=""&&obj.find('input.g_price').val().indexOf(".")!=-1&&obj.find('input.g_rprice').val().split(".")[1].length>2){
            $(".mini").show();
            window.parent.showMask();
            $("#p2").html("优惠价格填写格式不正确");
            $("#p3").click(function () {
                $(".mini").hide();
                window.parent.hideMask();
            });
            return false;
        }
        if (!num1.test(obj.find('input.g_price').val())) {
            $(".mini").show();
            window.parent.showMask();
            $("#p2").html("价格请填写数字");
            $("#p3").click(function () {
                $(".mini").hide();
                window.parent.hideMask();
            });
            return false;
        }
        if (obj.find('input.g_rprice').val() != "" && !num1.test(obj.find('input.s_counts').val())) {
            $(".mini").show();
            window.parent.showMask();
            $("#p2").html("优惠价格请填写数字");
            $("#p3").click(function () {
                $(".mini").hide();
                window.parent.hideMask();
            });
            return false;
        }
        aa += "{\"g_state\":\"1\",\"i_id\":\"0\",\"g_id\":\"0\",\"g_gid\":\"" + obj.find('input.s_number').val() + "\",\"g_name\":\"" + obj.find('input.g_name').val() + "\",\"g_price\":\"" + obj.find('input.g_price').val() + "\",\"g_rprice\":\"" + obj.find('input.g_rprice').val() + "\",\"s_counts\":\"" + obj.find('input.s_counts').val() + "\"}road";
        //var aa = "road{\"g_state\":"+1+",\"i_id\":"+0+",\"g_sale\":"+0+",\"s_note\":"+"\ "+",\"g_id\":\""+0+"\"g_name\":\""+obj.find('input.g_name').val()+"\"g_price\":"+obj.find('input.g_price').val()+"\"g_rprice\":"+obj.find('input.g_rprice').val()+"\"s_counts\":"+obj.find('input.s_counts').val()+"}";
    }
    //return;
    //var list=JSON.stringify(listMsg);
    var target = document.getElementById("fileOne").files[0];
    if (target == undefined) {
        $(".mini").show();
        window.parent.showMask();
        $("#p2").html("请选择要上传的图片");
        $("#p3").click(function () {
            $(".mini").hide();
            window.parent.hideMask();
        });
        return;
    }
    var target1 = document.getElementById("fileOnes").files[0];
    var target2 = document.getElementById("fileTwo").files[0];
    var target3 = document.getElementById("fileThree").files[0];
    var target4 = document.getElementById("fileFour").files[0];
    var target5 = document.getElementById("fileFive").files[0];
    //var bb=target1+"road"+target2+"road"+target3+"road"+target4+"road"+target5+"road";
    //bb=bb.split("undefined")[0];
    //console.log(bb);
    //return;
    if (target1 != undefined) {
        arr.push(target1);
    }
    if (target2 != undefined) {
        arr.push(target2);
    }
    if (target3 != undefined) {
        arr.push(target3);
    }
    if (target4 != undefined) {
        arr.push(target4);
    }
    if (target5 != undefined) {
        arr.push(target5);
    }
    //var picList=JSON.stringify(arr);
    var addMsg = new FormData();
    addMsg.append("c_id", parseInt(cId));
    addMsg.append("i_type", parseInt(i_type));
    addMsg.append("i_sale", sell);
    addMsg.append("i_view", 0);
    addMsg.append("s_id", parseInt(sid));
    addMsg.append("i_name", i_name);
    addMsg.append("i_cove", target);
    addMsg.append("uid", u_id);
    addMsg.append("sid", s_id);
    addMsg.append("list", aa);
    addMsg.append("ar_id", parseInt(areaId));

    for (var i = 0; i < arr.length; i++) {
        addMsg.append("i_say", arr[i]);
    }
    if (contune == 0) {
        contune = 1;
        $.ajax({
            url: http + "addGoods",
            type: "POST",
            data: addMsg,
            cache: false,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.success == true) {
                    contune = 0;
                    $(".mini").show();
                    window.parent.showMask();
                    $("#p2").html(data.msg);
                    $("#p3").click(function () {
                        $(".mini").hide();
                        window.parent.hideMask();
                        window.location.href = "addCommodity.html";
                    });
                    $('input[type=text]').val('');
                    $("input[type=checkbox]").removeAttr("checked");
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
                    contune = 0;
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
                contune = 0;
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
function msg() {
    //$(".foot>img").removeAttr("src");
    var morePic = [];
    var piv = [];
    var str = '';
    $("#tbody").html("");
    var obj = new Object();
    obj.i_id = parseInt(iId);
    obj.uid = u_id;
    obj.sid = s_id;
    var objs = JSON.stringify(obj);
    $.ajax({
        url: http + "queryGoodsByIid",
        type: "POST",
        data: objs,
        cache: false,
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                //sellerName = data.object.info.s_id;
                $("#seller").val(data.object.info.s_id);
                $("#file0").attr('src', data.object.info.i_cover);
                $("#name").val(data.object.info.i_name);
                $("#state").val(data.object.info.i_state);
                $("#class").val(data.object.info.c_name);
                $("#sell").val(data.object.info.i_sale);
                $("#makeupCo").val(data.object.info.a_name);
                areaId = data.object.info.ar_id;
                if (data.object.info.i_type == 2) {
                    document.getElementById("since").checked = true;
                } else {
                    document.getElementById("since").checked = false;
                }
                morePic = data.object.info.i_say.split(",");
                for (var i = 0; i < morePic.length; i++) {
                    if (morePic[i] != "") {
                        piv.push(morePic[i]);
                    }
                }
                for (var i = 0; i < piv.length; i++) {
                    $('#file' + (i + 1)).attr('src', piv[i]);
                }
                for (var i = 0; i < data.object.goods.length; i++) {
                    if (data.object.goods[i].g_gid == "null") {
                        data.object.goods[i].g_gid = ""
                    }
                    if (data.object.goods[i].g_state == "1") {
                        data.object.goods[i].g_state = "上架"
                    } else {
                        data.object.goods[i].g_state = "下架"
                    }
                    if (data.object.goods[i].g_gid == null) {
                        data.object.goods[i].g_gid = '';
                    }
                    if(data.object.goods[i].g_gid=="type=\"text\""){
                        data.object.goods[i].g_gid=""
                    }
                    str = '<tr><input type="hidden" class="g_id" value=' + data.object.goods[i].g_id + '><input type="hidden" class="i_id" value=' + data.object.goods[i].i_id + '>' +
                        '<td>分类</td><td><input value=' + data.object.goods[i].g_name + ' class="g_name" type="text"></td>' +
                        '<td>编号</td><td><input disabled style="border: none" value=' + data.object.goods[i].g_id + '  type="text"></td>' +
                        '<td>库存</td><td><input class="s_counts" value=' + data.object.goods[i].s_counts + ' type="text">' +
                        '<td>货号</td><td><input class="s_number" value=' + data.object.goods[i].g_gid + '>' +
                        '</td><td>单价</td><td><input value=' + data.object.goods[i].g_price + ' class="g_price" type="text"></td>' +
                        '<td>优惠价</td> <td><input class="g_rprice" type="text" value=' + data.object.goods[i].g_rprice + '> </td>' +
                        '<td>状态</td><td><span style="border: none;cursor: pointer" class="g_state">' + data.object.goods[i].g_state + '</span></td></tr>';
                    $("#tbody").append(str);
                    $("#tbody tr td:nth-child(14)").css("width", "20px")
                }
                $(".g_name").addClass("tableInpit");
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
                $("#p2").html("查询失败");
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
//修改信息
function update() {
    var i_type = $(".since:checked").val();
    if (i_type == undefined) {
        i_type = 1
    } else {
        i_type = 2
    }
    var num1 = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
    var i_name = $("#name").val();
    var z = /^[a-zA-Z0-9]*$/;
    var reg=/^[a-zA-Z\u4e00-\u9fa5][a-zA-Z0-9\u4e00-\u9fa5]*$/;
    if(i_name.length>30){
        $(".mini").show();
        window.parent.showMask();
        $("#p2").html("商品名称长于30个字符");
        $("#p3").click(function () {
            $(".mini").hide();
            window.parent.hideMask();
        });
        return;
    }
    //if (!reg.test(i_name)) {
    //    $(".mini").show();
    //    window.parent.showMask();
    //    $("#p2").html("商品名称不能有特殊字符");
    //    $("#p3").click(function () {
    //        $(".mini").hide();
    //        window.parent.hideMask();
    //    });
    //    return;
    //}
    var num = /^[1-9]\d*$/;
    var sell = parseInt($("#sell").val());
    if (!num.test(sell)) {
        $(".mini").show();
        window.parent.showMask();
        $("#p2").html("上架销量请填写数字");
        $("#p3").click(function () {
            $(".mini").hide();
            window.parent.hideMask();
        });
        return;
    }
    var listMsg = [];
    var nlen = $('#tbody tr').length;
    for (var i = 0; i < nlen; i++) {
        var msgs = new Object();
        var obj = $('#tbody tr').eq(i);
        if(obj.find('input.s_number').val()!="") {
            if (!z.test(obj.find('input.s_number').val())) {
                $(".mini").show();
                window.parent.showMask();
                $("#p2").html("货号只能是数字、字母");
                $("#p3").click(function () {
                    $(".mini").hide();
                    window.parent.hideMask();
                });
                return false;
            }
        }

            if (obj.find('input.g_price').val().indexOf(".")!=-1&&obj.find('input.g_price').val().split(".")[1].length > 2) {
                $(".mini").show();
                window.parent.showMask();
                $("#p2").html("价格填写格式不正确");
                $("#p3").click(function () {
                    $(".mini").hide();
                    window.parent.hideMask();
                });
                return false;
            }

        if(obj.find('input.g_rprice').val()!=""){
            if(obj.find('input.g_rprice').val().indexOf(".")!=-1&&obj.find('input.g_rprice').val().split(".")[1].length>2){
                $(".mini").show();
                window.parent.showMask();
                $("#p2").html("优惠价格填写格式不正确");
                $("#p3").click(function () {
                    $(".mini").hide();
                    window.parent.hideMask();
                });
                return false;
            };
        }
        if (obj.find('input.g_name').val() == "" || obj.find('input.g_price').val() == "" || obj.find('input.s_counts').val() == "") {
            //alert("请将信息填写完整");
            $(".mini").show();
            window.parent.showMask();
            $("#p2").html("请将信息填写完整");
            $("#p3").click(function () {
                $(".mini").hide();
                window.parent.hideMask();
            });
            return false;
        }
        if (!num.test(obj.find('input.s_counts').val())) {
            $(".mini").show();
            window.parent.showMask();
            $("#p2").html("库存请填写数字");
            $("#p3").click(function () {
                $(".mini").hide();
                window.parent.hideMask();
            });
            return false;
        }
        if (!num1.test(obj.find('input.g_price').val())) {
            $(".mini").show();
            window.parent.showMask();
            $("#p2").html("价格请填写数字");
            $("#p3").click(function () {
                $(".mini").hide();
                window.parent.hideMask();
            });
            return false;
        }
        if (obj.find('input.g_rprice').val() != "" && !num1.test(obj.find('input.s_counts').val())) {
            $(".mini").show();
            window.parent.showMask();
            $("#p2").html("优惠价格请填写数字");
            $("#p3").click(function () {
                $(".mini").hide();
                window.parent.hideMask();
            });
            return false;
        }
        msgs.g_name = obj.find('input.g_name').val();
        msgs.g_id = parseInt(obj.find('input.g_id').val());
        msgs.i_id = parseInt(obj.find('input.i_id').val());
        msgs.g_gid = obj.find('input.s_number').val();
        msgs.g_state = obj.find('span').html();
        if (msgs.g_state == "上架") {
            msgs.g_state = 1
        } else {
            msgs.g_state = 2
        }
        msgs.g_price = obj.find('input.g_price').val();
        msgs.g_rprice = obj.find('input.g_rprice').val();
        msgs.s_counts = obj.find('input.s_counts').val();
        if (msgs.g_name == "" || msgs.g_price == "" || msgs.s_counts == "") {
            $(".mini").show();
            window.parent.showMask();
            $("#p2").html("请将信息填写完整");
            $("#p3").click(function () {
                $(".mini").hide();
                window.parent.hideMask();
            });
            return false;
        }
        listMsg.push(msgs);
    }
    //var list=JSON.stringify(listMsg);

    var obj = new Object();
    obj.list = listMsg;
    obj.uid = u_id;
    obj.sid = s_id;
    obj.i_id = parseInt(iId);
    obj.c_id = cId;
    obj.i_type = parseInt(i_type);
    obj.i_sale = parseInt($("#sell").val());
    obj.s_id = parseInt($("#seller").val());
    obj.i_state = parseInt($("#state").val());
    obj.i_name = $("#name").val();
    obj.i_note = null;
    obj.ar_id = parseInt(areaId);
    var objs = JSON.stringify(obj);
    if (contune == 0) {
        contune = 1;
        $.ajax({
            url: http + "updateGoods",
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: objs,
            catch: false,
            success: function (data) {
                if (data.success == true) {
                    contune = 0;
                    $(".mini").show();
                    window.parent.showMask();
                    $("#p2").html(data.msg);
                    $("#p3").click(function () {
                        $(".mini").hide();
                        window.parent.hideMask();
                    });
                    //msg();
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
                    contune = 0;
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
            error: function () {
                contune = 0;
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
//查询下级类目
function getId(id, lev) {
    calssId = id;
    lev = parseInt(lev) + 1;
    classLev = lev;
}
//模糊搜索
function changeF(this_) {
    $(this_).prev("input").val($(this_).find("option:selected").text());
    areaId = $("#typenum").val();
    $("#typenum").css({"display": "none"});
}




