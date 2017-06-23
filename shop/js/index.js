// JavaScript Document

// rem计算
;(function(win,doc){
	function change (){		
        if(doc.documentElement.clientWidth>540){
            doc.documentElement.style.fontSize=29+'px';
        }else{
        	doc.documentElement.style.fontSize = 20*doc.documentElement.clientWidth/375+'px';
        }			
	}
	change();
	win.addEventListener('resize',change,false);
})(window,document);
//解决移动端click事件的300ms延迟问题
$(function() {  
    FastClick.attach(document.body);  
});
//让jq1.9以上兼容toggle事件
$.fn.toggle = function( fn, fn2 ) {
    var args = arguments,guid = fn.guid || $.guid++,i=0,
    toggle = function( event ) {
		var lastToggle = ( $._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
		$._data( this, "lastToggle" + fn.guid, lastToggle + 1 );
		event.preventDefault();
		return args[ lastToggle ].apply( this, arguments ) || false;
	};
    toggle.guid = guid;
    while ( i < args.length ) {
		args[ i++ ].guid = guid;
    }
    return this.click( toggle );
};
//toDou
//
function toDou(num){
	return num>=10?num:'0'+num;
}
//ajax
//http://open.mb.hd.sohu.com/v4/category/channel/25.json?api_key=4e30651b47eb3c1af27c7bddbfc251b3&page=&page_size=20
function oAjax(url,para,oDomain,fn){
	var str = JSON.stringify(para);
	$.ajax({
	    type: "GET",
	    url: url+oDomain,
	    data: {parameter: str},
	    dataType: "jsonp",
	    success: fn
	})	
}

$(function () {
    updateEndTime();
});
//倒计时函数
function updateEndTime(){
    var date = new Date();
    var time = date.getTime(); //当前时间距1970年1月1日之间的毫秒数


    $(".settime").each(function (i) {

        var endTime = this.getAttribute("endTime"); //结束时间毫秒数
        var lag = (endTime - time) / 1000; //当前时间和结束时间之间的秒数
        if (lag > 0)
        {
            var second = Math.floor(lag % 60);
            var minite = Math.floor((lag / 60) % 60);
            var hour = Math.floor((lag / 3600) % 24);
            $(this).html(toDou(hour) + ":" + toDou(minite) + ":" + toDou(second));
        } else {
            $(this).removeClass("settime");
            $(this).html("已开始");
        }
    });
    setTimeout("updateEndTime()", 1000);
}
String.prototype.getQuery = function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = this.substr(this.indexOf("\?")+1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    } ;
//ajax
$(function(){
    var http = 'http://192.168.1.116:7000/';
    var code=window.location.href.getQuery("code");
    $.ajax({
            url:http+"wxQueryShop",
            type:'post',
            cache:false,
            data:JSON.stringify({'code':code}),
            dataType:'json',
            contentType:"application/json",
            success:function(data){
                var list = data.object.lMap.list
                var clist = data.object.cList
                var itemlist = data.object.mMap.list
                var makeup = data.object.gMap.list
                var baby = data.object.aMap.list     
                //console.log(JSON.stringify(data))
                $(list).each(function(i){
                    //console.log(list[0].i_name)
                    $('.snacks .swiper-wrapper').append('<li class="swiper-slide"><a href="javascript:;"><img alt="" src="'+list[0].i_cover+'" /><div><p class="p1"><span>'+list[0].i_name+'</span></p><p class="p2"><span>'+list[0].g_price+'￥</span>&nbsp;<span>'+list[0].g_rprice+'￥</span></p></div></a></li>');

                    $('.item .swiper-wrapper').append('<li class="swiper-slide"><a href="javascript:;"><img alt="" src="'+itemlist[0].i_cover+'" /><div><p class="p1"><span>'+itemlist[0].i_name+'</span></p><p class="p2"><span>'+itemlist[0].g_price+'￥</span>&nbsp;<span>'+itemlist[0].g_rprice+'￥</span></p></div></a></li>');

                    $('.makeup .swiper-wrapper').append('<li class="swiper-slide"><a href="javascript:;"><img alt="" src="'+makeup[0].i_cover+'" /><div><p class="p1"><span>'+makeup[0].i_name+'</span></p><p class="p2"><span>'+makeup[0].g_price+'￥</span>&nbsp;<span>'+makeup[0].g_rprice+'￥</span></p></div></a></li>');

                    $('.baby .swiper-wrapper').append('<li class="swiper-slide"><a href="javascript:;"><img alt="" src="'+baby[0].i_cover+'" /><div><p class="p1"><span>'+baby[0].i_name+'</span></p><p class="p2"><span>'+baby[0].g_price+'￥</span>&nbsp;<span>'+baby[0].g_rprice+'￥</span></p></div></a></li>');
                });
            },
            error:function(){

            }
        });
    $('.nav a,.more a').click(function(){
        var c_id = $(this).attr("c_id");
        document.location.href = "../html/list-goods.html?c_id="+c_id;
    })
});

//所有分类
$(function(){
    var http="https://www.railwaybaby.com/";
    var http1 = 'http://192.168.1.135:9000/';
    var http2 = 'http://192.168.1.116:7000/';
    var scrollState=1;
    var code=window.localStorage.getItem('code') ? window.localStorage.getItem('code'):'';
    var empId=window.localStorage.getItem('empId');
    //全局变量==================
    var start=1;
    var way=3;
    var goods_name='';
    var scrollState=false;
    //商品分类按钮是否清空
    var clickState = true;
    //全局存储图片地址数组=================
    var picArr=[];

    function secondClass(code,cid) {
        $.ajax({
            url:http+"wxQueryClass",
            type:'post',
            cache:false,
            data:JSON.stringify({'code':code,'c_id':cid}),
            dataType:'json',
            contentType:'application/json',
            success:function(data){
                if(data.success==true){
                    var str01="";
                    $(data.object).each(function (i,el) {
                        str01+=' <div class="second-class" data-cid='+data.object[i].c_id+'><p>'+data.object[i].c_name+'</p> <ul class="clearfix"></ul></div>';
                    });
                    $('.class-r').empty().append(str01);
                    $(data.object).each(function (y,el) {
                        var str02="";
                        $(data.object[y].list).each(function (l,el) {
                            str02+='<li><p class="p001" data-cid='+data.object[y].list[l].c_id+'><img src="../img/list/list'+data.object[y].list[l].c_id+'.png" alt="..." /></p><br><span>'+data.object[y].list[l].c_name+'</span></li>'
                        });
                        $('.class-r>div').eq(y).find('ul').append(str02)
                    });
                }else{
                    //alertBg(1,'',data.msg);
                    $('.class-r').empty().append("<p>没有相关信息!</p>");
                }
                var h = $('.search').outerHeight()+10;
                //alert(h);

                $('.class-l,.class-r').css('height',$(window).height()-h);
                //$('.class-r').css('height',$(window).height()-h);
            },
            error:function(){

            }
        });
    };
    function firstClass(code) {
        $.ajax({
            url:http+"wxQueryAllClass",
            type:'post',
            cache:false,
            data:JSON.stringify({'code':code}),
            dataType:'json',
            contentType:"application/json",
            success:function(data){
                if(data.success==false){
                    //alertBg(1,'',data.msg)
                }else if(data.success==true){
                    // console.log(data)
                    var str="";
                    $(data.object).each(function (i,el) {
                        str+=" <li data-cid="+data.object[i].c_id+">"+data.object[i].c_name+"</li>"
                    });
                    $('.first-class').empty().append(str);
                    $('.first-class>li').eq(0).addClass('active');
                    secondClass(code,parseInt($('.first-class>li').eq(0).attr('data-cid')))
                }
            },
            error:function(){

            }
        });
    };
    $(document).on('click','.first-class>li',function () {
        $(this).addClass('active').siblings().removeClass('active');
        var cid=parseInt($(this).attr('data-cid'));
        secondClass(code,cid);
        var index = $(".first-class>li").index(this);
        var h2 = $(".first-class>li").height()*(index-4);
        $(".first-class").animate({scrollTop:h2}, 380);
        $(".class-r").animate({scrollTop:0}, 380);
        
    });
    $(document).on('click','.p001',function () {
        scrollState = false;
        var c_id=parseInt($(this).attr('data-cid'));
        start=1;
        way=1;
        loadS();
        wxQueryGoods(code,c_id,way,goods_name,1,3);
    });
    function loadS(){
        $('.onload').show().siblings('.last01').hide().siblings('.list-goods').find('.goods').hide();
    }
    function loadH(){
        var numPic=picArr.length;
        if(picArr.length==0){
            $('.onload').hide().siblings('.last01').show().siblings('.list-goods').find('.goods').show();
        }else{
            $(picArr).each(function(m,el){
                var pic = new Image();
                pic.src = picArr[m];
                pic.onload = function () {
                    numPic--;
                    if(numPic<=picArr.length){
                        $('.onload').hide().siblings('.last01').show().siblings('.list-goods').find('.goods').show();
                        picArr=[];
                    }else{

                    }
                };
            });
        }

    }

    $('.classifyBtn').on('click',function () {
        
        firstClass(code);
        $('.classify').toggle();
        if($('.classify').css('display')=='none'){
            $('.list-goods').siblings().show();
            $('#preloader').hide();
        }else{
            $('.list-goods').siblings().hide();
        }
        
    });

    function goodGoods(code,state,empId) {
        $.ajax({
            url:http1+"wxQueryHotGoods",
            type:'post',
            cache:false,
            data:JSON.stringify({'code':code,'start':state,'id':empId}),
            dataType:'json',
            contentType:"application/json",
            async:false,
            success:function(data){
                if(data.success==true){
                    var str='';
                    var order = 1;
                    $(data.object).each(function (i,el) {
                        str="<li><a href='javascript:;' data-gid="+data.object[i].g_id+" data-iid="+data.object[i].i_id+" data-price="+data.object[i].price+" ><img class='lazy' src='imgs/loading.jpg' data-original="+data.object[i].i_cover+"> <div class='clearfix'> <p class='p1'>"+data.object[i].i_name+"</p><p class='p2'><span class='s1 fl'>￥"+parseFloat(data.object[i].price).toFixed(2)+"</span><span class='s2 fr'>"+data.object[i].i_sale+"人付款 </span></p> </div> </a></li>";
                        if(order){
                            $('.goods-left').append(str);
                            order = 0;
                        }else{
                            order = 1;
                            $('.goods-right').append(str);
                        }                           
                    });
                    $(document).on('click','.goods-content a',function(){
                        window.location.href="html/goods-information.html?id="+$(this).attr('data-iid');
                    });
                    if(state==2){
                        
                    }else{
                        $('.goodsTs').text('已到底部');
                    }
                    $('.lazy').lazyload({
                        container: $(".guard"),
                        event:'scroll',
                        effect:'show',
                        threshold : 200, 
                        placeholder:'imgs/loading.jpg'
                    });
                    //滚动加载商品==================
                    $(document).scroll(function (){
                        var scrollTop = $(this).scrollTop();
                        var scrollHeight = $(document).height();
                        var windowHeight = $(window).height();
                        if(scrollTop>=700){
                            $('.goTop').show();
                        }else{
                            $('.goTop').hide();
                        }
                        if(scrollTop + windowHeight >= scrollHeight-100 ){
                            scrollState++;
                            if(scrollState<4){
                                if(scrollState==2){
                                    $('.goodGoods').append("<div class='goodsTs'>加载中</div>")
                                }
                                goodGoods(code,scrollState,empId);
                            }
                        }                       
                    });
                }

            },
            error:function(){
            }
        });
    }
    goodGoods(code,1,empId);
});
    