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

oAjax('http://open.mb.hd.sohu.com/v4/category/channel/9004.json?',{"src":"1351","page":"1", "page_size":"20"},'api_key=4e30651b47eb3c1af27c7bddbfc251b3',
    function(data){
        var n = 0;
        var arr1 = data.data.videos;
            
        $.each(arr1.slice(n,n+4), function(i, e) {
            //http://open.mb.hd.sohu.com/v4/album/videos/9135110.json?api_key=4e30651b47eb3c1af27c7bddbfc251b3&page=1&page_size=10  '+data.data.videos.url_html5+'
            oAjax('http://open.mb.hd.sohu.com/v4/album/videos/'+e.aid+'.json?',{"src":"1351","page":"1","page_size":"20"},'api_key=4e30651b47eb3c1af27c7bddbfc251b3',
                function(data){
                    console.log()
                    $('.hot ul').append('<li class="fl"><a href="'+data.data.videos[0].url_html5+'"><img src="'+e.hor_high_pic+'" alt=""><p class="tit">'+e.video_name+'</p><p class="txt">'+e.video_desc+'</p></a></li>');
                }
            );
        });
        $('.hot .more span').click(function(){
            if (n>20) {
                n=0
            }
            $('.hot .list li').remove();
            $.each(arr1.slice(n,n+4),function(i,e){
                 oAjax('http://open.mb.hd.sohu.com/v4/album/videos/'+e.aid+'.json?',{"src":"1351","page":"1","page_size":"20"},'api_key=4e30651b47eb3c1af27c7bddbfc251b3',
                    function(data){
                        console.log()
                        $('.hot ul').append('<li class="fl"><a href="'+data.data.videos[0].url_html5+'"><img src="'+e.hor_high_pic+'" alt=""><p class="tit">'+e.video_name+'</p><p class="txt">'+e.video_desc+'</p></a></li>');
                    }
                );
            });

            n += 4;
        });
    }
);

//电视剧
oAjax('http://open.mb.hd.sohu.com/v4/category/channel/2.json?',{"src":"1351","page":"1", "page_size":"20"},'api_key=4e30651b47eb3c1af27c7bddbfc251b3',
    function(data){
        var n = 0;
        var arr1 = data.data.videos;
            
        $.each(arr1.slice(n,n+4), function(i, e) {
            //http://open.mb.hd.sohu.com/v4/album/videos/9135110.json?api_key=4e30651b47eb3c1af27c7bddbfc251b3&page=1&page_size=10  '+data.data.videos.url_html5+'
            oAjax('http://open.mb.hd.sohu.com/v4/album/videos/'+e.aid+'.json?',{"src":"1351","page":"1","page_size":"20"},'api_key=4e30651b47eb3c1af27c7bddbfc251b3',
                function(data){
                    //console.log()
                    $('.commend ul').append('<li class="fl"><a href="'+data.data.videos[0].url_html5+'"><img src="'+e.hor_high_pic+'" alt=""><p class="tit">'+e.video_name+'</p><p class="txt">'+e.video_desc+'</p></a></li>');
                    $('.search-list-con2').append('<a href="'+data.data.videos[0].url_html5+'">'+e.video_name+'</a>');
                }
            );
        });
        $('.commend .more span').click(function(){
            if (n>20) {
                n=0
            }
            $('.commend .list li').remove();
            $.each(arr1.slice(n,n+4), function(i, e) {
                //http://open.mb.hd.sohu.com/v4/album/videos/9135110.json?api_key=4e30651b47eb3c1af27c7bddbfc251b3&page=1&page_size=10  '+data.data.videos.url_html5+'
                oAjax('http://open.mb.hd.sohu.com/v4/album/videos/'+e.aid+'.json?',{"src":"1351","page":"1","page_size":"20"},'api_key=4e30651b47eb3c1af27c7bddbfc251b3',
                    function(data){
                        console.log()
                        $('.commend ul').append('<li class="fl"><a href="'+data.data.videos[0].url_html5+'"><img src="'+e.hor_high_pic+'" alt=""><p class="tit">'+e.video_name+'</p><p class="txt">'+e.video_desc+'</p></a></li>');
                    }
                );
            });

            n += 4;
        });
    }
);


//电影

oAjax('http://open.mb.hd.sohu.com/v4/category/channel/1.json?',{"src":"1351","page":"1", "page_size":"20"},'api_key=4e30651b47eb3c1af27c7bddbfc251b3',
    function(data){
        var n = 0;
        var arr1 = data.data.videos;
        //console.log(data);  
        $.each(arr1.slice(n,n+8), function(i, e) {
            oAjax('http://open.mb.hd.sohu.com/v4/album/videos/'+e.aid+'.json?',{"src":"1351","page":"1","page_size":"20"},'api_key=4e30651b47eb3c1af27c7bddbfc251b3',
                function(data){
                    $('.movies ul').append('<li class="swiper-slide"><a href="'+data.data.videos[0].url_html5+'"><img src="'+e.ver_high_pic+'" alt=""><p class="column-tit">'+e.video_name+'</p></a></li>');
                    $('.search-list-con1').append('<a href="'+data.data.videos[0].url_html5+'">'+e.video_name+'</a>');
                    var swiper = new Swiper('.swiper-container2', {
                        slidesPerView: 3.5,
                        spaceBetween: 10,
                        freeMode: true
                    });
                }
            );
        });
        $('.movies .more span').click(function(){
            if (n>20) {
                n=0
            }
            $('.movies li').remove();
            $.each(arr1.slice(n,n+8), function(i, e) {
                oAjax('http://open.mb.hd.sohu.com/v4/album/videos/'+e.aid+'.json?',{"src":"1351","page":"1","page_size":"20"},'api_key=4e30651b47eb3c1af27c7bddbfc251b3',
                    function(data){
                        $('.movies ul').append('<li class="swiper-slide"><a href="'+data.data.videos[0].url_html5+'"><img src="'+e.ver_high_pic+'" alt=""><p class="column-tit">'+e.video_name+'</p></a></li>');
                        var swiper = new Swiper('.swiper-container2', {
                            slidesPerView: 3.5,
                            spaceBetween: 10,
                            freeMode: true
                        });
                    }
                );
            });

            n += 8;
            var swiper = new Swiper('.swiper-container2', {
                slidesPerView: 3.5,
                spaceBetween: 10,
                freeMode: true
            });
        });       
    }
);

//综艺 
oAjax('http://open.mb.hd.sohu.com/v4/category/channel/7.json?',{"src":"1351","page":"1", "page_size":"20"},'api_key=4e30651b47eb3c1af27c7bddbfc251b3',
    function(data){
        var n = 0;
        var arr1 = data.data.videos;
            
        $.each(arr1.slice(n,n+4), function(i, e) {
            //http://open.mb.hd.sohu.com/v4/album/videos/9135110.json?api_key=4e30651b47eb3c1af27c7bddbfc251b3&page=1&page_size=10  '+data.data.videos.url_html5+'
            oAjax('http://open.mb.hd.sohu.com/v4/album/videos/'+e.aid+'.json?',{"src":"1351","page":"1","page_size":"20"},'api_key=4e30651b47eb3c1af27c7bddbfc251b3',
                function(data){
                    $('.variety ul').append('<li class="fl"><a href="'+data.data.videos[0].url_html5+'"><img src="'+e.hor_high_pic+'" alt=""><p class="tit">'+e.video_name+'</p><p class="txt">'+e.video_desc+'</p></a></li>');
                    $('.search-list-con3').append('<a href="'+data.data.videos[0].url_html5+'">'+e.video_name+'</a>');
                }
            );
        });
        $('.variety .more span').click(function(){
            if (n>20) {
                n=0
            }
            $('.variety .list li').remove();
            $.each(arr1.slice(n,n+4), function(i, e) {
                //http://open.mb.hd.sohu.com/v4/album/videos/9135110.json?api_key=4e30651b47eb3c1af27c7bddbfc251b3&page=1&page_size=10  '+data.data.videos.url_html5+'
                oAjax('http://open.mb.hd.sohu.com/v4/album/videos/'+e.aid+'.json?',{"src":"1351","page":"1","page_size":"20"},'api_key=4e30651b47eb3c1af27c7bddbfc251b3',
                    function(data){
                        console.log()
                        $('.variety ul').append('<li class="fl"><a href="'+data.data.videos[0].url_html5+'"><img src="'+e.hor_high_pic+'" alt=""><p class="tit">'+e.video_name+'</p><p class="txt">'+e.video_desc+'</p></a></li>');
                    }
                );
            });

            n += 4;
        });
    }
);
//长按删除

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

//ajax

$(function(){
    $('.search-box input').click(function(){
        $('.search-background').show();
        $('.search-list').show();
        $("body").css("overflow-y","hidden")
    });
    $('.search-list i').click(function(){
        $('.search-background').hide();
        $('.search-list').hide();
        $("body").css("overflow-y","scroll")
    });
    $('.search-btn').click(function(){
        var searchval = encodeURI($('.search-txt').val());
        if (encodeURI($('.search-txt').val()) == "") {
            searchval = "新闻"
        }
        document.location.href = "html/search.html?search="+searchval;
    });
    document.onkeydown=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13){ // enter 键
            var searchval = encodeURI($('.search-txt').val());
            document.location.href = "html/search.html?search="+searchval;
        }
        if (encodeURI($('.search-txt').val()) == "") {
            searchval = "新闻"
        }
    }; 
});





$(function(){
    $(".search-list-nav li").click(function(){
        now=$(this).index();
        tab();
    });
    function tab(){
        $(".search-list-nav li").eq(now).addClass('search-active').siblings().removeClass('search-active');
        $(".search-list-con li").eq(now).show().siblings().hide();
    }
})

