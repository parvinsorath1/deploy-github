import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage on app load
  useEffect(() => { // useEffect: Runs when the app loads (like "componentDidMount").
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]"); //localStorage.getItem("todos"): Fetches saved todos. Agar first time aap open hui h to no data []    ddd
    setTodos(storedTodos); //JSON.parse: Converts the saved string back into an array.
  }, []);

  // Save todos to localStorage whenever todos state changes
  const saveToLS = (updatedTodos) => { //localStorage.setItem: Saves data in the browser.
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); //JSON.stringify(updatedTodos): Converts the array into a string (localStorage only stores strings).
  };

  // Add a new todo
  const handleAdd = () => {
    if (todo.trim()) {  //.trim() removes extra spaces.  empty todo not allowed...
      const updatedTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }]; //...todos: Keeps all existing todos., [...todos: Keeps all existing todos.
      setTodos(updatedTodos); //Updates the todos state with the new list (including the new task).
      saveToLS(updatedTodos); // Save to localStorage
      setTodo(""); // Clear input
    }
  };

  // Delete a todo
  const handleDelete = (id) => { //(id) is the id of todo we want to delete
    const updatedTodos = todos.filter((item) => item.id !== id); // sabhi todos ma sa vo todo filter kar lo jis ki id given id sa match nhi karti.
    setTodos(updatedTodos); //Updates the todos state with the filtered list.
    saveToLS(updatedTodos); // Save updated list to localStorage
  };

  // Edit a todo
  const handleEdit = (id) => { //(id): The id of the todo you want to edit.
    const taskToEdit = todos.find((item) => item.id === id); //find: Finds the first todo where item.id matches the given id.
    setTodo(taskToEdit.todo); //Puts the todo text into the input box for editing.
    handleDelete(id); // Remove task while editing
  };

  // Mark todo as completed/uncompleted
  const handleCheckbox = (id) => { //(id): The id of the todo you clicked.
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
    saveToLS(updatedTodos); // Save changes
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
        <h1 className="font-bold text-center text-3xl">
          iTask - Manage your todos at one place
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a Todo</h2>
          <div className="flex">
            <input
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
              type="text"
              className="w-full rounded-full px-5 py-1"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white"
            >
              Save
            </button>
          </div>
        </div>
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <h2 className="text-2xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((item) => (
            <div key={item.id} className={"todo flex my-3 justify-between"}>
              <div className="flex gap-5">
                <input
                  onChange={() => handleCheckbox(item.id)}
                  type="checkbox"
                  checked={item.isCompleted}
                />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
              </div>
              <div className="buttons flex h-full">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
