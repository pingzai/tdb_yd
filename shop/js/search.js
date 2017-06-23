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
	    data: para,
	    dataType: "jsonp",
	    success: fn
	})	
}

function search(){
    var searchname = decodeURI(window.location.href.split("search=")[1]);
    var n = 1;
    oAjax('http://open.mb.hd.sohu.com/v4/search/video.json?',{"src":"1351","page_size":"20","page":n},'api_key=4e30651b47eb3c1af27c7bddbfc251b3&key='+searchname,
        function(data){
            var n = 0;
            var arr1 = data.data.videos;
            //console.log(JSON.stringify(data))
                
            $.each(arr1, function(i, e) {
                $('.list').append('<li><a href="'+arr1[i].url_html5+'" class="cfix"><div class="p_l"><img src="'+arr1[i].hor_big_pic+'" alt="..."></div><p class="p_txtr"><strong class="othervtitle">'+arr1[i].tv_name+'</strong><span class="p_h2">'+arr1[i].playCount+'次播放 <br> '+arr1[i].publishTime+'</span></p></a></li>')
                
            });
        }
    );
}
search();

function searchbox(){
    var searchval = $('.search-txt').val()
        $('.list li').remove();
    oAjax('http://open.mb.hd.sohu.com/v4/search/video.json?',{"src":"1351","page":"1",},'api_key=4e30651b47eb3c1af27c7bddbfc251b3&key='+searchval,
        function(data){
            var n = 0;
            var arr1 = data.data.videos;
            //console.log(JSON.stringify(data))
                
            $.each(arr1, function(i, e) {
                $('.list').append('<li><a href="'+arr1[i].url_html5+'" class="cfix"><div class="p_l"><img src="'+arr1[i].hor_big_pic+'" alt="..."></div><p class="p_txtr"><strong class="othervtitle">'+arr1[i].tv_name+'</strong><span class="p_h2">'+arr1[i].playCount+'次播放 <br> '+arr1[i].publishTime+'</span></p></a></li>')
                
            });
        }
    );
}
//搜索框

$(function(){
    $('.search-box input').click(function(){
        $('.search-list').show();
    });
    $('.search-list i').click(function(){
        $('.search-background').hide();
        $('.search-list').hide();
    });
    $('#back').click(function(){
        window.history.go(-1);
    });
    $('.search-btn').click(function(){
        searchbox();
    });
});


/**
 * Created by libtop on 17/3/14.
 */

// 加载刷新。
function loadmore(){
    var searchname = decodeURI(window.location.href.split("search=")[1]);
    var n = 1;
    oAjax('http://open.mb.hd.sohu.com/v4/search/video.json?',{"src":"1351","page_size":"20","page":n},'api_key=4e30651b47eb3c1af27c7bddbfc251b3&key='+searchname,
        function(data){
            var n = 0;
            var arr1 = data.data.videos;
            //console.log(JSON.stringify(data))
                
            $.each(arr1, function(i, e) {
                $('.list').append('<li><a href="'+arr1[i].url_html5+'" class="cfix"><div class="p_l"><img src="'+arr1[i].hor_big_pic+'" alt="..."></div><p class="p_txtr"><strong class="othervtitle">'+arr1[i].tv_name+'</strong><span class="p_h2">'+arr1[i].playCount+'次播放 <br> '+arr1[i].publishTime+'</span></p></a></li>')
                
            });
        }
    );
    n++;
}

function refresh(refresh,loadmore) {
  $(window).scroll(function(){
    //console.log('正在滑动f');

    var scrollTop = $(this).scrollTop();    //滚动条距离顶部的高度
    var scrollHeight = $(document).height();   //当前页面的总高度
    var clientHeight = $(this).height();    //当前可视的页面高度
    // console.log("top:"+scrollTop+",doc:"+scrollHeight+",client:"+clientHeight);
    if(scrollTop + clientHeight >= scrollHeight){   //距离顶部+当前高度 >=文档总高度 即代表滑动到底部 count++;         //每次滑动count加1
      // filterData(serviceTypeId,industryId,cityId,count); //调用筛选方法，count为当前分页数
      //console.log('下拉');

      if(loadmore){
        loadmore();
      }
    }else if(scrollTop<=0){
      //滚动条距离顶部的高度小于等于0 TODO
      //alert("下拉刷新，要在这调用啥方法？");
      
      //console.log('上拉');
      if(refresh){
        search();
      }


    }

  });
  console.log($('.list').height())

}
refresh(search,loadmore);

 document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
     if(e && e.keyCode==13){ // enter 键
         //要做的事情
         searchbox();
    }
}; 


