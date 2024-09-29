/*--
// author:慧思
// version:0.02
//抛弃了对IE的支持，全部使用ES6,元素名称不变
// instructions：已将常用的几个元素进行包裹，使用方法：
一、元素相关： 
   1、QE查询元素，可以查询id（QE.id('xx')或SE('#xx')）、标签（QE.tags()）、类（QE.classNames()或SE('.xx')），以及选择器(QE.querys());注意:sE是设置某个样式，格式为sE（a,b）;oE是输出元素，格式为oE(a,b);
   2、LE循环输出元素，目前添加了循环输出图片（LE.loopAddImg()）和链接与图片（LE.loopAddLinkImg()）两个
   3、CE创建元素，CE(element,option,parent)，选项有text（字符串）,atrrs（对象）,children（数组）三种方式，parent为需要插入的父级
   4、只需要在html标签，加上date的id，然后使用setInterval(dateTime.date,1000);进行调用。
   5、将常用的几个查询元素对象进行了解构，既可以在保留原方式的基础上使用，也可以使用新的方式。例如QE.id('xx')等同于id('xx')，QE.tags()等同于tags('xx')。


----*/

const log=console.log,warn=console.warn;
const W=window,D=window.document;
const tipMsg=["主上，您输入的类型是：%c","主上，您的浏览器是：%c","浏览器版本是：%c"];
const tipMsgColor=['#2f7eed','#ff4b00'];
let functionBoxArray = []; //创建全局空数组，当搜索到功能框的值后存起来使用
let huisi={
    checkDataType(data) {
    const dataType = typeof data;
    switch (dataType) {
        case 'string': return 'String';
        case 'number': return 'Number';
        case 'boolean': return 'Boolean';
        case 'function': return 'Function';
        case 'object':
       if (Array.isArray(data)) {  return 'Array'; } 
        else if (data === null) { return 'Null'; } 
        else { return 'Object'; }
        case 'undefined': return 'Undefined';
        default:  return 'Unknown';
    }
},
    getBrowser() {
	    const UA=W.navigator.userAgent.toLowerCase(),system=W.navigator.platform,width=W.screen.width,height=W.screen.height;
	   //IE中的screen width取值仅在100%缩放时正确
		const type = {
	        IE: W.ActiveXObject || "ActiveXObject" in W, // IE
	        Chrome: UA.indexOf('chrome') > -1 && UA.indexOf('safari') > -1, // Chrome浏览器
	        Firefox: UA.indexOf('firefox') > -1 && UA.indexOf('Gecko/'), // 火狐浏览器
	        Opera: UA.indexOf('opera') > -1, // Opera浏览器
	        Safari: UA.indexOf('safari') > -1 && UA.indexOf('chrome') == -1, // safari浏览器
	        Edge: UA.indexOf('edge') > -1, // Edge浏览器
	        QQBrowser: /qqbrowser/.test(UA), // qq浏览器
	        WeixinBrowser: /MicroMessenger/i.test(UA), // 微信浏览器
			//Electron:UA.indexOf('electron') >= 0
			Electron: UA.includes('electron') //另一种更简单的方法
	    };
		const d={
			Android:UA.match(/(Android);?[\s\/]+([\d.]+)?/),
			IPad:UA.match(/(iPad).*OS\s([\d_]+)/),
			IPod:UA.match(/(iPod)(.*OS\s([\d_]+))?/),
			IPhone:!(UA.match(/(iPad).*OS\s([\d_]+)/)) && UA.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
			Window:"Win32"===system,
			Mac:'MacIntel' === system
		};
		const v={
		//采用AI简写的方法	
		IE: /(?:msie\s|trident.*rv:)([\w.]+)/,
	    Chrome: /chrome\/([\d.]+)/,
	    Firefox: /firefox\/([\d.]+)/,
	    Opera: /opera\/([\d.]+)/,
	    Safari: /version\/([\d.]+)/,
	    Edge: /edge\/([\d.]+)/,
	    QQBrowser: /qqbrowser\/([\d.]+)/,
	    WeixinBrowser: /MicroMessenger\/([\d.]+)/
		};
		const b={ desktop:width>1024 || d.Window || d.Mac,phone:!(d.IPad) && (d.Mac) && (d.Window)};
	    for (let i in type) {
			if (type[i]) {
			b.type =i;
			b.versions = i === 'IE' ? UA.match(v[i])[2] : UA.match(v[i])[1];
			if(b.desktop){b.os=d.Window ? 'Windows':'Macos';}
			else{b.os=d.Android ? 'Android':'IPhone';}
			 return b;   
			}
	
	    }
	    // 当UA不匹配任何浏览器类型时，返回默认值或者提示用户
	  return { type: 'Unknown', versions: 'Unknown', os: 'Unknown' };
	    
	},
	randomNum(a){
	  return Math.floor(Math.random()* a);
	},
	randomColor(){
		const r=Math.floor(Math.random()*255),g=Math.floor(Math.random()*255),b=Math.floor(Math.random()*255);
		return `rgb(${r},${g},${b})`;
		},
	generateRandomColor(min, max) {
	  function getRandomValue() {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	  }
	  
	  const r = getRandomValue().toString().padStart(3, '0');
	  const g = getRandomValue().toString().padStart(3, '0');
	  const b = getRandomValue().toString().padStart(3, '0');
	  
	  return `rgb(${r},${g},${b})`;
	},
	randomArrayNum(a){
	   return a[huisi.randomNum(a.length)];
	},
	doubleI: (i) =>{return	i<10 ? '0'+i:i;}
}
	

const E={
	SE(selector){
  if (selector.startsWith('#')) {   
 //string.startsWith(searchvalue,start)方法用于检测字符串是否以指定的子字符串开始。start为查找的开始位置，默认为 0
    return D.getElementById(selector.slice(1));
  } else if (selector.startsWith('.')) {
    let elements=D.getElementsByClassName(selector.slice(1));
    if(elements.length>0){return elements;}
    else throw new Error(`未找到${selector.slice(1)}`);
    
  } else { alert("选择器类型不支持，可以使用QE.queryE(g,h)查找");throw new Error("选择器类型不支持，可以使用QE.queryE(g,h)查找");  }
},	
	QE:{
		id:(b) => D.getElementById(b),
		tags:(c,d)=> c.getElementsByTagName(d),
		classNames:(e,f)=> e.getElementsByClassName(f),
		querys:(g,h)=> g.querySelectorAll(h)
	},
	sE:(a,b)=> a.style.cssText=b,
	showE:(a)=> sE(a, "display:block"),
	hideE:(a)=> sE(a, "display:none"),
	toggleE:(a)=> a.style.display = a.style.display === 'block' ? 'none' : 'block',
	LE:{
		loopAddImg(length,id,filePath,fileType,alt){
for(let i=0;i<length;i++){id.innerHTML+=`<img src="${filePath}${huisi.doubleI(i)}${fileType}" alt="${alt[i]}">`}},
			
		loopAddLinkImg(id,link,path,alt){
for(let i=0;i<path.length;i++){id.innerHTML+=`<a href="${link[i]}"><img src="${path[i]}" alt="${alt[i]}"></a>`}},
		
		loopAddIrregularImg(id,file,alt){
		 if(huisi.checkDataType(file)!==Array){alert("这里和alt都需要输入数组");throw new Error("这里和alt都需要输入数组");}
for(let i=0;i<file.length;i++){id.innerHTML+=`<img src="${file[i]}" alt="${alt[i]}">`}}
	},
	CE (tagName, options,parent) {
   
       let el = D.createElement(tagName);
    if (options) {
        if (options.text) { el.textContent = options.text; }
        if (options.attrs) {
            for (let attr in options.attrs) {
                el.setAttribute(attr, options.attrs[attr]);
            }
        }
        if (options.children && Array.isArray(options.children)) {
            options.children.forEach(function(child) {
                el.appendChild(child);
            });
        }
    }
    
     // 如果提供了父元素，则将当前元素添加到父元素中
        if (parent) { parent.appendChild(el);  }
    return el;  //将全部元素返回出去
    },
	oE(element,content){element.innerHTML=content;},
	OE:{
		imgLazy(){
			const images = tags(D, 'img');
		     for(let i=0;i<images.length;i++){images[i].setAttribute('loading','lazy');}
		},
		oneslideShow(id,slideShowNum,time){
			if(typeof time !== 'number' || isNaN(time)){throw new Error('传入时间不能为空，而且必须为数字')}
			let childrenElement=id.children;
			let len=childrenElement.length;
			childrenElement[slideShowNum].style.display='block';	
			const one=()=>{
				slideShowNum++;
				if(slideShowNum>=len) slideShowNum=0;
				for(let i=0;i<len; i++){childrenElement[i].style.display='none';}
				childrenElement[slideShowNum].style.display= 'block';
			}
			let t=setInterval(one,time);
  id.addEventListener('mouseover', ()=> clearInterval(t));

  id.addEventListener('mouseleave', ()=> t = setInterval(one, time));
			
		},
		marquee(id,time){
		}
	}
};

const { SE, QE,sE, showE, hideE, toggleE,LE,OE,CE,oE } = E;
const { tags, id, classNames, querys } = QE;


const dateTime={
	timers:() =>{
	let a=new Date(),w=["天","一","二","三","四","五","六"];
	let Dt={
	y:a.getFullYear(),m:a.getMonth()+1,d:a.getDate(),
	h:a.getHours(),mm:a.getMinutes(),s:a.getSeconds(),
	w:'星期'+w[a.getDay()],hms:a.toLocaleTimeString('en-CN', { hour12: false })  //制定语言和格式
	};
	
  let hello = (Dt.h < 6) ? ' ☽凌晨好! ' :  (Dt.h < 9) ? ' ☺早上好! ' :
            (Dt.h < 12) ? ' ☼上午好! ' :(Dt.h < 14) ? ' ☺中午好! ' : (Dt.h < 17) ? ' ❀下午好! ' :
            (Dt.h < 19) ? ' ☆傍晚好! ' :(Dt.h < 22) ? ' ☪晚上好! ' : '夜深了,请早点休息! ';
	return {a:a,Dt:Dt,hello:hello};
	},
	date(){
		const T=dateTime.timers().Dt,tdate = T.y + "年" + T.m + "月" + T.d + "日";
		   if(SE("#date")!==null){
		 sE(SE("#date"),'font-size:13px');
		oE(SE("#date"),tdate+' '+T.hms+' ' + T.w + dateTime.timers().hello);
		}
	}
};



/*初始化加载器*/
document.onreadystatechange =  () =>{
  if (D.readyState === "complete")   OE.imgLazy();
};
