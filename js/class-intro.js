$(document).ready(function(){
	var $classIntro=$("#class-intro>div.class-intro");
	var str=location.href.split("=")[1];
	$.ajax({
		url:'data/class-intro.php?cid='+str,
		type:'get',
		success:function(data){
			var periods=period(data);
			var htmls=`
				<img src="${data.md}" alt="" />
				<div class="content">
					<h2>${data.title}</h2>
					<div>
						<p>招生对象：${data.enrolment}</p>
						<p>课时时长：${data.hours}分钟</p>
						<p>上课时间：${periods}</p>
						<p>课程介绍：${data.details}</p>
					</div>
					<a href="enlist.html">在线报名</a>
				</div>
			`;
			$classIntro.html(htmls);
			var $title=$("title");
			$title.html($title.html()+data.title)
		}
	});
});

function period(data){
	var periods=data.period.split("/");
	var str="";
	for(var per of periods){
		str+="/"+perSwitch(Number(per));
	}
	return str.slice(1);
}
function perSwitch(val){
	var str="";
	switch(val){
		case 1:str="周一晚上"; break;
		case 2:str="周二晚上"; break;
		case 3:str="周三晚上"; break;
		case 4:str="周四晚上"; break;
		case 5:str="周五晚上"; break;
		case 6:str="周六全天"; break;
		case 6.1:str="周六上午"; break;
		case 6.2:str="周六下午"; break;
		case 6.3:str="周六晚上"; break;
		case 0:str="周日全天"; break;
		case 0.1:str="周日上午"; break;
		case 0.2:str="周日下午"; break;
		case 0.3:str="周日晚上"; break;
	};
	return str;
}