import React, { useState } from "react";

export default function InputTodo() {
  const [text, setText] = useState("");
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description: text };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <div>
      <h1 className="text-center mt-5">Pern To Do</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control "
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </div>
  );
}
