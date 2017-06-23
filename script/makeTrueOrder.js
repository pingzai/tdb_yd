/**
 * Created by jianghu on 2017/2/23.
 */
$(function () {
    var http="https://www.railwaybaby.com/";
    var code=window.localStorage.getItem('code') ? window.localStorage.getItem('code'):'';
    var empId=window.localStorage.getItem('empId');
    //获取JSON===================
    if(window.localStorage.getItem('JSON')){
        var dataNew=JSON.parse(window.localStorage.getItem('JSON'));
    }else{
        alertBg(1,'','暂无订单信息');
        $('#alertBtn01').on('click',function(){
            window.location.href="httpss://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19f4a60762c40c37&redirect_uri=http%3A%2F%2Fwww.railwaybaby.com%2FtwoCode.html%3femp_id%3d0&response_type=code&scope=snsapi_userinfo&state=state1&connect_redirect=1#wechat_redirect"
        });
    }
    var youfeiJson={'list':dataNew.list};
    //一开始地址信息，从主页地址管理选中默认的
    //直接购买
    function onload02(dataNew) {
            var str="";
            str='<div class="make"><div class="top">'+dataNew.list[0].list[0].s_name+'</div> <ul class="makeTrueOrder-u"> <li data-sid='+dataNew.list[0].list[0].s_id+' data-gid='+dataNew.list[0].list[0].g_id+'><div class="l"> <img src='+dataNew.list[0].list[0].g_src+' alt=""/> </div> <div class="r"> <span class="g1">'+dataNew.list[0].list[0].i_name+'</span> <span class="g2">￥'+parseFloat(dataNew.list[0].list[0].price).toFixed(2)+'</span> <span class="g3">'+dataNew.list[0].list[0].g_name+'</span> <span class="g4">x'+dataNew.list[0].list[0].g_count+'</span> </div> </li> </ul> <ul class="chooseWay"> <li class="xiala"> <div class="d1">配送方式</div> <div class="d2">车上派件</div> <img src="../img/jt.png" alt="" class="ss" data-down="0"> <ul class="secondChoose"> <li>快递</li> <li>自取</li> </ul> </li> <li class="xiala"> <div class="d1">红包</div> <div class="d2">无</div> <img src="../img/jt.png" alt="" class="ss" data-down="0"> <ul class="secondChoose"> <li>无</li> <li>无</li> <li>无</li></ul> </li> <li> <div class="d1">备注</div> <input type="text" class="beizhu" maxlength="100"> <i>选填</i> </li> <li class="youfei"> <div class="d1">邮费:</div> <i class="youfei"></i> </li><li class="heji"> <div class="d1">合计:</div> <i class="heji"></i> </li></ul> </div>';
            $('.goodsClass').append(str);
            $('.chooseWay>li').eq(0).find('.d2').text($('.secondChoose>li').eq(0).text());
            youfei(code,youfeiJson);
        }
    //购物车购买
    function onload01(dataNew) {
            var str01="";
            var str02="";
            $(dataNew.list).each(function (i,el) {
                str01+='<div class="make" data-seller='+dataNew.list[i].s_seller+'> <div class="top">'+dataNew.list[i].s_name+'</div> <ul class="makeTrueOrder-u"></ul> <ul class="chooseWay"> <li class="xiala"> <div class="d1">配送方式</div> <div class="d2">车上派件</div> <img src="../img/jt.png" alt="" class="ss" data-down="0"><ul class="secondChoose"> <li>快递</li> <li>自取</li> </ul> </li> <li class="xiala"> <div class="d1">红包</div> <div class="d2">请选择红包</div> <img src="../img/jt.png" alt="" class="ss" data-down="0"><ul class="secondChoose"> <li>红包1</li> <li>红包2</li> <li>红包3</li> <li>红包4</li> </ul> </li> <li> <div class="d1">备注</div> <input type="text" class="beizhu"> <i>选填</i> </li><li class="youfei"> <div class="d1">邮费:</div> <i class="youfei"></i> </li><li class="heji"> <div class="d1">合计:</div> <i class="heji"></i> </li> </ul></div>';
            });
            $('.goodsClass').empty().append(str01);
            for(var a=0;a<dataNew.list.length;a++){
                str02="";
                for (var b=0;b<dataNew.list[a].list.length;b++){
                    str02+='<li data-sid='+dataNew.list[a].list[b].s_id+' data-gid='+dataNew.list[a].list[b].g_id+'><div class="l"><img src='+dataNew.list[a].list[b].i_cover+' alt=""/> </div> <div class="r"><span class="g1">'+dataNew.list[a].list[b].i_name+'</span> <span class="g2">￥'+parseFloat(dataNew.list[a].list[b].price).toFixed(2)+'</span><span class="g3">'+dataNew.list[a].list[b].g_name.split('-')[0]+'</span> <span class="g4">x'+dataNew.list[a].list[b].g_count+'</span> </div> </li>';
                };
                $('.goodsClass>.make').eq(a).find('.makeTrueOrder-u').empty().append(str02);

            };
            $('.goodsClass>div').each(function () {
                if($(this).find('.top').text()=='undefined'){
                    $(this).remove()
                }
            });
            $('.chooseWay>li').eq(0).find('.d2').text($('.secondChoose>li').eq(0).text());
            youfei(code,youfeiJson);
        }
    fnaddress(code);
    if(window.localStorage.getItem('type')==2){
        onload01(dataNew);
    }else if(window.localStorage.getItem('type')==1){
        onload02(dataNew);
    };
    //确认邮费======================
    function youfei(code,obj){
        $.ajax({
            url:http+"querypostage",
            type:'post',
            cache:false,
            data:JSON.stringify({'code':code,'json':obj}),
            dataType:'json',
            contentType:"application/json",
            success:function(data){
                if(data.success==true){
                   $('.makeTrueOrder-footer>span.span1').text("优惠:"+data.object.discount+"元").siblings('.span2').text("合计:￥"+parseFloat(data.object.allprice).toFixed(2));
                    $(data.object.pr).each(function(i,el){
                        $('.goodsClass>div').eq(i).find('ul.chooseWay>li.youfei').find('i').text("￥"+parseFloat(data.object.pr[i].postage).toFixed(2)+"(满"+data.object.pr[i].limit+"包邮)").parent().siblings('li.heji').find('i').text("￥"+parseFloat(data.object.pr[i].price).toFixed(2))
                    })
                }else{

                }

            },
            error:function(){

            }
        });
    }
    //默认地址
    function fnaddress(code) {
        $.ajax({
            url:http+"wxQueryDefaultAddress",
            type:'post',
            cache:false,
            data:JSON.stringify({'code':code}),
            dataType:'json',
            contentType:"application/json",
            success:function(data){
                if(data.success==true){
                    $('.makeTrueOrder-min').attr('data-aid',data.object.a_id);
                    $('#userName').text(data.object.a_uname);
                    $('#userPhone').text(data.object.a_phone);
                    $('#userAddress').text(data.object.a_address+"; "+data.object.a_postcode);
                }else{
                    if(data.state==1){
                        alertBg(1,'',data.msg);
                        $('#alertBtn01').on('click',function(){
                            window.location.href="httpss://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19f4a60762c40c37&redirect_uri=http%3A%2F%2Fwww.railwaybaby.com%2FtwoCode.html%3femp_id%3d0&response_type=code&scope=snsapi_userinfo&state=state1&connect_redirect=1#wechat_redirect"
                        })
                    }else{
                        alertBg(1,'',data.msg+"请先去添加地址");
                    }

                }

            },
            error:function(){
            }
        });
    }
    //大三角，转到地址管理
    $('.makeTrueOrder-min').on('click', function () {
        $('.removeAddress').show().siblings('.goodsClass').hide();
    });
    //保存并使用======
    $('.append-address').on('click',function(){
        var reg01 =/0?(13|14|15|18)[0-9]{9}$/;
        var reg02 =/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/;
        if($('#input01').val()!=''&&$('#input02').val()!=''&&$('#input03').val()!=''){
            if(reg01.test($('#input02').val())==true && reg02.test($('#input01').val())==true){
                $.ajax({
                    url:http+"wxaddDefaultAddress",
                    type:'post',
                    cache:false,
                    data:JSON.stringify({'code':code,'a_address':$('#input03').val(),'a_uname':$('#input01').val(),'a_phone':$('#input02').val(),'a_postcode':$('#input04').val()}),
                    dataType:'json',
                    contentType:"application/json",
                    success:function(data){
                        if(data.success==true){
                            fnaddress(code);
                            $('.removeAddress').hide().siblings('.goodsClass').show();
                        }else{
                            alertBg(1,'',data.msg);
                        }

                    },
                    error:function(){

                    }
                });

            }else{
                alertBg(1,'','姓名包含非法字符/手机号格式不对!');
            }
        }else{
            alertBg(1,'',"收货人姓名/联系方式/收货地址不能为空!")
        }

    });
    //字符限制====================
    $('.replace-min').find('input').on('keyup',function(){
        getByteLen($(this).val());
        if(getByteLen($(this).val())>=100){
            alertBg(1,'','超过字数范围')
        }
    });
    //确认订单
    $('.makeTrueOrder-footer>.span3').on('click',function(){
        if(!$('.makeTrueOrder-min').attr('data-aid')){
            alertBg(1,'','没有默认地址，请先去添加地址');
        }else{
            var toJSON=JSON.parse(window.localStorage.getItem('JSON'));
            toJSON.code=code;
            if(window.localStorage.getItem('type')==2){
                for(var q=0;q<toJSON.list.length;q++){
                    if(toJSON.list[q].list.length==0){
                        toJSON.list.splice(q,1)
                    }
                };
                toJSON.address_id=parseInt($('.makeTrueOrder-min').attr('data-aid'));
                toJSON.type=parseInt(window.localStorage.getItem('type'));
                var arr03=[];
                var str03="";
                $(toJSON.list).each(function (i,el) {
                    $(toJSON.list[i].list).each(function (l,el) {
                        arr03.push(toJSON.list[i].list[l].s_id);
                    })
                });
                str03=arr03.join(',');
                toJSON.sid=str03;
                $(toJSON.list).each(function (m,el) {
                    toJSON.list[m].s_id=parseInt(toJSON.list[m].s_seller);
                    delete  toJSON.list[m].s_seller;
                });
                $(toJSON.list).each(function (j,el) {
                    delete  toJSON.list[j].s_name;
                    $(toJSON.list[j].list).each(function (k,el) {
                        delete  toJSON.list[j].list[k].i_name;
                        delete  toJSON.list[j].list[k].g_name;
                        delete  toJSON.list[j].list[k].price;
                        delete  toJSON.list[j].list[k].i_cover;
                        delete  toJSON.list[j].list[k].i_name;
                        delete  toJSON.list[j].list[k].s_id;
                        toJSON.list[j].list[k].g_id=parseInt(toJSON.list[j].list[k].g_id);
                        toJSON.list[j].list[k].g_count=parseInt(toJSON.list[j].list[k].g_count)
                    })
                });
                $(toJSON.list).each(function (r,el) {
                    toJSON.list[r].o_blog=$('.goodsClass>.make').eq(r).find('.beizhu').val();
                });
                toJSON.price=$('.makeTrueOrder-footer>span.span2').text().replace(/[^0-9.]/ig,"");
                result(toJSON);
            }else if(window.localStorage.getItem('type')==1){
                toJSON.address_id=parseInt($('.makeTrueOrder-min').attr('data-aid'));
                // toJSON.address_id=parseInt($('.makeTrueOrder-min').attr('data-aid'));
                delete toJSON.list[0].list[0].s_name;
                delete toJSON.list[0].list[0].g_name;
                delete toJSON.list[0].list[0].g_src;
                delete toJSON.list[0].list[0].i_name;
                delete toJSON.list[0].list[0].price;
                toJSON.list[0].o_blog=$('.beizhu').val();
                toJSON.price=$('.makeTrueOrder-footer>span.span2').text().replace(/[^0-9.]/ig,"");
                result(toJSON)
        }

        };
        //唤起支付
          function result(str) {
              $.ajax({
                  url:http+"wxpay/wxAddOrder",
                  type:'post',
                  cache:false,
                  data:JSON.stringify(str),
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
                                          //window.localStorage.setItem('points',result.object.points);
                                          window.location.href="makeTorderSuccess.html";
                                      }
                                      if(res.err_msg == "get_brand_wcpay_request:cancel"){
                                          alertBg(1,'','支付取消');
                                      }
                                      if(res.err_msg == "get_brand_wcpay_request:fail"){
                                          alertBg(1,'','支付失败')
                                      }

                                      // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                                  }
                              );


                          }
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
    });
    //留言=============
    $('.beizhu').on('keyup',function(){
        getByteLen($(this).val());
        console.log(getByteLen($(this).val()))
        if(getByteLen($(this).val())>=200){
            alertBg(1,'','超过字数范围')
        }

    });
    function getByteLen(val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
            var a = val.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null) {
                len += 2;
            }
            else {
                len += 1;
            }
        }
        return len;
    }
    //下拉
    //$('.chooseWay>li.xiala').on('click',function () {
    //    $(this).find('ul').slideToggle(300);
    //    if($(this).find('.ss').attr('data-down')==0){
    //        $(this).find('.ss').attr('src','../img/jt-down.png').css({
    //            'width':'0.18rem',
    //            'right':'0.05rem'
    //        }).attr('data-down',1)
    //    }else{
    //        $(this).find('.ss').attr('src','../img/jt.png').css({
    //            'width':'0.1rem',
    //            'right':'0.1rem'
    //        }).attr('data-down',0)
    //    }
    //});
    //下拉里面的选项===
    $('.secondChoose>li').on('click',function () {
        $(this).parent().siblings('.d2').text($(this).text())
    });
    $('.chooseWay').find('input:text').blur(function () {
        $($(this).next().show())
    });
    $('.chooseWay').find('input:text').focus(function () {
        $($(this).next().hide())
    });
})