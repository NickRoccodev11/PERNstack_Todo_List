import { useEffect, useState } from 'react'
import EditTodo from './EditTodo';

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  //delete func
  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/todos/${id}`, {
        method: "DELETE"
      })
     setTodos(todos.filter(todo=> todo.todo_id !== id))
    } catch (err) {
      console.log("error in deleteTodos", err.message)
    }
  }

  const getTodos = async () => {
    try {
      const res = await fetch("http://localhost:8000/todos");
      const jsonData = await res.json();
      setTodos(jsonData);
    } catch (err) {
      console.log("error fetching all todos", err.message)
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>description</th>
            <th>Edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td><EditTodo todo={todo}/></td>
              <td>
                <button
                  onClick={() => deleteTodo(todo.todo_id)}
                  className='btn btn-danger'
                >Delete</button>
              </td>
            </tr>
          )
          )}
        </tbody>
      </table>
    </>
  )
}

export default ListTodos