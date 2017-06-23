/**
 * Created by Administrator on 2017/1/5.
 */
$(function(){
    $("#userName").html(sessionStorage.name);
    //红包背景颜色
    (function(){
        if($('.packe-append>li').length!=0){
            $('.packe-append>li').eq(0).addClass('packe-active')
        }
    })()
    $(document).on('mouseover','.append-li',function(){
        $(this).addClass('packe-active').siblings('li').removeClass('packe-active');
    })


    //已有红包内容修改
    $(document).on('click','.append-li',function(){
        $(this).parent().siblings('.packe-change').show().siblings().hide();
        $('.release').attr('data-state',$(this).index()+1);
    })
    //+ 号 添加事件
    $('.change-bottom>span').on('click',function(){
        var str='';
        str="<li class='append-li'><div class='box1'><span class='li1-s'></span>￥ "+$(this).next('.appendMoney-ul').find('.fixed-li>.box1>input').val()+" </div><div class='box2'>总数量<span>"+$(this).next('.appendMoney-ul').find('.fixed-li>.box2>input').val()+"</span></div><div class='box3'>剩余数量<span>"+$(this).next('.appendMoney-ul').find('.fixed-li>.box3>input').val()+"</span></div><div class='box4'>状态<span>"+$('#select02').val()+"</span></div></li>"
        $(this).next('.appendMoney-ul').append(str);
    })
  //新增按钮
    $('.marketingPacke-list>span').on('click',function(){
        $(this).parent().siblings('.packe-change').show().siblings().hide();
    })
//返回按钮
    $('.change-return').on('click',function(){
        $(this).parents('.packe-change').hide().siblings().show();
    })
//保存/发布 按钮

    $('.release').on('click',function(){
        var str='';
        if($(this).attr('data-state')==0){

            str="<li class='append-li'><span>"+$('#input1').val()+"</span><span>"+$('#input2').val()+"</span><span>"+$('#input4').val()+"</span><span>13</span><span>"+$('#select01').val()+"</span></li>";
            $(this).parents('.packe-change').siblings('.packe-append').append(str)
        }else{
            $('.packe-append>li').eq($(this).attr('data-state')-1).find('span').eq(0).text($('#input1').val());
            $('.packe-append>li').eq($(this).attr('data-state')-1).find('span').eq(1).text($('#input2').val());
            $('.packe-append>li').eq($(this).attr('data-state')-1).find('span').eq(2).text($('#input4').val());
            $('.packe-append>li').eq($(this).attr('data-state')-1).find('span').eq(4).text($('#select01').val());
        }
        $(this).parents('.packe-change').hide().siblings().show();
        $(this).attr('data-state',0);
    })
})