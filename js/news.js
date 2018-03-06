$(document).ready(function(){
	var $ul=$("#news>ul.news-list");
	$.ajax({
		url:'data/news.php',
		type:'get',
		success:function(data){
			var htm=``,htmBe=``;
			for(var i in data){
				htm+=`
					<li>
						<div class="date">
							<span class="day">${data[i].date.match(/-\d{2}-\d{2}/)[0].slice(1)}</span>
							<span class="year">${data[i].date.match(/\d{4}/)[0]}</span>
						</div>
						<div class="content">
							<h3>${data[i].title}</h3>
							<p>${data[i].details}</p>
						</div>
					</li>
				`;
				if(i==4){
					htmBe=htm;
				}
			}
		    $ul.html(htmBe);
			floatSlide($ul,"li","li");
			var $aMore=$("#news>a.more");
			$aMore.click(function(){
				$ul.html(htm);
				$(this).remove();
				floatSlide($ul,"li:nth-child(5)~li","li",0);
				$("#news>div:last-child").addClass("floorTop");
				floor();
			});
			$("#news>div.title").click(function(){
				window.history.go(0);
			});
		}
	});
});
function floor(){
	var $floorTop=$("#news>div.floorTop");
	$floorTop.hover(function(){
		$(this).toggleClass("floor_upc");
	});
	$floorTop.click(function(){
		var timer=null;
		var top=$(document).scrollTop();
		timer=setInterval(function(){
			top-=3;
			$(document).scrollTop(top);
			if(top<=0){
				clearInterval(timer);
				timer=null;
			}
		},6);
	});	
}
var sTop=0;
function floatSlide($parent,child,childState){
	var top=20,time=0.7;
	for(var ch of $parent.children(child)){
		ch.saveTop=ch.offsetTop;
		var $ch=$(ch);
		$ch.css("position","relative");
		top+=200;
		time+=0.2;
		$ch.css("top",top+"px");
		$ch.css("transition","all "+time+"s");
	}
	for(var ch of $parent.children(childState)){
		var $ch=$(ch);
		sTop+=60;
		$ch.css("top",0);
		$ch.css("opacity",1);
		$(document).scrollTop(sTop);
	}
}