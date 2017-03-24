(function(){
	'use strict';

	let counter = 1;
	let doc= document;
	
	init();
	function init() {
		callListenGroup(
			doc.getElementsByClassName("new-input"),
			doc.getElementsByClassName("new-nested"),
			doc.getElementsByClassName("new-line")
		)
	}
	function callListenGroup(input, nested, line) {
		addListeners(input, 1);
		addListeners(nested, 2);
		addListeners(line, 3);
	}
	function addListeners(arr, type) {
		for(let i=0, l= arr.length; i< l; i++){
			eventListener(arr[i], type);
		}
	}
	function eventListener(source, type) {
		source.addEventListener("click",function(e){
			if(type===1) addNewInput(this);
			if(type===2) addNestedBlock(this.parentNode);
			if(type===3) addNewBlock(this.parentNode.parentNode);
  		e.preventDefault();
	  });
	}
	function addNewInput(element) {
	  let newInput= { type: 'input', attr: [ {class: 'input'}, {type: 'text'}, {placeholder: 'Enter Value...'}], text: 'text'};
	  element.insertAdjacentHTML("beforebegin", createElement(newInput).outerHTML);
	}
	function addNestedBlock(element) {
		let version= element.getElementsByClassName("line")[0].innerHTML +'.'+ 1;
	  element.insertAdjacentHTML("beforeend", getHtmlBlock(version)); 
	  let blocks= element.getElementsByClassName("form-block");
	  eventListener(blocks[blocks.length-1].getElementsByClassName("new-line")[0], 3);
	  eventListener(blocks[blocks.length-1].getElementsByClassName("new-nested")[0], 2);
	  eventListener(blocks[blocks.length-1].getElementsByClassName("new-input")[0], 1);
	}
	function addNewBlock(element) {
		element.insertAdjacentHTML("beforeend", getHtmlBlock(getLastValForNewBlock(element)));
		let blocks= element.lastChild;
			eventListener(blocks.getElementsByClassName("new-line")[0], 3);
			eventListener(blocks.getElementsByClassName("new-nested")[0], 2);
			eventListener(blocks.getElementsByClassName("new-input")[0], 1);
	}
	function getLastValForNewBlock(element){
		let orgEle;
		if(element.tagName == 'BODY' && element.childElementCount == 2){
			orgEle= element.firstElementChild.getElementsByClassName("line")[0].innerHTML;
		}else{
			orgEle= element.lastElementChild.getElementsByClassName("line")[0].innerHTML;
		}
		let arr= orgEle.split('.')
		let last= parseInt(arr[arr.length-1])
		++last;
		arr[arr.length-1]= last;
		arr= arr.join(".");
		return arr;
	}
	function getHtmlBlock(counter){
		let data=[
			{ type: 'div', attr: [ {class: 'form-block'}]},
			{ type: 'span', attr: [ {class: 'line'}], text: counter},
			{ type: 'button', attr: [ {class: 'new-line'}], text: 'New Line'},
			{ type: 'button', attr: [ {class: 'new-nested'}], text: 'New Nested Line'},
			{ type: 'input', attr: [ {class: 'input'}, {type: 'text'}, {placeholder: 'Enter Value...'}], text: 'text'},
			{ type: 'button', attr: [ {class: 'new-input'}], text: 'Add input'},
		];

		let block;
		data.map(function(val, index) {
			if(index===0) block= createElement(val);
			else block.appendChild(createElement(val));
		})
		return block.outerHTML;
	}
	function createElement(val) {
		let tag= doc.createElement(val.type);
		if(val.text) tag.textContent= val.text;
		tag.setAttribute('class', val.attr[0].class);
		if(val.attr.length>1){
			tag.setAttribute('type', val.attr[1].type)
			tag.setAttribute('placeholder', val.attr[2].placeholder);
		}
		return tag;
	}
})()