/**
 * Created by jianghu on 2017/3/8.
 */
$(function(){
    var MealJson=JSON.parse(window.localStorage.getItem('mealJSON'));
    var http="https://www.railwaybaby.com/";
    var code=window.localStorage.getItem('code') ? window.localStorage.getItem('code'):'';
    var empId=window.localStorage.getItem('empId');
        //最终确认========
        addMeal();

    $('body').on('touchmove', function (event) {
        event.preventDefault();
    });
    $('body').css({'overflow':'hidden'})

    function addMeal(){
        $('#mealName').val('');
        $('#mealPhone').val('');
        $('.againMeal').find('.againMin>div').eq(1).find('span').eq(1).text(MealJson.trainNumber);
        $('.againMeal').find('.againMin>div').eq(2).find('span').eq(1).text(MealJson.data);
    }
    $('.againMin>.btn').on('click',function(){
        if($('#mealName').val()&&$('#mealPhone').val()){
            var reg =/0?(13|14|15|18)[0-9]{9}$/;
            if(reg.test($('#mealPhone').val())==true){
                if($('.readMe').find('input').prop('checked')==true){
                    MealJson.eatingTime=$('#mealTime').val();
                    MealJson.name=$('#mealName').val();
                    MealJson.phone=$('#mealPhone').val();
                    $(this).parents('.againMeal').hide();
                    $("body").unbind("touchmove");
                    $('body').css({'overflow':'auto'});
                    console.log(MealJson);
                    $('#userName').text(MealJson.name).siblings('#userPhone').text(MealJson.phone);
                    $('#mealAddress').text(MealJson.data+" , "+MealJson.trainNumber+" , "+MealJson.eatingTime);
                }else{
                    alertBg(1,'','请先阅读铁路订餐须知!')
                }
            }else{
                alertBg(1,'','手机格式不正确!')
            }

        }else{
            alertBg(1,'','姓名/联系方式不能为空!')
        }
    });
    //修改信息=============
    $('.makeTrueMeal-min').on('click',function(){
        $('.againMeal').show();
        $('body').on('touchmove', function (event) {
            event.preventDefault();
        });
        $('body').css({'overflow':'hidden'})
    });
    //下拉
    $('.chooseWay>li').on('click',function () {
        $(this).find('ul').slideToggle(300);
        if($(this).find('.ss').attr('data-down')==0){
            $(this).find('.ss').attr('src','../img/jt-down.png').css({
                'width':'0.18rem',
                'right':'0.05rem'
            }).attr('data-down',1)
        }else{
            $(this).find('.ss').attr('src','../img/jt.png').css({
                'width':'0.1rem',
                'right':'0.1rem'
            }).attr('data-down',0)
        }
    });
    //下拉里面的选项===
    $('.secondChoose>li').on('click',function () {
        $(this).parent().siblings('.d2').text($(this).text())
    });
})