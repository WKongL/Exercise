var msgArr=[];
var currTop = 0;
window.onload =function(){
	var dmShow = document.getElementById("showmsg");
	prepareMsg();
	alwayShowMsg(dmShow);
}

//处理按钮操作弹幕。
function prepareMsg(){
	//var launch = document.getElementById("launch");
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById("showmsg")) return false;
	var inputs = document.getElementsByTagName("input");
	for(var i=0;i<inputs.length;i++){
		inputs[i].onclick = function(){
			var dmShow = document.getElementById("showmsg");
			var name = this.getAttribute("name");
			
			if(name =="launch"){
				//获取文本内容并创建元素节点
				var dmtextElem = document.getElementById("dmtext");
				if (dmtextElem.value.replace(' ','').length ==0) return false;

				var showElem = createShowElem("p",dmtextElem.value);
				dmShow.appendChild(showElem);
				//存储输入内容
				msgArr[msgArr.length] = dmtextElem.value;
				dmtextElem.value ="";
				//移动元素
				moveElement(showElem,currTop,5)
			}

			//清除所有弹幕
			if(name=="clear"){
				while(showmsg.firstChild){
					if(showmsg.firstChild.movement){
						clearTimeout(showmsg.firstChild.movement);
					}
					showmsg.removeChild(showmsg.firstChild);
				}
				msgArr=[];
			}
		};
	}
}

//随机获得颜色
function getRandomColor(){
	var arr = [0,0,0,0,0,0];
	arr = arr.map(function(elem,index,array){
		var code = '0123456789abcdef'.split("");
		return code[Math.floor(Math.random()*code.length)];
	});
	return '#'+arr.join("");
}
//获取元素的CSS
function getCssStyle(elem){
	return elem.currentStyle || getComputedStyle(elem);
}

//创建弹幕元素
function createShowElem(elemType,text){
	//判断弹幕开始的位置
	if(!document.getElementById("showmsg")) return null;
	var dmShow = document.getElementById("showmsg");
	var dmShowStyle = getCssStyle(dmShow)
	var maxTop = parseInt(dmShowStyle.height) ;
	currTop += 50;
	if(currTop > maxTop-50){
		currTop = 0;
	}
	
	var left = parseInt(dmShowStyle.width);

	var showElem = document.createElement(elemType);
	var showElemText = document.createTextNode(text);

	showElem.style.position ='absolute';
	showElem.style.top = currTop+'px';
	showElem.style.left= left+'px';
	showElem.style.color = getRandomColor();
	showElem.appendChild(showElemText);
	return showElem;
}

//移动元素
function moveElement(elem,final_y,interval){
	//if(!document.getElementById) return false;
	//if(!document.getElementById(elementId)) return false;
	//var elem = document.getElementById(elementId);
	/*if(!elem.style.left || !elem.style.top){
		return false;
	}*/
	var final_x = -elem.offsetWidth;
	if(!elem.style.left){
		elem.style.left = 0;
	}
	if(!elem.style.top){
		elem.style.top = 0;
	}
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if(elem.movement){
		clearTimeout(elem.movement);
	}
	if(xpos ==  final_x && ypos == final_y) {
		elem.parentNode.removeChild(elem);
		return true;
	}

	if(xpos < final_x){
		xpos++;
	}
	if(xpos > final_x){
		xpos--;
	}
	if(ypos < final_y){
		ypos++;
	}
	if(ypos > final_y){
		ypos--;
	}
	elem.style.left = xpos +'px';
	elem.style.top = ypos +'px';

	//var repeat = "moveElement('"+elementId+"',"+final_x+","+final_y+","+interval+")";
	//var repeat = "moveElement('"+elem+"',"+final_x+","+final_y+","+interval+")";
	//elem.movement = setTimeout(repeat,interval);
	elem.movement = setTimeout(function(){
		moveElement(elem,final_y,interval)},interval);
}

//定时检查，并自动创建元素。
function alwayShowMsg(elem){
	if (msgArr.length >0) {
		var randomMsg = msgArr[Math.floor(Math.random()*msgArr.length)];

		var showElem = createShowElem("p",randomMsg);
		elem.appendChild(showElem);
		moveElement(showElem,currTop,5);
	}
	setTimeout(function(){
		alwayShowMsg(elem);
	},3000);
}