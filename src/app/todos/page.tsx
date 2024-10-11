"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Todo = {
  id: string;
  title: string;
  contents: string;
  isDone: boolean;
};

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("http://localhost:4000/todos");
      const data = await res.json();
      console.log("data", data);
      setTodos(data);
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    const newTodo = {
      title,
      contents,
      isDone: false,
    };
    await axios.post("http://localhost:4000/todos", newTodo);
  };

  const handleDelete = (id: stirng) => {
    axios.delete(`http://localhost:4000/todos/${id}`);
  };

  const handleUpdate = (id: stirng) => {
    const todoUpdate = todos.find((todo) => todo.id === id);

    const updateTodo = {
      isDone: !todoUpdate?.isDone,
    };
    axios.patch(`http://localhost:4000/todos/${id}`, updateTodo);
  };

  return (
    <div>
      <div className="mb-4">
        제목
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        내용
        <input
          type="text"
          onChange={(e) => {
            setContents(e.target.value);
          }}
        />
        <button onClick={addTodo}>추가하기</button>
      </div>
      <div>
        <div>진행 중</div>
        {todos
          ?.filter((todo) => todo.isDone === false)
          .map((todo) => (
            <div key={todo.id}>
              <p>{todo.title}</p>
              <p>{todo.contents}</p>
              <button onClick={() => handleUpdate(todo.id)}>
                {todo.isDone ? "삭제" : "완료"}
              </button>
              <button onClick={() => handleDelete(todo.id)}>삭제</button>
            </div>
          ))}

        <div>완료</div>
        {todos
          ?.filter((todo) => todo.isDone !== false)
          .map((todo) => (
            <div key={todo.id}>
              <p>{todo.title}</p>
              <p>{todo.contents}</p>
              <button onClick={() => handleUpdate(todo.id)}>
                {todo.isDone ? "취소" : "완료"}
              </button>
              <button onClick={() => handleDelete(todo.id)}>삭제</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TodoPage;
