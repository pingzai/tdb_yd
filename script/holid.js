$(function(){
	var id = window.location.href;
	id = id.split("?")[1].split("&")[0].split("=")[1];
	switch(parseInt(id)){
		case 1:
			holidayLoad1();
			break;
		case 2:
			holidayLoad2();
			break;
	}
	function holidayLoad1(){
		$.ajax({
			type:"get",
			url:"../json/holiday.json",
			async:true,
			success:function(data){
				//console.log(data);
				$('h1').text(data.cifangzi.title);
				var data = data.cifangzi.content;
				var str = '';
				$.each(data, function(idx,ele) {
					str += "<img src='"+data[idx].imgSrc+"'/><div class='holiday-page'><p>"+data[idx].page+"</p><span class='topLeft'></span><span class='topRight'></span><span class='botLeft'></span><span class='botRight'></span></div>";
				});
				$('.holiday-box').append(str);
				//标题超过一行左对齐
				if($('h1').height()>32){
					$('h1').css('text-align','left');
				}
			}
		});
	}
	function holidayLoad2(){
		$.ajax({
			type:"get",
			url:"../json/holiday.json",
			async:true,
			success:function(data){
				//console.log(data);
				$('h1').text(data.nanluoguxiang.title);
				var data = data.nanluoguxiang.content;
				var str = '';
				$.each(data, function(idx,ele) {
					str += "<img src='"+data[idx].imgSrc+"'/><div class='holiday-page'><p>"+data[idx].page+"</p><span class='topLeft'></span><span class='topRight'></span><span class='botLeft'></span><span class='botRight'></span></div>";
				});
				$('.holiday-box').append(str);
				//标题超过一行左对齐
				if($('h1').height()>32){
					$('h1').css('text-align','left');
				}
			}
		});
	}
})