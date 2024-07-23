import { Hono } from 'hono'

const app = new Hono()

const todos = [
  { id: 1, title: 'Learn Hono', completed: false },
  { id: 2, title: 'Learn TypeScript', completed: false },
  { id: 3, title: 'Learn React', completed: false },
];

app.get('/todos', (c) => {
  return c.json(todos)
})

app.post('/todos', (c) => {
  const { id, title, completed } = c.req.param() as { id: number, title: string, completed: boolean };
  const todo = { id, title, completed }
  todos.push(todo)
  return c.json(todo)
})

app.put('/todos/:id', (c) => {
  const id = Number(c.req.param("id"))
  const todo = todos.find((todo) => todo.id === id)
  if (!todo) {
    return c.json({ message: 'Todo not found' }, 200)
  }
  Object.assign(todo, c.body)
  return c.json(todo)
})


app.delete('/todos/:id', (c) => {
  const id = Number(c.req.param("id"))
  const index = todos.findIndex((todo) => todo.id === id)
  if (index === -1) {
    return c.json({ message: 'Todo not found' }, 404)
  }
  todos.splice(index, 1)
  return c.json({}, 204)
})

export default {  
  port: 3000, 
  fetch: app.fetch, 
} 
