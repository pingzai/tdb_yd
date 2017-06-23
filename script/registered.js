/**
 * Created by jianghu on 2017/2/20.
 */
$(function () {
    fn01($('#userN').val());
    function fn01(str) {
        var reg =/0?(13|14|15|18)[0-9]{9}$/;
        if(reg.test(str)==true){
            $('.btn02').css({'background-color':'#ff4f4f'});
            //获取验证码=============
            $('.btn02').on('click',function () {
                if($(this).attr('data-a')==0){
                    $(this).attr('data-a',1);
                        var num=60;
                        var timer=setInterval(function () {
                            num--;
                            if(num>0){
                                $('.btn02').attr('data-a',1).text("("+num+"s)").css({
                                    'background-color':'#ccc'
                                })
                            }else{
                                clearInterval(timer);
                                $('.btn02').attr('data-a',0).text('获取验证码').css({
                                    'background-color':'#ff4f4f'
                                });
                            }
                        },1000);

                }

            });

        }else{
            $('.btn02').css({'background-color':'#ddd'});
        }
    };
    //验证码颜色状态===================
    $('#userN').keyup(function () {
        var str=$('#userN').val();
        fn01(str);
    });
   //确定按钮
    $('#btn01').on('click',function(){
                   if(!$('#userP').val()&&!$('#userW').val()){
                       alertBg(1,'','验证码/密码不能为空！')
                   }else{
                       if($('.radio').find('input').prop('checked')==true){

                       }else{
                           alertBg(1,'','请同意铁路商城用户注册协议！')
                       }
                   }
    });
});