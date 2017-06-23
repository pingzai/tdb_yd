/**
 * Created by Administrator on 2016/12/30.
 */
$(function(){
    var http="https://www.railwaybaby.com/";
//    var http = "http://192.168.1.45:9000/";
    var code=window.localStorage.getItem('code') ? window.localStorage.getItem('code'):'';
    var empId=window.localStorage.getItem('empId');
    //头像==
    personCenter(code);
    function personCenter(code){
        $.ajax({
            url:http+"wxUserCenter",
            type:'post',
            cache:false,
            data:JSON.stringify({'code':code}),
            dataType:'json',
            contentType:"application/json",
            success:function(data){
            	//console.log(123);
                if(data.success==true){
                    $('.headpic').attr('src',data.object.headimgurl).siblings('.username').text(data.object.u_name);
                    //积分查看====================
                    wxPoints(code);
                }else{
                    if(data.state==1){
                        window.localStorage.setItem('share',location.href);
                        alertBg(1,'',data.msg);
                        $('#alertBtn01').on('click',function(){
                            window.location.href="httpss://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19f4a60762c40c37&redirect_uri=http%3A%2F%2Fwww.railwaybaby.com%2FtwoCode.html%3femp_id%3d0&response_type=code&scope=snsapi_userinfo&state=state1&connect_redirect=1#wechat_redirect"
                        })
                    }else{
                        alertBg(1,'',data.msg)
                    }

                }

            },
            error:function(){

            }
        });
    }
    function wxPoints(code){
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
    //我的积分查看
    $('.mybreadth').on('click',function(){
        alertBg(1,'','敬请期待！');
        //window.location.href="myintegral.html"
    });
    //钱包
    $('.personalCenter-list>.purse').on('click',function(){
        alertBg(1,'','敬请期待！');
        //window.location.href="mypurse.html";
    });
    //订单管理
    $('.order-list>div').on('click',function(){
        if($(this).index()!=3){
            window.location.href="orderForm.html?order="+$(this).find('a').attr('data-i');
        }else{
            alertBg(1,'','敬请期待！');
            // window.location.href="refund.html";
        }

    });
    //我的收藏
    $('.personalCenter-list>.collection').on('click',function(){
        window.location.href="myCollection.html";
    });
    //客服信息
    $('.personalCenter-list').find('.service').on('click',function(){
       window.location.href="serviceInformation.html";
    });
    //地址管理
    $('.personalCenter-list').find('.address').on('click',function() {
        window.location.href="address.html";
    });
    //设置
    $('.personalCenter-list').find('.set').on('click',function(){
        window.location.href="set.html";
    });
    //关注我=====
    $('.personalCenter-list').find('.focus').on('click',function(){
        window.location.href="code.html";
    });
    //游戏福利====
    $('.personalCenter-list').find('.game').on('click',function(){
        window.location.href="gameLucky.html";
    });
    $('.footer>a').on('click',function(){
        if($(this).index()==0){
            window.location.href="../index01.html?emp_id="+empId+"&code="+code+"&state=state1&from=singlemessage&isappinstalled=0";
        }
        if($(this).index()==1){
            alertBg(1,'','敬请期待')
        }
        if($(this).index()==2){
            window.location.href="cart.html"
        }
        if($(this).index()==3){

        }
    })
})