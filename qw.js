var Box=D.getElementById('displayBox'),textarea=D.getElementById('content'),body=D.body;

function copy()
{
	textarea.select(); // 选择对象
    if(huisi.getBrowser().versions>70){
navigator.clipboard.writeText(textarea.value);
oE(Box,textarea.value);//仅限Chrome66以上，或者Firefox63以上版本
    }
    else{
      D.execCommand("Copy"); // 执行浏览器复制命令;该属性被弃用，随时可能失效  
    }
}

function addClick(selector,callback){
    const element=D.querySelector(selector); //这里不能使用querySelectorAll替代
   // if(element) element.addEventListener("click", callback);  //传统模式
   element?.addEventListener("click", callback); //新的链式模式
}


function updateVal(newValue){ Box.innerHTML=textarea.value=newValue;} //两个框都显示内容；
function boxValue(newValue){oE(Box,newValue);}//只在左边的框内显示
function twoBoxVal(){oE(Box,textarea.value);}

!(function (){
	let input= SE('#inputBox');
	let InputBox=SE('#alertInputBox');
	let confirmBox=SE('#confirmBox');
	let alertInfoBox=SE('#alertInfoBox');	
	if (!input){ CE('div', {attrs: {id: 'inputBox'},body})	}
	if (!InputBox){ CE('div', {attrs: {id: 'alertInputBox'}},input);}
	if (!confirmBox){ CE('div', {attrs: {id: 'confirmBox'}},body) }
	if (!alertInfoBox){ CE('div', {attrs: {id: 'alertInfoBox'}},body) }	
})();

OE.alert=function(a,color){
		let alertInfoBox= SE("#alertInfoBox"),style="position: fixed;padding: 15px 20px; border-radius: 5px;text-align: center;top: 50%;left: 50%; transform: translate(-50%, -50%);"
		
	if (alertInfoBox){
		oE(alertInfoBox,a); sE(alertInfoBox,style);		
		color===undefined ? alertInfoBox.className='blue':alertInfoBox.className='orange';
		setTimeout(function() { hideE(alertInfoBox) }, 3000);				  
		}
};


OE.alertBox = function(a,b,c,clickCallback){

     showE(SE('#alertInputBox'));
     a.innerHTML=`<input type="url" id="urlInput" placeholder="${b}" autofocus><input type="text" id="textInput" placeholder="${c}"><span id="rewrite" class="btn">重填</span><span id="ok" class="btn">确定</span><span id="ok1" class="btn">确定</span>`;
	 SE("#ok").addEventListener("click",function(){
     	   showE(SE('#textInput')),sE(SE('#ok1'),"display:block;left:270px"),hideE(SE('#rewrite')),hideE(SE('#ok'));
     })
	 SE("#ok1").onclick=function(){  clickCallback(); hideE(SE('#alertInputBox')); }
	 addClick("#rewrite",()=>{ SE("#urlInput").value=""; });
	 }

OE.confirm  = function(alertTitle,alertBody,value,callback1,callback2) {
    showE(SE('#confirmBox'));
	const a=`<div class="alertTitle blue" id="alertTitle" title="${alertTitle}">${alertTitle}</div>`,
		  b=`<div class="alertBody" id="alertBody">${alertBody}</div>`,
		  c=`<div class="alertBody" id="alertBody" contenteditable="true" style="color:#ff4b00">${alertBody}</div>`,
		  d=`<span id="sure" class="btn">确定</span><span id="cancel" class="btn">取消</span>`;
	
	if(value===false || value===undefined){	SE('#confirmBox').innerHTML=a+b+d; }
	else{
		SE('#confirmBox').innerHTML=a+c+d;
		
	D.getElementById('alertBody').addEventListener('click', function() {
        let editableDiv = this;
        editableDiv.innerHTML = '';
        const range = D.createRange();
        range.selectNodeContents(editableDiv);
        const selection = W.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    });
	}
 addClick("#alertTitle",()=>{ OE.alert(alertTitle,"orange")  });	
 addClick("#sure",()=>{ callback1(); setTimeout("hideE(SE('#confirmBox'))",1500) });
 addClick("#cancel",()=>{ callback2===undefined?null: callback2();hideE(SE('#confirmBox'))});
   return {alertTitle,alertBody}
}


window.onload=function(){
	
     if(SE("#currentURL")) oE( SE("#currentURL"), `<span><a class="btn" href="${location.origin}">返回首页</a></span><span class="btn">意见反馈，请发送到qq970605873@gmail.com</span>` );
     if(D.title && tags(D,'h1')[0]) oE( tags(D,'h1')[0], D.title);
     
	 if( SE('#empty')) addClick('#empty',()=>{textarea.value='';oE(Box,'');} ); //清空
     for(var i=0;i<querys(D,'[type=button]').length;i++){ querys(D,'[type=button]')[i].className="btn";}

	 setInterval(dateTime.date,1000);
}
