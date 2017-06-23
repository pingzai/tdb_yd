/**
 * Created by Administrator on 2017/1/6.
 */
var u_id = sessionStorage.u_id;
var s_id = sessionStorage.s_id;
var http = "https://www.railwaybaby.com:8443/";
var departmentId;
var departmentLev;
var strName;
$(function () {
    $("#userName").html(sessionStorage.name);
    $("input[type=text]").val("");
    onload();
    car();
/*    (function () {
        if ($('.append-distribution>li').length > 1) {
            $('.append-distribution>li').eq(1).addClass('append-active');
        }
    })()*/

    //$(document).on('mouseover','.append-li',function(){
    //    $(this).addClass('append-active').siblings('.append-li').removeClass('append-active')
    //
    //})
    //条件筛选
    $(".condition").click(function () {
        $(this).hide();
        $(".partThree").slideDown(150);
        $(".partFour").fadeIn(150);
        $("input[type=text]").val("");
        //$(".mb").show();
    });
    //收起
    $(".partFour").click(function () {
        $(this).hide();
        $(".partThree").slideUp(150);
        $(".condition").fadeIn(150);
        //$(".mb").hide();
    });
    $(document).on('mouseover','.append-li>.d1',function(){
        $(this).find('.code').show();
    });

    $(document).on('mouseout','.append-li>.d1',function(){
        $(this).find('.code').hide();
    });

    //新增
    //$('.append-distribution>.list').find('.d1').on('click', function (e) {
    //    e.stopPropagation();
    //    $(this).parents('.append-distribution').hide().siblings('.change-distribution').show();
    //})
        //保存并返回
        $('.release').on('click', function (e) {
            window.location.href="distribution.html";
            //e.stopPropagation()
            //var str = '';
            //if ($(this).attr('data-state') == 0) {
            //    str="<li class='append-li'><div class='d1'>查看二维码 <div class='code'> <img src='images/add3.png' alt=''/></div></div><div>"+$('#ipt01').val()+"</div><div>"+$('#ipt02').val()+"</div><div>"+$('#ipt04').val()+"</div> <div>"+$('#ipt03').val()+"</div> <div>"+$('#ipt05').val()+"</div> <div class='d7'>"+$('#state').val()+"</div></li>";
            //    $('.append-distribution').append(str);
            //}else{
            //     console.log($('.append-distribution>li').eq($(this).attr('data-state')))
            //
            //     $('.append-distribution>li').eq($(this).attr('data-state')).children('div').eq(1).text($('#ipt01').val()).next().text($('#ipt02').val()).next().text($('#ipt04').val()).next().text($('#ipt03').val()).next().text($('#ipt05').val()).next().text($('#state').val());
            //}
            //
            //$(this).parents('.change-distribution').hide().siblings('.append-distribution').show();
            //$(this).attr('data-state',0);
        });
     //已有信息更改
    //$('.append-distribution>li.append-li').on('click',function(){
    //    $('.release').attr('data-state',$(this).index());
    //    $(this).parents('.append-distribution').hide().siblings('.change-distribution').show();
    //})


    //查看详情
    $(document).on('click', '.append-li', function () {
        $(".tcdPageCode").remove();
        $(".content").hide();
           var id=$(this).attr("dataId");
        var obj = new Object();
        obj.uid = u_id;
        obj.sid = s_id;
        obj.u_id = id;
        var objs = JSON.stringify(obj);
        $.ajax({
            url: http+"getdistrilist",
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: objs,
            catch: false,
            success: function (data) {
                if (data.success == true) {
                    $("#ul").hide();
                    $(".change-distribution").show();
                    for(var i=0;i<data.object.length;i++){
                        if(data.object[i].totalcommission==null){
                            data.object[i].totalcommission="--"
                        }else {
                            data.object[i].totalcommission = parseFloat(data.object[i].totalcommission).toFixed(2);
                        }
                        if(data.object[i].totalorder==null){
                            data.object[i].totalorder="--"
                        }
                        if(data.object[i].u_state==1){
                            data.object[i].u_state="正常"
                        }
                        if(data.object[i].u_state==2){
                            data.object[i].u_state="挂起"
                        }
                        if(data.object[i].u_phone=="null"){
                            data.object[i].u_phone="--"
                        }
                       $("#ipt01").val(data.object[i].u_id);
                        $("#ipt04").val(data.object[i].u_phone);
                        $("#ipt02").val(data.object[i].u_name);
                        $("#ipt01").val(data.object[i].u_id);
                        $("#ipt03").val(data.object[i].totalorder);
                        $("#ipt05").val( data.object[i].totalcommission);
                    }
                    var qrcodes = new QRCode(document.getElementById("qrcode"), {
                        width : 600,
                        height : 580
                    });
                    function makeCode () {
                        qrcodes.makeCode("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19f4a60762c40c37&redirect_uri=https://www.railwaybaby.com/twoCode.html?emp_id="+data.object[0].u_id+"&response_type=code&scope=snsapi_userinfo&state=state1&connect_redirect=1#wechat_redirect");
                    }
                    makeCode();
                }
                else {
                    //alert(data.msg);
                }
            },
            error: function () {
                alert("未知错误");
            }
        });
    });
    $(".close").click(function () {
        $(".mb").hide();
        $(".allClass").hide();
    });
    //提交部门
    $(".submit").click(function(){
        dId = departmentId;
        $("#department").val(strName);
        $(".mb").hide();
        $(".allClass").hide();
    });
    //条件搜索
    $("#searchBtn").click(function(){
        $(".content").show();
        $(".change-distribution").hide();
        var car_id=$("#car").val();
        var obj = new Object();
        obj.uid = u_id;
        obj.sid = s_id;
        obj.car_id = car_id;
        obj.start = 1;
        obj.part_id = departmentId;
        var objs = JSON.stringify(obj);
        var str='';
        var strs='';
        $("#ul").html("");
        str=' <li class="list"><div></div><div>分销员编号</div><div>姓名</div><div>联系方式</div> <div class="d7">状态</div> </li>'
        $("#ul").append(str);
        $.ajax({
            url: http+"getdistrilist",
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: objs,
            catch: false,
            success: function (data) {
                if (data.success == true) {
                    for(var i=0;i<data.object.length;i++){
                        if(data.object[i].totalcommission==null){
                            data.object[i].totalcommission="--"
                        }else {
                            data.object[i].totalcommission = parseFloat(data.object[i].totalcommission).toFixed(2);
                        }
                        if(data.object[i].totalorder==null){
                            data.object[i].totalorder="--"
                        }
                        if(data.object[i].u_state==1){
                            data.object[i].u_state="正常"
                        }
                        if(data.object[i].u_state==2){
                            data.object[i].u_state="挂起"
                        }
                        if(data.object[i].u_phone=="null"){
                            data.object[i].u_phone="--"
                        }
                        strs=' <li dataId='+data.object[i].u_id+' class="append-li"><div class="d1">查看二维码<div class="code" id="qrcode'+i+'"></div> </div> ' +
                            '<div>'+data.object[i].u_id+'</div> <div>'+data.object[i].u_name+'</div> <div>'+data.object[i].u_phone+'</div>' +
                            '<div class="d7">'+data.object[i].u_state+'</div> </li>';
                        $("#ul").append(strs);
                        var code="qrcode"+i;
                        var qrcodes = new QRCode(document.getElementById(code), {
                            width : 100,
                            height : 100
                        });
                        function makeCode () {
                            qrcodes.makeCode("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19f4a60762c40c37&redirect_uri=https://www.railwaybaby.com/twoCode.html?emp_id="+data.object[i].u_id+"&response_type=code&scope=snsapi_userinfo&state=state1&connect_redirect=1#wechat_redirect");
                        }
                        makeCode();
                    }
                }
                else {
                    alert(data.msg);
                }
                $(".tcdPageCode").remove();
                var pageStr='';
                pageStr='<div class="tcdPageCode"></div>';
                $(".content").after(pageStr);
                var pageCourt=data.totalpage;
                $(".tcdPageCode").createPage({
                    pageCount: pageCourt,
                    current: 1,
                    backFn: function (p) {
                        var str='';
                        var strs='';
                        $("#ul").html("");
                        str=' <li class="list"><div></div><div>分销员编号</div><div>姓名</div><div>联系方式</div>  <div class="d7">状态</div> </li>';
                        $("#ul").append(str);
                        $.ajax({
                            url: http + "getdistrilist",
                            type: "post",
                            dataType: "json",
                            contentType: "application/json",
                            data: JSON.stringify({"uid": u_id, "sid": s_id, "start": p,"car_id":car_id,"part_id":departmentId}),
                            catch: false,
                            success: function (data) {
                                if (data.success == true) {
                                    for (var i = 0; i < data.object.length; i++) {
                                        if (data.object[i].totalcommission == null) {
                                            data.object[i].totalcommission = "--"
                                        } else {
                                            data.object[i].totalcommission = parseFloat(data.object[i].totalcommission).toFixed(2);
                                        }
                                        if (data.object[i].totalorder == null) {
                                            data.object[i].totalorder = "--"
                                        }
                                        if (data.object[i].u_state == 1) {
                                            data.object[i].u_state = "正常"
                                        }
                                        if (data.object[i].u_state == 2) {
                                            data.object[i].u_state = "挂起"
                                        }
                                        if (data.object[i].u_phone == "null") {
                                            data.object[i].u_phone = "--"
                                        }
                                        strs = ' <li dataId=' + data.object[i].u_id + ' class="append-li"><div class="d1">查看二维码<div class="code" id="qrcode' + i + '"></div> </div> ' +
                                            '<div>' + data.object[i].u_id + '</div> <div>' + data.object[i].u_name + '</div> <div>' + data.object[i].u_phone + '</div>' +
                                            '<div class="d7">' + data.object[i].u_state + '</div> </li>';
                                        //' <div>'+data.object[i].totalorder+'</div> <div>'+data.object[i].totalcommission+'</div> <div class="d7">'+data.object[i].u_state+'</div> </li>';
                                        $("#ul").append(strs);
                                        var code = "qrcode" + i;
                                        var qrcodes = new QRCode(document.getElementById(code), {
                                            width: 100,
                                            height: 100
                                        });
                                        function makeCode() {
                                            qrcodes.makeCode("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19f4a60762c40c37&redirect_uri=https://www.railwaybaby.com/twoCode.html?emp_id=" + data.object[i].u_id + "&response_type=code&scope=snsapi_userinfo&state=state1&connect_redirect=1#wechat_redirect");
                                        }
                                        makeCode();
                                    }
                                }
                                else {
                                    alert(data.msg);
                                }
                            }
                        })

                    }
                })
            },
            error: function () {
                alert("未知错误");
            }
        });
    })
    //姓名搜索
    $("#find").click(function(){
        var name=$("#search").val();
        var obj = new Object();
        obj.uid = u_id;
        obj.sid = s_id;
        obj.satart = 1;
        obj.u_name = name;
        var objs = JSON.stringify(obj);
        var str='';
        var strs='';
        $("#ul").html("");
        str=' <li class="list"><div></div><div>分销员编号</div><div>姓名</div><div>联系方式</div> <div class="d7">状态</div> </li>'
        $("#ul").append(str);
        $.ajax({
            url: http+"getdistrilist",
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: objs,
            catch: false,
            success: function (data) {
                if (data.success == true) {
                    for(var i=0;i<data.object.length;i++){
                        if(data.object[i].totalcommission==null){
                            data.object[i].totalcommission="--"
                        }else {
                            data.object[i].totalcommission = parseFloat(data.object[i].totalcommission).toFixed(2);
                        }
                        if(data.object[i].totalorder==null){
                            data.object[i].totalorder="--"
                        }
                        if(data.object[i].u_state==1){
                            data.object[i].u_state="正常"
                        }
                        if(data.object[i].u_state==2){
                            data.object[i].u_state="挂起"
                        }
                        if(data.object[i].u_phone=="null"){
                            data.object[i].u_phone="--"
                        }
                        strs=' <li dataId='+data.object[i].u_id+' class="append-li"><div class="d1">查看二维码<div class="code" id="qrcode'+i+'"></div> </div> ' +
                            '<div>'+data.object[i].u_id+'</div> <div>'+data.object[i].u_name+'</div> <div>'+data.object[i].u_phone+'</div>' +
                            '<div class="d7">'+data.object[i].u_state+'</div> </li>';
                        $("#ul").append(strs);
                        var code="qrcode"+i;
                        var qrcodes = new QRCode(document.getElementById(code), {
                            width : 100,
                            height : 100
                        });
                        function makeCode () {
                            qrcodes.makeCode("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19f4a60762c40c37&redirect_uri=https://www.railwaybaby.com/twoCode.html?emp_id="+data.object[i].u_id+"&response_type=code&scope=snsapi_userinfo&state=state1&connect_redirect=1#wechat_redirect");
                        }
                        makeCode();
                    }
                }
                else {
                    alert(data.msg);
                }
                $(".tcdPageCode").remove();
                var pageStr='';
                pageStr='<div class="tcdPageCode"></div>';
                $(".content").after(pageStr);
                var pageCourt=data.totalpage;
                $(".tcdPageCode").createPage({
                    pageCount: pageCourt,
                    current: 1,
                    backFn: function (p) {
                        var str='';
                        var strs='';
                        $("#ul").html("");
                        str=' <li class="list"><div></div><div>分销员编号</div><div>姓名</div><div>联系方式</div>  <div class="d7">状态</div> </li>';
                        $("#ul").append(str);
                        $.ajax({
                            url: http + "getdistrilist",
                            type: "post",
                            dataType: "json",
                            contentType: "application/json",
                            data: JSON.stringify({"uid": u_id, "sid": s_id, "start": p,"u_name":name}),
                            catch: false,
                            success: function (data) {
                                if (data.success == true) {
                                    for (var i = 0; i < data.object.length; i++) {
                                        if (data.object[i].totalcommission == null) {
                                            data.object[i].totalcommission = "--"
                                        } else {
                                            data.object[i].totalcommission = parseFloat(data.object[i].totalcommission).toFixed(2);
                                        }
                                        if (data.object[i].totalorder == null) {
                                            data.object[i].totalorder = "--"
                                        }
                                        if (data.object[i].u_state == 1) {
                                            data.object[i].u_state = "正常"
                                        }
                                        if (data.object[i].u_state == 2) {
                                            data.object[i].u_state = "挂起"
                                        }
                                        if (data.object[i].u_phone == "null") {
                                            data.object[i].u_phone = "--"
                                        }
                                        strs = ' <li dataId=' + data.object[i].u_id + ' class="append-li"><div class="d1">查看二维码<div class="code" id="qrcode' + i + '"></div> </div> ' +
                                            '<div>' + data.object[i].u_id + '</div> <div>' + data.object[i].u_name + '</div> <div>' + data.object[i].u_phone + '</div>' +
                                            '<div class="d7">' + data.object[i].u_state + '</div> </li>';
                                        //' <div>'+data.object[i].totalorder+'</div> <div>'+data.object[i].totalcommission+'</div> <div class="d7">'+data.object[i].u_state+'</div> </li>';
                                        $("#ul").append(strs);
                                        var code = "qrcode" + i;
                                        var qrcodes = new QRCode(document.getElementById(code), {
                                            width: 100,
                                            height: 100
                                        });
                                        function makeCode() {
                                            qrcodes.makeCode("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19f4a60762c40c37&redirect_uri=https://www.railwaybaby.com/twoCode.html?emp_id=" + data.object[i].u_id + "&response_type=code&scope=snsapi_userinfo&state=state1&connect_redirect=1#wechat_redirect");
                                        }
                                        makeCode();
                                    }
                                }
                                else {
                                    alert(data.msg);
                                }
                            }
                        })

                    }
                })
            },
            error: function () {
                alert("未知错误");
            }
        });
    })
});
function onload(){
    var obj = new Object();
    obj.uid = u_id;
    obj.sid = s_id;
    obj.start = 1;
    var objs = JSON.stringify(obj);
    var str='';
    var strs='';
    $("#ul").html("");
    str=' <li class="list"><div></div><div>分销员编号</div><div>姓名</div><div>联系方式</div>  <div class="d7">状态</div> </li>';
    $("#ul").append(str);
    $.ajax({
        url: http+"getdistrilist",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        data: objs,
        catch: false,
        success: function (data) {
            if (data.success == true) {
                for(var i=0;i<data.object.length;i++){
                    if(data.object[i].totalcommission==null){
                        data.object[i].totalcommission="--"
                    }else {
                        data.object[i].totalcommission = parseFloat(data.object[i].totalcommission).toFixed(2);
                    }
                    if(data.object[i].totalorder==null){
                        data.object[i].totalorder="--"
                    }
                    if(data.object[i].u_state==1){
                        data.object[i].u_state="正常"
                    }
                    if(data.object[i].u_state==2){
                        data.object[i].u_state="挂起"
                    }
                    if(data.object[i].u_phone=="null"){
                        data.object[i].u_phone="--"
                    }
                     strs=' <li dataId='+data.object[i].u_id+' class="append-li"><div class="d1">查看二维码<div class="code" id="qrcode'+i+'"></div> </div> ' +
                         '<div>'+data.object[i].u_id+'</div> <div>'+data.object[i].u_name+'</div> <div>'+data.object[i].u_phone+'</div>' +
                         '<div class="d7">'+data.object[i].u_state+'</div> </li>';
                         //' <div>'+data.object[i].totalorder+'</div> <div>'+data.object[i].totalcommission+'</div> <div class="d7">'+data.object[i].u_state+'</div> </li>';
                    $("#ul").append(strs);
                    var code="qrcode"+i;
                    var qrcodes = new QRCode(document.getElementById(code), {
                        width : 100,
                        height : 100
                    });
                    function makeCode () {
                        qrcodes.makeCode("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19f4a60762c40c37&redirect_uri=https://www.railwaybaby.com/twoCode.html?emp_id="+data.object[i].u_id+"&response_type=code&scope=snsapi_userinfo&state=state1&connect_redirect=1#wechat_redirect");
                    }
                    makeCode();
                }
            }
            else {
                alert(data.msg);
            }
            var pageCourt=data.totalpage;
            $(".tcdPageCode").createPage({
                pageCount: pageCourt,
                current: 1,
                backFn: function (p) {
                    var str='';
                    var strs='';
                    $("#ul").html("");
                    str=' <li class="list"><div></div><div>分销员编号</div><div>姓名</div><div>联系方式</div>  <div class="d7">状态</div> </li>';
                    $("#ul").append(str);
                    $.ajax({
                        url: http + "getdistrilist",
                        type: "post",
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify({"uid": u_id, "sid": s_id, "start": p}),
                        catch: false,
                        success: function (data) {
                            if (data.success == true) {
                                for (var i = 0; i < data.object.length; i++) {
                                    if (data.object[i].totalcommission == null) {
                                        data.object[i].totalcommission = "--"
                                    } else {
                                        data.object[i].totalcommission = parseFloat(data.object[i].totalcommission).toFixed(2);
                                    }
                                    if (data.object[i].totalorder == null) {
                                        data.object[i].totalorder = "--"
                                    }
                                    if (data.object[i].u_state == 1) {
                                        data.object[i].u_state = "正常"
                                    }
                                    if (data.object[i].u_state == 2) {
                                        data.object[i].u_state = "挂起"
                                    }
                                    if (data.object[i].u_phone == "null") {
                                        data.object[i].u_phone = "--"
                                    }
                                    strs = ' <li dataId=' + data.object[i].u_id + ' class="append-li"><div class="d1">查看二维码<div class="code" id="qrcode' + i + '"></div> </div> ' +
                                        '<div>' + data.object[i].u_id + '</div> <div>' + data.object[i].u_name + '</div> <div>' + data.object[i].u_phone + '</div>' +
                                        '<div class="d7">' + data.object[i].u_state + '</div> </li>';
                                    //' <div>'+data.object[i].totalorder+'</div> <div>'+data.object[i].totalcommission+'</div> <div class="d7">'+data.object[i].u_state+'</div> </li>';
                                    $("#ul").append(strs);
                                    var code = "qrcode" + i;
                                    var qrcodes = new QRCode(document.getElementById(code), {
                                        width: 100,
                                        height: 100
                                    });
                                    function makeCode() {
                                        qrcodes.makeCode("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19f4a60762c40c37&redirect_uri=https://www.railwaybaby.com/twoCode.html?emp_id=" + data.object[i].u_id + "&response_type=code&scope=snsapi_userinfo&state=state1&connect_redirect=1#wechat_redirect");
                                    }
                                    makeCode();
                                }
                            }
                            else {
                                alert(data.msg);
                            }
                        }
                    })

                }
            })
        },
        error: function () {
            alert("未知错误");
        }
    });
}
function car(){
    var obj = new Object();
    obj.uid = u_id;
    obj.sid = s_id;
    var objs = JSON.stringify(obj);
    var option = '';
    $("#car").html("");
    $.ajax({
        url: http + "queryAllCar",
        type: "post",
        data: objs,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.success == true) {
                for (var i = 0; i < data.object.length; i++) {
                    var option = '<option value=' + data.object[i].car_id + '>' + data.object[i].car_name + '</option>';
                    $("#car").append(option);
                }
                //选取部门
                $("#department").click(function () {
                    var car_id=$("#car").val();
                    $(".mb").show();
                    $(".allClass").show();
                    var obj = new Object();
                    obj.uid = u_id;
                    obj.sid = s_id;
                    obj.car_id = car_id;
                    obj.part_lev = 1;
                    var objs = JSON.stringify(obj);
                    var str = '';
                    str = '<div class="qq"></div>';
                    $('.allClass').find("div").remove();
                    $('.allClass').append(str);
                    $.ajax({
                        url: http + "queryPartmentByCarIdAndLev",
                        type: "post",
                        cache: false,
                        data: objs,
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {
                            if (data.success == true) {
                                for (var i = 0; i < data.object.length; i++) {
                                    str = '<a class="a" onclick="getId(' + data.object[i].part_id + ',' + data.object[i].part_lev + ')">' + data.object[i].part_name + '</a>';
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
                                    $(".mb").hide();
                                    $(".allClass").hide();
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
                $(document).on('click', '.a', function (e) {
                    var car_id=$("#car").val();
                    $(this).addClass("Click").siblings().removeClass("Click");
                    $(this).parent().siblings().find('a').removeClass("Click");
                    strName = $(this).html();
                    $(this).parent().nextAll().remove();
                    var obj = new Object();
                    obj.part_lev = departmentLev;
                    obj.part_rid = departmentId;
                    obj.car_id = car_id;
                    obj.uid = u_id;
                    obj.sid = s_id;
                    var objs = JSON.stringify(obj);
                    var str = '';
                    var str1 = '';
                    str1 = '<div class="qq"></div>';
                    $('.allClass').append(str1);
                    $.ajax({
                        url: http + "queryPartmentByCarIdAndLev",
                        type: "post",
                        cache: false,
                        data: objs,
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {
                            if (data.success == true) {
                                for (var i = 0; i < data.object.length; i++) {
                                    str = '<a class="a" onclick="getId(' + data.object[i].part_id + ',' + data.object[i].part_lev + ')">' + data.object[i].part_name + '</a>';
                                    $('.allClass div:last-child').append(str);
                                }
                            } else {
                                if (data.state == 1) {
                                    alert(data.msg);
                                    //$(".mini").show();
                                    //window.parent.showMask();
                                    //$("#p2").html(data.msg);
                                    //$("#p3").click(function () {
                                    //    $(".mini").hide();
                                    //    window.parent.hideMask();
                                    //    window.parent.login();
                                    //});
                                    return;
                                }
                                if (data.object == null) {
                                    dId = departmentId;
                                    $('.allClass div:last-child').remove();
                                    $("#department").val(strName);
                                    $(".mb").hide();
                                    $(".allClass").hide();
                                }
                            }
                        },
                        error: function (e) {
                            alert("未知错误");
                            //$(".mini").show();
                            //window.parent.showMask();
                            //$("#p2").html("未知错误");
                            //$("#p3").click(function () {
                            //    $(".mini").hide();
                            //    window.parent.hideMask();
                            //});
                        }
                    });
                });
            }
            else {
                alert(data.msg);
                //$(".mini").show();
                //$("#p2").html(data.msg);
                return;
            }
        },
        error: function () {
            alert("未知错误");
            return;
        }
    });
}
function getId(id, lev) {
    departmentId = id;
    lev = parseInt(lev) + 1;
    departmentLev = lev;
}