const http = require("http");
const PORT = 3003;
const getUsers = require("./modules/users");

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
  const name = url.searchParams.get("hello");
  const searchParams = url.searchParams;

  if (req.url === "/users") {
    res.status = 200;
    res.statusMessage = "OK";
    res.header = "Content-Type: application/json";
    res.write(getUsers());
    res.end();

    return;
  }

  if (name) {
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.setHeader("Content-Type", "text/html; charset=utf8");
    const name = url.searchParams.get("hello");
    res.write(`Hello, ${name}`);
    res.end();

    return;
  }

  if (name === "" || name === " ") {
    res.statusCode = 400;
    res.statusMessage = "Bad request";
    res.setHeader("Content-Type", "text/html; charset=utf8");
    const name = url.searchParams.get("hello");
    res.write(`Enter a name`);
    res.end();

    return;
  }

  if (![...searchParams].length) {
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.header = "Content-Type: text/plain";
    res.write("Hello, world!");
    res.end();
  }

  res.statusCode = 500;
  res.statusMessage = "Internal Server Error";
  res.end();
});

server.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://127.0.0.1:${PORT}`);
});