/**
 * Created by Administrator on 2016/12/29.
 */
$(function () {
    var http="https://www.railwaybaby.com/";
    var code=window.localStorage.getItem('code') ? window.localStorage.getItem('code'):'';
    var empId=window.localStorage.getItem('empId');
    loadGoods(code);
    (function () {
       $('.label2').find('input:checked').prop('checked',false);
    })();
    //页面加载计算总价格
    addMonet();
    //编辑事件
    $('.addMoney').find('span').on('click', function (e) {
        e.stopPropagation();
        if ($(this).attr('data-z') == 0) {
            $(this).attr('data-z', 1);
            $('.addMoney>.add').hide().prev().attr('data-r',1);
            $(this).text('取消').parent('.addMoney');
            $('.addMoney>.add').hide().prev().text('删除');
        } else {
            $(this).attr('data-z', 0);
            $('.addMoney>.add').show().prev().attr('data-r',0);
            $(this).text('编辑').parent('.addMoney');
            addMonet();
        }

    })
    //复选框事件
    $(document).on('click', '.label1', function () {
        if ($(this).find('input:checkbox').prop('checked') == true) {
            $(this).parent().next().find('input:checkbox').prop('checked', true)
        } else {
            $(this).parent().next().find('input:checkbox').prop('checked', false)
        }
        addMonet();
    })
    $(document).on('click', '.goodsCart-state', function () {
                addMonet();
    })
    //全部全选
    $(document).on('click', '.label2', function () {
        if ($(this).find('input:checkbox').prop('checked') == true) {
            $(this).parent().prev('.content').find('input:checkbox').prop('checked', true)
        } else {
            $(this).parent().prev('.content').find('input:checkbox').prop('checked', false)
        }
        addMonet();
    })
    var json={'code':1,'address_id':'1','type':'1','sid':'1','list':[],'price':parseInt($('.sp2').text().split('￥')[1])};
    // 立即结算
    $('.addMoney>.result').on('click', function () {
        var num=0;
        var stateNumber=true;
        var reg=/^[1-9]\d*$/;
        $($('.goodsCart-state')).each(function(){
            if($(this).prop('checked')==true){
                num++;
                if(reg.test($(this).parent().siblings('.s3').find('.num-show').val())==false){
                    stateNumber=false;
                }
            }
        });
        if(num==0){
            alertBg(1,'','请选择商品!');
        }else{
            if(stateNumber==false){
                alertBg(1,'','商品数量必须正整数')
            }else{
                var list=[];
                $('.content>div.cart-content').each(function(i,el){
                    $($('.content>div.cart-content').eq(i).find('ul.cart-ul>li')).each(function(l,el){
                        if($('.content>div.cart-content').eq(i).find('ul.cart-ul>li').eq(l).find('input').prop('checked')){
                            var obj=new Object();
                            obj.g_id=parseInt($('.content>div.cart-content').eq(i).find('ul.cart-ul>li').eq(l).attr('data-gid'));
                            obj.g_count=parseInt($('.content>div.cart-content').eq(i).find('ul.cart-ul>li').eq(l).find('.num-show').val());
                            list.push(obj);
                        }
                    })
                });
                inventory(code,list,$(this));
            }

        }
    });
    // var list=[];
    //查看购物车商品详情
    $(document).on('click','.l',function () {
        window.location.href="goods-information.html?id="+$(this).attr('data-iid');
    });
    // 购物车去逛逛==========
    $('.box03').on('click',function () {
        window.location.href="../index01.html?emp_id="+empId+"&code="+code+"&state=state1&from=singlemessage&isappinstalled=0";
    });
    function loadGoods(code){
        $.ajax({
            url:http+"wxQueryShopCar",
            type:'post',
            data:JSON.stringify({'code':code}),
            dataType:'json',
            contentType:"application/json",
            cache:false,
            success:function(data){
                if(data.success==true){
                    $('.cartNull').hide().siblings().show();
                    var str01="";
                    var str02="";
                    $(data.object).each(function (i,el) {
                        str01+="  <div class='cart-content' data-seller="+data.object[i].seller_id+" data-name="+data.object[i].s_name+" data-name="+data.object[i].s_name+"><div class='cart-nav'><label class='label1'> <input type='checkbox'/> </label> <p>"+data.object[i].s_name+"</p> </div> <ul class='cart-ul'></ul></div>";
                    });
                    $('.content').empty().append(str01);
                    for(var y=0;y<data.object.length;y++){
                        str02="";
                        for (var t=0;t<data.object[y].list.length;t++){
                            str02+="<li data-price="+data.object[y].list[t].price+"  data-sid="+data.object[y].list[t].s_id+" data-gid="+data.object[y].list[t].g_id+" ><label class='label3'><input type='checkbox' value="+y+" class='goodsCart-state'/></label><img class='l lazy' src='../img/onload.gif' data-original="+data.object[y].list[t].i_cover+" data-iid="+data.object[y].list[t].i_id+"><div class='r'><p class='stock'>库存不足</p><p class='p1'>"+data.object[y].list[t].i_name+"</p><div class='classify1'><span class='span1'>"+data.object[y].list[t].g_name+"</span></div><span class='money goods-money'>￥"+parseFloat(data.object[y].list[t].price).toFixed(2)+"</span></div><div class='s3'><span class='span1 num-sub'>-</span><form   class='span2' action='' onsubmit='return false'><input class='num-show' maxlength='3' type='text' value="+data.object[y].list[t].g_counts+"></form><span class='span3 num-add'>+</span></div></li>"
                        }
                        $('.content>.cart-content').eq(y).find('.cart-ul').empty().append(str02);
                        $('img.lazy').lazyload({
                            effect:'fadeIn'
                        });
                    }
                    $('.content>div.cart-content').each(function () {
                        if($(this).find('.cart-ul').length==0){
                            $(this).remove();
                        }
                    });
                    initNum01();
                }else{
                    if(data.state==1){
                        window.localStorage.setItem('share',location.href);
                        alertBg(1,'',data.msg);
                        $('#alertBtn01').on('click',function(){
                            window.location.href="httpss://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19f4a60762c40c37&redirect_uri=http%3A%2F%2Fwww.railwaybaby.com%2FtwoCode.html%3femp_id%3d0&response_type=code&scope=snsapi_userinfo&state=state1&connect_redirect=1#wechat_redirect"
                        })
                    }else{
                        $('.cartNull').show().siblings().hide();
                        $('.content').empty();
                    }

                }
            },
            error:function(){

            }
        });

    };
    function initNum01(){
        $('.content>div').each(function (a,el) {
            $('.content>div').eq(a).find('ul>li').each(function (b,el) {
                if($('.content>div').eq(a).find('ul>li').eq(b).find('.num-show').val()==1){
                    $('.content>div').eq(a).find('ul>li').eq(b).find('.num-sub').css({
//                      backgroundColor:'#e3e3e3',
//                      borderColor:'#e3e3e3',
                        cursor:'default'
                    })
                }else{
                    $('.content>div').eq(a).find('ul>li').eq(b).find('.num-sub').css({
//                      backgroundColor:'#fff',
//                      borderColor:'#989898',
                        cursor:'pointer'
                    })
                }
            })
        })

    }
    function addMonet() {
        var num1 = 0;
        var num2=0;
        $($('.content>.cart-content')).each(function (i,el) {
            $('.content>div').eq(i).find('.cart-ul>li').each(function () {
                if ($(this).find('.goodsCart-state').prop('checked') == true) {
                    num1 += parseFloat($(this).find('.goods-money').text().split('￥')[1]) * parseInt($(this).find('.num-show').val());
                    num2++;
                }else{
                    num1+=0;
                }
            });
            $('.sp2').text("￥ " + num1.toFixed(2));
            if($('#goPay').attr('data-r')==0){
                $('#goPay').text("去结算("+num2+")");
            }

        });
    }
    //查库存====
    function inventory(code,list,that){
        $.ajax({
            url:http+"findStockByGid",
            type:'post',
            cache:false,
            data:JSON.stringify({'code':code,'list':list}),
            dataType:'json',
            contentType:"application/json",
            success:function(data){
                var stock=[];
                if(data.success==true){
                    $(data.object).each(function(i,el){
                        if(data.object[i].g_msg==0){
                            stock.push(data.object[i].g_id);
                        }else{

                        }
                    });
                    if(stock.length==0){
                        var num=false;
                        if(that.attr('data-r')==0){
                            json.list=[];
                            json.price=$('.sp2').text().split('￥')[1];
                            for(var a=0;a<$('.content>div').length;a++){
                                var boject01={'list':[],'s_id':1,'red_id':0,'o_blog':''};
                                json.list.push(boject01);
                                for(var b=0;b<$('.content>div').eq(a).find('.cart-ul>li').length;b++){
                                    if($('.content>div').eq(a).find('.cart-ul>li').eq(b).find('input').prop('checked')){
                                        var num=$('.content>div').eq(a).find('.cart-ul>li').eq(b).find('input').parents('.cart-content').index();
                                        json.list[num].s_name=$('.content>div').eq(a).attr('data-name');
                                        json.list[num].s_seller=$('.content>div').eq(a).attr('data-seller')

                                    }
                                }
                            }
                            $.unique(json.list);
                            for(var c=0;c<$('.content>div').length;c++){
                                for(var d=0;d<$('.content>div').eq(c).find('.cart-ul>li').length;d++){
                                    if($('.content>div').eq(c).find('.cart-ul>li').eq(d).find('input').prop('checked')){
                                        var boject02={};
                                        var num=$('.content>div').eq(c).find('.cart-ul>li').eq(d).parents('.cart-content').index();
                                        boject02.g_id=$('.content>div').eq(c).find('.cart-ul>li').eq(d).attr('data-gid');
                                        boject02.g_count=$('.content>div').eq(c).find('.cart-ul>li').eq(d).find('.num-show').val();
                                        boject02.i_name=$('.content>div').eq(c).find('.cart-ul>li').eq(d).find('.p1').text();
                                        boject02.g_name=$('.content>div').eq(c).find('.cart-ul>li').eq(d).find('.span1').text();
                                        boject02.price=$('.content>div').eq(c).find('.cart-ul>li').eq(d).attr('data-price');
                                        boject02.i_cover=$('.content>div').eq(c).find('.cart-ul>li').eq(d).find('img').attr('data-original');
                                        boject02.s_id=$('.content>div').eq(c).find('.cart-ul>li').eq(d).attr('data-sid');
                                        json.list[num].list.push(boject02)
                                    }
                                }
                            }
                            window.localStorage.setItem('JSON',JSON.stringify(json));
                            window.localStorage.setItem('type',2);
                            window.location.href="makeTrueOrder.html";
                        }else if(that.attr('data-r')==1){
                            var delArr=[];
                            $('.content>div').each(function (i,el) {
                                $('.content>div').eq(i).find('ul>li').each(function (l,el) {
                                    if($('.content>div').eq(i).find('ul>li').eq(l).find('input:checked').prop('checked')==true){
                                        delArr.push($(this).attr('data-sid'));
                                    }
                                })
                            });
                            var str=delArr.join(',');
                            alertBg(2,"",'你确定要删除此商品吗？');
                            $('#alertBtn03').on('click',function(){
                                delShopCart();
                            });
                            function delShopCart(){
                                $.ajax({
                                    url:http+"wxDeleteShopCar",
                                    type:'post',
                                    cache:false,
                                    data:JSON.stringify({'code':code,'s_id':str}),
                                    dataType:'json',
                                    contentType:"application/json",
                                    success:function(data){
                                        alertBg(1,'',data.msg);
                                        loadGoods(code);
                                        addMonet();
                                    },
                                    error:function(){
                                    }
                                });
                            }


                        }
                    }else{
                        for(var m=0;m<$('.content').find('div.cart-content').length;m++){
                            for(var n=0;n<$('.content>div.cart-content').eq(m).find('ul.cart-ul>li').length;n++){
                                var gid=parseInt($('.content>div.cart-content').eq(m).find('ul.cart-ul>li').eq(n).attr('data-gid'));
                                $(stock).each(function(i,el){
                                    if(stock[i]==gid){
                                        $('.content>div.cart-content').eq(m).find('ul.cart-ul>li').eq(n).find('p.stock').show(300);
                                        $('.content>div.cart-content').eq(m).find('ul.cart-ul>li').eq(n).find('.num-show').val("1")
                                    }
                                })
                            }
                        }
                        setTimeout(function(){
                            $('p.stock').hide(500)
                        },2000);
                    }

                }else{
                    alertBg(1,'',data.msg)
                }
            },
            error:function(){

            }
        });
    }
    $('.footer>a').on('click',function(){
        if($(this).index()==0){
            window.location.href="../index01.html?emp_id="+empId+"&code="+code+"&state=state1&from=singlemessage&isappinstalled=0";
        }
        if($(this).index()==1){
            alertBg(1,'','敬请期待')
        }
        if($(this).index()==2){

        }
        if($(this).index()==3){
            window.location.href="personalCenter.html"
        }
    })
});

