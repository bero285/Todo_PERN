import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";
export default function ListTodo() {
  const [data, setData] = useState([]);

  const getTodos = async () => {
    const result = await fetch("http://localhost:5000/todos");
    const todoData = await result.json();
    setData(todoData);
  };
  useEffect(() => {
    getTodos();
  }, []);
  const deleteTodo = async (id) => {
    try {
      const delTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      setData(data.filter((item) => item.todo_id !== id));
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <div>
      <table className="table mt-5 text-center">
        <thead>
          {data?.map((item, index) => {
            return (
              <tr key={index}>
                <th>{item.description}</th>
                <th>
                  <EditTodo item={item} id={item.todo_id} />
                </th>
                <th>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(item.todo_id)}
                  >
                    delete
                  </button>
                </th>
              </tr>
            );
          })}
        </thead>
      </table>
    </div>
  );
}
