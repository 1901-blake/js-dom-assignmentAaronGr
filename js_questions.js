/*-----------------------------------------------------------------------------------
PART II

Part II will focus on Javascript's ability to manipulate the DOM.
Use the provided index.html
-----------------------------------------------------------------------------------
*/

/*
1. USA
Define function getUSA()
Find the html element that contains "USA".
Print that element's contents.
*/
function getUSA() {
  var spans = document.getElementsByTagName("span");
  for (let span of spans) {
	if (span.dataset['customattr'] === 'USA') {
	  console.log(span.innerHTML);
	}
  }
}

getUSA();

/*
2. Sales
Define function getPeopleInSales()
Print the names of all the people in the sales department.
*/
function getPeopleInSales() {
  let rows = document.getElementsByTagName('tr');
  for(let row of rows) {
	if ( row.cells[1].innerHTML === 'Sales') {
	  console.log(row.cells[0].innerHTML);
	}	
  }
}

getPeopleInSales();
/*
3. Click Here
Define function getAnchorChildren()
Find all anchor elements with a <span> child.
Print the contents of <span>
*/
function getAnchorChildren() {
  let anchors = document.getElementsByTagName('a');
  for (let anchor of anchors) {
	let anchorSpan = anchor.querySelector('span');
	if (anchorSpan) {
      console.log(anchorSpan.innerHTML);
	}	
  }
}

getAnchorChildren();
/*
4. Hobbies
Define function getHobbies()
Find all checked options in the 'hobbies' select element.
Print the value and the contents.
*/
function getHobbies() {
  let hobbySelect = document.querySelector('[name=hobbies]');
    for (let option of hobbySelect.options) {
	  if (option.getAttribute('selected') === 'selected') {
		console.log(`Value: ${option.value} Content: ${option.innerHTML} `);
	  }
	}
}

getHobbies();
/*
5. Custom Attribute
Define function getCustomAttribute()
Find all elements with "data-customAttr" attribute
Print the value of the attribute.
Print the element that has the attribute.
*/
function getCustomAttribute() {
  document.querySelectorAll('body *').forEach( ele => {
	if(ele.dataset['customattr']) {
	  console.log(`Value: ${ele.dataset['customattr']}, Element: ${ele.nodeName}`);
	}
  });
}

getCustomAttribute();
/*
6. Sum Event
NOTE: Write unobtrusive Javascript
Regarding these elements:
	<input id="num1" class="nums" type="text"/>
	<input id="num2" class="nums" type="text"/>
	<h3>Sum: <span id="sum"></span></h3>
Define onchange event handler.
Add <input> element values.
Put the sum in the <span> element.
If values cannot be added, put "Cannot add" in the <span> element
*/
let num1 = document.querySelector(['#num1']);
let num2 = document.querySelector(['#num2']);

num1.addEventListener('change', () => {
	if( notBothNumbers() ) {
		sumSpan.textContent = 'Cannot add';
	} else {
	  sumSpan.textContent = (+num1.value) + (+num2.value);
	}
});

num2.addEventListener('change', () => {
	if( notBothNumbers() ) {
		sumSpan.textContent = 'Cannot add';
	} else {
	  sumSpan.textContent = (+num1.value) + (+num2.value);
	}
});

let body = document.querySelector('body');
let sumh3 = document.createElement('h3');
sumh3.textContent = 'Sum: ';

let sumSpan = document.createElement('span');
sumSpan.textContent = 'Cannot add';
sumSpan.id = 'sum';

body.appendChild(sumh3);
sumh3.appendChild(sumSpan);

function notBothNumbers() {
  return (isNaN(num1.value) || isNaN(num2.value));
};

/*
7. Skills Event
NOTE: Write unobtrusive Javascript
When user selects a skill, create an alert with a message similar to:
	"Are you sure CSS is one of your skills?"
NOTE: no alert should appear when user deselects a skill.
*/

let skillSelect = document.querySelector('[name=skills]');
skillSelect.addEventListener('change', event => {
	alert(`Are you sure ${event.target.value} is one of your skills?`);
}, false);

/*
8. Favorite Color Event
NOTE: Write unobtrusive Javascript
NOTE: This is regarding the favoriteColor radio buttons.
When a user selects a color, create an alert with a message similar to:
	"So you like green more than blue now?"
In this example, green is the new value and blue is the old value.
Make the background color (of all favoriteColor radio buttons) the newly selected favoriteColor
*/
let favoriteColorRadios = document.querySelectorAll('[name=favoriteColor]');
let colorSelect = document.querySelector('[name=colors]');
let previousColor = colorSelect.value;
let favoriteColor = previousColor;

colorSelect.addEventListener('change', event => {
	favoriteColor = event.target.value;
	alert(`So you like ${favoriteColor} more than ${previousColor} now?`);
	previousColor = event.target.value;
	changeFavoriteColorsBG();
});

function changeFavoriteColorsBG () {
  document.body.style.backgroundColor = favoriteColor;
};

/*
9. Show/Hide Event
NOTE: Write unobtrusive Javascript
When user hovers over an employees name:
	Hide the name if shown.
	Show the name if hidden.
*/
let employees = document.getElementsByClassName('empName');
for (let employee of employees) {
	employee.style.opacity = '1';
	employee.addEventListener('mouseover', event => {
	  if (employee.style.opacity === '0') {
			employee.style.opacity = '1';
		} else {
			employee.style.opacity = '0';
		}
	});
}

/*
10. Current Time
Regarding this element:
	<h5 id="currentTime"></h5>
Show the current time in this element in this format: 9:05:23 AM
The time should be accurate to the second without having to reload the page.
*/
let currentTimeEle = document.getElementById('currentTime');

setInterval(() => {
	let today = new Date();
	currentTimeEle.innerText = today.toLocaleTimeString();
}, 1000);

/*
11. Delay
Regarding this element:
	<p id="helloWorld">Hello, World!</p>
Three seconds after a user clicks on this element, change the text to a random color.
*/
let helloWorldP = document.getElementById('helloWorld');
helloWorldP.addEventListener('click', event => {
  setTimeout(changeToRandomColor(helloWorldP), 3000);
});

function changeToRandomColor (ele) {
	return function() {
		ele.style.color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
	}
}

/*
12. Walk the DOM
Define function walkTheDOM(node, func)
This function should traverse every node in the DOM. Use recursion.
On each node, call func(node).
*/
let domToWalk = document.documentElement;
walkTheDOM(domToWalk, func);

function walkTheDOM(node, func) {
	if( node ) {
  	if (!node.hasChildNodes()) {
			if (node.nextSibling) {
		  	walkTheDOM(node.nextSibling,func);
			}
			return func(node);
		}

	if (node.nextSibling) {
		walkTheDOM(node.nextSibling, func);
	}

		walkTheDOM(node.firstChild,func);		
  }
}

function func(node) { 
	return function () {
	  console.log(`${node} has been visited!`);
	}
}