$(document).ready(function(){
	var $ul=$("#classSet ul.show-class");
	$.ajax({
		url:'data/class.php',
		type:'get',
		success:function(data){
			var htmls="";
			for(var course of data){
				htmls+=`
					<li class="">
						<a href="class-intro.html?cid=${course.course_id}">
							<p><img src="${course.sm}" alt="${course.course_id}" /></p>
							<h2>${course.title}</h2>
						</a>
						<p>
							${course.details.slice(0,50)}...
						</p>
					</li>	
				`
			}
		    $ul.html(htmls);
			floatSlide($ul,"li","li");
			var $lis=$ul.children();
			$lis.hover(function(){
				$(this).toggleClass("simple-intro");
			});
			$("#classSet>div.title").click(function(){
				window.history.go(0);
			});
		}
	});
});

var sTop=0;
function floatSlide($parent,child,childState){
	var top=20,time=0.3;
	for(var ch of $parent.children(child)){
		ch.saveTop=ch.offsetTop;
		var $ch=$(ch);
		$ch.css("position","relative");
		top+=90;
		time+=0.2;
		$ch.css("top",top+"px");
		$ch.css("transition","all "+time+"s");
	}
	for(var ch of $parent.children(childState)){
		var $ch=$(ch);
		sTop+=30;
		$ch.css("top",0);
		$ch.css("opacity",1);
		$(document).scrollTop(sTop);
	}
}



