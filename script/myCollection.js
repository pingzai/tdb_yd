/**
 * Created by jianghu on 2017/3/3.
 */
$(function(){
    var http="https://www.railwaybaby.com/";
    var code=window.localStorage.getItem('code') ? window.localStorage.getItem('code'):'';
    var empId=window.localStorage.getItem('empId');
    collect(code);
    function collect(code) {
        $.ajax({
            url:http+"wxQueryCollect",
            type:'post',
            data:JSON.stringify({'code':code}),
            dataType:'json',
            contentType:"application/json",
            success:function(data){
                if(data.success==true){
                    var str="";
                    $(data.object).each(function (i,el) {
                        str+="<li class='collection-li' data-iid="+data.object[i].i_id+" data-cid="+data.object[i].c_id+"><input type='checkbox' class='collection-check'/> <div class='l'> <img class='lazy' src='../img/onload.gif' data-original="+data.object[i].i_cover+" alt=''/> </div> <div class='r'> <p class='p1'>"+data.object[i].i_name+"</p></div> </li>"
                    });
                    $('ul').empty().append(str);
                    $('img.lazy').lazyload({
                        effect:'fadeIn'
                    });
                }else{
                    if(data.state==1){
                        window.localStorage.setItem('share',location.href);
                        alertBg(1,'',data.msg);
                        $('#alertBtn01').on('click',function(){
                            window.location.href="httpss://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19f4a60762c40c37&redirect_uri=http%3A%2F%2Fwww.railwaybaby.com%2FtwoCode.html%3femp_id%3d0&response_type=code&scope=snsapi_userinfo&state=state1&connect_redirect=1#wechat_redirect"
                        })
                    }else{
                        $('#collectionList>p').show().siblings('ul').empty();
                    }

                }
            },
            error:function(){

            }
        });
    }
    //复选按钮
    $('#collectionList>.removeAll').find('label').on('click',function(){
        if($(this).find('input:checkbox').prop('checked')==true){
            $(this).parent().prev().find('input:checkbox').prop('checked',true)
        }else{
            $(this).parent().prev().find('input:checkbox').prop('checked',false)
        }
    });
    //删除
    $('#collectionList>.removeAll').find('span').on('click',function(){
        var sum=0;
        fnChecked();
        function fnChecked(){

            $('#collectionList>ul>li').each(function (i,el) {
                if($(this).find('input:checkbox').prop('checked')==true){
                   sum++;
                }
            });

        }
       if(sum==0){
           alertBg(1,'','请选择商品')
       }else{
           alertBg(2,"",'是否删除该收藏？');
           $('#alertBtn03').on('click',function(){
               wxDeleteCollect();
           });
           function wxDeleteCollect(){
               var arr=[];
               $('li.collection-li').each(function (i,el) {
                   if($(this).find('input:checkbox').prop('checked')==true){
                       arr.push($(this).attr('data-cid'));
                   }
               });
               var str=arr.join(',');
               $.ajax({
                   url:http+"wxDeleteCollect",
                   type:'post',
                   data:JSON.stringify({'code':code,'c_id':str}),
                   dataType:'json',
                   contentType:"application/json",
                   success:function(data){
                       if(data.success==true){
                           alertBg(1,'',data.msg);
                           collect(code);
                       }else{
                           alertBg(1,'',data.msg);
                       }
                   },
                   error:function(){

                   }
               });
           }
       }
    });
    $(document).on('click','.collection-li',function(e){
        if(e.target.className!='collection-check'){
            window.location.href="goods-information.html?id="+$(this).attr('data-iid');
        }

    })
})