import React, { useEffect, useState } from "react";

const TodoItem = (props) => {
    const [todoItem, setTodoItem] = useState(props.data);
    const [isTriggered, setTriggered] = useState(false);
    const { deleteItemProp } = props;

    //updateTask event handler
    useEffect(()=>{
        if(isTriggered){
            fetch(`http://localhost:8080/todo/${todoItem.id}`,{
                method: 'PUT',
                headers:{
                    "content-type": "application/json",
                },
                body: JSON.stringify(todoItem),
            })
            .then((response) => response.json())
            .then( (data) => {
                setTriggered(false);
                setTodoItem(data);
            });
            console.log(" To Do Value Changed: ",todoItem);
        }
    },[todoItem,isTriggered])

    //When any change event triggeres in the text box call for update using PUT method is trigered
    function updateTask(e){
        setTriggered(true);
        setTodoItem({...todoItem, task : e.target.value});
    }


    //When clicket on delete button deletion of item using DELETE method is trigered
    function deletedTodo(){
        fetch(`http://localhost:8080/todo/${todoItem.id}`,{
            method: 'DELETE',
            headers:{
                "content-type": "application/json",
            },
        })
        deleteItemProp(todoItem);
        console.log(" Deleting the following to do Value: ",todoItem);
    }


    return(
        <div>
            <input 
            type="checkbox" 
            style = {{ width : 50}}
            checked={todoItem.done}  
            onChange={() => {
                setTriggered(true);
                setTodoItem({ ...todoItem, done: !todoItem.done });
            }} 
            /> 
            
            {todoItem.done ?(
                <strike>{todoItem.task}</strike>
            ):(
                <input type="text" value={todoItem.task} onChange={updateTask}/>
            )}

            <input 
                type="button" 
                onClick={deletedTodo} 
                style = {{ marginLeft : 20}} 
                value="X"/>

            <span style = {{ marginLeft : 50}}> {todoItem.updateDate} </span>
 
      </div>

    );

};

export default TodoItem;