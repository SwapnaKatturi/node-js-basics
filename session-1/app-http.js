const { error } = require("console");
const http = require("http");

const port = 8081;

// http
//   .createServer((req, res) => {
//     const { method, url } = req;
//     if (url == "/home") {
//       if (method == "GET") {
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.write("<h1>Hello World from Node.JS</h1>");
//         res.write("<p> Created by: Swapna </p>");
//       } else {
//         res.writeHead(501);
//       }
//     } else {
//       res.writeHead(404);
//     }
//     res.end();
//   })
//   .listen(port, () => {
//     console.log(`Node js server started at port ${port}`);
//   });

let todoList = ["Complete Node Byte", "Play Cricket"];

http
  .createServer((req, res) => {
    const { method, url } = req;
    if (url == "/todos") {
      if (method == "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });

        res.write(JSON.stringify(todoList));
        res.end();
      } else if (method == "POST") {
        let body = "";
        req
          .on("error", (error) => {
            console.error(error);
            res.writeHead(500);
            res.end();
          })
          .on("data", (chunk) => {
            body += chunk;
          })
          .on("end", () => {
            try {
              body = JSON.parse(body);
              if (body.name) {
                todoList.push(body.name);
                res.writeHead(201, { "Content-Type": "application/json" });
                res.write(
                  JSON.stringify({
                    message: "Todo added successfully",
                    todoList,
                  }),
                );
              } else {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.write(
                  JSON.stringify({ error: "Missing 'name' in request body" }),
                );
              }
            } catch (err) {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.write(JSON.stringify({ error: "Invalid JSON format" }));
            }
            res.end();
          });
      } else if (method == "DELETE") {
        let body = "";
        req
          .on("error", (err) => {
            console.error(err);
            res.writeHead(500);
            res.end();
          })
          .on("data", (chunk) => {
            body += chunk;
          })
          .on("end", () => {
            try {
              body = JSON.parse(body);
              const deleteTodo = body.name;

              // Filter out the item to delete
              todoList = todoList.filter((item) => item !== deleteTodo);

              res.writeHead(200, { "Content-Type": "application/json" });
              res.write(
                JSON.stringify({
                  message: "Todo deleted successfully",
                  todoList,
                }),
              );
            } catch (err) {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.write(JSON.stringify({ error: "Invalid JSON format" }));
            }
            res.end();
          });
      } else {
        res.writeHead(405, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ error: "Method Not Allowed" }));
        res.end();
      }
    }

    // --- 404 NOT FOUND ---
    else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ error: "Route Not Found" }));
      res.end();
    }
  })
  .listen(port, () => {
    console.log(`Node js is running on port ${port}`);
  });
