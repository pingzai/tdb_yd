$(function(){
    var http="https://www.railwaybaby.com/";
    var http1 = 'http://192.168.1.135:9000/';
    var http2 = 'http://192.168.1.116:7000/';
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
    //一开始加载按上架时间
    loadS();
    var c_id = window.location.href;
    c_id = c_id.split('?')[1].split('&')[0].split('=')[1];
        //alert(1);
    code = '001MKve82ckJnP0gkke82OKMe82MKve9';
    wxQueryGoods(code,c_id,way,goods_name,1,1,clickState);
    //wxQueryGoods(code,c_id,way,goods_name,start,1,clickState);
    function wxQueryGoods(code,id,w,goods_name,start,num,clickState) {
        $.ajax({
            url:http2+"wxQueryShopGoods",
            type:'post',
            cache:false,
            data:JSON.stringify({'code':code,'c_id':id,'way':w,'goods_name':goods_name,'start':start}),
            dataType:'json',
            contentType:"application/json",
            success:function(data){
            	//console.log(data);
                if(data.success==true){
                	//商品分类按钮
                	var str1 = '';
                	if(clickState){
                		$(data.object.class).each(function (i,el) {
	                		str1+="<li class='search-list-li' data-id='"+data.object.class[i].c_id+"'>"+data.object.class[i].c_name+"</li>"
	                	});
                		$('.search-list-ul').empty().append(str1);
                	}
                	clickState = true;
                    $('.last01').show();
					//商品列表
                    var str="";
                    $(data.object.list).each(function (i,el) {
                        str+="<li class='goods-li' data-gid="+data.object.list[i].g_id+" data-iid="+data.object.list[i].i_id+"  data-price="+data.object.list[i].price+"><div class='l'> <img src="+data.object.list[i].i_cover+" alt='加载失败，请刷新'/></div><div class='r'><div class='goods-title'>"+data.object.list[i].i_name+"</div><span class='span1'>￥"+parseFloat(data.object.list[i].price).toFixed(2)+"</span> <span class='span2'>"+data.object.list[i].i_sale+"人已付款</span></div></li>";
                        if(num==1||num==3){
                            picArr.push(data.object.list[i].i_cover);
                        }
                    });
                    //删除儿子
                    if(num==1){
                        loadH();
                        $('.goods').empty().append(str).siblings('.search').find('input').val('');
                    };
                    //不删除儿子
                    if(num==2){
                        $('.goods').append(str);
                    };
                    if(num==3){
                        $('.goods').empty().append(str);
                        $('.classify').hide().siblings('.search-list').show().siblings('.search-list').show().parent();
                        $('.classifyBtn').attr('data-s',0);
                        $('.goods').attr('data-cid',id);
                        loadH();
                    };
                    if($('.goods>li').length>=10){
                        scrollState = false;
                    }else{
                        $('.last01').text('没有更多');
                    };
                    //商品详细信息
                    $(document).on('click','.goods-li',function(){
                        window.location.href="goods-information.html?id="+$(this).attr('data-iid');
                    });
                }else{
                    if(data.state==1){
                        window.localStorage.setItem('share',location.href);
                        alertBg(1,'',data.msg);
                        $('#alertBtn01').on('click',function(){
                            window.location.href="httpss://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19f4a60762c40c37&redirect_uri=http%3A%2F%2Fwww.railwaybaby.com%2FtwoCode.html%3femp_id%3d0&response_type=code&scope=snsapi_userinfo&state=state1&connect_redirect=1#wechat_redirect"
                        })
                    }else{
                        if(num==1){
                            $('.goods').empty();
                            $('.last01').text('没有相关信息');
                            loadH();
                        };
                        if(num==2){
                            $('.last01').text('没有更多')
                        };
                        if(num==3){
                            alertBg(1,'','没有相关信息');
                            $('.last01').text('');
                            $('.goods').hide().parent().siblings('.onload').hide();
                        };
                    }

                }

            },
            error:function(){

            }
        });
    };
    //加载默认销量顺序商品
    $('.goods').attr('data-cid',48);
    //商品分类按钮事件
    $(document).on('click','.search-list-li',function(){
		console.log(1);
		clickState = false;
		var c_id = $(this).data('id');
		wxQueryGoods(code,c_id,way,goods_name,1,1,clickState);
	});
    //排序事件==========
    $('.search-list>a').on('click',function (e) {
    	$('.search-list hr').css({'transition':'all 0.5s','-webkit-transition':'all 0.5s'});
    	if($(this).index()==0){
    		$('.search-list hr').css({'transform':'translate(0.34rem,-0.1rem)','-webkit-transform':'translate(0.34rem,-0.1rem)'});
    	}else if($(this).index()==1){
    		$('.search-list hr').css({'transform':'translate(0.34rem,-0.1rem)','-webkit-transform':'translate(1.47rem,-0.1rem)'});
    	}else if($(this).index()==2){
    		$('.search-list hr').css({'transform':'translate(0.34rem,-0.1rem)','-webkit-transform':'translate(2.6rem,-0.1rem)'});
    	}
        loadS();
        scrollState = false;
        var c_id=$('.goods').attr('data-cid');
        start=1;
        e.stopPropagation();
        if($(this).index()==0){
            if($(this).attr('data-id')==0){
            	console.log($(this).attr('data-id'));
                $(this).attr('data-id',1);
                way=2;
                wxQueryGoods(code,c_id,way,goods_name,1,1);
            }else{
            	console.log($(this).attr('data-id'));
                $(this).attr('data-id',0);
                way=1;
                wxQueryGoods(code,c_id,way,goods_name,1,1);
            }
        }
        if($(this).index()==1){
            if($(this).attr('data-id')==0){
                way=3;
                wxQueryGoods(code,c_id,way,goods_name,1,1);
                $(this).attr('data-id',1)
            }else{
                $(this).attr('data-id',0);
                way=4;
                wxQueryGoods(code,c_id,way,goods_name,1,1);
            }
        }
        if($(this).index()==2){
            if($(this).attr('data-id')==0){
                way=5;
                $(this).attr('data-id',1);
                wxQueryGoods(code,c_id,way,goods_name,1,1);
            }else{
                way=6;
                $(this).attr('data-id',0);
                wxQueryGoods(code,c_id,way,goods_name,1,1);
            }
        }

    });
    //商品分类按钮
    
    //左上角分类按钮
    $('.classifyBtn').on('click',function () {
        if($(this).attr('data-s')==0){
            $(this).parent().siblings('.search-list').hide().siblings('.goods').hide().siblings('.classify').show().parent().siblings('.last01').hide();
            $(this).attr('data-s',1);
            //一级类目
            firstClass(code);
        }else{
            $(this).parent().siblings('.search-list').show().siblings('.goods').show().siblings('.classify').hide().parent().siblings('.last01').show();
            $(this).attr('data-s',0);
        }

    });
    //滚动加载
    $(window).scroll(fnScroll);
    function fnScroll() {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(this).height();
    var cid=$('.goods').attr('data-cid');
        if(scrollTop>=500){
            $('.goTop').show();
        }else{
            $('.goTop').hide();
        }
        if (scrollTop + windowHeight>=scrollHeight-300 && scrollState == false) {
            if($('.goods').is(':hidden')){
                $('.last01').hide();
            }else{
                scrollState = true;
                $('.last01').text("加载中");
                start++;
               	wxQueryGoods(code,cid,way,goods_name,start,2);
            }
        }

    }
    //搜索
    $(document).keyup(function (e) {
        scrollState = false;
        goods_name=$('.search').find('input').val();
        if(getByteLen(goods_name)>=20){
            alertBg(1,'','超过字数范围')
        }else{
            if(e.keyCode==13){
                if(goods_name){
                    loadS();
                    var cid=$('.goods').attr('data-cid');
                    wxQueryGoods(code,cid,way,goods_name,1,1);
                    $('.classify').hide().siblings('.search-list').show();
                }else{
                    alertBg(1,'','搜索信息不能为空')
                }

            }
        }
    });
   $('.search>div').on('click',function(){
       scrollState = false;
       if(getByteLen($('.search').find('input').val())>=20){
           alertBg(1,'','超过字数范围')
       }else{
           if($('input').val()){
               loadS();
               goods_name=$('.search').find('input').val();
               var cid=$('.goods').attr('data-cid');
               wxQueryGoods(code,cid,way,goods_name,1,1);
               $('.classify').hide().siblings('.search-list').show();
           }else{
               alertBg(1,'','搜索信息不能为空')
           }
       }
   });
    function getByteLen(val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
            var a = val.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null) {
                len += 2;
            }
            else {
                len += 1;
            }
        }
        return len;
    }
//========================================================
    //所有分类
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
});

