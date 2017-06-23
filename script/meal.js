$(function(){
    var newJson={'trainNumber':'','data':'','list':[],'eatingTime':'','name':'','phone':''};
    var http="https://www.railwaybaby.com/";
    var code=window.localStorage.getItem('code') ? window.localStorage.getItem('code'):'';
    var empId=window.localStorage.getItem('empId');
    alertState();
    //判断车上订餐购物车里面的物品总价================
    totalMoney();
     function totalMoney(){
         var add=0.00;
         if($(document).find('.meal-datails-catr>ul>li').length==0){
             $('.total-money').text('￥'+add.toFixed(2));
         }else{
             $(document).find('.meal-datails-catr>ul>li').each(function(){
                 add+=$(this).find('.s1').text().split('￥')[1]*$(this).find('.num-show').text();
             })
         }
         $('.total-money').empty().append("<span class='zj'>总计:</span>￥"+add.toFixed(2))
     }
    //加载执行
    goodsNum();
    function goodsNum(){
        $('.meal-details').find('.meal-num').text($('.meal-datails-catr>ul>li').length);
        $('.meal-details').find('.payment').text("去付款("+$('.meal-datails-catr>ul>li').length+")");
    }
    //加号颜色
    function initNum(){
        $('.meal-datails-catr>ul>li').each(function () {
            if($(this).find('.num-show').text()==1){
                $(this).find('.num-sub').css({
                    backgroundColor:'#e3e3e3',
                    borderColor:'#e3e3e3',
                    cursor:'default'
                })
            }else{
                $(this).find('.num-sub').css({
                    backgroundColor:'#fff',
                    borderColor:'#989898',
                    cursor:'pointer'
                })
            }
        })
    }
    //公告活动
    $('.notice-right>.span1').on('click',function(){
        $('.notice-show').show();
        $('body').on('touchmove', function (event) {
            event.preventDefault();
        });

        $('body').css({'overflow':'hidden'})


    })
    $('.notice-hide').on('click',function(){
        $('.notice-show').hide();
        $("body").unbind("touchmove");
        $('body').css({'overflow':'auto'})
    });
    //滚动条
    $('.list-menu>ul>li').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('html,body').animate({scrollTop:$('.list-content>ul').eq($(this).index()).offset().top-$('.meal>div').eq(0).height()+$('.notice').height()}, 500);
    })
    //订餐里面的购物车效果
    $('.meal-l').on('click',function(e){
        e.stopPropagation();
        if($(this).attr('data-meal')==0){
            $('.meal-datails-catr').animate({bottom:'0.9rem'},500);
            $(this).attr('data-meal',1);
            $('.sanjiao').css({'border-top':'0.21rem solid #fff','border-bottom':'none'});
            $('.mealCartBg').show();
            $('body').on('touchmove', function (event) {
                event.preventDefault();
            });
            $('body').css({'overflow':'hidden'})
        }else{
            $('.meal-datails-catr').animate({bottom:'-2rem'},300);
            $(this).attr('data-meal',0);
            $('.sanjiao').css({'border-bottom':'0.21rem solid #fff','border-top':'none'});
            $('.mealCartBg').hide();
            $("body").unbind("touchmove");
            $('body').css({'overflow':'auto'})
        }

    });
    $(document).on('click',function(e){
        if(e.target.className=='mealCartBg'){
            $('.meal-datails-catr').animate({bottom:'-2rem'},300);
            $('.meal-l').attr('data-meal',0);
            $('.sanjiao').css({'border-bottom':'0.21rem solid #fff','border-top':'none'});
            $('.mealCartBg').hide();
            $("body").unbind("touchmove");
            $('body').css({'overflow':'auto'})
        }else{

        }
    });
    //清空
    $('.meal-datails-catr').find('.two').on('click',function(e){
        e.stopPropagation();
        $('.meal-datails-catr>ul').empty();
        newJson.list=[];
        totalMoney();
        goodsNum();
    })
    //删除一个套餐
    $(document).on('click','.i1',function(){
        var gid=$(this).parents('.add-li').attr('data-gid');
        for(var i=0;i<newJson.list.length;i++){
            if(newJson.list[i].g_id==gid){
                newJson.list.splice(i,1);
            }
        }
        mealCart();
         goodsNum();
        totalMoney();

    });
    //添加套餐
    $(document).on('click','.p4',function(e){
        var gid=parseInt($(this).parents('.append-li').attr('data-gid'));
        var name=$(this).parents('.append-li').find('.p1').text();
        var price=$(this).parents('.append-li').find('.p3').text();
        e.stopPropagation();
        addCart(gid,name,price);
        mealCart();
        goodsNum();
        totalMoney();
        initNum();
            });
    $('.meallCart').on('click',function (e) {
          var gid=parseInt($(this).parents('.showMeal').attr('data-gid'));
          var name=$(this).parent().attr('data-name');
          var price=$(this).parents('.showMeal').attr('data-price');
          e.stopPropagation();
          addCart(gid,name,price);
          mealCart();
          goodsNum();
          totalMoney();
          initNum();
        $('.showSuccess').animate({'opacity': '1'},300,function(){
            $('.showSuccess').animate({'opacity': '0'},300)
        })
      });
    function mealCart() {
        var str='';
        $(newJson.list).each(function (i,el) {
            str+="<li class='add-li' data-gid="+newJson.list[i].g_id+"><span class='span1'><i class='i1'></i>"+newJson.list[i].g_name+"</span><span class='s1'>"+newJson.list[i].g_price+"</span><span class='s3'> <span class='span1 num-sub'>-</span> <span class='span2 num-show'>"+newJson.list[i].num+"</span> <span class='span3 num-add'>+</span> </span></li>";
        });
        $('.meal-datails-catr>ul').empty().append(str);
    }
    function addCart(gid,name,price) {
        if($('.meal-datails-catr>ul>li').length==0){
            var object01={};
            object01.g_id=gid;
            object01.num=1;
            object01.g_name=name;
            object01.g_price=price;
            newJson.list.push(object01);
        }else{
            var object02={};
            object02.g_id=gid;
            object02.num=1;
            object02.g_name=name;
            object02.g_price=price;
            var state=false;
            var index=0;
            $(newJson.list).each(function (i,el) {
                if(newJson.list[i].g_id==object02.g_id){
                    state=true;
                    index=i;
                }
            });
            if(state==true){
                newJson.list[index].num++;
            }else{
                newJson.list.push(object02)
            }
        }
    }
    //开始预订
    $('.b5').on('click',function () {
        if(!$('.b2').find('input').val()){
            alertBg(1,'',"请选择乘车车次!")
        }else{
            if(!$('#trainData').val()){
                alertBg(1,'',"请选择乘车日期!")
            }else{
                newJson.trainNumber=$('#trainNumber').val();
                newJson.data=$('#trainData').val();
                $(this).parents('.beginBg').hide().siblings('.list').show().siblings('.meal-details').show().siblings('.notice').show();
            }
        }
    });
    //查询车次============
    $('.b2').find('input').on('keyup',function(){
        var v01=$(this).val();
        $('.b2').find('ul').show().unbind("touchmove").css({'overflow':'auto'});
    });
    $('.b2').find('ul>li').on('click',function(){
        var v02=$(this).text();
        $(this).parent().hide().siblings('input').val(v02);
    });
    //修改车次========
    $('.changeCare').on('click',function (e) {
        e.stopPropagation();
        $('.meal').find('.list').hide().siblings('.meal-details').hide().siblings('.notice').hide().siblings('.beginBg').show();
    });
    //查看套餐========
    $(document).on('click','.hot-l',function (e) {
        e.stopPropagation();
        $('.showMealBg').show().find('img').attr('src',$(this).find('img').attr('src')).siblings('.p001').text($(this).find('.p1').text());
        $('.showMeal').attr('data-gid',$(this).parent().attr('data-gid')).attr('data-price',$(this).siblings('.hot-r').find('.p3').text()).attr('data-name',$(this).siblings('.hot-r').find('.p1').text());
        $('body').on('touchmove', function (event) {
            event.preventDefault();
        });
        $('body').css({'overflow':'hidden'})
    });
    $('.showMealBg>span').on('click',function () {
        $(this).parent().hide();
        $("body").unbind("touchmove");
        $('body').css({'overflow':'auto'})

    });
    //确认订单,去付款
    $('.payment').on('click',function () {
        if($('.meal-datails-catr>ul>li').length==0){
            alertBg(1,'',"请选择套餐！")
        }else{
            $('body').unbind("touchmove");
            $('body').css({'overflow':'auto'});
            var mealJSON=JSON.stringify(newJson);
            window.localStorage.setItem('mealJSON',mealJSON);
            location.href="html/makeSureMeal.html?1&emp_id="+empId+"&code="+code+"&state=state1&from=singlemessage&isappinstalled=0";
        }

    });
    function alertState(){
        $('.meal').find('.list').hide().siblings('.meal-details').hide().siblings('.notice').hide();
    }
});
