// src/index.ts
import { getTodos, getTodo, createTodo, updateTodo, deleteTodo } from "./route";

const app = Bun.serve({
  port: 3000,
  fetch: async (req: Request & { params?: { id: string } }) => { // Define the params property on the Request object
    const url = new URL(req.url);
    const method = req.method;
    const pathname = url.pathname;

    if (pathname === "/todos" && method === "GET") {
      return getTodos(req, new Response());
    } else if (pathname.startsWith("/todos/") && method === "GET") {
      req.params = { id: pathname.split("/")[2] };
      return getTodo(req, new Response());
    } else if (pathname === "/todos" && method === "POST") {
      return createTodo(req, new Response());
    } else if (pathname.startsWith("/todos/") && method === "PUT") {
      req.params = { id: pathname.split("/")[2] };
      return updateTodo(req, new Response());
    } else if (pathname.startsWith("/todos/") && method === "DELETE") {
      req.params = { id: pathname.split("/")[2] };
      return deleteTodo(req, new Response());
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log("Server running on http://localhost:3000");
