import React from "react";

const TodoItem = ({
  id,
  title,
  description,
  isCompleted,
  Update,
  Delete,
  isLoading,
}) => {
  return (
    <div>
      <label>
        <span>{title}</span>
        {description && <span>{description}</span>}
      </label>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => Update(id)}
      ></input>
      <button disabled={isLoading} onClick={() => Delete(id)}>
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
