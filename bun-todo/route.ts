// src/routes.ts
import db from "./database";

export const getTodos = (_req: Request, res: Response) => {
  const todos = db.query("SELECT * FROM todos").all();
  res.json(todos);
};

export const getTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = db.query("SELECT * FROM todos WHERE id = ?").get(id);

  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }

  res.json(todo);
};

export const createTodo = async (req: Request, res: Response) => {
  const { title } = await req.json();
  db.run("INSERT INTO todos (title) VALUES (?)", [title]);
  res.status(201).json({ message: "Todo created" });
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = await req.json();

  db.run("UPDATE todos SET title = ?, completed = ? WHERE id = ?", [
    title,
    completed,
    id,
  ]);

  res.json({ message: "Todo updated" });
};

export const deleteTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  db.run("DELETE FROM todos WHERE id = ?", [id]);

  res.json({ message: "Todo deleted" });
};
