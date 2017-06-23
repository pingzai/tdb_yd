/**
 * Created by jianghu on 2017/3/21.
 */
function alertBg(num,fn,txt){
    if(num==1){
        $('.alertBg').show().find('.prompt02').hide().siblings().show().find('p').text(txt);
        $('body').on('touchmove', function (event) {
            event.preventDefault();
        });
        $('body').css({'overflow':'hidden'});
        $('#alertBtn01').one('click',function(){
            $('#alertBtn03').unbind('click');
            $(this).parents('.alertBg').hide();
            $("body").unbind("touchmove");
            $('body').css({'overflow':'auto'})
        });
    }else if(num==2){
            $('.alertBg').show().find('.prompt01').hide().siblings().show().find('p').text(txt);
            $('body').on('touchmove', function (event) {
                event.preventDefault();
            } )
            $('body').css({'overflow':'hidden'});

            $('#alertBtn03').one('click',function(){
            $(this).parents('.alertBg').hide();
            $("body").unbind("touchmove");
            $('body').css({'overflow':'auto'});
        });
        $('#alertBtn02').one('click',function(){
            $('#alertBtn03').unbind('click');
            $(this).parents('.alertBg').hide();
            $("body").unbind("touchmove");
            $('body').css({'overflow':'auto'})
        });
    }
}