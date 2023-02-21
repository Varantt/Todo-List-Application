import React, { useRef, useState } from "react";
import Form from "./Form";
import TodoItems from "./TodoItems";
import { useGlobalContext } from "../context";

export default function Box() {
  const { todoName, setTodoName } = useGlobalContext();

  return (
    <section className="">
      <div className="container">
        <div className="box-container">
          <div className="input-line">
            <Form />
          </div>

          <div className="todo-items">
            <TodoItems />
          </div>
        </div>
      </div>
    </section>
  );
}
