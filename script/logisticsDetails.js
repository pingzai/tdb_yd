$(function(){
//	获取用户code和订单id=====================
    var o_id = window.localStorage.getItem('o_id') ? window.localStorage.getItem('o_id'):'';
    var code = window.localStorage.getItem('code') ? window.localStorage.getItem('code'):'';
	var http = "https://www.railwaybaby.com/";
//	var code = "051C7qb72jWvlM0L0Fb72aMbb72C7qbq";
//	var o_id = 379;
//	获取物流跟踪信息====================
	//http://192.168.1.45:9000/queryOrderByCodeAndOid
	$.ajax({
		type:"post",
		url:http+"queryOrderByCodeAndOid",
		async:true,
		contentType: "application/json",
		data:JSON.stringify({"code":code,"o_id":o_id}),
		dataType:"json",
		success:function(data){
			console.log(data);
			if(data.success){
				var data = data.object.data;
				//console.log(data);
				var str = '';
				$.each(data, function(idx,ele) {
					str+="<li><p>"+data[idx].context+"</p><div>"+data[idx].time+"</div></li>";
				});
				$('.logisticsFollow').append(str);
			}else{
				alert("抱歉，未查到该订单");
			}
		},
		error:function(){
			alert('未知错误');
		}
	});
})
