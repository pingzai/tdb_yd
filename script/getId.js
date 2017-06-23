/**
 * Created by jianghu on 2017/2/20.
 */
$(function () {
    var http=window.localStorage.getItem('https');
    //var code=location.href.split("?")[1].split('&')[2].split("=")[1];
    //var empId=location.href.split("?")[1].split('&')[1].split("=")[1];
    //footer点击事件
    $('.footer>a').on('click',function(){
        $('html,body').animate({scrollTop:0},100);
        $('.goTop').hide();
        window.sessionStorage.setItem('indexState',$(this).attr('data-h'));
        if($(this).index()==0){
            document.title="铁道宝";
        }
        if($(this).index()==1){
            alertBg(1,'','敬请期待!')
            return;
            document.title="订餐";
        }else if($(this).index()==2){
            document.title="购物车";
            //购物车
            loadGoods(code);
        }else if($(this).index()==3){
            personCenter(code);
            wxPoints();
            document.title="个人中心"
        };
        for(var i=0;i<$('.footer>a').length;i++){
            $('.footer>a').eq(i).find('img').attr('src','img/footer'+(i+1)+'.png')
        }
        $(this).find('img').attr('src', 'img/footer0'+($(this).index()+1)+'.png');
        // $(this).siblings('a').find('img').attr('src', 'img/footer'+($(this).index()+1)+'.png');
        $('.min>div').eq($(this).index()).show().siblings().hide();
        history.pushState(null, 'index', location.href.split("?")[0]+"?ta="+$(this).attr('data-h')+"&emp_id="+empId+"&code="+code+"&state=state1&from=singlemessage&isappinstalled=0");
        history.replaceState(null, 'index',location.href.split("?")[0]+"?ta="+$(this).attr('data-h')+"&emp_id="+empId+"&code="+code+"&state=state1&from=singlemessage&isappinstalled=0");
        personName=parseInt(location.href.split("?")[1].split('&')[0].split('=')[1].substr(0,1));
        if(personName==3){
            personCenter(code);
        }
        if(personName==1){
            if($('.notice-show').is(':visible')||$('.showMealBg').is(':visible')||$('.mealCartBg').is(':visible')){
                $('body').on('touchmove', function (event) {
                    event.preventDefault();
                });
                $('body').css({'overflow':'hidden'})
            }
        }
    });
    function loadGoods(code){
        $.ajax({
            url:http+"wxQueryShopCar",
            type:'post',
            data:JSON.stringify({'code':code}),
            dataType:'json',
            cache:false,
            contentType:"application/json",
            success:function(data){
                if(data.success==false){
                    $('.cartNull').show().siblings().hide();
                    $('.content').empty();
                }else if(data.success==true){
                    $('.cartNull').hide().siblings().show();
                    var str01="";
                    var str02="";
                    $(data.object).each(function (i,el) {
                        str01+="  <div class='cart-content' data-seller="+data.object[i].seller_id+" data-name="+data.object[i].s_name+"><div class='cart-nav'><label class='label1'> <input type='checkbox'/> </label> <p>"+data.object[i].s_name+"</p> </div> <ul class='cart-ul'></ul></div>";
                    });
                    $('.content').empty().append(str01);
                    for(var y=0;y<data.object.length;y++){
                        str02="";
                        for (var t=0;t<data.object[y].list.length;t++){
                            str02+="<li data-sid="+data.object[y].list[t].s_id+" data-gid="+data.object[y].list[t].g_id+"   data-price="+data.object[y].list[t].price+" ><input data-seller="+data.object[y].seller_id+" data-name="+data.object[y].s_name+" type='checkbox' class='goodsCart-state'/><img class='l lazy' src='img/onload.gif' data-original="+data.object[y].list[t].i_cover+" data-iid="+data.object[y].list[t].i_id+"> <div class='r'><p class='stock'>库存不足</p> <p class='p1'>"+data.object[y].list[t].i_name+"</p> <div class='classify1'> <span class='span1'>"+data.object[y].list[t].g_name+"</span> </div> <span class='money goods-money'>￥"+parseFloat(data.object[y].list[t].price).toFixed(2)+"</span><div class='s3'><span class='span1 num-sub'>-</span><form   class='span2' action='' onsubmit='return false'><input class='num-show' maxlength='3' type='text' value="+data.object[y].list[t].g_counts+"></form><span class='span3 num-add'>+</span></span></div> </li>"
                        }
                        $('.content>.cart-content').eq(y).find('.cart-ul').empty().append(str02);
                        $('img.lazy').lazyload({
                            effect:'fadeIn'
                        });
                    };
                    $('.content>div.cart-content').each(function () {
                        if($(this).find('.cart-ul').length==0){
                            $(this).remove();
                        }
                    });
                    initNum01();
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
                        backgroundColor:'#e3e3e3',
                        borderColor:'#e3e3e3',
                        cursor:'default'
                    })
                }else{
                    $('.content>div').eq(a).find('ul>li').eq(b).find('.num-sub').css({
                        backgroundColor:'#fff',
                        borderColor:'#989898',
                        cursor:'pointer'
                    })
                }
            })
        })

    }
    function personCenter(code){
        $.ajax({
            url:http+"wxUserCenter",
            type:'post',
            cache:false,
            data:JSON.stringify({'code':code}),
            dataType:'json',
            contentType:"application/json",
            success:function(data){
                if(data.success==true){
                    $('.headpic').attr('src',data.object.headimgurl).siblings('.username').text(data.object.u_name);
                }else{
                    alertBg(1,'',data.msg)
                }

            },
            error:function(){

            }
        });
    }
    function wxPoints(){
        $.ajax({
            url:http+"wxAllPoints",
            type:'post',
            cache:false,
            data:JSON.stringify({'code':code}),
            dataType:'json',
            contentType:"application/json",
            success:function(data){
                if(data.success==true){
                    $('.mybreadth>p.p01').text(data.object.points);
                }else{
                    $('.mybreadth>p.p01').text(data.msg);
                }
            },
            error:function(){

            }
        });
    }
});