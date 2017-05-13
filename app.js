const state ={
	items:[]
};

//modify the state
//add function
function addItem(state, item){
	if(!(findItem(state,item))){
		state.items.push({item:item.toLowerCase(), completed:false});
	}
	return state.items;
}
//delete function
function deleteItem(state,item){
	//checks if the element ur deleting is in array

	if(findItemIndex(state,item) !== -1 ){
		state.items.splice(findItemIndex(state,item),1);
	}
	//return new array after deletion
	//console.log(state.items.splice(findItemIndex(state,item),1));
	return state.items;
}

function checkItem(state,item){
	let itemFinder = findItem(state,item);
	if(itemFinder.completed){
		itemFinder.completed=false;
	} else {
		itemFinder.completed=true;
	}
	return itemFinder.completed;
}
//find item index
function findItemIndex(state, item){
	return state.items.findIndex(element =>element.item.trim() === item.trim());
}

//TEST
// state.items.push({item:'stupido',completed:true},{item:'lol',completed:false});
// console.log("what"+findItemIndex(state,'lol'));
// console.log("ji"+state.items);
// console.log("splice"+state.items.splice(findItemIndex(state,'lol'),1));
// console.log("deleteItem"+ deleteItem(state,'stupido'));
// console.log("items"+state.items);
//finds item
function findItem(state, item) {
	return state.items.find(element =>element.item.trim().toLowerCase() === item.trim().toLowerCase());
}

//render state
//adding class and remove class

function addRemCheck(state,item,element){
	if(checkItem(state,item)) {
		element.addClass('shopping-item__checked');
	
	} else {
		element.removeClass('shopping-item__checked');
	}
}

// function searchedItem(state, input, element) {
//   element.removeClass('hidden');
// //   state.items.forEach(el => {
// // 	  if(!el.item.includes(input)) {
// // 	// if(!element.text().includes(input)) {
// // 	  element.addClass('hidden');
// // 	}
// //   });
// //   if() {

// //   }
// }


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


//delete
function renderDelete(state,element){
	element.remove();
}
//event listeners
function addItemToList(state){
	$("#js-shopping-list-form").on('submit',function(event){
	 	event.preventDefault(); 
	 	addItem(state,$("#shopping-list-entry").val());
	 	renderList(state,$(".shopping-list"));
		$('#shopping-list-entry').val('');
	});

}
function checkingList(state){
	$('.shopping-list').on('click', '.shopping-item-toggle .button-label', function(event){
		event.stopPropagation();
		const item = $(this).closest('li').find('.shopping-item');
		addRemCheck(state,item.text(),item);
	});
}
function deleteItemFromList(state){
	$('.shopping-list').on('click','.shopping-item-delete .button-label', function(event){
		event.stopPropagation();
		const list = $(this).closest('li');
		deleteItem(state,list.find('.shopping-item').text());
		renderDelete(state,list);
	});
}

function showHideChecked(state) {
	$('.show-hide').click(function(event) {
	  event.preventDefault();
	  $('.shopping-item__checked').closest('li').toggleClass('hidden');
	});
}

function searchForItem(state) {
  $('#js-shopping-list-form').on('click', '.search-item', function(event) {
	  event.preventDefault();
	  $('.shopping-list li').filter(function() {
		 console.log($('.shopping-item').toArray());
		//  .includes($('#shopping-list-query').val()));
	  });
  });
}


//callback function
$(function(){
	addItemToList(state);
	checkingList(state);
	deleteItemFromList(state);
	showHideChecked(state);
	searchForItem(state);
	console.log(state.items);
});