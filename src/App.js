import './App.css';
import { useEffect, useRef, useState } from 'react';
import TodoItem from './components/todoItem';

function App() {
  const [todoItems, setTodoItems] = useState(null);
  const textInput = useRef(null); 
  const [deletionTriggered, setDeletionTriggered] = useState(false);
    
  //When referesh or load event trigger below executes and fetchs the data from backend
  useEffect(() => {
      console.log("App Loaded");

      if(!todoItems || deletionTriggered){
        fetch('http://localhost:8080/todo')
          .then((response) => response.json())
          .then((todoList) => {
            console.log("Todo items list:", todoList);
            setTodoItems(todoList);
            setDeletionTriggered(false);
          });
        }
    }, [todoItems]);
    

  //This method adds a Item by making use of POST call with a JSON body
  function addNewTodoItem(){
    console.log(textInput.current.value);
    fetch(`http://localhost:8080/todo`,{
      method: 'POST',
      headers:{
          "content-type": "application/json",
      },
      body: JSON.stringify({ "task":  textInput.current.value }),
    })
      .then((response) => response.json())
      .then( (newTodoList) => {
          setTodoItems([...todoItems, newTodoList]);
      });
  };
  
  //This method is a handler to make sure deleted Item from TodoItem is updated in the parent .js file
  function handleDeletionOfTodo(item){
    const updatedList = todoItems.filter(
      (iterationItem) => iterationItem !== item.id
    );
    setTodoItems(updatedList);
    setDeletionTriggered(true);
  }


  return (

    <div style = {{ width : 800, height : 150, marginLeft : 100 }}>

      <h2  style = {{ marginLeft : 200}}> To Do List Demo </h2>
      
      <div>
        <input type="text" ref={textInput}  style = {{ marginLeft : 150}}/>
        <button style = {{ marginLeft : 10}} onClick={addNewTodoItem}> Add New Item</button>
        <hr/>
      </div>

      <div>
        <span style = {{ marginLeft : 10}}> Done </span>
        <span style = {{ marginLeft : 50}}> Task </span>
        <span style = {{ marginLeft : 100}}> Delete </span>
        <span style = {{ marginLeft : 75}}> Updated Time </span>
        <hr/>
      </div>

      <div>
          {todoItems 
            ? todoItems.map((todoItem) => {
              return (
                <TodoItem 
                  key={todoItem.id} 
                  data={todoItem} 
                  deleteItemProp={handleDeletionOfTodo}/>);
            })
          : "No Data ..."}

      </div>
    </div>
  );
}

export default App;
