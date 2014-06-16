(function(){
  //reference dom elements
  var domListCount = document.getElementById( "listCount" ),
    domAddNewItemButton = document.getElementById( "addNewItem" ),
    domNewToDoText = document.getElementById( "newToDoText" ),
    domContainer = document.getElementById( "todoList" );


  var myTodo = new Todos({
    domListCount: domListCount,
    domAddNewItemButton: domAddNewItemButton,
    domNewToDoText: domNewToDoText,
    domContainer: domContainer
  }); 

  myTodo.init();

})();