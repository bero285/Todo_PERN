import React, { useState } from "react";

export default function EditTodo({ item, id }) {
  const [changeText, setChangeText] = useState(item.description);
  const editTextFunc = async () => {
    try {
      const respose = await fetch(
        `http://localhost:5000/todos/${item.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description: changeText }),
        }
      );

      window.location = "/";
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <div>
      <div className="container mt-3">
        <button
          type="button"
          className="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target={`#editModal-${id}`}
        >
          Edit
        </button>
      </div>

      <div className="modal" id={`editModal-${id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={changeText}
                onChange={(e) => setChangeText(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="modal"
                onClick={() => editTextFunc()}
              >
                edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
