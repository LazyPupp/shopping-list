const state ={
	items:[]
};

//modify the state
//add function
function addItem(state, item){
	return state.items.push({item:item, completed:false});
}
//delete function
function deleteItem(){

}

//check
// function checkCompleted(state, element,item){
// 	state.items.find(el=>el===item).completed ? 
// }

//render state
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
//callback function
$(function(){
	addItemToList(state);
})