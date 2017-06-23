/**
 * Created by Administrator on 2017/1/5.
 */
$(function(){
    $("#userName").html(sessionStorage.name);
    //活动背景颜色
    (function(){
        if($(document).find('.activity-append>li').length!=0){
            $('.activity-append>li').eq(0).addClass('activity-active')
        }
    })()

    $(document).on('mouseover','.append-li',function(){
        $(this).addClass('activity-active').siblings().removeClass('activity-active');
    })
    //已有红包内容修改
    $('.activity-append>li').on('click',function(){
        $(this).parent().siblings('.activity-change').show().siblings().hide();
        $('.release').attr('data-state',$(this).index()+1);
    })
    //+ 号 添加事件
    $('.change-bottom>span').on('click',function(){
        var str='';
        str="<li class='append-li'><div class='box1'><span class='li1-s'></span></div><div class='box2'>满<span>"+$(this).next('.appendActivity-ul').find('.fixed-li>.box2>input').val()+"</span></div><div class='box3'>减<span>"+$(this).next('.appendActivity-ul').find('.fixed-li>.box3>input').val()+"</span></div><div class='box4'>状态<span>"+$('#s02').val()+"</span></div></li>"
        $(this).next('.appendActivity-ul').append(str);
    })
  //新增按钮
    $('.marketingActivity-list>span').on('click',function(){
        $(this).parent().siblings('.activity-change').show().siblings().hide();
    })
//返回按钮
    $('.change-return').on('click',function(){
        $(this).parents('.activity-change').hide().siblings().show();
    })
//保存/发布 按钮
    $('.release').on('click',function(){
        var str='';
        if($(this).attr('data-state')==0){
            str="<li class='append-li'><span>"+$('#input1').val()+"</span><span>"+$('#input3').val()+"</span><span>"+$('#input4').val()+"</span><span>"+$('#s01').val()+"</span></li>";
            $(this).parents('.activity-change').siblings('.activity-append').append(str)
        }else{
            $('.activity-append>li').eq($(this).attr('data-state')-1).find('span').eq(0).text($('#input1').val());
            $('.activity-append>li').eq($(this).attr('data-state')-1).find('span').eq(1).text($('#input3').val());
            $('.activity-append>li').eq($(this).attr('data-state')-1).find('span').eq(2).text($('#input4').val());
            $('.activity-append>li').eq($(this).attr('data-state')-1).find('span').eq(3).text($('#s01').val());
        }
        $(this).parents('.activity-change').hide().siblings().show();
        $(this).attr('data-state',0);
    })
})