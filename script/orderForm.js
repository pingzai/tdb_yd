/**
 * Created by Administrator on 2017/1/3.
 */https://www.railwaybaby.com/index01.html?emp_id=0&code=0419mxc01FgM6325wYa01UdSc019mxcH&state=state1&from=singlemessage&isappinstalled=0
$(function(){
    var http="https://www.railwaybaby.com/";
    var code = "0419mxc01FgM6325wYa01UdSc019mxcH";
//  var http = "http://192.168.1.45:9000/";
    //var code=window.localStorage.getItem('code') ? window.localStorage.getItem('code'):'';
    var empId=window.localStorage.getItem('empId');
    var state=location.href.split('?')[1].split('&')[0].split('=')[1];
    console.log(state)
        loadForm(code,state);

//时间戳转时间
function toDou(num){
    return num>=10?num:'0'+num;
}
(function($) {
    $.extend({
        myTime: {
            UnixToDate: function(unixTime) {
                var time = new Date(unixTime * 1000);
                var ymdhis = "";
                ymdhis += time.getFullYear() + "-";
                ymdhis += (time.getMonth()+1) + "-";
                ymdhis += time.getDate();
                ymdhis += " " + time.getHours() + ":";
                ymdhis += time.getMinutes() + ":";
                ymdhis += time.getSeconds();

                return ymdhis;

            },
            UnixToNumber: function(unixTime) {
                var time = new Date(unixTime * 1000);
                var numhis = "";
                numhis += time.getFullYear();
                numhis += toDou((time.getMonth()+1));
                numhis += toDou(time.getDate());
                numhis += toDou(time.getHours());
                numhis += toDou(time.getMinutes());
                numhis += toDou(time.getSeconds());
                
                return numhis;
            }
        }
    });
})(jQuery); 
      
//
    function loadForm(code,state) {
	 	//根据用户在个人中心页面点击跳转过来改变导航栏颜色
        $('.orderForm-list>li').each(function(){
            if($(this).attr('data-state')==state){
                $(this).addClass('orderForm-active').siblings('li').removeClass('orderForm-active');
            }
        });
        $.ajax({
            url:http+"wxQueryOrderList",
            type:'post',
            cache:false,
            data:JSON.stringify({'code':code,'state':state}),
            dataType:'json',
            contentType:"application/json",
            success:function(data){

                if(data.success==true){
                	//循环添加订单列表
                    var str01="";
                    $(data.object).each(function (a,el) {
                                               
                        var ordernumber = $.myTime.UnixToNumber(data.object[a].o_time)+data.object[a].o_id;
                        str01+='<div class="box1" data-state='+data.object[a].o_state+' data-oid='+data.object[a].o_id+' data-sid='+data.object[a].s_id+'> <ul class="u01"> <li> <div class="order-t"> <span class="span1">订单号：'+ordernumber+'</span> <span class="span2">待付款</span> </div> <ul class="order-m"></ul> </li> </ul> <div class="order-b1"> <span class="s1">邮费:</span> <span class="s2" style="font-size: 0.12rem">'+parseFloat(data.object[a].o_postage).toFixed(2)+'</span> </div><div class="order-b"> <span class="s1 s3">共 <i></i> 件商品</span> <span class="s2">合计: <i>￥'+parseFloat(data.object[a].o_price).toFixed(2)+'</i></span> </div></div>';

                    });
                    $('.orderForm-min').empty().append(str01);
                    $(data.object).each(function (i,el) {
                        var str02 = "";
                        $(data.object[i].list).each(function (l, el) {
                            str02 += ' <li data-gid=' + data.object[i].list[l].g_id + '> <div class="l"> <img class="lazy" src="../img/onload.gif" data-original='+ data.object[i].list[l].i_cover + ' alt=""/> </div> <div class="r"> <span class="g1">' + data.object[i].list[l].i_name + '</span> <span class="g2">￥' + parseFloat(data.object[i].list[l].price).toFixed(2) + '</span> <span class="g3">' + data.object[i].list[l].g_name + '</span> <span class="g4"></span> <span class="g5">x' + data.object[i].list[l].g_count + '</span> </div> </li>'
                        });
                        $('.order-m').eq(i).append(str02);
                    });
                    $('img.lazy').lazyload({
                        effect:'fadeIn'
                    });
                    
                    $(data.object).each(function (k,el) {
                        if(data.object[k].o_state==1){
                            var ordertime = $.myTime.UnixToDate(data.object[k].o_time);
                            $('.orderForm-min>div').eq(k).find('.order-t>.span2').text("待付款");
                            $('.orderForm-min>div').eq(k).append(' <i id="orderi">'+ordertime+'</i><span class="span03 orderFormPay_confirm">付款</span><span class="span02 orderFormPayr_findorder">取消订单</span>')
                        }else if(data.object[k].o_state==2){
                            $('.orderForm-min>div').eq(k).find('.order-t>.span2').text("待发货");
                            $('.orderForm-min>div').eq(k).append(' <span class="span03 orderFormDelivering_confirm">退款</span>')
                        }else if(data.object[k].o_state==3){
                            $('.orderForm-min>div').eq(k).find('.order-t>.span2').text("待收货");
                            $('.orderForm-min>div').eq(k).append(' <span class="span03 orderFormDeliver_confirm">确认收货</span><span class="span02 orderFormDeliver_refund">退款</span><span class="span01 orderFormDeliver_findorder">查看物流</span>')
                        }else if(data.object[k].o_state==4){
                            $('.orderForm-min>div').eq(k).find('.order-t>.span2').text("已完成");
                            $('.orderForm-min>div').eq(k).append('<span class="span03 orderFormFinish_confirm">删除订单</span><span class="span01 orderFormDeliver_findorder">查看物流</span>')
                        }
                    });
                    $('.orderForm-min>div').each(function (n,el) {
                        var num01=0;
                        num01=$(this).find('.order-m>li').length;
                        $(this).find('.s3').text("共"+num01+"件商品");
                    })
                }else{
                    if(data.state==1){
                        window.localStorage.setItem('share',location.href);
                        alertBg(1,'',data.msg);
                        $('#alertBtn01').on('click',function(){
                            window.location.href="httpss://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19f4a60762c40c37&redirect_uri=http%3A%2F%2Fwww.railwaybaby.com%2FtwoCode.html%3femp_id%3d0&response_type=code&scope=snsapi_userinfo&state=state1&connect_redirect=1#wechat_redirect"
                        })
                    }else{
                        $('.orderForm-min').empty().append("<p>"+data.msg+"</p>");
                    }

                }

            },
            error:function(){

            }
        });
    }
    //删除已完成订单========================
    $(document).on('click','.orderFormFinish_confirm',function () {
        var o_id=parseInt($(this).parent().attr('data-oid'));
        alertBg(2,'','确认删除该订单？');
        $('#alertBtn03').on('click',function(){
                $.ajax({
                    url:http+"wxDeleteOrder",
                    type:'post',
                    cache:false,
                    data:JSON.stringify({'code':code,'o_id':o_id}),
                    dataType:'json',
                    contentType:"application/json",
                    success:function(data){
                        if(data.success==true){
                            alertBg(1,'',data.msg);
                            $('#alertBtn01').one('click',function(){
                                for(var p=0;p<$('.orderForm-list>li').length;p++){
                                    if($('.orderForm-list>li').eq(p).hasClass('orderForm-active')){
                                        state=parseInt($('.orderForm-list>li').eq(p).attr('data-state'));
                                    }
                                }
                                loadForm(code,state);
                            })
                        }else{
                            alertBg(1,'',data.msg);
                        }

                    },
                    error:function(){

                    }
                });
        })

    });
    //确认收货==========================
     $(document).on('click','.orderFormDeliver_confirm',function(){
         var oid=$(this).parents('.box1').attr('data-oid');
         wxConfirmOrder(code,oid)
     });
    function wxConfirmOrder(code,oid){
        $.ajax({
            url:http+"wxConfirmOrder",
            type:'post',
            cache:false,
            data:JSON.stringify({'code':code,'o_id':oid}),
            dataType:'json',
            contentType:"application/json",
            success:function(data){
                if(data.success==true){
                    alertBg(1,'',data.msg);
                    $('#alertBtn01').on('click',function(){
                        for(var i=0;i<$('.orderForm-list>li').length;i++){
                            if($('.orderForm-list>li').eq(i).hasClass('orderForm-active')){
                                state=parseInt($('.orderForm-list>li').eq(i).attr('data-state'));
                            }
                        }
                        loadForm(code,state);
                    });

                }else{
                    alertBg(1,'',data.msg);
                }

            },
            error:function(){

            }
        });
    }
    //待付款里面的取消订单===================
    $(document).on('click','.orderFormPayr_findorder',function(){
        var oid=$(this).parents('.box1').attr('data-oid');
        var that=$(this);
        alertBg(2,"",'确认取消该订单？');
        $('#alertBtn03').on('click',function(){
            $.ajax({
                url:http+"wxCancleOrder",
                type:'post',
                cache:false,
                data:JSON.stringify({'code':code,'o_id':oid}),
                dataType:'json',
                contentType:"application/json",
                success:function(data){
                    if(data.success==true){
                        alertBg(1,'',data.msg);
                        for(var p=0;p<$('.orderForm-list>li').length;p++){
                            if($('.orderForm-list>li').eq(p).hasClass('orderForm-active')){
                                state=parseInt($('.orderForm-list>li').eq(p).attr('data-state'));
                            }
                        }
                        loadForm(code,state);
                    }else{
                        alertBg(1,'',data.msg)
                    }
                },
                error:function(){
                }
            });
        });
    });
    //付款========================
    $(document).on('click','.orderFormPay_confirm',function () {
        var oid=parseInt($(this).parent().attr('data-oid'));
        orderFormPay(code,oid)
    });
    //退款=================
    $(document).on('click','.orderFormDelivering_confirm',function(){
        alertBg(2,"",'申请退款，请联系QQ客服人员');
        $('#alertBtn03').on('click',function(){
            orderFormDelivering();
        })
        function orderFormDelivering(){
            window.location.href="serviceInformation.html";
        }
    });
    //查看物流============================
    $(document).on('click','.orderFormDeliver_findorder',function () {
//      window.location.href="html/logisticsFinish.html?code="+code+"&state=state1&from=singlemessage&isappinstalled=0";
		var oid=$(this).parents('.box1').attr('data-oid');
		window.localStorage.setItem('o_id',oid);
		window.location.href="logisticsDetails.html?code="+code+"&state="+oid;
    });
    //用户点击导航栏切换==================
    $('.orderForm-list>li').on('click',function(){
        $(this).addClass('orderForm-active').siblings('li').removeClass('orderForm-active');
        loadForm(code,parseInt($(this).attr('data-state')));
    });



    //订单详情============
    $(document).on('click','.order-m',function () {
        var num=parseInt($(this).parents('.box1').attr('data-oid'));
        $('.checkOrder').show();
        wxQueryOrder(code,num);
    });
    //订单详情关闭
    $('.box5>i').on('click',function(){
       $(this).parents('.checkOrder').hide();
    });
    var arr=['','待付款','待发货','待收货','已完成','退款中','退款成功','退款失败','自提'];
    var arr001=[{'付款':0},{'退款':1},{'取消订单':2},{'确认收货':3}];
    //详情相关信息=========
    $(document).on('click','.btnAdd',function(){
        var oid=$('.box2').attr('data-oid');
        if($(this).attr('data-s')==0){
            orderFormPay(code,oid)
        }
        if($(this).attr('data-s')==2){
            oid=$(this).parents('.box2').attr('data-oid');
            alertBg(2,"",'确认取消该订单？');
            $('#alertBtn03').on('click',function(){
                wxCancleOrder();
            })
            function wxCancleOrder(){
                $.ajax({
                    url:http+"wxCancleOrder",
                    type:'post',
                    cache:false,
                    data:JSON.stringify({'code':code,'o_id':oid}),
                    dataType:'json',
                    contentType:"application/json",
                    success:function(data){
                        if(data.success==true){
                            alertBg(1,'',data.msg);
                            $('#alertBtn01').one('click',function(){
                                window.location.href="orderForm.html?order=0";
                            })
                        }else{
                            alertBg(1,'',data.msg)
                        }
                    },
                    error:function(){
                        alertBg(1,'',data.msg)
                    }
                });
            }
        }
        if($(this).attr('data-s')==3){
            oid=$(this).parents('.box2').attr('data-oid');
            wxConfirmOrder(code,oid);
            function wxConfirmOrder(code,oid){
                $.ajax({
                    url:http+"wxConfirmOrder",
                    type:'post',
                    cache:false,
                    data:JSON.stringify({'code':code,'o_id':oid}),
                    dataType:'json',
                    contentType:"application/json",
                    success:function(data){
                        if(data.success==true){
                            alertBg(1,'',data.msg);
                            $('#alertBtn01').one('click',function(){
                                $('.checkOrder').hide();
                                loadForm(code,state);
                            })
                        }else{
                            alertBg(1,'',data.msg);
                        }

                    },
                    error:function(){
                        alertBg(1,'',data.msg);
                    }
                });
            }
        }
    });
    //详细物流========
    //wuliu()
    function wuliu(){
        var customer='96BD1E9B911A7CBB52B64D72C56916DC';
        var param={"com":"zhongtong", "num":"701231893557", "from":"", "to":""}
        var key='LpWvLlLj5530';
        var sign=hex_md5("{'com':'zhongtong','num':'701231893557','from':'','to':''}LpWvLlLj553096BD1E9B911A7CBB52B64D72C56916DC")
        $.ajax({
            url:'http://poll.kuaidi100.com/poll/query.do?customer=96BD1E9B911A7CBB52B64D72C56916DC&param={"com":"zhongtong","num":"701231893557","from":"","to":""}&sign=63F55BED1B713B089E764010C7826920',
            type:'POST',
            cache:false,
            data:{'sign':sign,'customer':customer,'key':key},
            dataType:'jsonp',
            contentType:"application/json",
            success:function(data){
                console.log(data);
            },
            error:function(data){
                //alert('查询失败，请核对您的信息')
            }
        });

    }
    function orderFormPay(code,oid){
        $.ajax({
            url:http+"wxpay/getWXsign",
            type:'post',
            cache:false,
            data:JSON.stringify({'code':code,'o_id':oid}),
            dataType:'json',
            contentType:"application/json",
            success:function(result){
                if(result.success==true){
                    function onBridgeReady(){
                        WeixinJSBridge.invoke(
                            'getBrandWCPayRequest', {
                                "appId" : result.object.appId,     //公众号名称，由商户传入
                                "timeStamp":result.object.timeStamp+"",//香蕉戳，自1970年以来的秒数
                                "nonceStr" : result.object.nonceStr,//随机串
                                "package" :  result.object.package,
                                "signType" : "MD5",         //微信签名方式:
                                "paySign" : result.object.sign //微信签名
                            },
                            function(res){
                                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                                    //alert("支付成功");
                                    window.location.href='makeTorderSuccess.html';
                                }
                                if(res.err_msg == "get_brand_wcpay_request:cancel"){
                                    alertBg(1,'','支付取消')
                                }
                                if(res.err_msg == "get_brand_wcpay_request:fail"){
                                    alertBg(1,'','支付失败')
                                }
                                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                            }
                        );
                    };
                    if(typeof WeixinJSBridge == "undefined"){
                        if(document.addEventListener){
                            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                        }else if(document.attachEvent){
                            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                        }
                    }else{
                        onBridgeReady();
                    }
                }else{
                    alertBg(1,'',result.msg)
                }

            },

            error : function(e) {
                alertBg(1,'',"支付错误,请重试!");
            }
        });
    }
    function wxQueryOrder(code,num){
        $.ajax({
            url:http+"wxQueryOrder",
            type:'post',
            cache:false,
            data:JSON.stringify({'code':code,'o_id':num}),
            dataType:'json',
            contentType:"application/json",
            success:function(data){

                console.log(JSON.stringify(data))
                if(data.success==true){
                    $('.box2').attr('data-oid',data.object.o_id);
                    $('.ul1').attr('data-state',data.object.o_state);
                    $('.r>.trackingN').text(data.object.o_awb);
                    $('.r>.trackingC').text(data.object.o_discount);
                    $('.r>.p5').text(data.object.rec_name+"  "+data.object.rec_phone);
                    $('.r>.p6').text(data.object.rec_address+"  "+data.object.rec_postcode);
                    $('.r>.p7').text($(".span1").text());
                    $('.r>.p8').text($("#orderi").text());
                    $('#s01').text(arr[data.object.o_state]);
                    //$('.top>.p4').find('span').text(data.object.rec_name+" "+data.object.rec_phone+" ; "+data.object.rec_address+" "+data.object.rec_postcode);
                    $('.postage>span').text(parseFloat(data.object.o_postage).toFixed(2)).parent().next().find('span').text("￥"+parseFloat(data.object.o_price).toFixed(2))
                    var str="";
                    $(data.object.list).each(function (i,el) {
                        str+=' <li data-gid='+data.object.list[i].g_id+'> <div class="l"> <img class="lazy" src="../img/onload.gif" data-original='+data.object.list[i].i_cover+' alt=""> </div> <div class="r"> <p class="p7">'+data.object.list[i].i_name+'</p> <p class="p8">'+data.object.list[i].g_name+'</p> <p class="p9">￥'+parseFloat(data.object.list[i].price).toFixed(2)+'</p><span class="s01">x'+data.object.list[i].g_count+'</span><div class="btnAdd" data-s="1">退款</div></div></li>';
                    });
                    $('.ul1').empty().append(str);
                    $('img.lazy').lazyload({
                        effect:'fadeIn'
                    });
                    $('.box2>.btnAdd').remove();
                    if( $('.ul1').attr('data-state')==1){
                        $('.ul1>li').find('.btnAdd').remove();
                        $('.box2').append(" <div class='btnAdd' data-s='0'>付款</div><div class='btnAdd' data-s='2'>取消订单</div>");
                    }else if($('.ul1').attr('data-state')==2){
                        $('.ul1>li').find('.btnAdd').show();
                        $('.box2>.btnAdd').remove();
                    }else if($('.ul1').attr('data-state')==3){
                        $('.ul1>li').find('.btnAdd').show();
                        $('.box2>.btnAdd').remove();
                        $('.box2').append(" <div class='btnAdd' data-s='3'>确认收货</div>");
                    }
                }else{
                    alertBg(1,'',data.msg)
                }
                //判断是否有物流
                //可以查看
                if(data.object.o_awb){
                    $('.box1>span').on('click',function(){
                        if($(this).attr('data-s')==0){
                            $(this).attr('data-s',1).css({"transform":"rotate(90deg)"}).siblings('ul').slideDown();

                        }else if($(this).attr('data-s')==1){
                            $(this).attr('data-s',0).css({"transform":"rotate(0deg)"}).siblings('ul').slideUp();
                        }
                    })

                }else{
                    //不可以查看
                    $('.trackingN').text('没有物流信息');
                    $('.trackingC').text('没有物流信息');
                }

            },
            error:function(){

            }
        });
    }
});