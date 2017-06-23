/**
 * Created by jianghu on 2017/2/20.
 */
$(function () {
    var http="https://www.railwaybaby.com/";
    var code=window.localStorage.getItem('code') ? window.localStorage.getItem('code'):'';
    var empId=window.localStorage.getItem('empId');
    fn01();
    function fn01 () {
        $('.refund-min>div').each(function (i,el) {
            var num1=0;
            var num2=0;
            $('.refund-min>div').eq(i).find('.u01>li').each(function (k,el) {
                num1+=$(this).find('.order-m>li').length;
                $('.u01>li').eq(k).each(function (l,el) {
                    $('.u01>li').eq(l).find('.order-m>li').each(function (m,el) {

                        num2+=parseFloat($(this).find('.g2').text().split("￥")[1])*parseInt($(this).find('.g5').text().split("x")[1])
                    })
                })
            });
            $('.refund-min>div').eq(i).find('.s1>i').text(num1);
            $('.refund-min>div').eq(i).find('.s2>i').text(num2.toFixed(2));

        })
    }
})