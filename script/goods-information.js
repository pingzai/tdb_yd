/**
 * Created by Administrator on 2017/1/18.
 */
 //https://www.railwaybaby.com/index01.html?emp_id=0&code=061peoGV0qSHpY102oGV01njGV0peoGE&state=state1&from=singlemessage&isappinstalled=0
 var img = "";
 var goodsid;
$(function(){

    String.prototype.getQuery = function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = this.substr(this.indexOf("\?")+1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    } ;

    var httpcode = window.location.href.getQuery("code");

    var http="https://www.railwaybaby.com/";
    var code=window.localStorage.getItem('code') ? window.localStorage.getItem('code'):httpcode;
    
    var empId=window.localStorage.getItem('empId');
    var iId=location.href.split('?')[1].split('&')[0].split('=')[1];
        goodsI(code,iId);
        
    //最外层盒子加商品ID=================
    //加载商品======================
    function goodsI(code,iId){
        $.ajax({
            url:http+"wxQueryGoodsByIid",
            type:'post',
            cache:false,
            data:JSON.stringify({'code':code,'i_id':iId}),
            dataType:'json',
              async: false,
            contentType:"application/json",
            success:function(data){
            	  if(!data.success){
                      alert(data.msg);
                      return ;
                  }
            	
               //修改title
                document.title = data.object.i_name;


                if(data.success==true){
                		goodsid = data.object.i_id;
                     img = "https://www.railwaybaby.com/getActImage?file_name=cove_145_640.jpg";
                    $('.goods-information').attr('data-iid',data.object.i_id).attr('data-cid',data.object.c_id).attr('data-cname',data.object.c_name).attr('data-sid',data.object.s_id).attr('data-name',data.object.s_name).attr('data-gid',data.object.list[0].g_id).attr('data-price',data.object.list[0].g_price).attr('data-rprice',data.object.list[0].g_rprice);
                    $('.conter').text(data.object.i_name);
                    $('.bgmin>img').attr('data-original',data.object.i_cover).attr('src','../img/onload.gif');
                    $('#s03').text("已有"+data.object.i_sale+"人付款");
                    //区域
                    $('.promotion').find('span.s02').text(data.object.a_name);
                    var arr=data.object.i_say.split(',');
                    arr.pop();
                    var str01="";
                    $(arr).each(function (i,el) {
                        str01+="<div class='bg01'><img class='lazy' src='../img/onload.gif' data-original="+arr[i]+" style='display: block'/></div>"
                    });
                    $('.bg-list').append(str01);
                    $('#img01').attr('src',data.object.i_cover);
                    $('img.lazy').lazyload({
                        effect:'fadeIn',
                        threshold : 200
                    });
                    if(data.object.list[0].g_rprice==''){
                        $('.list-r>p').text(data.object.i_name).siblings('span').text('￥'+data.object.list[0].g_price);
                    }else{
                        $('.list-r>p').text(data.object.i_name).siblings('span').text('￥'+data.object.list[0].g_rprice);
                    }
                    var str02="";
                    $(data.object.list).each(function (i,el) {
                        str02+="<li class='classify-list' data-classify='0' data-gid="+data.object.list[i].g_id+" data-price="+data.object.list[i].g_price+" data-rprice="+data.object.list[i].g_rprice+">"+data.object.list[i].g_name+"</li>"
                    });
                    $('.list>ul').empty().append(str02);
                    if(data.object.price.indexOf(',')>=-1){
                           var arr=data.object.price.split(',');
                           var newArr=[];
                        $(arr).each(function(i,el){
                            var num=parseFloat(arr[i]).toFixed(2);
                            newArr.push(num)
                        });
                           var priceStr=newArr.join('~');
                    }else{

                    }
                    $('#s01').text('￥'+priceStr);
                    $('#s04').text('￥'+priceStr);
                    if(data.object.c_state==1){
                        $('.goods-footer>.a1').empty().append("<span></span>已收藏").attr('data-state',1).css({'color':'#ff4f4f'}).find('span').css({
                            "background":"url('../img/shoucang02.png') no-repeat",
                            "background-size":"100%"
                        });
                    }else if(data.object.c_state==2){
                        $('.goods-footer>.a1').empty().append("<span></span>收藏").attr('data-state',0).css({'color':'#fff'}).find('span').css({
                            "background":"url('../img/shoucang01.png') no-repeat",
                            "background-size":"100%"
                        });
                    };
                }else{
                    if(data.state==1){
                        window.localStorage.setItem('share',location.href);
                        alertBg(1,'',data.msg);
                        $('#alertBtn01').on('click',function(){
                            window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19f4a60762c40c37&redirect_uri=http%3A%2F%2Fwww.railwaybaby.com%2FtwoCode.html%3femp_id%3d0&response_type=code&scope=snsapi_userinfo&state=state1&connect_redirect=1#wechat_redirect"
                        })
                    }else{
                        alertBg(1,'',data.msg);
                        $('#alertBtn01').on('click',function(){
                            history.go(-1);
                        })
                    }

                }
            },
            error:function(){
            }
        });
    wxshare();
    };
    
    function wxshare (){
        var oUrl = window.location.href.split("#")[0];
        var link = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19f4a60762c40c37&redirect_uri=http%3a%2f%2fwww.railwaybaby.com%2fhtml%2fgoods-information.html%3fid%3d"+goodsid+"&response_type=code&scope=snsapi_userinfo&state=state1&connect_redirect=1";
        $.ajax({
            url: http+"share",
            type: 'post', //提交的方式
            cache:false,
            dataType: 'json',
            contentType:"application/json",
            data: JSON.stringify({"url": oUrl,"code":code}),
            success :function(data){
                if(!data.success){
                      alert(data.msg);
                      return ;
                  }
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.object.appid, // 必填，公众号的唯一标识
                    timestamp: data.object.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.object.nonceStr, // 必填，生成签名的随机串
                    signature: data.object.signature,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });


                wx.ready(function(){
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                    wx.onMenuShareAppMessage({
                        title: '铁道宝', // 分享标题
                        desc: '铁道宝商品', // 分享描述
                        link: link, // 分享链接
                        imgUrl: img, // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () { 
                            // 用户确认分享后执行的回调函数
                            $('.share-alert').fadeOut(300);
                        },
                        cancel: function () { 
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareTimeline({
                        title: '铁道宝', // 分享标题
                        link: link, // 分享链接
                        imgUrl: img, // 分享图标
                        success: function () { 
                            // 用户确认分享后执行的回调函数
                            $('.share-alert').fadeOut(300);
                        },
                        cancel: function () { 
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    wx.onMenuShareQQ({
                        title: '铁道宝', // 分享标题
                        desc: '铁道宝商品', // 分享描述
                        link: oUrl, // 分享链接
                        imgUrl: img, // 分享图标
                        success: function () { 
                           // 用户确认分享后执行的回调函数
                           $('.share-alert').fadeOut(300);
                        },
                        cancel: function () { 
                           // 用户取消分享后执行的回调函数
                        }
                    });
                });
                        
            }
        });
  
    }
//判断是否选择分类==============
    function classIfy01 () {
        $('.list>ul>.classify-list').each(function () {
            if($(this).attr('data-classify')==1){
                if(!$(this).attr('data-rprice')){
                    //没值
                    $('#span3').text($(this).text());
                    $('#s02').text('');
                    $('#s01').text('￥'+parseFloat($(this).attr('data-price')).toFixed(2));
                    $('#s04').text('￥'+parseFloat($(this).attr('data-price')).toFixed(2));
                }else{
                    //有值
                    $('#span3').text($(this).text());
                    $('#s02').text('￥'+parseFloat($(this).attr('data-price')).toFixed(2));
                    $('#s01').text('￥'+parseFloat($(this).attr('data-rprice')).toFixed(2));
                    $('#s04').text('￥'+parseFloat($(this).attr('data-rprice')).toFixed(2));
                }

            }
        })
    }
    //分类背景
    $(document).on('click','.classify-list',function(e){
        e.stopPropagation();
        $(this).addClass('classify-active').attr('data-classify',1).siblings().removeClass('classify-active').attr('data-classify',0);
        classIfy01();
    });
    //动画关闭
    $(document).on('click','.color-classify',function(e){
        e.stopPropagation();
        if(e.target.className=='color-classify'){
            $(this).find('.list').animate({bottom:'-3rem'},300,function(){
                $('.color-classify').fadeOut();
                $('.goods-footer').fadeIn();
            })
            $("body").unbind("touchmove");
            $('body').css({'overflow':'auto'});
        }
    });
    //确定按钮=====================================
    //加入购物车
    $('.l01').on('click',function(e){
        var stateChange=false;
        var gid=0;
        $('.classify-list').each(function () {
            if($(this).attr('data-classify')==1){
                stateChange=true;
                gid=$(this).attr('data-gid');
            }
        });
        if(stateChange==false){
            alertBg(1,'','请选择分类')
        }else{
            if(!$('.num-show').val()){
                alertBg(1,'','商品数量不能为空')
            }else{
                var reg=/^[1-9]\d*$/;
                if(reg.test($('.num-show').val())==false){
                    alertBg(1,'','商品数量必须是正整数')
                    $('.num-show').val("1")
                }else{
                        var list=[];
                        $('.list>ul>li').each(function(i,el){
                            if($('.list>ul>li').eq(i).attr('data-classify')==1){
                                var obj=new Object();
                                obj.g_id=parseInt($('.list>ul>li').eq(i).attr('data-gid'));
                                obj.g_count=parseInt($('.num-show').val());
                                list.push(obj);
                            }
                        });
                        inventory(1,code,list,gid,'')
                }
            }


        }
    });
    //直接购买
    $('.l02').on('click',function (e) {
        var stateChange=false;
        var gid="";
        $('.classify-list').each(function () {
            if($(this).attr('data-classify')==1){
                stateChange=true;
                gid=$(this).attr('data-gid');
            }
        });
        if(stateChange==false){
            alertBg(1,'','请选择分类')
        }else{
            if(!$('.num-show').val()){
                alertBg(1,'','商品数量不能为空')
            }else{
                var reg=/^[1-9]\d*$/;
                if(reg.test($('.num-show').val())==false){
                    alertBg(1,'','商品数量必须是正整数')
                    $('.num-show').val("1")
                }else{
                    var list=[];
                    $('.list>ul>li').each(function(i,el){
                        if($('.list>ul>li').eq(i).attr('data-classify')==1){
                            var obj=new Object();
                            obj.g_id=parseInt($('.list>ul>li').eq(i).attr('data-gid'));
                            obj.g_count=parseInt($('.num-show').val());
                            list.push(obj);
                        }
                    });
                    inventory(2,code,list,gid,$(this));
                }
            }


        }

    });
    //立即购买
    $('.goods-footer >.a3').on('click',function(){
            $('div.l01').hide().siblings('div.l02').show();
            $(this).parent('.goods-footer').siblings('.color').find('.color-classify').fadeIn();
            $('.color-classify>.list').animate({bottom:'0'},300);
            $('.goods-footer').fadeOut();
            $('body').on('touchmove', function (event) {
            event.preventDefault();
            } )
            $('body').css({'overflow':'hidden'});
    });
    //收藏
    $('.goods-footer>.a1').on('click',function(e){
        var iid=$('.goods-information').attr('data-iid');
        e.stopPropagation();
        if($(this).attr('data-state')==1){
            alertBg(2,"",'是否取消该收藏？');
            $('#alertBtn03').on('click',function(){
                wxDeleteCollect();
            })
            function wxDeleteCollect(){
                $.ajax({
                    url:http+"wxUnCollect",
                    type:'post',
                    data:JSON.stringify({'code':code,'i_id':iid}),
                    dataType:'json',
                    contentType:"application/json",
                    success:function(data){
                        if(data.success==true){
                            alertBg(1,'',data.msg);
                            $('.goods-footer>.a1').empty().append("<span></span>收藏").attr('data-state',0).css({'color':'#fff'}).find('span').css({
                                "background":"url('../img/shoucang01.png') no-repeat",
                                "background-size":"100%"
                            });
                        }else{
                            alertBg(1,'',data.msg);
                        }
                    },
                    error:function(){

                    }
                });
            }
        }else{
            var gid=parseInt($('.goods-information').attr('data-iid'));
            $.ajax({
                url:http+"wxCollectGoods",
                type:'post',
                cache:false,
                data:JSON.stringify({'code':code,'i_id':gid}),
                dataType:'json',
                contentType:"application/json",
                success:function(data){
                   if(data.success==true){
                       alertBg(1,'',data.msg);
                       $('.goods-footer>.a1').empty().append("<span></span>已收藏").attr('data-state',1).css({'color':'#ff4f4f'}).find('span').css({
                           "background":"url('../img/shoucang02.png') no-repeat",
                           "background-size":"100%"
                       });
                   }else{
                       alertBg(1,'',data.msg)
                    }
                },
                error:function(){
                    alertBg(1,'',"收藏失败!")
                }
            });
        }
    });
    $(document).on('click','.goods-span',function(e){
        e.stopPropagation();
        $(this).parent().hide();
    });
    //加入购物车
    $('.goods-footer>.a2').on('click',function(){
            $('div.l01').show().siblings('div.l02').hide();
            $(this).parent('.goods-footer').siblings('.color').find('.color-classify').fadeIn();
            $('.color-classify>.list').animate({bottom:'0'},300);
            $('.goods-footer').fadeOut();
            $('body').on('touchmove', function (event) {
            event.preventDefault();
            } );
            $('body').css({'overflow':'hidden'});
    });
    //跳转到购物车
    $('.goShoopCart').on('click',function(){
        window.location.href="cart.html";
    });
    //查库存====
    function inventory(num,code,list,gid,that){
        $.ajax({
            url:http+"findStockByGid",
            type:'post',
            cache:false,
            data:JSON.stringify({'code':code,'list':list}),
            dataType:'json',
            contentType:"application/json",
            success:function(data){
                if(data.success==true ){
                    if(data.object[0].g_msg==1){
                        if(num==1){
                            $('.onload').show();
                            $.ajax({
                                url:http+"wxAddShopCar",
                                type:'post',
                                cache:false,
                                data:JSON.stringify({'code':code,'g_id':gid,'g_counts':parseInt($('.num-show').val())}),
                                dataType:'json',
                                contentType:"application/json",
                                success:function(data){
                                    if(data.success==true){
                                        $('.onload').hide();
                                        alertBg(1,'',data.msg);
                                        $('.color-classify').fadeOut();
                                        $('.goods-footer').fadeIn();
                                        $(this).parents('.list').animate({bottom:'-3rem'},300 );
                                        $("body").unbind("touchmove");
                                        $('body').css({'overflow':'auto'});
                                    }else{
                                        alertBg(1,'',data.msg)
                                    }
                                },
                                error:function(){
                                    alertBg(1,'','加入购物车失败，请重试!')
                                }
                            });
                        }else if(num==2){
                            window.localStorage.setItem('type',1);
                            var json={'code':1,'price':($('.num-show').val()*$('#s04').text().split('￥')[1]),'address_id':'1','type':1,'sid':that.parents('.goods-information').attr('data-gid'),'list':[{'s_id':parseInt(that.parents('.goods-information').attr('data-sid')),'red_id':1,'o_blog':'','list':[{'s_id':that.parents('.goods-information').attr('data-sid'),'g_id':gid,'g_count':$('.num-show').val(),'s_name':that.parents('.goods-information').attr('data-name'),'i_name':that.parents('.goods-information').find('.conter').text(),'price':parseFloat($('#s04').text().replace(/[^0-9.]/ig,"")),'g_name':$('.goods-information').find('#span3').text(),'g_src':$('.bgmin>img').attr('data-original')}]}]};
                            $('.color-classify').fadeOut();
                            $('.goods-footer').fadeIn();
                            $(this).parents('.list').animate({bottom:'-3rem'},300 );
                            $("body").unbind("touchmove");
                            $('body').css({'overflow':'auto'});
                            window.location.href="makeTrueOrder.html";
                            window.localStorage.setItem('JSON',JSON.stringify(json));

                        }

                    }else{
                        alertBg(1,'','该商品库存不足')
                    }

                }else{
                    alertBg(1,'',data.msg)
                }
            },
            error:function(){

            }
        });
    }

    
});
