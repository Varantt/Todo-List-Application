import React, { useEffect } from "react";
import { useGlobalContext } from "../context";

export default function Form() {

  const {todoName, setTodoName, input, handleSubmit, editTodoItem , editItem} = useGlobalContext();
 
  useEffect(() => {
    if(editTodoItem){
      setTodoName(editTodoItem.text);
    }else{
      setTodoName("");
    }
  }, [setTodoName, editTodoItem]);
  return (
    <form action="" onSubmit={handleSubmit}>
      <input
        type="text"
        ref = {input}
        placeholder="Enter a todo.."
        className=""
        name="todo"
        value={todoName}
        onChange={(e) => setTodoName(e.target.value)}
        // required
      />
      <button className="btn-add" type="submit">
        {editTodoItem ? "Edit" : "Add"}
      </button>
      
    </form>
  );
}
