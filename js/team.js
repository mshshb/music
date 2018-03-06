$(document).ready(function(){
	var $ul=$("#team>div.team-show>ul.team-list");
	$.ajax({
		url:'data/team.php',
		type:'get',
		success:function(data){
			console.log(data);
			var htmls="";
			for(var teacher of data){
				htmls+=`
					<li>
						<img src="${teacher.sm}" alt="${teacher.team_id}"/>
						<a href="team-intro.html?tid=${teacher.team_id}">${teacher.post}</a>
						<p>${teacher.tname}</p>
						<p>${teacher.title}</p>
					</li>
				`
			}
		    $ul.html(htmls);
			var liWidth=$ul.children("li").outerWidth(true);
			$ul.parent().css("width",liWidth*3+"px");
			var $lis=$ul.children();
			$lis.hover(function(){
				$(this).toggleClass("enter");
				$(this).children("a").toggleClass("enter");
				$(this).children("img").toggleClass("enter");
			});
			/*左右箭头的样式变换*/
			var $al=$("#team>a.lf"),$ar=$("#team>a.rf");
			$al.hover(function(){
				$(this).children("img").attr("src","imgs/team/team_lt1.svg");
			},function(){
				$(this).children("img").attr("src","imgs/team/team_lt2.svg");
			});
			$ar.hover(function(){
				$(this).children("img").attr("src","imgs/team/team_gt1.svg");
			},function(){
				$(this).children("img").attr("src","imgs/team/team_gt2.svg");
			});
			slideRow(liWidth,$ul,$al,$ar);
		}
	});
});

/*点击箭头图片切换*/
function slideRow(slideWidth,$parent,$al,$ar){
	var moved=0;
	var totalWidth=slideWidth*$parent.children().length-$parent.parent().innerWidth();
	const LIWIDTH=slideWidth;
	function move(){
		if(moved<0){
			moved+=2;
		}
		if(moved*LIWIDTH>totalWidth){
			moved-=2;
		}
		$parent.css("margin-left",-moved*LIWIDTH+"px");
	}
	$al.click(function(){
		moved--;
		move();
	})
	$ar.click(function(){
		moved++;
		move();
	})
}


