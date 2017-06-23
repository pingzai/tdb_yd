/**
 * Created by Administrator on 2016/12/30.
 */
$(function(){
    var http="https://www.railwaybaby.com/";
    var code=window.localStorage.getItem('code') ? window.localStorage.getItem('code'):'';
    var empId=window.localStorage.getItem('empId');
    //调积分信息============
    fn1();
    function fn1 () {
        var str='';
        $('.intergal-ul').empty().append("<li class='li1'>积分消费记录</li>");
        var arr=[{name:'123'},{name:'321'},{name:'234'}];
        // $.ajax({
        //     url:'',
        //     type:'post',
        //     dataType:'json',
        //     success:function (data) {
        //         $(data).each(function (i,el) {
        //                  $('.intergal-ul').append();
        //         })
        //     }
        // })
        $(arr).each(function (i,el) {
            str+="<li><span>2016.12.30 16:29</span><span>兑换红包</span><span>-2000</span></li>"
        })
        $('.intergal-ul').append(str);
    }
    //兑换红包
    $('.intergal-min>span').on('click',function(){
        $(this).parent().siblings('.exchange').show();
    });
    $('.exchange span.makeTure').on('click',function(){
        var reg=/^-?[1-9]\d*$/;
        if(reg.test($('.exchange').find('input').val())==true){
            $(this).parent().siblings('.ts').show().siblings().hide();
        }else{
            alertBg(1,'','不能为空/请输入整数！')
        }

    });
    //关闭按钮=======
    $('.close').on('click',function () {
        $(this).parent('.exchange').hide().find('input').val('');
        $(this).siblings('div').find('.ts').hide().siblings().show();
    });
    //输入框里的文字
    $('#i').on('click',function(){
        $(this).hide().siblings('input:text').focus();
    });
})