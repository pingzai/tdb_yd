/**
 * Created by KQ on 2016/12/14.
 */
var http = "https://www.railwaybaby.com/";
var u_id = sessionStorage.u_id;
var s_id = sessionStorage.s_id;
$(function () {
    $("input[type=checkbox]").removeAttr("checked");
    $("#userName").html(sessionStorage.name);
    $("#beginTime").fdatepicker();
    $("#endTime").fdatepicker();
    onload();
    lists();
    $('.export').on('click',function(){
        var str="";
        var a;
        var b;
        var c;
        var d;
        var e;
        var f;
        var g;
        $('#list>li').each(function(i,el){
            if($('#list>li').eq(i).find('input').is(':checked')==true){
                a=$('#list>li').eq(i).find('.partA>span').text();
                $('#list>li').eq(i).find('div.part>div.partContent').each(function(l,el){
                    b=$('#list>li').eq(i).find('div.part>div.partContent').eq(l).find('div:nth-child(2)').text();
                    c=$('#list>li').eq(i).find('div.part>div.partContent').eq(l).find('div:nth-child(3)').text();
                    if(!$('#list>li').eq(i).find('div.part>div.partContent').eq(l).find('div:nth-child(4)').find('p:nth-child(2)').text()){
                        d=$('#list>li').eq(i).find('div.part>div.partContent').eq(l).find('div:nth-child(4)').find('p:nth-child(1)').text()
                    }else{
                        d=$('#list>li').eq(i).find('div.part>div.partContent').eq(l).find('div:nth-child(4)').find('p:nth-child(2)').text()
                    }
                    e=$('#list>li').eq(i).find('div.part>div.partContent').eq(l).find('div:nth-child(5)').text()
                    f=$('#list>li').eq(i).find('div.part>div.partContent').eq(l).find('div:nth-child(6)').text()
                    g=$('#list>li').eq(i).find('div.part>div.partContent').eq(l).find('div:nth-child(8)').text()
                    str+="<tr> <td>"+a+"</td> <td>"+b+"</td> <td>"+c+"</td> <td>"+d+"</td> <td>"+e+"</td> <td>"+f+"</td><td>"+g+"</td></tr>";
                })
            }
        });
        $("#newTbody").empty().append(str);
        method1(newTable);
        //$("#list>li>.part>.partContent").each(function(){
        //    if($(this).prev().find("input").is(':checked')==true){
        //         a=$(this).prev().find("input").next().html();
        //         b=$(this).find("div").eq(1).html();
        //         c=$(this).find("div").eq(2).html();
        //         d=$(this).find("div").eq(3).find("p").eq(1).html();
        //         e=$(this).find("div").eq(4).html();
        //         f=$(this).find("div").eq(5).html();
        //         g=$(this).find("div").eq(7).html();
        //        if(d==""){
        //            d=$(this).find("div").eq(3).find("p").html();
        //        }
        //        //alert(b);
        //        str+="<tr> <td>"+a+"</td> <td>"+b+"</td> <td>"+c+"</td> <td>"+d+"</td> <td>"+e+"</td> <td>"+f+"</td><td>"+g+"</td></tr>";
        //        $("#newTbody").empty().append(str);
        //    }
        //});
    });
    //条件筛选
    $(".condition").click(function () {
        $(this).hide();
        $(".partThree").slideDown(150);
        $(".partFour").fadeIn(150);
        $(".mb").show();
    });
    //收起
    $(".partFour").click(function () {
        $(this).hide();
        $(".partThree").slideUp(150);
        $(".condition").fadeIn(150);
        $(".mb").hide();
    });
    //$(".list li .partContent").click(function () {
    //    window.location.href = "orderInformation.html";
    //});
    //按订单号搜索
    $("#find").click(function () {
        var find = $("#orderNum").val();
        //if (find == "") {
        //    lists();
        //}
        var obj = new Object();
        obj.uid = u_id;
        obj.sid = s_id;
        obj.statime = "";
        obj.endtime = "";
        obj.username = "";
        obj.sellername = "";
        obj.userphone = "";
        obj.o_state = "";
        obj.o_id = find;
        var objs = JSON.stringify(obj);
        var str="";
        $("#list").html(str);
        //alert(objs);
        //return;
        $.ajax({
            url: http + "queryOrderAdmin ",
            type: "POST",
            data: objs,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.success == true) {
                    for (var i = 0; i < data.object.length; i++) {
                        var date = new Date(data.object[i].o_time * 1000);
                        var Y = date.getFullYear() + '-';
                        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                        var D = date.getDate() + ' ';
                        var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                        var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                        data.object[i].o_time = Y + M + D + h + ":" + m;
                        if(data.object[i].o_state==1){
                            data.object[i].o_state="待付款";
                        }
                        if(data.object[i].o_state==2){
                            data.object[i].o_state="待发货";
                        }
                        if(data.object[i].o_state==3){
                            data.object[i].o_state="待收货";
                        }
                        if(data.object[i].o_state==4){
                            data.object[i].o_state="已完成";
                        }
                        if(data.object[i].o_state==5){
                            data.object[i].o_state="退款中";
                        }
                        if(data.object[i].o_state==6){
                            data.object[i].o_state="退款成功";
                        }
                        if(data.object[i].o_state==7){
                            data.object[i].o_state="退款失败";
                        }
                        if(data.object[i].o_state==8){
                            data.object[i].o_state="自提";
                        }
                        str = ' <li><div class="part"><div class="partTitle"><p class="partA"><input type="checkbox"/>订单号：<span>' + data.object[i].o_id + '</span></p> ' +
                            '<p class="partB">订单创建时间:<span>' + data.object[i].o_time + '</span></p> </div>';
                        for (var x = 0; x < data.object[i].list.length; x++) {
                            if(x>0){
                                data.object[i].s_name="";
                                data.object[i].o_price="";
                                data.object[i].o_state="";
                            }
                            str += '<div class= "partContent" onclick="msg(' + data.object[i].o_id+')"> ' +
                                '<div class="img"><img src='+data.object[i].list[x].i_cover+'></div> <div style="width: 250px;margin-left: 35px">'+data.object[i].list[x].i_name+'</div> ' +
                                '<div style="width: 45px;">'+data.object[i].list[x].g_count+'</div> <div style="width: 100px;margin-left: 16px"><p class="price">'+data.object[i].list[x].g_price+'</p><p>'+data.object[i].list[x].g_rprice+'</p></div> ' +
                                '<div style="width: 170px;">'+data.object[i].u_name+'</div> <div style="width: 250px;margin-left: 11px">'+data.object[i].s_name+'</div> ' +
                                '<div style="width: 40px">'+data.object[i].o_price+'</div> <div style="width: 100px;margin-left: 42px">'+data.object[i].o_state+'</div> </div>';
                        }
                        str += ' </div> </li>';
                        $("#list").append(str);
                    }
                    $(".partContent").each(function(){
                        if($(this).find(".price").next().html()==""){
                            $(this).find(".price").removeAttr("class")
                        }
                    });
                    $(".tcdPageCode").remove();
                    var pageStr=''
                    pageStr='<div class="tcdPageCode"></div>';
                    $(".list").append(pageStr);
                    var pageCourt=data.totalpage;
                    $(".tcdPageCode").createPage({
                        pageCount: pageCourt,
                        current: 1,
                        backFn: function (p) {
                            $("#list").html("");
                            $.ajax({
                                url: http + "queryOrderAdmin",
                                type: "POST",
                                data: JSON.stringify({"uid":u_id,"sid":s_id,"start":p}),
                                dataType: "json",
                                contentType: "application/json",
                                success: function (data) {
                                    if (data.success == true) {
                                        var pageCourt = data.totalpage;
                                        for (var i = 0; i < data.object.length; i++) {
                                            var date = new Date(data.object[i].o_time * 1000);
                                            var Y = date.getFullYear() + '-';
                                            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                                            var D = date.getDate() + ' ';
                                            var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                                            var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                                            data.object[i].o_time = Y + M + D + h + ":" + m;
                                            if (data.object[i].o_state == 1) {
                                                data.object[i].o_state = "待付款";
                                            }
                                            if (data.object[i].o_state == 2) {
                                                data.object[i].o_state = "待发货";
                                            }
                                            if (data.object[i].o_state == 3) {
                                                data.object[i].o_state = "待收货";
                                            }
                                            if (data.object[i].o_state == 4) {
                                                data.object[i].o_state = "已完成";
                                            }
                                            if (data.object[i].o_state == 5) {
                                                data.object[i].o_state = "退款中";
                                            }
                                            if (data.object[i].o_state == 6) {
                                                data.object[i].o_state = "退款成功";
                                            }
                                            if (data.object[i].o_state == 7) {
                                                data.object[i].o_state = "退款失败";
                                            }
                                            if (data.object[i].o_state == 8) {
                                                data.object[i].o_state = "自提";
                                            }
                                            str = ' <li><div class="part"><div class="partTitle"><p class="partA"><input type="checkbox"/>订单号：<span>' + data.object[i].o_id + '</span></p> ' +
                                                '<p class="partB">订单创建时间:<span>' + data.object[i].o_time + '</span></p> </div>';
                                            for (var x = 0; x < data.object[i].list.length; x++) {
                                                if (x > 0) {
                                                    data.object[i].s_name = "";
                                                    data.object[i].o_price = "";
                                                    data.object[i].o_state = "";
                                                }
                                                str += '<div class= "partContent" onclick="msg(' + data.object[i].o_id + ')"> ' +
                                                    '<div class="img"><img src=' + data.object[i].list[x].i_cover + '></div> <div style="width: 250px;margin-left: 35px">' + data.object[i].list[x].i_name + '</div> ' +
                                                    '<div style="width: 45px;">' + data.object[i].list[x].g_count + '</div> <div style="width: 100px;margin-left: 16px"><p class="price">' + data.object[i].list[x].g_price + '</p><p>' + data.object[i].list[x].g_rprice + '</p></div> ' +
                                                    '<div style="width: 170px;">' + data.object[i].u_name + '</div> <div style="width: 250px;margin-left: 11px">' + data.object[i].s_name + '</div> ' +
                                                    '<div style="width: 40px">' + data.object[i].o_price + '</div> <div style="width: 100px;margin-left: 42px">' + data.object[i].o_state + '</div> </div>';
                                            }
                                            str += ' </div> </li>';
                                            $("#list").append(str);
                                        }
                                        $(".partContent").each(function () {
                                            if ($(this).find(".price").next().html() == "") {
                                                $(this).find(".price").removeAttr("class")
                                            }
                                        });
                                    }
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
    //按条件搜索
    $("#searchBtn").click(function () {
        $(".partFour").hide();
        $(".partThree").slideUp(150);
        $(".condition").fadeIn(150);
        $(".mb").hide();
        var statime = $("#beginTime").val();
        statime = Date.parse(new Date(statime));
        statime = statime / 1000;
        var endtime = $("#endTime").val();
        endtime = Date.parse(new Date(endtime));
        endtime = endtime / 1000;
        var orderState = $("#orderState").val();
        if (orderState == 0) {
            orderState = "";
        }
        var obj = new Object();
        obj.uid = u_id;
        obj.sid = s_id;
        obj.statime = statime;
        obj.endtime = endtime;
        obj.username = $("#name").val();
        obj.sellername = $("#seller").val();
        obj.userphone = $("#userphone").val();
        obj.o_state = parseInt(orderState);
        obj.o_id = "";
        var objs = JSON.stringify(obj);
        var str = '';
        $("#list").html("");
        $.ajax({
            url: http + "queryOrderAdmin ",
            type: "POST",
            data: objs,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.success == true) {
                    for (var i = 0; i < data.object.length; i++) {
                        var date = new Date(data.object[i].o_time * 1000);
                        var Y = date.getFullYear() + '-';
                        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                        var D = date.getDate() + ' ';
                        var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                        var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                        data.object[i].o_time = Y + M + D + h + ":" + m;
                        if(data.object[i].o_state==1){
                            data.object[i].o_state="待付款";
                        }
                        if(data.object[i].o_state==2){
                            data.object[i].o_state="待发货";
                        }
                        if(data.object[i].o_state==3){
                            data.object[i].o_state="待收货";
                        }
                        if(data.object[i].o_state==4){
                            data.object[i].o_state="已完成";
                        }
                        if(data.object[i].o_state==5){
                            data.object[i].o_state="退款中";
                        }
                        if(data.object[i].o_state==6){
                            data.object[i].o_state="退款成功";
                        }
                        if(data.object[i].o_state==7){
                            data.object[i].o_state="退款失败";
                        }
                        if(data.object[i].o_state==8){
                            data.object[i].o_state="自提";
                        }
                        str = ' <li><div class="part"><div class="partTitle"><p class="partA"><input type="checkbox"/>订单号：<span>' + data.object[i].o_id + '</span></p> ' +
                            '<p class="partB">订单创建时间:<span>' + data.object[i].o_time + '</span></p> </div>';
                        for (var x = 0; x < data.object[i].list.length; x++) {
                            if(x>0){
                                data.object[i].s_name="";
                                data.object[i].o_price="";
                                data.object[i].o_state="";
                            }
                            str += '<div class= "partContent" onclick="msg(' + data.object[i].o_id+')"> ' +
                                '<div class="img"><img src='+data.object[i].list[x].i_cover+'></div> <div style="width: 250px;margin-left: 35px">'+data.object[i].list[x].i_name+'</div> ' +
                                '<div style="width: 45px;">'+data.object[i].list[x].g_count+'</div> <div style="width: 100px;margin-left: 16px"><p class="price">'+data.object[i].list[x].g_price+'</p><p>'+data.object[i].list[x].g_rprice+'</p></div> ' +
                                '<div style="width: 170px;">'+data.object[i].u_name+'</div> <div style="width: 250px;margin-left: 11px">'+data.object[i].s_name+'</div> ' +
                                '<div style="width: 40px">'+data.object[i].o_price+'</div> <div style="width: 100px;margin-left: 42px">'+data.object[i].o_state+'</div> </div>';
                        }
                        str += ' </div> </li>';
                        $("#list").append(str);
                    }
                    $(".partContent").each(function(){
                        if($(this).find(".price").next().html()==""){
                            $(this).find(".price").removeAttr("class")
                        }
                    });
                    $(".tcdPageCode").remove();
                    var pageStr=''
                    pageStr='<div class="tcdPageCode"></div>';
                    $(".list").append(pageStr);
                    var pageCourt=data.totalpage;
                    $(".tcdPageCode").createPage({
                        pageCount: pageCourt,
                        current: 1,
                        backFn: function (p) {
                            $("#list").html("");
                            $.ajax({
                                url: http + "queryOrderAdmin",
                                type: "POST",
                                data: JSON.stringify({"uid":u_id,"sid":s_id,"start":p}),
                                dataType: "json",
                                contentType: "application/json",
                                success: function (data) {
                                    if (data.success == true) {
                                        var pageCourt = data.totalpage;
                                        for (var i = 0; i < data.object.length; i++) {
                                            var date = new Date(data.object[i].o_time * 1000);
                                            var Y = date.getFullYear() + '-';
                                            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                                            var D = date.getDate() + ' ';
                                            var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                                            var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                                            data.object[i].o_time = Y + M + D + h + ":" + m;
                                            if (data.object[i].o_state == 1) {
                                                data.object[i].o_state = "待付款";
                                            }
                                            if (data.object[i].o_state == 2) {
                                                data.object[i].o_state = "待发货";
                                            }
                                            if (data.object[i].o_state == 3) {
                                                data.object[i].o_state = "待收货";
                                            }
                                            if (data.object[i].o_state == 4) {
                                                data.object[i].o_state = "已完成";
                                            }
                                            if (data.object[i].o_state == 5) {
                                                data.object[i].o_state = "退款中";
                                            }
                                            if (data.object[i].o_state == 6) {
                                                data.object[i].o_state = "退款成功";
                                            }
                                            if (data.object[i].o_state == 7) {
                                                data.object[i].o_state = "退款失败";
                                            }
                                            if (data.object[i].o_state == 8) {
                                                data.object[i].o_state = "自提";
                                            }
                                            str = ' <li><div class="part"><div class="partTitle"><p class="partA"><input type="checkbox"/>订单号：<span>' + data.object[i].o_id + '</span></p> ' +
                                                '<p class="partB">订单创建时间:<span>' + data.object[i].o_time + '</span></p> </div>';
                                            for (var x = 0; x < data.object[i].list.length; x++) {
                                                if (x > 0) {
                                                    data.object[i].s_name = "";
                                                    data.object[i].o_price = "";
                                                    data.object[i].o_state = "";
                                                }
                                                str += '<div class= "partContent" onclick="msg(' + data.object[i].o_id + ')"> ' +
                                                    '<div class="img"><img src=' + data.object[i].list[x].i_cover + '></div> <div style="width: 250px;margin-left: 35px">' + data.object[i].list[x].i_name + '</div> ' +
                                                    '<div style="width: 45px;">' + data.object[i].list[x].g_count + '</div> <div style="width: 100px;margin-left: 16px"><p class="price">' + data.object[i].list[x].g_price + '</p><p>' + data.object[i].list[x].g_rprice + '</p></div> ' +
                                                    '<div style="width: 170px;">' + data.object[i].u_name + '</div> <div style="width: 250px;margin-left: 11px">' + data.object[i].s_name + '</div> ' +
                                                    '<div style="width: 40px">' + data.object[i].o_price + '</div> <div style="width: 100px;margin-left: 42px">' + data.object[i].o_state + '</div> </div>';
                                            }
                                            str += ' </div> </li>';
                                            $("#list").append(str);
                                        }
                                        $(".partContent").each(function () {
                                            if ($(this).find(".price").next().html() == "") {
                                                $(this).find(".price").removeAttr("class")
                                            }
                                        });
                                    }
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

    //导出
    var idTmr;
    function  getExplorer() {
        var explorer = window.navigator.userAgent ;
        //ie
        if (explorer.indexOf("MSIE") >= 0) {
            return 'ie';
        }
        //firefox
        else if (explorer.indexOf("Firefox") >= 0) {
            return 'Firefox';
        }
        //Chrome
        else if(explorer.indexOf("Chrome") >= 0){
            return 'Chrome';
        }
        //Opera
        else if(explorer.indexOf("Opera") >= 0){
            return 'Opera';
        }
        //Safari
        else if(explorer.indexOf("Safari") >= 0){
            return 'Safari';
        }
    }
    function method1(tableid) {//整个表格拷贝到EXCEL中
        if(getExplorer()=='ie')
        {
            var curTbl = document.getElementById(tableid);
            var oXL = new ActiveXObject("Excel.Application");

            //创建AX对象excel
            var oWB = oXL.Workbooks.Add();
            //获取workbook对象
            var xlsheet = oWB.Worksheets(1);
            //激活当前sheet
            var sel = document.body.createTextRange();
            sel.moveToElementText(curTbl);
            //把表格中的内容移到TextRange中
            sel.select;
            //全选TextRange中内容
            sel.execCommand("Copy");
            //复制TextRange中内容
            xlsheet.Paste();
            //粘贴到活动的EXCEL中
            oXL.Visible = true;
            //设置excel可见属性

            try {
                var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
            } catch (e) {
                print("Nested catch caught " + e);
            } finally {
                oWB.SaveAs(fname);
                oWB.Close(savechanges = false);
                //xls.visible = false;
                oXL.Quit();
                oXL = null;
                //结束excel进程，退出完成
                //window.setInterval("Cleanup();",1);
                idTmr = window.setInterval("Cleanup();", 1);

            }

        }
        else
        {
            tableToExcel(tableid)
        }
    }
    function Cleanup() {
        window.clearInterval(idTmr);
        CollectGarbage();
    }
    var tableToExcel = (function() {
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="https://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
            format = function(s, c) {
                return s.replace(/{(\w+)}/g,
                    function(m, p) { return c[p]; }) }
        return function(table, name) {
            if (!table.nodeType) table = document.getElementById(table);
            var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
            window.location.href = uri + base64(format(template, ctx))
        }
    })()
});
//全选
function checkAll(obj) {
    $(".list input[type='checkbox']").prop('checked', $(obj).prop('checked'));
}
//获取所有卖家
function onload() {
    var obj = new Object();
    obj.i_state = 1;
    obj.uid = u_id;
    obj.sid = s_id;
    var objs = JSON.stringify(obj);
    var html = "";
    html = '<option value=""></option>';
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
                    str += '<option value=' + data.object[i].s_name + '>' + data.object[i].s_name + '</option>';
                }
                $("#seller").append(html + str);
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
//获取全部订单列表
function lists() {
    $("#list").html("");
    var obj = new Object();
    obj.uid = u_id;
    obj.sid = s_id;
    obj.statime = "";
    obj.endtime = "";
    obj.username = "";
    obj.sellername = "";
    obj.userphone = "";
    obj.o_state = "";
    obj.o_id = "";
    obj.start = 1;
    var objs = JSON.stringify(obj);
    var str = '';
    $.ajax({
        url: http + "queryOrderAdmin ",
        type: "POST",
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                var pageCourt=data.totalpage;
                for (var i = 0; i < data.object.length; i++) {
                    var date = new Date(data.object[i].o_time * 1000);
                    var Y = date.getFullYear() + '-';
                    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                    var D = date.getDate() + ' ';
                    var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                    var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                    data.object[i].o_time = Y + M + D + h + ":" + m;
                    if(data.object[i].o_state==1){
                        data.object[i].o_state="待付款";
                    }
                    if(data.object[i].o_state==2){
                        data.object[i].o_state="待发货";
                    }
                    if(data.object[i].o_state==3){
                        data.object[i].o_state="待收货";
                    }
                    if(data.object[i].o_state==4){
                        data.object[i].o_state="已完成";
                    }
                    if(data.object[i].o_state==5){
                        data.object[i].o_state="退款中";
                    }
                    if(data.object[i].o_state==6){
                        data.object[i].o_state="退款成功";
                    }
                    if(data.object[i].o_state==7){
                        data.object[i].o_state="退款失败";
                    }
                    if(data.object[i].o_state==8){
                        data.object[i].o_state="自提";
                    }
                    str = ' <li><div class="part"><div class="partTitle"><p class="partA"><input type="checkbox"/>订单号：<span>' + data.object[i].o_id + '</span></p> ' +
                        '<p class="partB">订单创建时间:<span>' + data.object[i].o_time + '</span></p> </div>';
                    for (var x = 0; x < data.object[i].list.length; x++) {
                        if(x>0){
                            data.object[i].s_name="";
                            data.object[i].o_price="";
                            data.object[i].o_state="";
                        }
                        str += '<div class= "partContent" onclick="msg(' + data.object[i].o_id+')"> ' +
                            '<div class="img"><img src='+data.object[i].list[x].i_cover+'></div> <div style="width: 250px;margin-left: 35px">'+data.object[i].list[x].i_name+'</div> ' +
                            '<div style="width: 45px;">'+data.object[i].list[x].g_count+'</div> <div style="width: 100px;margin-left: 16px"><p class="price">'+data.object[i].list[x].g_price+'</p><p>'+data.object[i].list[x].g_rprice+'</p></div> ' +
                            '<div style="width: 170px;">'+data.object[i].u_name+'</div> <div style="width: 250px;margin-left: 11px">'+data.object[i].s_name+'</div> ' +
                            '<div style="width: 40px">'+data.object[i].o_price+'</div> <div style="width: 100px;margin-left: 42px">'+data.object[i].o_state+'</div> </div>';
                    }
                    str += ' </div> </li>';
                    $("#list").append(str);
                }
                $(".partContent").each(function(){
                    if($(this).find(".price").next().html()==""){
                       $(this).find(".price").removeAttr("class")
                    }
                });
                $(".tcdPageCode").createPage({
                    pageCount: pageCourt,
                    current: 1,
                    backFn: function (p) {
                        $("#list").html("");
                        $.ajax({
                            url: http + "queryOrderAdmin",
                            type: "POST",
                            data: JSON.stringify({"uid":u_id,"sid":s_id,"start":p}),
                            dataType: "json",
                            contentType: "application/json",
                            success: function (data) {
                                if (data.success == true) {
                                    var pageCourt = data.totalpage;
                                    for (var i = 0; i < data.object.length; i++) {
                                        var date = new Date(data.object[i].o_time * 1000);
                                        var Y = date.getFullYear() + '-';
                                        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                                        var D = date.getDate() + ' ';
                                        var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                                        var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                                        data.object[i].o_time = Y + M + D + h + ":" + m;
                                        if (data.object[i].o_state == 1) {
                                            data.object[i].o_state = "待付款";
                                        }
                                        if (data.object[i].o_state == 2) {
                                            data.object[i].o_state = "待发货";
                                        }
                                        if (data.object[i].o_state == 3) {
                                            data.object[i].o_state = "待收货";
                                        }
                                        if (data.object[i].o_state == 4) {
                                            data.object[i].o_state = "已完成";
                                        }
                                        if (data.object[i].o_state == 5) {
                                            data.object[i].o_state = "退款中";
                                        }
                                        if (data.object[i].o_state == 6) {
                                            data.object[i].o_state = "退款成功";
                                        }
                                        if (data.object[i].o_state == 7) {
                                            data.object[i].o_state = "退款失败";
                                        }
                                        if (data.object[i].o_state == 8) {
                                            data.object[i].o_state = "自提";
                                        }
                                        str = ' <li><div class="part"><div class="partTitle"><p class="partA"><input type="checkbox"/>订单号：<span>' + data.object[i].o_id + '</span></p> ' +
                                            '<p class="partB">订单创建时间:<span>' + data.object[i].o_time + '</span></p> </div>';
                                        for (var x = 0; x < data.object[i].list.length; x++) {
                                            if (x > 0) {
                                                data.object[i].s_name = "";
                                                data.object[i].o_price = "";
                                                data.object[i].o_state = "";
                                            }
                                            str += '<div class= "partContent" onclick="msg(' + data.object[i].o_id + ')"> ' +
                                                '<div class="img"><img src=' + data.object[i].list[x].i_cover + '></div> <div style="width: 250px;margin-left: 35px">' + data.object[i].list[x].i_name + '</div> ' +
                                                '<div style="width: 45px;">' + data.object[i].list[x].g_count + '</div> <div style="width: 100px;margin-left: 16px"><p class="price">' + data.object[i].list[x].g_price + '</p><p>' + data.object[i].list[x].g_rprice + '</p></div> ' +
                                                '<div style="width: 170px;">' + data.object[i].u_name + '</div> <div style="width: 250px;margin-left: 11px">' + data.object[i].s_name + '</div> ' +
                                                '<div style="width: 40px">' + data.object[i].o_price + '</div> <div style="width: 100px;margin-left: 42px">' + data.object[i].o_state + '</div> </div>';
                                        }
                                        str += ' </div> </li>';
                                        $("#list").append(str);
                                    }
                                    $(".partContent").each(function () {
                                        if ($(this).find(".price").next().html() == "") {
                                            $(this).find(".price").removeAttr("class")
                                        }
                                    });
                                }
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
//订单列表的筛选
function listChange() {
    var o_state = $("#listChange").val();
    if (o_state == 0) {
        o_state = "";
    }
    var obj = new Object();
    obj.uid = u_id;
    obj.sid = s_id;
    obj.statime = "";
    obj.endtime = "";
    obj.username = "";
    obj.sellername = "";
    obj.userphone = "";
    obj.o_state = parseInt(o_state);
    obj.o_id = "";
    var objs = JSON.stringify(obj);
    var str = '';
    $("#list").html(str);
    $.ajax({
        url: http + "queryOrderAdmin ",
        type: "POST",
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                for (var i = 0; i < data.object.length; i++) {
                    var date = new Date(data.object[i].o_time * 1000);
                    var Y = date.getFullYear() + '-';
                    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                    var D = date.getDate() + ' ';
                    var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                    var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                    data.object[i].o_time = Y + M + D + h + ":" + m;
                    if(data.object[i].o_state==1){
                        data.object[i].o_state="待付款";
                    }
                    if(data.object[i].o_state==2){
                        data.object[i].o_state="待发货";
                    }
                    if(data.object[i].o_state==3){
                        data.object[i].o_state="待收货";
                    }
                    if(data.object[i].o_state==4){
                        data.object[i].o_state="已完成";
                    }
                    if(data.object[i].o_state==5){
                        data.object[i].o_state="退款中";
                    }
                    if(data.object[i].o_state==6){
                        data.object[i].o_state="退款成功";
                    }
                    if(data.object[i].o_state==7){
                        data.object[i].o_state="退款失败";
                    }
                    if(data.object[i].o_state==8){
                        data.object[i].o_state="自提";
                    }
                    str = ' <li><div class="part"><div class="partTitle"><p class="partA"><input type="checkbox"/>订单号：<span>' + data.object[i].o_id + '</span></p> ' +
                        '<p class="partB">订单创建时间:<span>' + data.object[i].o_time + '</span></p> </div>';
                    for (var x = 0; x < data.object[i].list.length; x++) {
                        if(x>0){
                            data.object[i].s_name="";
                            data.object[i].o_price="";
                            data.object[i].o_state="";
                        }
                        str += '<div class= "partContent" onclick="msg(' + data.object[i].o_id+')"> ' +
                            '<div class="img"><img src='+data.object[i].list[x].i_cover+'></div> <div style="width: 250px;margin-left: 35px">'+data.object[i].list[x].i_name+'</div> ' +
                            '<div style="width: 45px;">'+data.object[i].list[x].g_count+'</div> <div style="width: 100px;margin-left: 16px"><p class="price">'+data.object[i].list[x].g_price+'</p><p>'+data.object[i].list[x].g_rprice+'</p></div> ' +
                            '<div style="width: 170px;">'+data.object[i].u_name+'</div> <div style="width: 250px;margin-left: 11px">'+data.object[i].s_name+'</div> ' +
                            '<div style="width: 40px">'+data.object[i].o_price+'</div> <div style="width: 100px;margin-left: 42px">'+data.object[i].o_state+'</div> </div>';
                    }
                    str += ' </div> </li>';
                    $("#list").append(str);
                }
                $(".partContent").each(function(){
                    if($(this).find(".price").next().html()==""){
                        $(this).find(".price").removeAttr("class")
                    }
                });
                $(".tcdPageCode").remove();
                var pageStr=''
                pageStr='<div class="tcdPageCode"></div>';
                $(".list").append(pageStr);
                var pageCourt=data.totalpage;
                $(".tcdPageCode").createPage({
                    pageCount: pageCourt,
                    current: 1,
                    backFn: function (p) {
                        $("#list").html("");
                        $.ajax({
                            url: http + "queryOrderAdmin",
                            type: "POST",
                            data: JSON.stringify({"uid":u_id,"sid":s_id,"start":p}),
                            dataType: "json",
                            contentType: "application/json",
                            success: function (data) {
                                if (data.success == true) {
                                    var pageCourt = data.totalpage;
                                    for (var i = 0; i < data.object.length; i++) {
                                        var date = new Date(data.object[i].o_time * 1000);
                                        var Y = date.getFullYear() + '-';
                                        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                                        var D = date.getDate() + ' ';
                                        var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                                        var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                                        data.object[i].o_time = Y + M + D + h + ":" + m;
                                        if (data.object[i].o_state == 1) {
                                            data.object[i].o_state = "待付款";
                                        }
                                        if (data.object[i].o_state == 2) {
                                            data.object[i].o_state = "待发货";
                                        }
                                        if (data.object[i].o_state == 3) {
                                            data.object[i].o_state = "待收货";
                                        }
                                        if (data.object[i].o_state == 4) {
                                            data.object[i].o_state = "已完成";
                                        }
                                        if (data.object[i].o_state == 5) {
                                            data.object[i].o_state = "退款中";
                                        }
                                        if (data.object[i].o_state == 6) {
                                            data.object[i].o_state = "退款成功";
                                        }
                                        if (data.object[i].o_state == 7) {
                                            data.object[i].o_state = "退款失败";
                                        }
                                        if (data.object[i].o_state == 8) {
                                            data.object[i].o_state = "自提";
                                        }
                                        str = ' <li><div class="part"><div class="partTitle"><p class="partA"><input type="checkbox"/>订单号：<span>' + data.object[i].o_id + '</span></p> ' +
                                            '<p class="partB">订单创建时间:<span>' + data.object[i].o_time + '</span></p> </div>';
                                        for (var x = 0; x < data.object[i].list.length; x++) {
                                            if (x > 0) {
                                                data.object[i].s_name = "";
                                                data.object[i].o_price = "";
                                                data.object[i].o_state = "";
                                            }
                                            str += '<div class= "partContent" onclick="msg(' + data.object[i].o_id + ')"> ' +
                                                '<div class="img"><img src=' + data.object[i].list[x].i_cover + '></div> <div style="width: 250px;margin-left: 35px">' + data.object[i].list[x].i_name + '</div> ' +
                                                '<div style="width: 45px;">' + data.object[i].list[x].g_count + '</div> <div style="width: 100px;margin-left: 16px"><p class="price">' + data.object[i].list[x].g_price + '</p><p>' + data.object[i].list[x].g_rprice + '</p></div> ' +
                                                '<div style="width: 170px;">' + data.object[i].u_name + '</div> <div style="width: 250px;margin-left: 11px">' + data.object[i].s_name + '</div> ' +
                                                '<div style="width: 40px">' + data.object[i].o_price + '</div> <div style="width: 100px;margin-left: 42px">' + data.object[i].o_state + '</div> </div>';
                                        }
                                        str += ' </div> </li>';
                                        $("#list").append(str);
                                    }
                                    $(".partContent").each(function () {
                                        if ($(this).find(".price").next().html() == "") {
                                            $(this).find(".price").removeAttr("class")
                                        }
                                    });
                                }
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
//查看订单详情
function msg(id) {
    window.location.href = "orderInformation.html?id=" + id;
}
