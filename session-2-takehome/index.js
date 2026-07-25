const express = require("express");
const exchangeRoutes = require("./routes/exchange.route");
const app = express();
const PORT = 8081;

app.use(express.json());

app.use("/exchange", exchangeRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
