import React from "react";
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

const mockData = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: "et porro tempora",
    completed: true,
  },
  {
    userId: 1,
    id: 5,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    completed: false,
  },
];

function TodoList() {
  const [data, setData] = useState([]);
  const [openedTodo, setOpenedTodo] = useState(null);

  useEffect(() => {
    //   const fetchApi = async () => {
    //     const response = await axios.get('http://127.0.0.1:8000/api/joinsession')
    //     const data = await response.data
    //     setApi(data)
    // }
    // fetchApi()
    setData(mockData);
  }, []);

  console.log(data);
  return (
    <div>
      {data.map((item) => (
        <>
          <ul>
            <li>Title: {item.title}</li>
            <li>Completed: {item.completed.toString()}</li>
          </ul>
          <button onClick={() => {
            setOpenedTodo(item)
          }}>Open</button>
        </>
      ))}

      <hr />
      <h3>Opened todo</h3>
      {
        openedTodo && <TodoItem item={openedTodo}/>
      }
    </div>
  );
}

export default TodoList;
