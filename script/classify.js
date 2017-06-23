/**
 * Created by jianghu on 2017/2/28.
 */
$(function () {
    var http='https://www.railwaybaby.com/';
    //所有分类
    function secondClass(cid) {
        $.ajax({
            url:http+"wxQueryClass",
            type:'post',
            cache:false,
            data:JSON.stringify({'code':1,'c_id':cid}),
            dataType:'json',
            contentType:'application/json',
            success:function(data){
                console.log(data)
                 var str01="";
                 var str02="";
                $(data.object).each(function (i,el) {
                    str01=' <div class="second-class" data-cid='+data.object[i].c_id+'><p>'+data.object[i].c_name+'</p> <ul></ul></div>'
                })
                $('.class-r').empty().append(str01);
                $(data.object).each(function (i,el) {
                   $(data.object[i].list).each(function (l,el) {
                       str02+=' <li><p class="p001" data-cid='+data.object[i].list[l].c_id+'>'+data.object[i].list[l].c_name+'</p></li>'
                   })
                });
                $('.second-class').find('ul').append(str02)
            },
            error:function(){

            }
        });
    };
    fn01();
    function fn01() {
        $.ajax({
            url:http+"wxQueryAllClass",
            type:'post',
            cache:false,
            data:JSON.stringify({'code':1}),
            dataType:'json',
            contentType:"application/json",
            success:function(data){
                if(data.success==false){
                    alert('刷新失败！')
                }else if(data.success==true){
                    console.log(data)
                    var str="";
                    $(data.object).each(function (i,el) {
                        str+=" <li data-cid="+data.object[i].c_id+">"+data.object[i].c_name+"</li>"
                    });
                    $('.first-class').empty().append(str);
                    $('.first-class>li').eq(0).addClass('active');
                    secondClass(1)
                }
            },
            error:function(){

            }
        });
    };
     $(document).on('click','.first-class>li',function () {
         $(this).addClass('active').siblings().removeClass('active');
         var cid=parseInt($(this).attr('data-cid'));
         secondClass(cid)
     });
    $(document).on('click','.p001',function () {
        console.log($(this).parents('.second-class').attr('data-cid'))
        window.location.href="list-goods.html"+"?"+$(this).attr('data-cid');
    })
})