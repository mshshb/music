$(document).ready(function(){
	var $teamIntro=$("#team-intro");
	var str=location.href.split("=")[1];
	$.ajax({
		url:'data/team-intro.php?tid='+str,
		type:'get',
		success:function(data){
			var len=data.details.indexOf("。");
			var htmls=`
				<img src="${data.md}" alt="" />
				<div class="content">
					<h2 class="tea">${data.post}</h2>
					<p class="name">${data.tname}</p>
					<p>${data.details.slice(0,len+1)}</p>
					<p>${data.details.slice(len+1)}</p>
				</div>
			`;
			$teamIntro.html(htmls);
			var $title=$("title");
			$title.html($title.html()+data.post);
		}
	});
});

