$(function () {
    var http="https://www.railwaybaby.com/";
    var code=window.localStorage.getItem('code') ? window.localStorage.getItem('code'):'';
    var empId=window.localStorage.getItem('empId');
    //加载地址=============================
        addressLoad (code);
    function addressLoad (code) {
        $.ajax({
            url:http+"wxQueryAllAddress",
            type:'post',
            cache:false,
            data:JSON.stringify({'code':code}),
            dataType:'json',
            contentType:"application/json",
            success:function(data){
                if(data.success==true){
                    var strAddress="";
                    $(data.object).each(function (i,el) {
                        strAddress+="<li class='new-address' data-aid="+data.object[i].a_id+" data-atype="+data.object[i].a_type+"><div class='add-t'> <p class='p1'>"+data.object[i].a_uname+"</p><p class='p2'>"+data.object[i].a_phone+"</p> <p class='p3'>"+data.object[i].a_address+"</p> <p class='p4'>"+data.object[i].a_postcode+"</p></div> <div class='add-b'> <label class='radio'><input type='radio' name='adderss'><i></i>设为默认</label> <span class='s3 replace-address'> 编辑 </span> <span class='s2 deleat-address'> 删除 </span> </div> </li>"
                    });
                    $('.address-list').empty().append(strAddress);
                    $('.address-list>li').each(function () {
                        if($(this).attr('data-atype')==1){
                            $(this).find('input:radio').attr("checked","checked");
                        }else if($(this).attr('data-atype')==2){
                            $(this).find('input:radio').attr("checked",false);
                        }
                    });
                    //全部加载完成============

                }else{
                    if(data.state==1){
                        window.localStorage.setItem('share',location.href);
                        alertBg(1,'',data.msg);
                        $('#alertBtn01').on('click',function(){
                            window.location.href="httpss://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19f4a60762c40c37&redirect_uri=http%3A%2F%2Fwww.railwaybaby.com%2FtwoCode.html%3femp_id%3d0&response_type=code&scope=snsapi_userinfo&state=state1&connect_redirect=1#wechat_redirect"
                        })
                    }else{
                        $('.address-manage').append("<p style='text-align: center;color: #ccc'>地址为空，请添加地址</p>").find('.address-list').empty();
                    }

                }

            },
            error:function(){

            }
        });
    }
    //lable单击事件,修改默认地址
    $(document).on('click','input:radio', function (e) {
       var num=$(this).parents('.new-address').attr('data-aid');
        alertBg(2,"",'你确定要修改默认地址吗？');
        $('#alertBtn03').one('click',function(){
                $.ajax({
                    url:http+"wxUpdateDefaultAddress",
                    type:'post',
                    cache:false,
                    data:JSON.stringify({'code':code,'a_id':num}),
                    dataType:'json',
                    contentType:"application/json",
                    success:function(data){
                        if(data.success==true){
                            addressLoad (code);
                        }else{
                            alertBg(1,'',data.msg);
                        }
                    },
                    error:function(){
                    }
            });
        });
        $('#alertBtn02').on('click',function(){
            addressLoad (code);
        })
    });
    //删除
    $(document).on('click', '.deleat-address', function (e) {
        e.stopPropagation();
        var num=parseInt($(this).parents('li.new-address').attr('data-aid'));
        alertBg(2,"",'你确定要删除该地址吗？');
        $('#alertBtn03').on('click',function(){
                $.ajax({
                    url:http+"wxDelAllAddress",
                    type:'post',
                    cache:false,
                    data:JSON.stringify({'code':code,'a_id':num}),
                    dataType:'json',
                    contentType:"application/json",
                    success:function(data){
                        if(data.success==true){
                            //history.go(0)
                            alertBg(1,'',data.msg);
                            addressLoad (code);
                        }
                    },
                    error:function(){

                    }
                });
        });
        $('#alertBtn02').on('click',function(){
            $(this).parents('.alertBg').hide();
        })
    });
    //编辑
    $(document).on('click', '.replace-address', function (e) {
        e.stopPropagation();
        window.location.href="appendAddress.html?address=0";
        sessionStorage.setItem('addressC',$(this).parents('.new-address').attr('data-aid'));
        sessionStorage.setItem('addressN',$(this).parent().siblings('.add-t').find('.p1').text());
        sessionStorage.setItem('addressP',$(this).parent().siblings('.add-t').find('.p2').text());
        sessionStorage.setItem('addressA',$(this).parent().siblings('.add-t').find('.p3').text());
        sessionStorage.setItem('addressY',$(this).parent().siblings('.add-t').find('.p4').text());
    });
    //添加地址
    $('.append-address').on('click', function (e) {
        e.stopPropagation();
        window.location.href="appendAddress.html?address=1";
    });
});
