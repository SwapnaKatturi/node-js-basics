const express = require("express");
const app = express();
const homeRouter = require("./Routers/HomeRouter");
const userActivityRouter = require("./Routers/UserActivityRouter");
const passwordAuthMiddleware = require("./Middleware/PasswordAuthMiddleware");
const PORT = 8089;

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});

app.use("/", homeRouter);

app.get("/contact", (req, res, next) => {
  res.send("Contact Page: Welcome to contact page");
});

app.use("/api/v1/users", passwordAuthMiddleware, userActivityRouter);
