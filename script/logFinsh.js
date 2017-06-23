/**
 * Created by jianghu on 2017/3/2.
 */
$(function () {
    var http=window.localStorage.getItem('https');
    var code=window.localStorage.getItem('code');
    var empId=window.localStorage.getItem('empId');
    var num=parseInt(window.location.href.split("?")[2]);
    var arr=['','待付款','待发货','待收货','已完成','退款中','退款成功','退款失败','自提'];
    var arr001=[{'付款':0},{'退款':1},{'取消订单':2},{'确认收货':3}];
    //相关信息=========
    wxQueryOrder(code,num);
    $(document).on('click','.btnAdd',function(){
        var oid=$('.box2').attr('data-oid');

        if($(this).attr('data-s')==0){
            orderFormPay(code,oid)
        }
        if($(this).attr('data-s')==2){
            oid=$(this).parents('.box2').attr('data-oid');
            alertBg(2,wxCancleOrder,'确认取消该订单？');
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
                            $('#alertBtn01').on('click',function(){
                                window.location.href="orderForm.html?emp_id="+empId+"&code="+code+"&state=state1&from=singlemessage&isappinstalled=0?0";
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
                            $('#alertBtn01').on('click',function(){
                                window.location.href="orderForm.html?emp_id="+empId+"&code="+code+"&state=state1&from=singlemessage&isappinstalled=0?0";
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
            url:'https://poll.kuaidi100.com/poll/query.do?customer=96BD1E9B911A7CBB52B64D72C56916DC&param={"com":"zhongtong","num":"701231893557","from":"","to":""}&sign=63F55BED1B713B089E764010C7826920',
            type:'POST',
            cache:false,
            data:{'sign':sign,'customer':customer,'key':key},
            dataType:'jsonp',
            //contentType:"application/json",
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
                                    window.location.href='makeTorderSuccess.html?emp_id="+empId+"&code='+code+'&state=state1&from=singlemessage&isappinstalled=0';
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
                if(data.success==true){
                    $('.box2').attr('data-oid',data.object.o_id);
                    $('.ul1').attr('data-state',data.object.o_state);
                    $('.r>.trackingN').text(data.object.o_awb);
                    $('.r>.trackingC').text(data.object.o_discount);
                    $('.r>.p5').text(data.object.s_name);
                    $('.r>.p6').text(data.object.s_phone1+";"+data.object.s_phone2);
                    $('#s01').text(arr[data.object.o_state]);
                    $('.top>.p4').find('span').text(data.object.rec_name+" ; "+data.object.rec_phone+" ; "+data.object.rec_address+" ; "+data.object.rec_postcode);
                    var str="";
                    $(data.object.list).each(function (i,el) {
                        str+=' <li data-gid='+data.object.list[i].g_id+'> <div class="l"> <img class="lazy" src="../img/onload.gif" data-original='+data.object.list[i].i_cover+' alt=""> </div> <div class="r"> <p class="p7">'+data.object.list[i].i_name+'</p> <p class="p8">'+data.object.list[i].g_name+'</p> <p class="p9">￥'+parseFloat(data.object.list[i].price).toFixed(2)+'</p><span class="s01">x'+data.object.list[i].g_count+'</span><div class="btnAdd" data-s="1">退款</div></div></li>';
                    });
                    $('.ul1').empty().append(str);
                    $('img.lazy').lazyload({
                        effect:'fadeIn'
                    });
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