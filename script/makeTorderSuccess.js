/**
 * Created by jianghu on 2017/3/3.
 */
$(function () {
    var http="https://www.railwaybaby.com/";
    var code=window.localStorage.getItem('code') ? window.localStorage.getItem('code'):'';
    var empId=window.localStorage.getItem('empId');
    //返回首页
    $('.success-min>span.span02').on('click',function(e){
        window.location.href="../index01.html";
    });
    $('.success-min>span.span01').on('click',function(e){
        window.location.href="orderForm.html?order=0";
    });
    //积分展示
    //var points=parseInt(window.localStorage.getItem('points'));
    //$('.p2').text('获得积分'+points+'(可通过个人中心查看)');
});