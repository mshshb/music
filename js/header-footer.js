$(document).ready(function(){
	var $header=$("#header");
	var $footer=$("#footer");
	$.ajax({
		url:"header.html",
		type:'get',
		datetype:'html',
		success:function(data){
			$header.html(data);
		}
	});
	$.ajax({
		url:"footer.html",
		type:'get',
		datetype:'html',
		success:function(data){
			$footer.html(data);
		}
	});
	$body=$("body");
	var w=window.screen.width;
	$body.css("width",w+"px");
	$("a").click(function(e){e.preventDefault()});
});
