
 
function Todos(){
  var list = [];
  var todos = {};

  // References to our DOM elements
  var domListCount = document.getElementById( "listCount" ),
    domAddNewItemButton = document.getElementById( "addNewItem" ),
    domNewToDoText = document.getElementById( "newToDoText" ),
    domContainer = document.getElementById( "todoList" );

  todos.removeTodo = function (element) {
    //remove this todo from todos
    list.splice(list.indexOf(element.innerHTML), 1);

    //remove observer
    element.removeObserver( domListCount );
    element.onclick = null;

    //delete from DOM
    element.parentNode.remove();

    domNewToDoText.focus();
    return list;
  };

  todos.addTodo = function (value) {
    list.push(value);

    var tododomContainer = document.createElement("li");
    tododomContainer.innerHTML = value + " ";

    var removeButton = document.createElement("button");
    removeButton.innerHTML = "Delete";

    domNewToDoText.value = "";

    extend( new Subject(), removeButton ); 

    //allow our count to observe changes on the button
    removeButton.addObserver( domListCount );

    removeButton.onclick = function(){
     removeButton.notify( {
      action:"remove", 
      element: removeButton
     });   
    };

    //append the new elements to do the DOM
    domContainer.appendChild( tododomContainer ).appendChild( removeButton );

    domNewToDoText.focus();
    return list;
  };


  // Extend button with subject to allow it to be watched
  extend( new Subject(), domAddNewItemButton ); 

  domAddNewItemButton.onclick = function(){
    if(domNewToDoText.value){
      domAddNewItemButton.notify({
        action:"add", 
        value: domNewToDoText.value 
      });
    }
    else {
      domNewToDoText.focus();
    }

    return list;
  };

    //Create an obsever for our todo list counter
  extend( new Observer(), domListCount );
  domAddNewItemButton.addObserver( domListCount );

  //Implement change handler for observer
  domListCount.update = function( e ){
    if(e.action==="add"){
      todos.addTodo(e.value);
    } 
    else if (e.action==="remove") {
      todos.removeTodo(e.element);
    }

    domListCount.innerHTML = list.length;
    return list;
  };

  return todos;
}



var myTodo = new Todos();