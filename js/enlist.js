/*表单验证*/
function createP(content,len){
	var $new=$("<p></p>");
	$new.html(content);
	$new.addClass("warning");
	$new.css("background","#D64A49 url(imgs/enlist/warning.svg) no-repeat 5px 5px");
	$new.css("background-size","15px");
	$new.css("text-indent","30px");
	$new.css("color","#fff");
	$new.css("font-size","12px");
	$new.css("max-width",len);
	$new.css("margin","6px 0px");
	$new.css("opacity","0.15");
	return $new;
}
function trans($elem,val){
	$elem.css("transition","all 0.8s linear");
	setTimeout(function(){
		$elem.css("opacity",val);
	},10);
}
function succ(){
	var $div=$("<div></div>");
	var $img=$("<img/>");
	$img.attr("src","imgs/enlist/success.svg");
	$img.css("width","80px");
	$img.css("margin-bottom","10px");
	$div.append($img);
	var $p=$("<p></p>");
	//$p.html(text);
	$div.append($p);
	$div.css("background","rgba(0,0,0,0.4)");
	$div.css("color","#fff");
	$div.css("fontSize","14px");
	$div.css("width","250px");
	$div.css("textAlign","center");
	$div.css("padding","15px 5px");
	$div.css("position","fixed");
	$div.css("top","30%");
	$div.css("left","40%");
	$div.css("opacity","0.1");
	return $div;
}
function succText($div,text){
	$div.find("p").html(text);
}
$(document).ready(function(){
	var $info=$("#enlist>.info");
	var $stars=$("#enlist-info>p.star");
	var $form=$("#enlist-info");
	$.ajax({
		url:"data/enlist.php",
		type:'get',
		success:function(data){
			/*填充内容*/
			var htmls="";
			htmls+=`
				<h3>音乐培训机构网站模板</h3>
				<p>地址：${data.address}</p>
				<p>邮编：${data.code}</p>
				<p>电话：${data.tel}</p>
				<p>手机：${data.phone}</p>
				<p>传真：${data.fax}</p>
				<p>邮箱：${data.mail}</p>	
			`
		    $info.children(".enlist-intro").html(htmls);
			
			var $p1=$form.children("p:nth-child(1)");
			$p1.html(course_period(data,true));
			var $p2=$form.children("p:nth-child(2)");
			$p2.html(course_title(data));
			/*课时课程变化时对应的内容改变*/
			$p1.find(":input").change(function(){
				var per=this.value;
				changeTitle(per,$p2);
			});
			$p2.find(":input").change(function(){
				var cid=this.value;
				changePeriod(cid,$p1);
			});
			/*输入时的特效*/
			$stars.find(":input").focus(function(){
				var $this=$(this);
				if(!$this.val().trim()){
					$this.prev().css("opacity","0.5");
				}
			});
			$stars.find(":input").blur(function(){
				var $this=$(this);
				if(!$this.val().trim()){
					$this.prev().css("opacity","1");
				}
			});
			$stars.find(":input").keydown(function(){
				var $this=$(this);
				$this.prev().css("opacity","0");
			});
			/*用户提交--提示信息*/
			$("#enlist-info #res").click(function(){
				window.history.go();
			});
			$form.submit(function(e){
				e.preventDefault();
				var $requires=$stars.children("[data-req=require]");
				var re=0;
				for(var require of $requires){
					var $require=$(require);
					if(!$require.val().trim()){
						if(!$require.next().length){
							var $p=createP("该区域不能为空","130px");
							$require.after($p);
							trans($p,1); 
						}
						re=-1;
					}else{
						if($require.next().length){
							$require.next().remove();
						}		
						re=0;
					}
				}
				if(re==0){
					var $div=succ();
					var $enlist=$("#enlist");
					$enlist.append($div);
					var vals=[];
					var selects=$(this).find(":selected");
					for(var i=0;i<selects.length;i++){
						vals[vals.length]=selects[i].innerHTML;
					}
					var inputs=$(this).find(":input:not(select,:button,:submit)");
					for(var i=0;i<inputs.length;i++){
						vals[vals.length]=inputs[i].value;
					}
					$.post("data/user.php",{
						period:vals[0],title:vals[1],degree:vals[2],
						age:vals[3],uname:vals[4],tel:vals[5],details:vals[6]
					},function(data){
						succText($div,data.msg);
						trans($div,1);
						setTimeout(function(){trans($div,0.2);},3000);
						setTimeout(function(){$div.remove();},3000);
					});
				}
			});		
		}
	});
});
/*课时变化时对应的课程*/
function changeTitle(per,$p2){
	$.get("data/enlist.php",{period:per},function(data){
		$p2.html(course_title(data));
	})
}
/*课程变化时对应的课时*/
function changePeriod(cid,$p1){
	$.get("data/enlist.php",{course_id:cid},function(data){
		$p1.html(course_period(data));
	})
}
/*添加课程内容*/
function course_title(data){
	var titles=`<span>选学课程</span><br /><select name="title">`;
	for(var i=0;i<data.length;i++){
		titles+=`<option value="${data[i].course_id}">${data[i].title}</option>`;
	}
	titles+=`</select>`;
	return titles;
}
/*添加课时内容*/
function course_period(data,bool){
	var arr=[];
	var datac=data;
	var str=`<span>课程时段</span><br/><select name="period">`;
	if(bool){
		for(var i=0;i<data.length;i++){
			var periods=data[i].period.split("/");
			arr.push(...periods);
		}
		arr.sort(function(prev,next){
			return prev-next;
		});
		datac=arr.filter(function(val,i,arr){
			return val!=arr[i-1];
		});
		for(var da of datac){
			str+=`<option value="${da}">${perSwitch(Number(da))}</option>`;
		}
	}else{
		for(var i=0;i<data.length;i++){
			var periods=data[i].period.split("/");
			for(var per of periods){
				str+=`<option value="${per}">${perSwitch(Number(per))}</option>`;
			}
		}
	}
	return str+`</select> `;	
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