import React, { useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { GrCompliance } from "react-icons/gr";
import { useGlobalContext } from "../context";

export default function TodoItems() {
  const { todoItems, removeItem, editItem, editTodoItem, handleComplete } =
    useGlobalContext();

  const sortedArrayCompleted = [
    ...todoItems.filter((todoItem) => !todoItem.completed),
    ...todoItems.filter((todoItem) => todoItem.completed),
  ];
  return (
    <>
      {sortedArrayCompleted.map((todoItem) => {
        const { id, text, completed } = todoItem;
        return (
          <div
            className={`todo-item ${
              editTodoItem && id === editTodoItem.id && "edited-item"
            } ${completed && "complete"} `}
            key={id}
          >
            <p>{text}</p>
            <div>
              <button
                className="complete-btn"
                onClick={() => handleComplete(id)}
              >
                <GrCompliance />
              </button>
              <button className="edit-btn" onClick={() => editItem(id)}>
                <AiFillEdit />
              </button>
              <button className="remove-btn" onClick={() => removeItem(id)}>
                <BsFillTrashFill />
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
