/**
 * Created by Administrator on 2017/1/5.
 */
var http = "https://www.railwaybaby.com/";
var u_id = sessionStorage.u_id;
var s_id = sessionStorage.s_id;
var contune = 0;
var number = 0;
var hList = [];//头幅
var sList = [];//特卖
var rList = [];//热门
var tList = [];//条幅
var addState;
var adId;
$(function () {
    $("#userName").html(sessionStorage.name);
    $(".r-head").html('头幅区广告位<span></span>');
    $("#beginTime").fdatepicker();
    $("#endTime").fdatepicker();
    onload();
    //编辑
    $(document).on('click', '.btn', function () {
        number = $(this).next().val();
        addState = $(this).attr("state");
        adId = $(this).attr("data_id");
        $(".mb").show();
        $("input[type=text]").val("");
        $("#note").val("");
        window.parent.showMask();
        var html = $(".r-head").html();
        if (html.indexOf("特卖") != -1 || html.indexOf("热卖") != -1) {
            $(".ul1>li:nth-child(4)").html("商品编号");
            $("#href").removeAttr("placeholder");
        } else {
            $(".ul1>li:nth-child(4)").html("对应链接");
            $("#href").attr("placeholder", "请以http://开头");
        }
        $("#file6").attr("src", "images/add3.png");
        if ($("#file6").attr("src").indexOf("add3") != -1) {
            $("#file6").css("width", "100%");
            $("#file6").css("height", "100%");
            //$("#file6").css("width", "101px");
            //$("#file6").css("height", "101px");
            //$("#file6").css("margin-top", "33px");
            //$("#file6").css("margin-left", "69px");
        }
        if (html.indexOf("头幅") != -1) {
            if (hList.length >= number) {
                for (var i = 0; i < hList.length; i++) {
                    if (number == hList[i].ad_posi) {
                        $("#advertName").val(hList[i].ad_name);
                        $("#beginTime").val(hList[i].ad_stime);
                        $("#endTime").val(hList[i].ad_etime);
                        $("#href").val(hList[i].ad_url);
                        $("#note").val(hList[i].ad_note);
                        $("#file6").attr('src', hList[i].ad_photo);
                    }
                    if (number == hList[i].ad_posi) {
                        $("#advertName").val(hList[i].ad_name);
                        $("#beginTime").val(hList[i].ad_stime);
                        $("#endTime").val(hList[i].ad_etime);
                        $("#href").val(hList[i].ad_url);
                        $("#note").val(hList[i].ad_note);
                        $("#file6").attr('src', hList[i].ad_photo);
                    }
                    if (number == hList[i].ad_posi) {
                        $("#advertName").val(hList[i].ad_name);
                        $("#beginTime").val(hList[i].ad_stime);
                        $("#endTime").val(hList[i].ad_etime);
                        $("#href").val(hList[i].ad_url);
                        $("#note").val(hList[i].ad_note);
                        $("#file6").attr('src', hList[i].ad_photo);
                    }
                    if (number == hList[i].ad_posi) {
                        $("#advertName").val(hList[i].ad_name);
                        $("#beginTime").val(hList[i].ad_stime);
                        $("#endTime").val(hList[i].ad_etime);
                        $("#href").val(hList[i].ad_url);
                        $("#note").val(hList[i].ad_note);
                        $("#file6").attr('src', hList[i].ad_photo);
                    }
                    if (number == hList[i].ad_posi) {
                        $("#advertName").val(hList[i].ad_name);
                        $("#beginTime").val(hList[i].ad_stime);
                        $("#endTime").val(hList[i].ad_etime);
                        $("#href").val(hList[i].ad_url);
                        $("#note").val(hList[i].ad_note);
                        $("#file6").attr('src', hList[i].ad_photo);
                    }
                }
            }
        }
        if (html.indexOf("特卖") != -1) {
            if (sList.length >= number) {
                for (var i = 0; i < sList.length; i++) {
                    if (number == sList[i].ad_posi) {
                        $("#advertName").val(sList[i].ad_name);
                        $("#beginTime").val(sList[i].ad_stime);
                        $("#endTime").val(sList[i].ad_etime);
                        $("#href").val(sList[i].ad_url);
                        $("#note").val(sList[i].ad_note);
                        $("#file6").attr('src', sList[i].ad_photo);
                    }
                    if (number == sList[i].ad_posi) {
                        $("#advertName").val(sList[i].ad_name);
                        $("#beginTime").val(sList[i].ad_stime);
                        $("#endTime").val(sList[i].ad_etime);
                        $("#href").val(sList[i].ad_url);
                        $("#note").val(sList[i].ad_note);
                        $("#file6").attr('src', sList[i].ad_photo);
                    }
                    if (number == sList[i].ad_posi) {
                        $("#advertName").val(sList[i].ad_name);
                        $("#beginTime").val(sList[i].ad_stime);
                        $("#endTime").val(sList[i].ad_etime);
                        $("#href").val(sList[i].ad_url);
                        $("#note").val(sList[i].ad_note);
                        $("#file6").attr('src', sList[i].ad_photo);
                    }
                    if (number == sList[i].ad_posi) {
                        $("#advertName").val(sList[i].ad_name);
                        $("#beginTime").val(sList[i].ad_stime);
                        $("#endTime").val(sList[i].ad_etime);
                        $("#href").val(sList[i].ad_url);
                        $("#note").val(sList[i].ad_note);
                        $("#file6").attr('src', sList[i].ad_photo);
                    }
                    if (number == sList[i].ad_posi) {
                        $("#advertName").val(sList[i].ad_name);
                        $("#beginTime").val(sList[i].ad_stime);
                        $("#endTime").val(sList[i].ad_etime);
                        $("#href").val(sList[i].ad_url);
                        $("#note").val(sList[i].ad_note);
                        $("#file6").attr('src', sList[i].ad_photo);
                    }
                }
            }
        }
        if (html.indexOf("热卖") != -1) {
            if (rList.length >= number) {
                for (var i = 0; i < rList.length; i++) {
                    if (number == rList[i].ad_posi) {
                        $("#advertName").val(rList[i].ad_name);
                        $("#beginTime").val(rList[i].ad_stime);
                        $("#endTime").val(rList[i].ad_etime);
                        $("#href").val(rList[i].ad_url);
                        $("#note").val(rList[i].ad_note);
                        $("#file6").attr('src', rList[i].ad_photo);
                    }
                    if (number == rList[i].ad_posi) {
                        $("#advertName").val(rList[i].ad_name);
                        $("#beginTime").val(rList[i].ad_stime);
                        $("#endTime").val(rList[i].ad_etime);
                        $("#href").val(rList[i].ad_url);
                        $("#note").val(rList[i].ad_note);
                        $("#file6").attr('src', rList[i].ad_photo);
                    }
                    if (number == rList[i].ad_posi) {
                        $("#advertName").val(rList[i].ad_name);
                        $("#beginTime").val(rList[i].ad_stime);
                        $("#endTime").val(rList[i].ad_etime);
                        $("#href").val(rList[i].ad_url);
                        $("#note").val(rList[i].ad_note);
                        $("#file6").attr('src', rList[i].ad_photo);
                    }
                    if (number == rList[i].ad_posi) {
                        $("#advertName").val(rList[i].ad_name);
                        $("#beginTime").val(rList[i].ad_stime);
                        $("#endTime").val(rList[i].ad_etime);
                        $("#href").val(rList[i].ad_url);
                        $("#note").val(rList[i].ad_note);
                        $("#file6").attr('src', rList[i].ad_photo);
                    }
                    if (number == rList[i].ad_posi) {
                        $("#advertName").val(rList[i].ad_name);
                        $("#beginTime").val(rList[i].ad_stime);
                        $("#endTime").val(rList[i].ad_etime);
                        $("#href").val(rList[i].ad_url);
                        $("#note").val(rList[i].ad_note);
                        $("#file6").attr('src', rList[i].ad_photo);
                    }
                    if (number == rList[i].ad_posi) {
                        $("#advertName").val(rList[i].ad_name);
                        $("#beginTime").val(rList[i].ad_stime);
                        $("#endTime").val(rList[i].ad_etime);
                        $("#href").val(rList[i].ad_url);
                        $("#note").val(rList[i].ad_note);
                        $("#file6").attr('src', rList[i].ad_photo);
                    }
                    if (number == rList[i].ad_posi) {
                        $("#advertName").val(rList[i].ad_name);
                        $("#beginTime").val(rList[i].ad_stime);
                        $("#endTime").val(rList[i].ad_etime);
                        $("#href").val(rList[i].ad_url);
                        $("#note").val(rList[i].ad_note);
                        $("#file6").attr('src', rList[i].ad_photo);
                    }
                    if (number == rList[i].ad_posi) {
                        $("#advertName").val(rList[i].ad_name);
                        $("#beginTime").val(rList[i].ad_stime);
                        $("#endTime").val(rList[i].ad_etime);
                        $("#href").val(rList[i].ad_url);
                        $("#note").val(rList[i].ad_note);
                        $("#file6").attr('src', rList[i].ad_photo);
                    }
                }
            }
        }
        if (html.indexOf("条幅") != -1) {
            for (var i = 0; i < tList.length; i++) {
                $("#advertName").val(tList[i].ad_name);
                $("#beginTime").val(tList[i].ad_stime);
                $("#endTime").val(tList[i].ad_etime);
                $("#href").val(tList[i].ad_url);
                $("#note").val(tList[i].ad_note);
                $("#file6").attr('src', tList[i].ad_photo);
            }
        }
    });
    $(".close").click(function () {
        $(".mb").hide();
        window.parent.hideMask();
    });
    //保存编辑
    $(document).on('click', '.keep', function () {
        $(".mb").hide();
        window.parent.hideMask();
        if (addState == 0) {
            addAdvert();
        } else {
            updateAdvert();
        }
    });
    //保存广告位
    $(document).on('click', '.addAdv', function () {
        if ($(this).attr("advid") == "a") {
            var name = $(this).prev().val();
            var href = $(this).parent().parent().find('.b').val();
            var position = $(this).next().val();
            if (position == 1) {
                var target = document.getElementById("fileOne").files[0];
                href = http + "html/list-goods.html";
            }
            if (position == 2) {
                var target = document.getElementById("fileOnes").files[0];
            }
            if (position == 3) {
                var target = document.getElementById("fileTwo").files[0];
            }
            if (position == 4) {
                var target = document.getElementById("fileThree").files[0];
            }
            if (position == 5) {
                var target = document.getElementById("fileFour").files[0];
            }
            if (position == 6) {
                var target = document.getElementById("fileFive").files[0];
                href = http + "index01.html";
            }
            if (name == "") {
                $(".mini").show();
                window.parent.showMask();
                $("#p2").html("请填写必要信息");
                $("#p3").click(function () {
                    $(".mini").hide();
                    window.parent.hideMask();
                });
                return;
            }
            if (href != undefined) {
                if (href.substr(0, 7) != "https://") {
                    $(".mini").show();
                    window.parent.showMask();
                    $("#p2").html('请以"https://"开头');
                    $("#p3").click(function () {
                        $(".mini").hide();
                        window.parent.hideMask();
                    });
                    return;
                }
            }
            if (contune == 0) {
                contune = 1;
                var addMsg = new FormData();
                addMsg.append("uid", u_id);
                addMsg.append("sid", s_id);
                addMsg.append("ad_posi", parseInt(position));
                addMsg.append("ad_type", parseInt(5));
                addMsg.append("ad_name", name);
                addMsg.append("ad_stime", "");
                addMsg.append("ad_etime", "");
                addMsg.append("ad_url", href);
                addMsg.append("ad_note", "");
                addMsg.append("ad_photo", target);
                $.ajax({
                    url: http + "addAdvertAdmin",
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
                                $('input[type=text]').val('');
                                window.parent.hideMask();
                                classify();
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
        } else {
            //修改分类广告位
            var name = $(this).prev().val();
            var href = $(this).parent().parent().find('.b').val();
            var position = $(this).next().val();
            if (position == 1) {
                var target = document.getElementById("fileOne").files[0];
                href = http + "html/list-goods.html";
            }
            if (position == 2) {
                var target = document.getElementById("fileOnes").files[0];
            }
            if (position == 3) {
                var target = document.getElementById("fileTwo").files[0];
            }
            if (position == 4) {
                var target = document.getElementById("fileThree").files[0];
            }
            if (position == 5) {
                var target = document.getElementById("fileFour").files[0];
            }
            if (position == 6) {
                var target = document.getElementById("fileFive").files[0];
                href = http + "index01.html";
            }
            if (name == "") {
                $(".mini").show();
                window.parent.showMask();
                $("#p2").html("请填写必要信息");
                $("#p3").click(function () {
                    $(".mini").hide();
                    window.parent.hideMask();
                });
                return;
            }
            if (href != undefined) {
                if (href.substr(0, 7) != "https://") {
                    $(".mini").show();
                    window.parent.showMask();
                    $("#p2").html('请以"https://"开头');
                    $("#p3").click(function () {
                        $(".mini").hide();
                        window.parent.hideMask();
                    });
                    return;
                }
            }
            var idAdv = $(this).attr("advid");
            var addMsg = new Object();
            addMsg.uid = u_id;
            addMsg.sid = s_id;
            addMsg.ad_posi = parseInt(position);
            addMsg.ad_type = parseInt(5);
            addMsg.ad_name = name;
            addMsg.ad_stime = "";
            addMsg.ad_etime = "";
            addMsg.ad_url = href;
            addMsg.ad_id = idAdv;
            addMsg.ad_note = "";
            addMsg = JSON.stringify(addMsg);
            $.ajax({
                url: http + "updateAdvertAdmin",
                type: "POST",
                data: addMsg,
                cache: false,
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    if (data.success == true) {
                        contune = 0;
                        $(".mini").show();
                        window.parent.showMask();
                        $("#p2").html(data.msg);
                        $("#p3").click(function () {
                            $(".mini").hide();
                            $('input[type=text]').val('');
                            window.parent.hideMask();
                            classify();
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
    });
    //头幅区
    $(".advertising-head").click(function () {
        $(".btn").removeAttr("data_id");
        $(".btn").attr("state", "0");
        $(".content-r").show();
        $(".r-head").html('头幅区广告位<span></span>');
        $("#six").remove();
        $("#seven").remove();
        $("#eight").remove();
        $(".r-min li").show();
        hList = [];//头幅
        empty();
        onload();
    });
    //条幅区
    $(".advertising-t").click(function () {
        tf();
    });
    //分类区
    $(".advertising-classify").click(function () {
        $(".content-r").hide();
        $(".r-head").html('分类区广告位<span></span>');
        classify();
    });
    //特卖区
    $(".advertising-sale").click(function () {
        tSell();
    });
    //热卖区
    $(".advertising-hot").click(function () {
        rSell();
    });
    //修改图片
    $("#filePic").change(function () {
        if (addState == 1) {
            var target = document.getElementById("filePic").files[0];
            var addMsg = new FormData();
            addMsg.append("uid", u_id);
            addMsg.append("sid", s_id);
            addMsg.append("type", 4);
            addMsg.append("o_id", adId);
            addMsg.append("file", target);
            $.ajax({
                url: http + "upload",
                type: "post",
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
                            var html = $(".r-head").html();
                            if (html.indexOf("头幅") != -1) {
                                window.location.href = "advertising.html";
                            }
                            if (html.indexOf("条幅") != -1) {
                                tf();
                            }
                            if (html.indexOf("特卖") != -1) {
                                tSell();
                            }
                            if (html.indexOf("热卖") != -1) {
                                rSell();
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
    $("#fileOne").change(function () {
        var FileId = $(this).parent().find(".addAdv").attr("advid");
        if (FileId != "a") {
            var target = document.getElementById("fileOne").files[0];
            var addMsg = new FormData();
            addMsg.append("uid", u_id);
            addMsg.append("sid", s_id);
            addMsg.append("type", 4);
            addMsg.append("o_id", FileId);
            addMsg.append("file", target);
            $.ajax({
                url: http + "upload",
                type: "post",
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
                            classify();
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
    });
    $("#fileOnes").change(function () {
        var FileId = $(this).parent().find(".addAdv").attr("advid");
        if (FileId != "a") {
            var target = document.getElementById("fileOnes").files[0];
            var addMsg = new FormData();
            addMsg.append("uid", u_id);
            addMsg.append("sid", s_id);
            addMsg.append("type", 4);
            addMsg.append("o_id", FileId);
            addMsg.append("file", target);
            $.ajax({
                url: http + "upload",
                type: "post",
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
                            classify();
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
    });
    $("#fileTwo").change(function () {
        var FileId = $(this).parent().find(".addAdv").attr("advid");
        if (FileId != "a") {
            var target = document.getElementById("fileTwo").files[0];
            var addMsg = new FormData();
            addMsg.append("uid", u_id);
            addMsg.append("sid", s_id);
            addMsg.append("type", 4);
            addMsg.append("o_id", FileId);
            addMsg.append("file", target);
            $.ajax({
                url: http + "upload",
                type: "post",
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
                            classify();
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
    });
    $("#fileThree").change(function () {
        var FileId = $(this).parent().find(".addAdv").attr("advid");
        if (FileId != "a") {
            var target = document.getElementById("fileThree").files[0];
            var addMsg = new FormData();
            addMsg.append("uid", u_id);
            addMsg.append("sid", s_id);
            addMsg.append("type", 4);
            addMsg.append("o_id", FileId);
            addMsg.append("file", target);
            $.ajax({
                url: http + "upload",
                type: "post",
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
                            classify();
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
    });
    $("#fileFour").change(function () {
        var FileId = $(this).parent().find(".addAdv").attr("advid");
        if (FileId != "a") {
            var target = document.getElementById("fileFour").files[0];
            var addMsg = new FormData();
            addMsg.append("uid", u_id);
            addMsg.append("sid", s_id);
            addMsg.append("type", 4);
            addMsg.append("o_id", FileId);
            addMsg.append("file", target);
            $.ajax({
                url: http + "upload",
                type: "post",
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
                            classify();
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
    });
    $("#fileFive").change(function () {
        var FileId = $(this).parent().find(".addAdv").attr("advid");
        if (FileId != "a") {
            var target = document.getElementById("fileFive").files[0];
            var addMsg = new FormData();
            addMsg.append("uid", u_id);
            addMsg.append("sid", s_id);
            addMsg.append("type", 4);
            addMsg.append("o_id", FileId);
            addMsg.append("file", target);
            $.ajax({
                url: http + "upload",
                type: "post",
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
                            classify();
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
    });
});
//新增广告位
function addAdvert() {
    //获取今天零点时间戳
    var myDate = new Date();
//获取当前年
    var year = myDate.getFullYear();
//获取当前月
    var month = myDate.getMonth() + 1;
//获取当前日
    var date = myDate.getDate();
    var now = year + '/' + month + "/" + date + " " + 0 + ':' + 0 + ":" + 0;
    now = Date.parse(new Date(now));
    now = now / 1000;
    var html = $(".r-head").html();
    var ad_type = 0;
    if (html.indexOf("头幅") != -1) {
        ad_type = 1;
    }
    if (html.indexOf("特卖") != -1) {
        ad_type = 2;
    }
    if (html.indexOf("热卖") != -1) {
        ad_type = 3;
    }
    if (html.indexOf("条幅") != -1) {
        ad_type = 4;
    }
    var advertName = $("#advertName").val();
    var statime = $("#beginTime").val() + " " + "0:0:0";
    statime = Date.parse(new Date(statime));
    statime = statime / 1000;
    if (statime < now) {
        $(".mini").show();
        window.parent.showMask();
        $("#p2").html("开始时间不能小于今天");
        $("#p3").click(function () {
            $(".mini").hide();
            window.parent.hideMask();
        });
        return;
    }
    var endtime = $("#endTime").val() + " " + "23:59:59";
    endtime = Date.parse(new Date(endtime));
    endtime = endtime / 1000;
    if (endtime < statime) {
        $(".mini").show();
        window.parent.showMask();
        $("#p2").html("结束时间填写有误");
        $("#p3").click(function () {
            $(".mini").hide();
            window.parent.hideMask();
        });
        return;
    }
    var href = $("#href").val();
    var note = $("#note").val();
    var target = document.getElementById("filePic").files[0];
    //if (advertName == "" || statime == "" || endtime == "" || href == "") {
        if (advertName == "" || statime == "" || endtime == "") {
        $(".mini").show();
        window.parent.showMask();
        $("#p2").html("请填写必要信息");
        $("#p3").click(function () {
            $(".mini").hide();
            window.parent.hideMask();
        });
        return;
    }
    if (contune == 0) {
        contune = 1;
        //if (html.indexOf("头幅") != -1 || html.indexOf("条幅") != -1) {
            if (html.indexOf("条幅") != -1) {
            if (href.substr(0, 7) != "https://") {
                $(".mini").show();
                window.parent.showMask();
                $("#p2").html('请以"https://"开头');
                $("#p3").click(function () {
                    $(".mini").hide();
                    window.parent.hideMask();
                });
                contune = 0;
                return;
            }
        }
        var addMsg = new FormData();
        addMsg.append("uid", u_id);
        addMsg.append("sid", s_id);
        //addMsg.append("ad_id", "");
        //addMsg.append("ad_state", "");
        addMsg.append("ad_posi", parseInt(number));
        addMsg.append("ad_type", parseInt(ad_type));
        addMsg.append("ad_name", advertName);
        addMsg.append("ad_stime", statime);
        addMsg.append("ad_etime", endtime);
        addMsg.append("ad_url", href);
        addMsg.append("ad_note", note);
        addMsg.append("ad_photo", target);
        $.ajax({
            url: http + "addAdvertAdmin",
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
                        var html = $(".r-head").html();
                        if (html.indexOf("头幅") != -1) {
                            window.location.href = "advertising.html";
                        }
                        if (html.indexOf("条幅") != -1) {
                            tf();
                        }
                        if (html.indexOf("特卖") != -1) {
                            tSell();
                        }
                        if (html.indexOf("热卖") != -1) {
                            rSell();
                        }
                    });
                    $('input[type=text]').val('');
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

function onload() {
    var obj = new Object();
    obj.uid = u_id;
    obj.sid = s_id;
    var objs = JSON.stringify(obj);
    $.ajax({
        url: http + "queryAdvertAdmin",
        type: "POST",
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                hList = data.object.hList;
                for (var i = 0; i < data.object.hList.length; i++) {
                    var date = new Date(data.object.hList[i].ad_stime * 1000);
                    var Y = date.getFullYear();
                    var M = (date.getMonth() + 1);
                    var D = date.getDate();
                    data.object.hList[i].ad_stime = Y + "/" + M + "/" + D;
                    var date = new Date(data.object.hList[i].ad_etime * 1000);
                    var Y = date.getFullYear();
                    var M = (date.getMonth() + 1);
                    var D = date.getDate();
                    data.object.hList[i].ad_etime = Y + "/" + M + "/" + D;
                    if (data.object.hList[i].ad_state == 1) {
                        data.object.hList[i].ad_state = "正常"
                    } else {
                        data.object.hList[i].ad_state = "挂起";
                        $(this).parent().prev().find(".span2").html("已到期");
                    }
                    if (data.object.hList[i].ad_posi == 1) {
                        $("#pTitle1").html(data.object.hList[i].ad_name);
                        $("#a1").html(data.object.hList[i].ad_stime);
                        $("#a3").html(data.object.hList[i].ad_etime);
                        $("#a4").html(data.object.hList[i].ad_state);
                        $("#a5").html(data.object.hList[i].ad_note);
                        $("#a6").attr("data_id", data.object.hList[i].ad_id);
                        $("#a6").attr("state", "1");
                    }
                    if (data.object.hList[i].ad_posi == 2) {
                        $("#pTitle2").html(data.object.hList[i].ad_name);
                        $("#b1").html(data.object.hList[i].ad_stime);
                        $("#b3").html(data.object.hList[i].ad_etime);
                        $("#b4").html(data.object.hList[i].ad_state);
                        $("#b5").html(data.object.hList[i].ad_note);
                        $("#b6").attr("data_id", data.object.hList[i].ad_id);
                        $("#b6").attr("state", "1");
                    }
                    if (data.object.hList[i].ad_posi == 3) {
                        $("#pTitle3").html(data.object.hList[i].ad_name);
                        $("#c1").html(data.object.hList[i].ad_stime);
                        $("#c3").html(data.object.hList[i].ad_etime);
                        $("#c4").html(data.object.hList[i].ad_state);
                        $("#c5").html(data.object.hList[i].ad_note);
                        $("#c6").attr("data_id", data.object.hList[i].ad_id);
                        $("#c6").attr("state", "1");
                    }
                    if (data.object.hList[i].ad_posi == 4) {
                        $("#pTitle4").html(data.object.hList[i].ad_name);
                        $("#d1").html(data.object.hList[i].ad_stime);
                        $("#d3").html(data.object.hList[i].ad_etime);
                        $("#d4").html(data.object.hList[i].ad_state);
                        $("#d5").html(data.object.hList[i].ad_note);
                        $("#d6").attr("data_id", data.object.hList[i].ad_id);
                        $("#d6").attr("state", "1");
                    }
                    if (data.object.hList[i].ad_posi == 5) {
                        $("#pTitle5").html(data.object.hList[i].ad_name);
                        $("#e1").html(data.object.hList[i].ad_stime);
                        $("#e3").html(data.object.hList[i].ad_etime);
                        $("#e4").html(data.object.hList[i].ad_state);
                        $("#e5").html(data.object.hList[i].ad_note);
                        $("#e6").attr("data_id", data.object.hList[i].ad_id);
                        $("#e6").attr("state", "1");
                    }

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

//修改广告信息
function updateAdvert() {
//    //获取今天零点时间戳
//    var myDate = new Date();
////获取当前年
//    var year = myDate.getFullYear();
////获取当前月
//    var month = myDate.getMonth() + 1;
////获取当前日
//    var date = myDate.getDate();
//    var now = year + '/' + month + "/" + date + " " + 0 + ':' + 0 + ":" + 0;
//    now = Date.parse(new Date(now));
//    now = now / 1000;
    var html = $(".r-head").html();
    var ad_type = 0;
    if (html.indexOf("头幅") != -1) {
        ad_type = 1;
    }
    if (html.indexOf("特卖") != -1) {
        ad_type = 2;
    }
    if (html.indexOf("热卖") != -1) {
        ad_type = 3;
    }
    if (html.indexOf("条幅") != -1) {
        ad_type = 4;
    }
    var advertName = $("#advertName").val();
    var statime = $("#beginTime").val() + " " + "0:0:0";
    statime = Date.parse(new Date(statime));
    statime = statime / 1000;
    //if (statime < now) {
    //    $(".mini").show();
    //    window.parent.showMask();
    //    $("#p2").html("开始时间不能小于今天");
    //    $("#p3").click(function () {
    //        $(".mini").hide();
    //        window.parent.hideMask();
    //    });
    //    return;
    //}
    var endtime = $("#endTime").val() + " " + "23:59:59";
    endtime = Date.parse(new Date(endtime));
    endtime = endtime / 1000;
    if (endtime < statime) {
        $(".mini").show();
        window.parent.showMask();
        $("#p2").html("结束时间填写有误");
        $("#p3").click(function () {
            $(".mini").hide();
            window.parent.hideMask();
        });
        return;
    }
    var href = $("#href").val();
    var note = $("#note").val();
    var target = document.getElementById("filePic").files[0];
    //if (advertName == "" || statime == "" || endtime == "" || href == "") {
        if (advertName == "" || statime == "" || endtime == "" ) {
        $(".mini").show();
        window.parent.showMask();
        $("#p2").html("请填写必要信息");
        $("#p3").click(function () {
            $(".mini").hide();
            window.parent.hideMask();
        });
        return;
    }
    if (contune == 0) {
        contune = 1;
        //if (html.indexOf("头幅") != -1 || html.indexOf("条幅") != -1) {
            if (html.indexOf("条幅") != -1) {
            if (href.substr(0, 7) != "https://") {
                $(".mini").show();
                window.parent.showMask();
                $("#p2").html('请以"https://"开头');
                $("#p3").click(function () {
                    $(".mini").hide();
                    window.parent.hideMask();
                });
                contune = 0;
                return;
            }
        }
        var addMsg = new Object();
        addMsg.uid = u_id;
        addMsg.sid = s_id;
        addMsg.ad_posi = parseInt(number);
        addMsg.ad_type = parseInt(ad_type);
        addMsg.ad_name = advertName;
        addMsg.ad_stime = statime;
        addMsg.ad_etime = endtime;
        addMsg.ad_url = href;
        addMsg.ad_id = adId;
        addMsg.ad_note = note;
        addMsg = JSON.stringify(addMsg);
        //var addMsg = new FormData();
        //addMsg.append("uid", u_id);
        //addMsg.append("sid", s_id);
        //addMsg.append("ad_posi", parseInt(number));
        //addMsg.append("ad_type", parseInt(ad_type));
        //addMsg.append("ad_name", advertName);
        //addMsg.append("ad_stime", statime);
        //addMsg.append("ad_etime", endtime);
        //addMsg.append("ad_url", href);
        //addMsg.append("ad_note", note);
        //addMsg.append("ad_photo", target);
        $.ajax({
            url: http + "updateAdvertAdmin",
            type: "POST",
            data: addMsg,
            cache: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.success == true) {
                    contune = 0;
                    $(".mini").show();
                    window.parent.showMask();
                    $("#p2").html(data.msg);
                    $("#p3").click(function () {
                        $(".mini").hide();
                        window.parent.hideMask();
                        if (html.indexOf("头幅") != -1) {
                            window.location.href = "advertising.html";
                        }
                        if (html.indexOf("条幅") != -1) {
                            tf();
                        }
                        if (html.indexOf("特卖") != -1) {
                            tSell();
                        }
                        if (html.indexOf("热卖") != -1) {
                            rSell();
                        }
                    });
                    $('input[type=text]').val('');
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

function empty() {
    $("#pTitle1").html("");
    $("#a1").html("");
    $("#a2").html("");
    $("#a3").html("");
    $("#a4").html("");
    $("#a5").html("");
    $("#pTitle2").html("");
    $("#b1").html("");
    $("#b2").html("");
    $("#b3").html("");
    $("#b4").html("");
    $("#b5").html("");
    $("#pTitle3").html("");
    $("#c1").html("");
    $("#c2").html("");
    $("#c3").html("");
    $("#c4").html("");
    $("#c5").html("");
    $("#pTitle4").html("");
    $("#d1").html("");
    $("#d2").html("");
    $("#d3").html("");
    $("#d4").html("");
    $("#d5").html("");
    $("#pTitle5").html("");
    $("#e1").html("");
    $("#e2").html("");
    $("#e3").html("");
    $("#e4").html("");
    $("#e5").html("");
}
//特卖
function tSell() {
    $(".btn").removeAttr("data_id");
    $(".btn").attr("state", "0");
    $(".content-r").show();
    $(".r-head").html('特卖区广告位<span></span>');
    $("#six").remove();
    $("#seven").remove();
    $("#eight").remove();
    $(".r-min li").show();
    empty();
    var obj = new Object();
    obj.uid = u_id;
    obj.sid = s_id;
    var objs = JSON.stringify(obj);
    $.ajax({
        url: http + "queryAdvertAdmin",
        type: "POST",
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                sList = data.object.sList;
                for (var i = 0; i < data.object.sList.length; i++) {
                    var date = new Date(data.object.sList[i].ad_stime * 1000);
                    var Y = date.getFullYear();
                    var M = (date.getMonth() + 1);
                    var D = date.getDate();
                    data.object.sList[i].ad_stime = Y + "/" + M + "/" + D;
                    var date = new Date(data.object.sList[i].ad_etime * 1000);
                    var Y = date.getFullYear();
                    var M = (date.getMonth() + 1);
                    var D = date.getDate();
                    data.object.sList[i].ad_etime = Y + "/" + M + "/" + D;
                    if (data.object.sList[i].ad_state == 1) {
                        data.object.sList[i].ad_state = "正常"
                    } else {
                        data.object.sList[i].ad_state = "挂起";
                        $(this).parent().prev().find(".span2").html("已到期");
                    }
                    if (data.object.sList[i].ad_posi == 1) {
                        $("#pTitle1").html(data.object.sList[i].ad_name);
                        $("#a1").html(data.object.sList[i].ad_stime);
                        $("#a3").html(data.object.sList[i].ad_etime);
                        $("#a4").html(data.object.sList[i].ad_state);
                        $("#a5").html(data.object.sList[i].ad_note);
                        $("#a6").attr("data_id", data.object.sList[i].ad_id);
                        $("#a6").attr("state", "1");
                    }
                    if (data.object.sList[i].ad_posi == 2) {
                        $("#pTitle2").html(data.object.sList[i].ad_name);
                        $("#b1").html(data.object.sList[i].ad_stime);
                        $("#b3").html(data.object.sList[i].ad_etime);
                        $("#b4").html(data.object.sList[i].ad_state);
                        $("#b5").html(data.object.sList[i].ad_note);
                        $("#b6").attr("data_id", data.object.sList[i].ad_id);
                        $("#b6").attr("state", "1");
                    }
                    if (data.object.sList[i].ad_posi == 3) {
                        $("#pTitle3").html(data.object.sList[i].ad_name);
                        $("#c1").html(data.object.sList[i].ad_stime);
                        $("#c3").html(data.object.sList[i].ad_etime);
                        $("#c4").html(data.object.sList[i].ad_state);
                        $("#c5").html(data.object.sList[i].ad_note);
                        $("#c6").attr("data_id", data.object.sList[i].ad_id);
                        $("#c6").attr("state", "1");
                    }
                    if (data.object.sList[i].ad_posi == 4) {
                        $("#pTitle4").html(data.object.sList[i].ad_name);
                        $("#d1").html(data.object.sList[i].ad_stime);
                        $("#d3").html(data.object.sList[i].ad_etime);
                        $("#d4").html(data.object.sList[i].ad_state);
                        $("#d5").html(data.object.sList[i].ad_note);
                        $("#d6").attr("data_id", data.object.sList[i].ad_id);
                        $("#d6").attr("state", "1");
                    }
                    if (data.object.sList[i].ad_posi == 5) {
                        $("#pTitle5").html(data.object.sList[i].ad_name);
                        $("#e1").html(data.object.sList[i].ad_stime);
                        $("#e3").html(data.object.sList[i].ad_etime);
                        $("#e4").html(data.object.sList[i].ad_state);
                        $("#e5").html(data.object.sList[i].ad_note);
                        $("#e6").attr("data_id", data.object.sList[i].ad_id);
                        $("#e6").attr("state", "1");
                    }

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
    })
}
//热卖
function rSell() {
    $(".btn").removeAttr("data_id");
    $(".btn").attr("state", "0");
    $(".content-r").show();
    $(".r-head").html('热卖区广告位<span></span>');
    $(".r-min li").show();
    var length = $(".r-min>li").length;
    if (length == 5) {
        var str = '';
        str = ' <li id="six"><div class="banner-name"> <span class="span1">广告位⑥</span> <p id="pTitle6"></p><span class="span2"></span> ' +
            '</div> <div class="banner-content"> <div class="b1">广告起始时间:</div> <div class="b2" id="f1"></div>' +
            ' <div class="b1">对应商品编号:</div> <div class="b2" id="f2"></div>' +
            ' <div class="b1">广告结束时间:</div> <div class="b2" id="f3"></div> <div class="b1">广告位状态:</div> <div class="b2" id="f4"></div> ' +
            '<div class="b1">备注:</div> <div class="b3" id="f5"></div> </div> <div class="btn" id="f6" state="0">编辑 </div>   <input type="hidden" value="6"></li>' +
            '<li id="seven"><div class="banner-name"> <span class="span1">广告位⑦</span> <p id="pTitle7"></p><span class="span2"></span>' +
            ' </div> <div class="banner-content"> <div class="b1">广告起始时间:</div> <div class="b2" id="g1"></div>' +
            ' <div class="b1">对应商品编号:</div> <div class="b2" id="g2"></div> <div class="b1">广告结束时间:</div> ' +
            '<div class="b2" id="g3"></div> <div class="b1">广告位状态:</div> <div class="b2" id="g4"></div> ' +
            '<div class="b1">备注:</div> <div class="b3" id="g5"></div> </div> <div class="btn" id="g6" state="0">编辑 </div>   <input type="hidden" value="7"></li>' +
            '<li id="eight"><div class="banner-name"> <span class="span1">广告位⑧</span> <p id="pTitle8"></p><span class="span2"></span> </div>' +
            ' <div class="banner-content"> <div class="b1">广告起始时间:</div> <div class="b2" id="h1"></div> ' +
            '<div class="b1">对应商品编号:</div> <div class="b2" id="h2"></div> <div class="b1">广告结束时间:</div> <div class="b2" id="h3"></div>' +
            ' <div class="b1">广告位状态:</div> <div class="b2" id="h4"></div> <div class="b1">备注:</div> <div class="b3" id="h5"></div> </div>' +
            ' <div class="btn" id="h6" state="0">编辑 </div>  <input type="hidden" value="8"> </li>';
        $(".r-min").append(str);
    }
    empty();
    var obj = new Object();
    obj.uid = u_id;
    obj.sid = s_id;
    var objs = JSON.stringify(obj);
    $.ajax({
        url: http + "queryAdvertAdmin",
        type: "POST",
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                rList = data.object.rList;
                for (var i = 0; i < data.object.rList.length; i++) {
                    var date = new Date(data.object.rList[i].ad_stime * 1000);
                    var Y = date.getFullYear();
                    var M = (date.getMonth() + 1);
                    var D = date.getDate();
                    data.object.rList[i].ad_stime = Y + "/" + M + "/" + D;
                    var date = new Date(data.object.rList[i].ad_etime * 1000);
                    var Y = date.getFullYear();
                    var M = (date.getMonth() + 1);
                    var D = date.getDate();
                    data.object.rList[i].ad_etime = Y + "/" + M + "/" + D;
                    if (data.object.rList[i].ad_state == 1) {
                        data.object.rList[i].ad_state = "正常"
                    } else {
                        data.object.rList[i].ad_state = "挂起"
                    }
                    if (data.object.rList[i].ad_posi == 1) {
                        $("#pTitle1").html(data.object.rList[i].ad_name);
                        $("#a1").html(data.object.rList[i].ad_stime);
                        $("#a2").html(data.object.rList[i].ad_url);
                        $("#a3").html(data.object.rList[i].ad_etime);
                        $("#a4").html(data.object.rList[i].ad_state);
                        $("#a5").html(data.object.rList[i].ad_note);
                        $("#a6").attr("data_id", data.object.rList[i].ad_id);
                        $("#a6").attr("state", "1");
                    }
                    if (data.object.rList[i].ad_posi == 2) {
                        $("#pTitle2").html(data.object.rList[i].ad_name);
                        $("#b1").html(data.object.rList[i].ad_stime);
                        $("#b2").html(data.object.rList[i].ad_url);
                        $("#b3").html(data.object.rList[i].ad_etime);
                        $("#b4").html(data.object.rList[i].ad_state);
                        $("#b5").html(data.object.rList[i].ad_note);
                        $("#b6").attr("data_id", data.object.rList[i].ad_id);
                        $("#b6").attr("state", "1");
                    }
                    if (data.object.rList[i].ad_posi == 3) {
                        $("#pTitle3").html(data.object.rList[i].ad_name);
                        $("#c1").html(data.object.rList[i].ad_stime);
                        $("#c2").html(data.object.rList[i].ad_url);
                        $("#c3").html(data.object.rList[i].ad_etime);
                        $("#c4").html(data.object.rList[i].ad_state);
                        $("#c5").html(data.object.rList[i].ad_note);
                        $("#c6").attr("data_id", data.object.rList[i].ad_id);
                        $("#c6").attr("state", "1");
                    }
                    if (data.object.rList[i].ad_posi == 4) {
                        $("#pTitle4").html(data.object.rList[i].ad_name);
                        $("#d1").html(data.object.rList[i].ad_stime);
                        $("#d2").html(data.object.rList[i].ad_url);
                        $("#d3").html(data.object.rList[i].ad_etime);
                        $("#d4").html(data.object.rList[i].ad_state);
                        $("#d5").html(data.object.rList[i].ad_note);
                        $("#d6").attr("data_id", data.object.rList[i].ad_id);
                        $("#d6").attr("state", "1");
                    }
                    if (data.object.rList[i].ad_posi == 5) {
                        $("#pTitle5").html(data.object.rList[i].ad_name);
                        $("#e1").html(data.object.rList[i].ad_stime);
                        $("#e2").html(data.object.rList[i].ad_url);
                        $("#e3").html(data.object.rList[i].ad_etime);
                        $("#e4").html(data.object.rList[i].ad_state);
                        $("#e5").html(data.object.rList[i].ad_note);
                        $("#e6").attr("data_id", data.object.rList[i].ad_id);
                        $("#e6").attr("state", "1");
                    }
                    if (data.object.rList[i].ad_posi == 6) {
                        $("#pTitle6").html(data.object.rList[i].ad_name);
                        $("#f1").html(data.object.rList[i].ad_stime);
                        $("#f2").html(data.object.rList[i].ad_url);
                        $("#f3").html(data.object.rList[i].ad_etime);
                        $("#f4").html(data.object.rList[i].ad_state);
                        $("#f5").html(data.object.rList[i].ad_note);
                        $("#f6").attr("data_id", data.object.rList[i].ad_id);
                        $("#f6").attr("state", "1");
                    }
                    if (data.object.rList[i].ad_posi == 7) {
                        $("#pTitle7").html(data.object.rList[i].ad_name);
                        $("#g1").html(data.object.rList[i].ad_stime);
                        $("#g2").html(data.object.rList[i].ad_url);
                        $("#g3").html(data.object.rList[i].ad_etime);
                        $("#g4").html(data.object.rList[i].ad_state);
                        $("#g5").html(data.object.rList[i].ad_note);
                        $("#g6").attr("data_id", data.object.rList[i].ad_id);
                        $("#g6").attr("state", "1");
                    }
                    if (data.object.rList[i].ad_posi == 8) {
                        $("#pTitle8").html(data.object.rList[i].ad_name);
                        $("#h1").html(data.object.rList[i].ad_stime);
                        $("#h2").html(data.object.rList[i].ad_url);
                        $("#h3").html(data.object.rList[i].ad_etime);
                        $("#h4").html(data.object.rList[i].ad_state);
                        $("#h5").html(data.object.rList[i].ad_note);
                        $("#h6").attr("data_id", data.object.rList[i].ad_id);
                        $("#h6").attr("state", "1");
                    }

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
//条幅
function tf() {
    $(".btn").removeAttr("data_id");
    $(".btn").attr("state", "0");
    $(".content-r").show();
    $(".r-head").html('条幅区广告位<span></span>');
    $("#six").remove();
    $("#seven").remove();
    $("#eight").remove();
    $(".r-min li").hide();
    $("#liFirst").show();
    empty();
    var obj = new Object();
    obj.uid = u_id;
    obj.sid = s_id;
    var objs = JSON.stringify(obj);
    $.ajax({
        url: http + "queryAdvertAdmin",
        type: "POST",
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                tList = data.object.tList;
                for (var i = 0; i < data.object.tList.length; i++) {
                    var date = new Date(data.object.tList[i].ad_stime * 1000);
                    var Y = date.getFullYear();
                    var M = (date.getMonth() + 1);
                    var D = date.getDate();
                    data.object.tList[i].ad_stime = Y + "/" + M + "/" + D;
                    var date = new Date(data.object.tList[i].ad_etime * 1000);
                    var Y = date.getFullYear();
                    var M = (date.getMonth() + 1);
                    var D = date.getDate();
                    data.object.tList[i].ad_etime = Y + "/" + M + "/" + D;
                    if (data.object.tList[i].ad_state == 1) {
                        data.object.tList[i].ad_state = "正常"
                    } else {
                        data.object.tList[i].ad_state = "挂起";
                        $(this).parent().prev().find(".span2").html("已到期");
                    }
                    if (data.object.tList[i].ad_posi == 1) {
                        $("#pTitle1").html(data.object.tList[i].ad_name);
                        $("#a1").html(data.object.tList[i].ad_stime);
                        $("#a3").html(data.object.tList[i].ad_etime);
                        $("#a4").html(data.object.tList[i].ad_state);
                        $("#a5").html(data.object.tList[i].ad_note);
                        $("#a6").attr("data_id", data.object.tList[i].ad_id);
                        $("#a6").attr("state", "1");
                    }
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
//分类
function classify() {
    $('input[type=text]').val("");
    var obj = new Object();
    obj.uid = u_id;
    obj.sid = s_id;
    var objs = JSON.stringify(obj);
    $.ajax({
        url: http + "queryAdvertAdmin",
        type: "POST",
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                //cList = data.object.cList;
                for (var i = 0; i < data.object.cList.length; i++) {
                    if (data.object.cList[i].ad_posi == 1) {
                        $("#input1").val(data.object.cList[i].ad_name);
                        //$("#href1").val(data.object.cList[i].ad_url);
                        $("#file0").attr("src", data.object.cList[i].ad_photo);
                        $("#save1").attr("advId", data.object.cList[i].ad_id);
                    }
                    if (data.object.cList[i].ad_posi == 2) {
                        $("#input2").val(data.object.cList[i].ad_name);
                        $("#href2").val(data.object.cList[i].ad_url);
                        $("#file1").attr("src", data.object.cList[i].ad_photo);
                        $("#save2").attr("advId", data.object.cList[i].ad_id);
                    }
                    if (data.object.cList[i].ad_posi == 3) {
                        $("#input3").val(data.object.cList[i].ad_name);
                        $("#href3").val(data.object.cList[i].ad_url);
                        $("#file2").attr("src", data.object.cList[i].ad_photo);
                        $("#save3").attr("advId", data.object.cList[i].ad_id);
                    }
                    if (data.object.cList[i].ad_posi == 4) {
                        $("#input4").val(data.object.cList[i].ad_name);
                        $("#href4").val(data.object.cList[i].ad_url);
                        $("#file3").attr("src", data.object.cList[i].ad_photo);
                        $("#save4").attr("advId", data.object.cList[i].ad_id);
                    }
                    if (data.object.cList[i].ad_posi == 5) {
                        $("#input5").val(data.object.cList[i].ad_name);
                        $("#href5").val(data.object.cList[i].ad_url);
                        $("#file4").attr("src", data.object.cList[i].ad_photo);
                        $("#save5").attr("advId", data.object.cList[i].ad_id);
                    }
                    if (data.object.cList[i].ad_posi == 6) {
                        $("#input6").val(data.object.cList[i].ad_name);
                        //$("#href6").val(data.object.cList[i].ad_url);
                        $("#file5").attr("src", data.object.cList[i].ad_photo);
                        $("#save6").attr("advId", data.object.cList[i].ad_id);
                    }
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