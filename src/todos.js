/*
 * @author Ed Salter
*/
function Todos(config){
  _list = [];

  var domListCount,
   domAddNewItemButton,
   domNewToDoText,
   domContainer;

    var addTodo = function (value) {
      _list.push(value);

      return _list;
    };

    var addTodoDOM = function (value) {
      var li = document.createElement("li");
      li.innerHTML = value + " ";

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
      domContainer.appendChild( li ).appendChild( removeButton );

      domNewToDoText.focus();
    };

    var removeTodo = function (element) {
      //remove this todo from todos
      _list.splice(_list.indexOf(element.innerHTML), 1);
      
      return _list;
    };

    var removeTodoDOM = function (element) {
      //remove observer
      element.removeObserver( domListCount );
      element.onclick = null;

      //delete from DOM
      element.parentNode.remove();

      domNewToDoText.focus();
    };


  return {
    init: function () {
      //get our dom elements from config
      domListCount = config.domListCount;
      domAddNewItemButton = config.domAddNewItemButton;
      domNewToDoText = config.domNewToDoText;
      domContainer = config.domContainer;

      // Extend button with subject to allow it to be watched
      extend( new Subject(), domAddNewItemButton ); 

      //on click for the add todo button, takes the input text as name
      domAddNewItemButton.onclick = function(){
        if(domNewToDoText.value){
          domAddNewItemButton.notify({
            action:"add", 
            value: domNewToDoText.value 
          });
        }
        else {
          //set focus back to input as no value in input
          domNewToDoText.focus();
        }

      };

      //Create an obsever for our todo list counter
      extend( new Observer(), domListCount );
      domAddNewItemButton.addObserver( domListCount );

      //Implement change handler for observer
      domListCount.update = function( e ){
        if(e.action==="add"){
          addTodo(e.value);
          addTodoDOM(e.value);
        } 
        else if (e.action==="remove") {
          removeTodo(e.element);
          removeTodoDOM(e.element);
        }

        domListCount.innerHTML = _list.length;
      };
    },

    getTodos: function () {
      return _list;
    }
  }
};
