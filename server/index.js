const log = console.log
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();
let PORT = 8000

//middleware
app.use(cors());
app.use(express.json())

//routes!
//create todo
app.post('/todos', async (req, res) => {
  try {

    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows);

  } catch (err) {
    log("error! in post method", err.message)
  }
})
//get all todos
app.get('/todos', async (req, res) => {
  const allTodos = await pool.query("SELECT * FROM todo");
  res.json(allTodos.rows)
})
//get a todo
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id])
    res.json(todo.rows[0]);
  } catch (err) {
    log("error in get single todo request", err.message)
  }
})

//edit a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodos = await pool.query("UPDATE todo SET description = $1 WHERE todo_id =$2 ", [description, id]);
    res.json("todo updated!")
  } catch (err) {
    log("error on put route", err.message)
  }
})
//delete a todo
app.delete('/todos/:id', async (req,res)=>{
  try {
    const {id} = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id =$1", [id])
    res.json("todo deleted!")
  } catch (err) {
    log("error on delete route", err.message)
  }
})

app.listen(PORT, () => {
  log("server running on " + PORT)
})