var td=new Array(); //保存每个格子的地鼠
var playing = false; //游戏是否开始
var score=0;//分数
var beat=0;//鼠标点击次数
var success=0;//命中率
var knock=0;//鼠标点中老鼠图片次数
var countDown=30;//倒计时
var interId=null;//指定setInterval()的变量
var timeId=null;//指定setTimeout()的变量

function GameStart(){
	playing = true;
	interId=setInterval("show()",1000);
	document.form1.score.value=score;
	document.form1.success.value=success;
	timeShow();
}

function show(){
	if(playing){
		var current = Math.floor(Math.random()*25);
		document.getElementById("td["+current+"]").innerHTML='<img src="img/shuaishuai.png">';
		setTimeout("document.getElementById('td["+current+"]').innerHTML=''",3000);
	}
}

function timeShow(){
	document.form1.remtime.value=countDown;
	if(countDown==0){
		GameOver();
		return;
	}else{
		countDown = countDown-1;
		timeId = setTimeout("timeShow()",1000);
	}
}

function hit(id){
	if(playing==false){
		alert("请先点击开始游戏");
		return;
	}else{
		beat+=1;
		if(document.getElementById("td["+id+"]").innerHTML!=""){
			score+=1;
			knock+=1;
			success=knock/beat;
			document.form1.success.value=success;
			document.form1.score.value=score;
			document.getElementById("td["+id+"]").innerHTML="";
		}else{
			score+= -1;
			success = knock/beat;
			document.form1.success.value=success;
			document.form1.score.value=score;
		}
	}
}

function GameOver(){
	timeStop();
	playing=false;
	clearMouse();
	alert("游戏结束！\n 你的分数是："+score+"\n 命中率为："+success);
	success=0;
	score=0;
	knock=0;
	beat=0;
	countDown=30;
}
function clearMouse(){
	for (var i = 0; i < 25; i++) {
		document.getElementById("td["+i+"]").innerHTML="";
	}
}

function timeStop(){
	clearInterval(interId);
	clearTimeout(timeId);
}