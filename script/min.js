$(function() {
	var http = 'https://www.railwaybaby.com/';
	var http1 = 'http://192.168.1.135:9000/';
	//全局存储图片地址数组=================
	var picArr = [];
	//车长推荐接口参数
	var scrollState=1;
	var code, empId;
	codeEmp(location.href.split("?")[1].split('&'));
	function codeEmp(str) {
		var codeArr = str;
		var arr = [];
		//获取url上的code和empid
		$(codeArr).each(function(a, el) {
			arr.push(codeArr[a].split('='));
		});
		$(arr).each(function(m, el) {
			if(arr[m][0] == "code") {
				code = arr[m][1];
			}
			if(arr[m][0] == "emp_id") {
				empId = arr[m][1];
			}
		});
		window.localStorage.setItem('code', code);
		window.localStorage.setItem('empId', empId);
		//页面一开始进入的遮罩层=================
		$('.spinner>div').css({ 'background-color': '#ff4f4f' });
		$('.onload').css({ 'background-color': '#fff' });
		$('body').on('touchmove', function(event) {
			event.preventDefault();
		});
		//加载所有数据广告==================
		advertising(code, empId);
		$('.footer>a').on('click', function() {
			if($(this).index() == 0) {

			}
			if($(this).index() == 1) {
				alertBg(1, '', '敬请期待')
			}
			if($(this).index() == 2) {
				window.location.href = "html/cart.html"
			}
			if($(this).index() == 3) {
				window.location.href = "html/personalCenter.html"
			}
		});
	}
	//加载所有商品和个人信息=============================================================
	function advertising(code, empId) {
	//banner轮播图,分类,火车驿站数据获取
		$.ajax({
			url: http1 + "queryAdvertIndex",
			type: 'post',
			cache: false,
			data: JSON.stringify({ 'code': code, 'id': empId,'way': 1 }),
			dataType: 'json',
			contentType: "application/json",
			success: function(data) {
				if(data.success == true) {
					//console.log(data);
					//首页轮播=============================================
					if(data.object.hList.length != 0) {
						var str01 = "";
						$(data.object.hList).each(function(i, el) {
							if(data.object.hList[i].ad_url) {
								str01 += "<div class='swiper-slide'> <img class='img01' src=" + data.object.hList[i].ad_photo + " alt='刷新失败' data-id=" + data.object.hList[i].ad_id + " data-href=" + data.object.hList[i].ad_url + " /></div>";
								picArr.push(data.object.hList[i].ad_photo);
							} else {
								str01 += "<div class='swiper-slide'> <img class='img01' src=" + data.object.hList[i].ad_photo + " alt='刷新失败' data-id=" + data.object.hList[i].ad_id + " data-href='javascript:;' /></div>";
								picArr.push(data.object.hList[i].ad_photo);
							}

						});
						//console.log("length=========="+picArr.length);
						$('.swiper-container1>.swiper-wrapper').empty().append(str01);
						$('.swiper-container1>.swiper-wrapper img').on('click', function() {
							if($(this).attr('data-href')) {
								window.location.href = $(this).attr('data-href');
							}
						});
					} else {
						$('.swiper-container1>.swiper-wrapper').empty().append("<div class='swiper-slide'> <img class='img01' src='' alt='招商:010 65772685'/></div>");
					}
					//分类================================
					$(data.object.cList).each(function(k, el) {
						picArr.push(data.object.cList[k].ad_photo);
						//console.log("ajax========"+picArr.length)
						if(data.object.cList[k].ad_posi == 1) {
							$('.classify>a').eq(0).empty().append("<img src=" + data.object.cList[k].ad_photo + " alt=''>" + "<span>" + data.object.cList[k].ad_name + "</span>");
							$('.classify>a').eq(0).attr('data-href', data.object.cList[k].ad_url)
						}
						if(data.object.cList[k].ad_posi == 2) {
							$('.classify>a').eq(1).empty().append("<img src=" + data.object.cList[k].ad_photo + " alt=''>" + "<span>" + data.object.cList[k].ad_name + "</span>");
							$('.classify>a').eq(1).attr('data-href', data.object.cList[k].ad_url)
						}
						if(data.object.cList[k].ad_posi == 3) {
							$('.classify>a').eq(2).empty().append("<img src=" + data.object.cList[k].ad_photo + " alt=''>" + "<span>" + data.object.cList[k].ad_name + "</span>");
							$('.classify>a').eq(2).attr('data-href', data.object.cList[k].ad_url)
						}
						if(data.object.cList[k].ad_posi == 4) {
							$('.classify>a').eq(3).empty().append("<img src=" + data.object.cList[k].ad_photo + " alt=''>" + "<span>" + data.object.cList[k].ad_name + "</span>");
							$('.classify>a').eq(3).attr('data-href', data.object.cList[k].ad_url)
						}
						if(data.object.cList[k].ad_posi == 5) {
							$('.classify>a').eq(4).empty().append("<img src=" + data.object.cList[k].ad_photo + " alt=''>" + "<span>" + data.object.cList[k].ad_name + "</span>");
							$('.classify>a').eq(4).attr('data-href', data.object.cList[k].ad_url)
						}
						if(data.object.cList[k].ad_posi == 6) {
							$('.classify>a').eq(5).empty().append("<img src=" + data.object.cList[k].ad_photo + " alt=''>" + "<span>" + data.object.cList[k].ad_name + "</span>");
							$('.classify>a').eq(5).attr('data-href', data.object.cList[k].ad_url)
						}
						if(data.object.cList[k].ad_posi == 7) {
							$('.classify>a').eq(6).empty().append("<img src=" + data.object.cList[k].ad_photo + " alt=''>" + "<span>" + data.object.cList[k].ad_name + "</span>");
							$('.classify>a').eq(6).attr('data-href', data.object.cList[k].ad_url)
						}
						if(data.object.cList[k].ad_posi == 8) {
							$('.classify>a').eq(7).empty().append("<img src=" + data.object.cList[k].ad_photo + " alt=''>" + "<span>" + data.object.cList[k].ad_name + "</span>");
							$('.classify>a').eq(7).attr('data-href', data.object.cList[k].ad_url)
						}
					});
					//console.log("length=========="+picArr.length);
					$('.classify>a').on('click', function() {
						if($(this).index() == 0 || $(this).index() == 2 || $(this).index() == 3 || $(this).index() == 4 || $(this).index() == 6) {
							alertBg(1, '', '敬请期待！');
						} else {
							if($(this).index() == 5) {
								$.ajax({
									url: http1 + "wxToOtherApp",
									type: 'post',
									cache: false,
									data: JSON.stringify({ 'code': code, 'appid': 'ff3f7c0f46baefe174443cdafe6d8e11' }),
									dataType: 'json',
									contentType: "application/json",
									success: function(data) {
										//console.log(data.success);
										if(data.success == true) {
											window.location.href = data.object;
										} else {
											alertBg(1, '', data.msg)
										}
									},
									error: function() {}
								});
							} else {
								window.location.href = $(this).attr('data-href');
							}

						}
					});
			        //banner轮播图初始化
					var swiper1 = new Swiper('.swiper-container1', {
						pagination: '.swiper-pagination',
						slidesPerView: 1,
						paginationClickable: true,
						observer: true,
						observeParents: true,
						loop: true,
						speed: 500,
						autoplayDisableOnInteraction: false,
						autoplay: 1000
					});
					//加载完轮播图和分类图片后首页显示
					var numPic = picArr.length;
					$('img').load(function() {  
						if(!--numPic) {     // 加载完成 
							$('.onload').hide().siblings('.min').show().siblings('.footer').show();
							$("body").unbind("touchmove");
							$('body').css({ 'overflow': 'auto' });
							picArr = [];
						}
					});
					//火车驿站轮播
					var swiper5 = new Swiper ('.swiper-container5', {
					    direction: 'vertical',
						observer: true,
						observeParents: true,
						loop: true,
						speed: 1500,
						autoplayDisableOnInteraction: false,
						autoplay: 1000
					});
					var swiper6 = new Swiper ('.swiper-container6', {
					    direction: 'vertical',
						observer: true,
						observeParents: true,
						loop: true,
						speed: 800,
						autoplayDisableOnInteraction: false,
						autoplay: 1000
					});
					//加载每日特价
					var str02 = '';
					$.each(data.object.eList,function(idx,ele){
						if(idx==6){
							return false;
						}
						str02 += "<div class='swiper-slide'><a href='javascript:;' data-iid='"+data.object.eList[idx].i_id+"'><img alt='' src="+data.object.eList[idx].i_cover+" /><div><p class='p1'><span>"+data.object.eList[idx].i_name+"</span></p><p class='p2'><span>"+data.object.eList[idx].g_price+"￥</span><span>"+data.object.eList[idx].g_rprice+"￥</span></p></div></a></div>"
					});
					$('.swiper-container2>.swiper-wrapper').empty().append(str02);
					$(document).on('click','.swiper-container2 a',function(){
                        window.location.href="html/goods-information.html?id="+$(this).attr('data-iid');
                    });
				    //每日特价滑动swiper初始化
					var swiper2 = new Swiper('.swiper-container2', {
						slidesPerView: 'auto',
						slidesOffsetBefore: 0,
						freeMode:true,
						observer: true,
						observeParents: true
					});
					//判断每日特价标题几行
					$.each($('.swiper-container2 .p1'), function() {
						//console.log($(this).find('span').height());
						var titleHeight = $(this).find('span').height();
						if(titleHeight<20){
							$(this).find('span').css('line-height','0.3rem');
						}
					});
					//加载嗨翻游戏
					//happyGame(code);
					$('.happyGame .more').on('click',function(){
						$.ajax({
							url: http1 + "wxToOtherApp",
							type: 'post',
							cache: false,
							data: JSON.stringify({ 'code': code, 'appid': 'ff3f7c0f46baefe174443cdafe6d8e11' }),
							dataType: 'json',
							contentType: "application/json",
							success: function(data) {
								//console.log(data.success);
								if(data.success == true) {
									window.location.href = data.object;
								} else {
									alertBg(1, '', data.msg);
								}
							},
							error: function() {}
						});
					});
				    //嗨翻游戏滑动swiper初始化
					var swiper3 = new Swiper('.swiper-container3', {
							slidesPerView: 'auto',
							slidesOffsetBefore: 0,
							freeMode:true,
							observer: true,
							observeParents: true
					});
					//获取搜狐视频娱乐数据
					var videoPage = 2;
					videoPlay(videoPage);
					$('.videoPlay').find('.change').on('click',function(){
						if(videoPage>=5){
							videoPage=0;
						}
						videoPage++;
						videoPlay(videoPage);
					});
					//加载特惠活动数据
//					$('.favorableActivity-box>a').on('click',function(){
//						
//					});
					//逛吃逛吃
					//goingEat();
					//沁心假日
					$('.holiday-box').on('click','li',function(){
						var id = $(this).data('id');
						window.location.href = 'html/holiday.html?id='+id;
					});
					//车长推荐
					var aUl = document.getElementsByClassName('goods-ul');
					goodGoods(code,1,empId);
				} else {
					window.localStorage.setItem('share', location.href);
					alertBg(1, '', data.msg);
					$('#alertBtn01').on('click', function() {
						window.location.href = "httpss://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19f4a60762c40c37&redirect_uri=http%3A%2F%2Fwww.railwaybaby.com%2FtwoCode.html%3femp_id%3d0&response_type=code&scope=snsapi_userinfo&state=state1&connect_redirect=1#wechat_redirect"
					});
				}
			},
			error: function() {

			}
		});	

	};
	//嗨翻游戏数据获取
//	function happyGame(code){
//		$.ajax({
//			type:"get",
//			url:"",
//			async:true,
//			success:function(data){
//	
//          }
//		});
//	}
	function goingEat(){
		var idx = 2;
		$('.goingEat .change').on('click',function(){
			if(idx>5){
				idx = 0;
			}
			$('.goingEat-box a').hide();
			$('.goingEat-box a').eq(idx).show();
			$('.goingEat-box a').eq(idx+1).show();
			idx = idx+2;
		});
		$('.goingEat a').on('click',function(){
			window.location.href='html/goingEat.html?idx='+$(this).index();
		});
	}
	function videoPlay(page){
		$.ajax({
			type:"get",
			url:"http://open.mb.hd.sohu.com/v4/category/channel/1.json",
			async:true,
			cache: false,
			data: { 'page': page, 'cid': 1,'api_key': '4e30651b47eb3c1af27c7bddbfc251b3' },
			dataType: 'jsonp',
			success: function(data) {
				//console.log(data);
				if(data.status==200){
					var data = data.data.videos;
					var str03 = '';
					$.each(data,function(idx,ele){
						if(idx==6){
							return false;
						}
						str03+="<div class='swiper-slide'><a href='javascript:;' data-aid='"+data[idx].aid+"'><img src='"+data[idx].ver_high_pic+"' alt='' /><span>"+data[idx].album_name+"</span></a></div>"
					});
					$('.swiper-container4 .swiper-wrapper').html(str03);
					$(document).on('click','.swiper-container4 a',function(){
						var id = $(this).attr('data-aid');
						$.ajax({
							type:"get",
							url:"http://open.mb.hd.sohu.com/v4/album/videos/"+id+".json",
							async:true,
							data:{'api_key':'4e30651b47eb3c1af27c7bddbfc251b3',"aid":id,"page":1},
							dataType:'jsonp',
							success:function(data){
								console.log(data);
								var playUrl = data.data.videos[0].url_html5;
								window.location.href = playUrl;
							},
							error:function(){
								
							}
						});
					});
					//视频娱乐滑动swiper初始化
					var swiper4 = new Swiper('.swiper-container4', {
						slidesPerView: 'auto',
						slidesOffsetBefore: 0,
						freeMode:true,
						observer: true,
						observeParents: true
					});
				}else{
					alert('错误');
				}
			},
			error:function(){
				
			}
		});
	}
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
                        str="<li><a href='javascript:;' data-gid="+data.object[i].g_id+" data-iid="+data.object[i].i_id+" data-price="+data.object[i].price+" ><img class='lazy'  data-original="+data.object[i].i_cover+"> <div> <p class='p1'>"+data.object[i].i_name+"</p><p class='p2'>￥"+parseFloat(data.object[i].price).toFixed(2)+"</p>   <span class='p3'>"+data.object[i].i_sale+"人付款 </span></div> </a></li>";
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
                    $('img.lazy').lazyload({
                    	container: $(".goodGoods"),
                        event:'scroll',
                        effect:'show',
                        threshold : 200, 
                        placeholder:'img/loading.jpg'
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
                }else{
                    alertBg(1,'',data.msg)
                }

            },
            error:function(){
            }
        });
    }
})