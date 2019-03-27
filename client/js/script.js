var STItem = JSON.parse(localStorage.getItem("todoList"))

var delStorage = false;

if(STItem == null) {
	var counter = 0;
	var listOftext = [];
} else {
	var counter = STItem.length;
	var listOftext = STItem;
}

var text;

getId = document.getElementById("newTodoList"); 


function welcome() {

		var getWelId = document.getElementById("welcome"); 
		if(localStorage.getItem("name") === null) {
			localStorage.setItem("name", "Santosh");
			getName = "Welcome "+ localStorage.getItem("name");
			getWelId.innerHTML = getName;
		} else {
			getNameBack = "Welcome back " + localStorage.getItem("name");
			getWelId.innerHTML = getNameBack;
		}

}
	

function clearFocus(){
	getId.focus();
	getId.value = "";
}
clearFocus();

function listTodo(ele){
	if(event.keyCode == 13) {

		var id = "item_"+counter;
		var data = getId.value;
		text = "<tr id='item_"+counter+"'><td><input type='checkbox' name='checkme' id='chk_"+counter+"' onclick=\"checkMe('"+counter+"')\"> </td><td><span class='todotextclass' id='todoText_"+counter+"'>"+data+"</span> </td><td><p data-placement=\"top\" onclick=\"editTodo("+counter+")\" data-toggle=\"tooltip\" title=\"Edit\"><button class=\"btn btn-primary btn-xs\" data-title=\"Edit\" data-toggle=\"modal\" data-target=\"#edit\" ><span class=\"glyphicon glyphicon-pencil\"></span></button></p></td><td><p><button class=\"btn btn-danger btn-xs\"  onclick=\"removeTodoList('item_"+counter+"')\" data-title=\"Delete\" data-toggle=\"modal\" data-target=\"#delete\" ><span class=\"glyphicon glyphicon-trash\"></span></button></p></td></tr>";
		document.getElementById("listNewTodo").getElementsByTagName("tbody")[0].innerHTML += text;
		// var add = new addToArray("todoText"+counter,data);
		// querySelect(counter);
		listOftext.push({id : "todoText_"+counter, todoText: data});
		counter++;
		console.log(listOftext);
		localStorage.setItem("todoList", JSON.stringify(listOftext));
		clearFocus();
		// getLocalstorageArray();
	}

}

function getLocalstorageArray(){
	
		var text;
		
		// var storedArray = [];
		var storedArray = JSON.parse(localStorage.getItem("todoList"));
	
		if(storedArray == null) {
			return false;
		}

		console.log(storedArray);
		text = "";
		for(var i=0; i<storedArray.length; i++){
			var storage_id = storedArray[i].id.split("_")[1];
			console.log(storedArray.length);
			text += "<tr id='item_"+storage_id+"'><td><input type='checkbox' name='checkme' id='chk_"+storage_id+"' onclick=\"checkMe('"+storage_id+"')\"> </td><td><span class='todotextclass' id='todoText_"+storage_id+"'>"+storedArray[i].todoText+"</span> </td><td><p data-placement=\"top\" onclick=\"editTodo("+storage_id+")\" data-toggle=\"tooltip\" title=\"Edit\"><button class=\"btn btn-primary btn-xs\" data-title=\"Edit\" data-toggle=\"modal\" data-target=\"#edit\" ><span class=\"glyphicon glyphicon-pencil\"></span></button></p></td><td><p><button class=\"btn btn-danger btn-xs\"  onclick=\"removeTodoList('item_"+storage_id+"')\" data-title=\"Delete\" data-toggle=\"modal\" data-target=\"#delete\" ><span class=\"glyphicon glyphicon-trash\"></span></button></p></td></tr>";
		}
		document.getElementsByTagName("tbody")[0].innerHTML += text;
}

getLocalstorageArray();

	function checkMe(item) {
		var chkbtn = document.getElementById("chk_"+item);

		if(chkbtn.checked == true ) {
			console.log("checked");
			document.getElementById("item_"+item).style.background = "blue";
		} else {
			console.log("not checked");
			document.getElementById("item_"+item).style.background = "";			
		}
	}

function editTodo(item){
	var targetId = document.getElementById("todoText_"+item) 
	var getText = targetId.textContent;
	console.log(getText);

	var input = document.createElement('input');
	input.setAttribute("type","text");
	input.setAttribute("name","editText");
	input.setAttribute("id", "editText_"+item);
	input.setAttribute("value", getText);
	input.setAttribute("onkeydown", "getEditUpdateText("+item+",this)");
	targetId.innerHTML= "";
	document.getElementById("todoText_"+item).appendChild(input).select();


}

function getEditUpdateText(item,ele){
	if(event.keyCode == 13) {
		var targetId = document.getElementById("todoText_"+item) 
		var todoUpdateText  = ele.value;    
		targetId.innerHTML= todoUpdateText;		
		manipulateStorage(item, todoUpdateText);




    }
}

function manipulateStorage(item, todoUpdateText){
		var storageData = JSON.parse(localStorage.getItem("todoList"))
		for(var i=0; i<storageData.length; i++){ 
			if(storageData[i].id == "todoText_"+item) { 
				if(delStorage == false) {
					storageData[i].todoText = todoUpdateText;
				} else {
					var indeexData  = storageData.indexOf(storageData[i])
					storageData.splice(indeexData,1)
					delStorage = false;
				}
			} 
		}

		localStorage.setItem("todoList", JSON.stringify(storageData))

}

function removeTodoList(item){
	var item_id = item.split("_")[1];
	var html = document.getElementById(item).outerHTML  = "";
	delStorage = true;
	manipulateStorage(item_id);
}



