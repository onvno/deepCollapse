/**
 * @authors     Li Weidong (https://github.com/onvno)
 * @email       leewei2020@gmail.com
 * @contributer
 * @company     Deep (www.deeping.cn) 
 * @date        2016-05
 * @version     0.1
 * @commit      This is first time to build some components , just want to get a more easy way for working . Before do this, most time work with jQuery, so i'm a worse JSer , please give us more confidence , more time & suggestions , thx !
 * Released under the MIT license.
 */

function deepCollapse (options) {

	var defaults = {
		wrapNodes :'',
		boxNodes :'',
		headNodes : '',
		contNodes :'',
		animate : 'easeOutQuad',
		time : 500
	};

	var options;

	// change default config
	function inputArguments(source,attribute) {
		var attr;
		for (attr in attribute) {
			if (attribute.hasOwnProperty(attr)) {
				source[attr] = attribute[attr];
			}
		}
		return source;
	}

	// change default
	if(arguments[0] && typeof arguments[0] === 'object') {
		options = inputArguments(defaults,arguments[0]);
	}else if(!arguments[0]){
		options = defaults;
	}
	var wrapNodes = options.wrapNodes;
	var boxNodes = options.boxNodes;
	var headNodes = options.headNodes;
	var contNodes = options.contNodes;

	var childLength = boxNodes.length;
	var paraArray = [];
	var nodeArray = [];
	var disStyle;
	for(var j=0; j<childLength; j++){
		//nodeArray with all content include boxNodes
		nodeArray.push(boxNodes.item(j));

		//paraArray by the display attribute
		disStyle = getComputedStyle(contNodes.item(j))['display'];
		paraArray.push(disStyle);
	}

	var i;

	for (i=0; i<childLength; i++) {
		headNodes.item(i).addEventListener('click' , function () {
			//hide the block content
			getHide();

			//show the click content
			//this.nextElementSibling.style.display = 'block';

			// 修改getIndex方法简便
			// var thisIndex = getIndex(this);
			var thisIndex = Array.prototype.indexOf.call(headNodes, this);
			paraArray[thisIndex] = 'block';
			var heightHide = parseFloat(contHeightArray[thisIndex])
			// console.log(heightHide);
			// console.log(this.nextElementSibling);
			this.nextElementSibling.style.height = 0;
			this.nextElementSibling.style.display = 'block'
			var change = {
				height : heightHide
			};
			deepEase(this.nextElementSibling , change , options.time , options.animate);	
		})
	}

	function getHide () {
		for(var i=0 ; i<paraArray.length; i++) {
			if(paraArray[i] == 'block') {
				contNodes.item(i).style.display = 'none';
				paraArray[i] = 'none'; // array 不能使用.item
			}
		}
	}

	//get hide element height
	var cloneWrap = wrapNodes.cloneNode(true);
	cloneWrap.setAttribute('id' , 'colone-collapse')
	cloneWrap.style.width = getComputedStyle(wrapNodes)['width'];
	document.getElementsByTagName('body')[0].appendChild(cloneWrap);
	//setAttribute会把之前的覆盖，不适用目前需求
	//cloneWrap.setAttribute('style' , 'position:absolute; left:300px')
	cloneWrap.style.cssText += '; position : absolute; left:300px'; //position前缺一个;号，引发的血案，ie8输出为：width:500pxposition : absolute

	var contHeightArray =[]
	for(var q=0; q<childLength; q++){
		cloneWrap.getElementsByClassName('singlecont')[q].style.display = 'block';
		// cloneWrap.getElementsByClassName('singlecont')[q].style.height = 'auto';
		// 临时注释
		var contHeight = cloneWrap.getElementsByClassName('singlecont')[q].offsetHeight + 'px';
		contHeightArray.push(contHeight);
	}
	// console.log(contHeightArray);
	document.getElementsByTagName('body')[0].removeChild(cloneWrap);

}
