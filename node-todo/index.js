const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create a new todo
app.post('/todos', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).send('Title is required');
  }
  const sql = 'INSERT INTO todos (title) VALUES (?)';
  db.run(sql, [title], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, title, completed: 0 });
  });
});

// Read all todos
app.get('/todos', (req, res) => {
  const sql = 'SELECT * FROM todos';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Update a todo
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const sql = 'UPDATE todos SET title = ?, completed = ? WHERE id = ?';
  db.run(sql, [title, completed, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).send('Todo not found');
    }
    res.json({ id, title, completed });
  });
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM todos WHERE id = ?';
  db.run(sql, id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).send('Todo not found');
    }
    res.status(204).send();
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
