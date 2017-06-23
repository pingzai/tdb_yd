/**
 * Created by jianghu on 2017/3/3.
 */
$(function(){
    var http="https://www.railwaybaby.com/";
    var code=window.localStorage.getItem('code') ? window.localStorage.getItem('code'):'';
    var empId=window.localStorage.getItem('empId');
    var addressS=location.href.split('?')[1].split('&')[0].split('=')[1];
    console.log(addressS)
    replaceAddress(addressS);
    function replaceAddress(addressS){
        if(addressS==0){
            $('.append-address').attr('data-address',0);
        }else{
            $('.append-address').attr('data-address',1);
        }
        $('#input01').val(sessionStorage.getItem('addressN'));
        $('#input02').val(sessionStorage.getItem('addressP'));
        $('#input03').val(sessionStorage.getItem('addressA'));
        $('#input04').val(sessionStorage.getItem('addressY'));
        sessionStorage.removeItem('addressN');
        sessionStorage.removeItem('addressP');
        sessionStorage.removeItem('addressA');
        sessionStorage.removeItem('addressY');
    };
    //保存地址======
    //修改
    $('.append-address').on('click',function(){
        var reg01 =/0?(13|14|15|18)[0-9]{9}$/;
        var reg02 =/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/;
        if(!$('#input01').val()){
            alertBg(1,'','收货人姓名不能为空');
        }else{
            if(!$('#input02').val()){
                alertBg(1,'','联系方式不能为空');
            }else{
                if(!$('#input03').val()){
                    alertBg(1,'','收货地址不能为空');
                }else{
                    if(reg02.test($('#input01').val())==false){
                        alertBg(1,'','收货人姓名包含非法字符')
                    }else{
                        if(reg01.test($('#input02').val())==false){
                            alertBg(1,'','手机号格式不对')
                        }else{
                            //修改==================================
                            if($(this).attr('data-address')==0){
                                var num=parseInt(window.sessionStorage.getItem('addressC'));
                                $.ajax({
                                    url:http+"wxUpdateAddress",
                                    type:'post',
                                    cache:false,
                                    data:JSON.stringify({'code':code,'a_id':num ,'a_address':$('#input03').val(),'a_uname':$('#input01').val(),'a_phone':$('#input02').val(),'a_postcode':$('#input04').val()}),
                                    dataType:'json',
                                    contentType:"application/json",
                                    success:function(data){
                                        if(data.success==true){
                                            window.sessionStorage.removeItem('addressC');
                                            alertBg(1,'',data.msg);
                                            $('#alertBtn01').on('click',function(){
                                                window.location.href="address.html";
                                            });
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
                                //新建========================
                            }else if($(this).attr('data-address')==1){
                                $.ajax({
                                    url:http+"wxAddAddress",
                                    type:'post',
                                    cache:false,
                                    data:JSON.stringify({'code':code,'a_address':$('#input03').val(),'a_uname':$('#input01').val(),'a_phone':$('#input02').val(),'a_postcode':$('#input04').val()}),
                                    dataType:'json',
                                    contentType:"application/json",
                                    success:function(data){
                                        if(data.success==true){
                                            alertBg(1,'',data.msg);
                                            $('#alertBtn01').on('click',function(){
                                                window.location.href="address.html";
                                            });
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
                        }
                    }
                }
            }
        }
    });
    //获得焦点 保存按钮隐藏====================
    var browser={
        versions:function(){
            var u = navigator.userAgent, app = navigator.appVersion;
            return {         //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language:(navigator.browserLanguage || navigator.language).toLowerCase()
    };
    //字符限制====================
    $('.replace-min').find('input').on('keyup',function(){
        getByteLen($(this).val());
        if(getByteLen($(this).val())>=100){
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
    //if(browser.versions.ios==true){
    //
    //}else if(browser.versions.android==true){
    //    $('.replace-min').find('input').on('focus',function (e) {
    //        e.stopPropagation();
    //        $('.append-address').hide();
    //    });
    //    $('.replace-min').find('input').on('blur',function (e) {
    //        e.stopPropagation();
    //        $('.append-address').show();
    //    });
    //};
});