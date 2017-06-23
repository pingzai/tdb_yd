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
        async: false,
	    type: "GET",
	    url: url+oDomain,
	    data: {parameter: str},
	    dataType: "jsonp",
	    success: fn
	})	
}




//综艺 
function variety(){
    oAjax('http://open.mb.hd.sohu.com/v4/category/channel/7.json?',{"src":"1351","page":n, "page_size":"20"},'api_key=4e30651b47eb3c1af27c7bddbfc251b3',
    function(data){
        var arr1 = data.data.videos;
        console.log(data)
        $.each(arr1, function(i, e) {
            //http://open.mb.hd.sohu.com/v4/album/videos/9135110.json?api_key=4e30651b47eb3c1af27c7bddbfc251b3&page=1&page_size=10  '+data.data.videos.url_html5+'
            oAjax('http://open.mb.hd.sohu.com/v4/album/videos/'+e.aid+'.json?',{"src":"1351","page":"1","page_size":"20"},'api_key=4e30651b47eb3c1af27c7bddbfc251b3',
                function(data){
                    $('.variety ul').append('<li class="fl"><a href="'+data.data.videos[0].url_html5+'"><img src="'+e.hor_high_pic+'" alt=""><p class="tit">'+e.video_name+'</p><p class="txt">'+e.video_desc+'</p></a></li>');
                    $('.search-list-con3').append('<a href="'+data.data.videos[0].url_html5+'">'+e.video_name+'</a>');
                }
            );
        });
        
    });
    n++
}
    var n = 1;
    $(function(){
        variety();
    })
    
    $(window).scroll(function(){
    
        if($(document).scrollTop()>=$(document).height()-$(window).height()){
        
            variety();
            $('img').error(function(){
                $(this).attr('src',"../imgs/home/loading.jpg");
            })
        }
    });
    
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
        document.location.href = "search.html?search="+searchval;
    });
    document.onkeydown=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13){ // enter 键
            var searchval = encodeURI($('.search-txt').val());
            document.location.href = "search.html?search="+searchval;
        }
        if (encodeURI($('.search-txt').val()) == "") {
            searchval = "新闻"
        }
    };
    
});







