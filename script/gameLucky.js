/**
 * Created by jianghu on 2017/4/24.
 */
$(function(){
    var http="https://www.railwaybaby.com/";
    var code=window.localStorage.getItem('code') ? window.localStorage.getItem('code'):'';
    var empId=window.localStorage.getItem('empId');
    //加载地址=============================
        //兑换信息========
        historyList(code);
    //去游戏
    $('.goGame').one('click',function(){
        $.ajax({
            url:http+"wxToOtherApp",
            type:'post',
            cache:false,
            data:JSON.stringify({'code':code,'appid':'ff3f7c0f46baefe174443cdafe6d8e11'}),
            dataType:'json',
            contentType:"application/json",
            success:function(data){
                if(data.success==true){
                    window.location.href=data.object;
                }else{
                    alertBg(1,'',data.msg)
                }
            },
            error:function(){

            }
        });
    });
   //返回顶部============
    var scrollState=false;
    var start=0;
    $(window).scroll(function (){
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if(scrollTop>=500){
            $('.goTop').show();
        }else{
            $('.goTop').hide();
        }
        //if (scrollTop + windowHeight>=scrollHeight-300 && scrollState == false) {
        //        start++;
        //        scrollState = true;
        //        $('.tishi').text("已完成");
        //}
    });
    function historyList(code){
        $('.onload').show().siblings('.game-min').hide().siblings('.game-min').hide();
        $('.goGame').removeClass('gameActive');
        $.ajax({
            url:http+"findHistoryid",
            type:'post',
            cache:false,
            data:JSON.stringify({'code':code}),
            dataType:'json',
            contentType:"application/json",
            success:function(data){
                if(data.success==true){
                    if(data.object){
                        var str01="";
                        var str02="";
                        var num=0;
                        var num01=0;
                        $(data.object).each(function(m,el){
                            if(data.object[m].state==1){
                                str01+="<li data-id="+data.object[m].id+"> <div class='gameL'> <img src="+data.object[m].i_cover+" alt='加载失败'> </div> <div class='gameR'> <p class='p1'>"+data.object[m].name+"</p> <div data-s='0' class='btn'>领取</div> <span class='s01'>x"+data.object[m].num+"</span> <span class='s03'>兑换时间:"+date(parseInt(data.object[m].time*1000))+"</span><span class='s04'>x"+data.object[m].d_code+"</span> </div> </li>"
                            }else if(data.object[m].state==2){
                                str02+=" <li data-id="+data.object[m].id+"> <div class='gameL'> <img src="+data.object[m].i_cover+" alt='加载失败'> </div> <div class='gameR'> <p class='p1'>"+data.object[m].name+"</p> <span class='s01'>x"+data.object[m].num+"</span> <span class='s02'>已领取</span><span class='s03'>领取时间:"+date(parseInt(data.object[m].d_time))+"</span><span class='s04'>x"+data.object[m].d_code+"</span>  </div> </li>"
                            }
                        });
                        $('.convert').empty().append(str01);
                        $('.history').empty().append(str02);
                        if(num==0){
                            $('#p1').text('当前没有可领取物品，马上去玩游戏吧!')
                        }
                        setTimeout(function(){
                            $('.onload').hide().siblings('.game-min').show();
                            $('.more>p.p1').show().siblings('p.p2').hide().parents('.game-min').show().find('.goGame').addClass('gameActive');
                        },1000);
                        //兑换奖品===
                        $('.convert').find('.btn').on('click',function(){
                            if($(this).attr('data-s')==0){
                                alertBg(2,'','是否兑换');
                                var id=$(this).parents('li').attr('data-id');
                                var time=new Date().getTime();
                                $('#alertBtn03').on('click',function(){
                                    convert(code,id,time)
                                });
                                var that=$(this);
                                function convert(code,id,time){
                                    that.text('处理中').css({'background-color':'#ccc'}).attr('data-s',1);
                                    $.ajax({
                                        url:http+"updateState",
                                        type:'post',
                                        cache:false,
                                        data:JSON.stringify({'code':code,'id':id,'d_time':time}),
                                        dataType:'json',
                                        contentType:"application/json",
                                        success:function(data){
                                            if(data.success==true){
                                                alertBg(1,'',data.msg);
                                                $('#alertBtn01').on('click',function(){
                                                    that.text('领取').css({'background-color':'#ff4f4f'}).attr('data-s',0);
                                                    history.go(0);
                                                });
                                            }else{
                                                $('#p1').text(data.msg+"单击马上去玩兑换物品")
                                            }
                                        },
                                        error:function(){

                                        }
                                    });
                                }
                            }


                        });
                    }else{
                        if(data.state==1){
                            alertBg(1,'',data.msg);
                            $('#alertBtn01').on('click',function(){
                                window.location.href="httpss://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19f4a60762c40c37&redirect_uri=http%3A%2F%2Fwww.railwaybaby.com%2FtwoCode.html%3femp_id%3d0&response_type=code&scope=snsapi_userinfo&state=state1&connect_redirect=1#wechat_redirect"
                            })
                        }else{
                            $('#p1').text('当前没有可领取物品，马上去玩游戏吧!');
                            setTimeout(function(){
                                $('.onload').hide().siblings('.game-min').show();
                                $('.more>p.p1').hide().siblings('p.p2').hide().parents('.game-min').show().find('.goGame').addClass('gameActive');
                            },1000);
                        }
                    }
                }else{
                    if(data.state==1){
                        window.localStorage.setItem('share',location.href);
                        alertBg(1,'',data.msg);
                        $('#alertBtn01').on('click',function(){
                            window.location.href="httpss://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19f4a60762c40c37&redirect_uri=http%3A%2F%2Fwww.railwaybaby.com%2FtwoCode.html%3femp_id%3d0&response_type=code&scope=snsapi_userinfo&state=state1&connect_redirect=1#wechat_redirect"
                        })
                    }else{
                        $('.p1').hide();
                        $('#p1').text(data.msg);
                        setTimeout(function(){
                            $('.onload').hide().siblings('.game-min').show();
                            $('.more>p.p1').show().siblings('p.p2').hide().parents('.game-min').show().find('.goGame').addClass('gameActive');
                        },1000);
                    }
                }
            },
            error:function(){

            }
        });
    }
    //显示历史信息===
    $('.more>p.p1').on('click',function(){
        if($('.history>li').length==0){
            alertBg(1,'','当前没有历史记录')
        }else{
            $(this).hide().siblings('p.p2').show().parent().siblings('.history').slideDown();
        }

    });
    $('.more>p.p2').on('click',function(){
        $(this).hide().siblings('p.p1').show().parent().siblings('.history').slideUp();
    });
    function date(ns){
        var d = new Date(ns);
        var y=d.getFullYear();
        var m=d.getMonth() + 1<10 ? "0"+d.getMonth():d.getMonth();
        var day= d.getDate() <10 ? "0"+d.getDate():d.getDate();
        var h=d.getHours() <10 ? "0"+d.getHours():d.getHours();
        var f=d.getMinutes() <10 ? "0"+d.getMinutes():d.getMinutes();
        var dformat =y+"/"+m+"/"+day+" "+h+":"+f;
        return dformat;
    }
});