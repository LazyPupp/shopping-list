const state ={
	items:[]
};

//modify the state
//add function
function addItem(state, item){
	if(!(findItem(state,item))){
		state.items.push({item:item, completed:false});
	}
	return state.items;
}
//delete function
function deleteItem(){

}

function checkItem(state,item,element){
	let isCompleted = findItem(state,item).completed;
	if(isCompleted===true) {
		element.removeClass('shopping-item__checked');
		isCompleted=false;
	} else {
		element.addClass('shopping-item__checked');
		isCompleted=true;
	}
}



//finds item
function findItem(state, item) {
	return state.items.find(element =>element.item.trim() === item.trim());
}

//check
// function checkCompleted(state, element,item){
// 	state.items.find(el=>el===item).completed ? 
// }

//render state
//adding class

/*function checkClass(element) {
	element.addClass('shopping-item_checked');
}

//removing the class
function uncheckClass(element){
	element.removeClass('shopping-item_checked');
}*/



//add
function renderList(state,element){
	const arr = state.items.map((el)=>
		`<li>
        	<span class="shopping-item">${el.item}</span>
        	<div class="shopping-item-controls">
          		<button class="shopping-item-toggle">
            		<span class="button-label">check</span>
          		</button>
          		<button class="shopping-item-delete">
            		<span class="button-label">delete</span>
          		</button>
        	</div>
      	</li>`);
	element.html(arr);
}

//event listeners
function addItemToList(state){
	$("#js-shopping-list-form").on('submit',function(event){
	 	event.preventDefault();
	 	addItem(state,$("#shopping-list-entry").val());
	 	renderList(state,$(".shopping-list"));
	});

}
function checkingList(state){
	$('.shopping-list').on('click', '.shopping-item-toggle .button-label', function(event){
		event.stopPropagation();
		const item = $(this).closest('li').find('.shopping-item');
		checkItem(state,item.text(),item);
	});
}
//callback function
$(function(){
	addItemToList(state);
	checkingList(state);
});