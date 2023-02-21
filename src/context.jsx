import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

const NewContext = createContext();

export const Provider = ({ children }) => {

  const initialState = (() => {
    try {
      return JSON.parse(localStorage.getItem("todoItems")) || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  const [todoName, setTodoName] = useState("");
  const [todoItems, setTodoItems] = useState(initialState);
  const [editTodoItem, setEditTodoItem] = useState(null);
  const input = useRef(null);

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
  }, [todoItems]);


  const updateTodo = (title, editId, editCompleted) => {
    const newEditedItems = todoItems.map((todoItem) => {
      return todoItem.id === editId
        ? { text: title, id: editId, completed: editCompleted }
        : todoItem;
    });
    setTodoItems(newEditedItems);
    setEditTodoItem(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editTodoItem) {
      setTodoItems((items) => {
        return [...items, { id: uuidv4(), text: todoName, completed: false }];
      });
    } else {
      updateTodo(todoName, editTodoItem.id, editTodoItem.completed);
    }
    input.current.focus();

    setTodoName("");
  };

  const removeItem = (id) => {
    const newItems = todoItems.filter((todoItem) => todoItem.id !== id);

    setTodoItems(newItems);
  };

  const editItem = (id) => {
    input.current.focus();

    const editedItem = todoItems.find((todoItem) => {
      return todoItem.id === id;
    });

    setEditTodoItem(editedItem);
  };

  const handleComplete = (id) => {
    const newArray = todoItems.map((todoItem) => {
      if (todoItem.id === id) {
        return { ...todoItem, completed: !todoItem.completed };
      }

      return todoItem;
    });

    setTodoItems(newArray);
  };

  return (
    <NewContext.Provider
      value={{
        handleSubmit,
        editItem,
        removeItem,
        todoName,
        setTodoName,
        todoItems,
        input,
        handleComplete,
        updateTodo,
        editTodoItem,
      }}
    >
      {children}
    </NewContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(NewContext);

  if (!context) {
    throw new Error("useGlobalContext must be used within a global provider");
  }

  return context;
};
