$(function(){
    initNum();
    function addMonet() {
        var num1 = 0;
        $($('.goodsCart-state', window.parent.document)).each(function () {
            if ($(this).prop('checked') == true) {
                num1 += (parseFloat($(this).siblings('.r').find('.goods-money').text().split('￥')[1]) * parseInt($(this).siblings('.r').find('input.num-show').val()));
                $('.addMoney>.add').find('span').eq(1).text("￥ " + num1.toFixed(2));
            }else{
                num1+=0;
                $('.addMoney>.add').find('span').eq(1).text("￥ " + num1.toFixed(2));
            }
        })
    }
    function totalMoney(){
        var add=0.00;
        if($(document).find('.meal-datails-catr>ul>li').length==0){
            $('.total-money').text('￥'+add.toFixed(2));
        }else{
            $(document).find('.meal-datails-catr>ul>li').each(function(){
                add+=$(this).find('.s1').text().split('￥')[1]*$(this).find('.num-show').val();
            })
        }
        $('.total-money').text("￥"+add.toFixed(2))
    }
    function initNum(){
        if($(document).find('.num-show').eq(0).val()==1){
            $(document).find('.num-sub').css({
                backgroundColor:'#e3e3e3',
                borderColor:'#e3e3e3',
                cursor:'default'
            })
        }else{
            $(document).find('.num-sub').css({
                backgroundColor:'#fff',
                borderColor:'#989898',
                cursor:'pointer'
            })
        }
    }
    //+==================================================================
    $(document).on('click','.num-add',function(e){
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        e.stopPropagation();
        var num= parseInt($(this).prev().find('input').val());
        if(num>=1){
            $(this).siblings('.num-sub').css({
                backgroundColor:'#fff',
                borderColor:'#989898',
                cursor:'pointer'
            });
        }else{
            $(this).siblings('.num-sub').css({
                backgroundColor:'#e3e3e3',
                borderColor:'#e3e3e3',
                cursor:'default'
            });
        }
        num++;
        $(this).siblings('form').find('input').val(num);
        addMonet();
        totalMoney();
    })
    //-=====================================================================
    $(document).on('click','.num-sub',function(e){
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        e.stopPropagation();
        var num= parseInt($(this).next().find('input').val());
        num--;
        if(num>1){
            $(this).siblings('.num-sub').css({
                backgroundColor:'#fff',
                borderColor:'#989898',
                cursor:'pointer'
            });
        }else{
            num=1;
            $(this).css({
                backgroundColor:'#e3e3e3',
                borderColor:'#e3e3e3',
                cursor:'default'
            });
        }
        $(this).next().find('input').val(num);
        addMonet();
        totalMoney();
    });
    $(document).on('keyup','.num-show',function(e){
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        e.stopPropagation();
                var num01=$(this).val();
                if(num01>1){
                    $(this).parent().prev('.num-sub').css({
                        backgroundColor:'#fff',
                        borderColor:'#989898',
                        cursor:'pointer'
                    });
                }else{
                    $(this).parent().prev('.num-sub').css({
                        backgroundColor:'#e3e3e3',
                        borderColor:'#e3e3e3',
                        cursor:'default'
                    });
                }
                addMonet();
                totalMoney();
    })
});


