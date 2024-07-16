# Node Todo Project 

### To start the project run
First install the dependencies
```bash
npm install
```
Then start the project
```bash
npm start
```

### To check the working of the project
In this case we are using terminal instead of postman or any other API testing tool

#### To add a todo
```bash
curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d '{"title": "Sample todo"}'
```

#### To get all the todos
```bash
curl http://localhost:3000/todos
```

#### To update a todo
```bash
curl -X PUT http://localhost:3000/todos/1 -H "Content-Type: application/json" -d '{"title": "Updated todo", "completed": 1}'
```

#### To delete a todo
```bash
curl -X DELETE http://localhost:3000/todos/1
```