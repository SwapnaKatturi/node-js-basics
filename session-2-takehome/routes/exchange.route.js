const express = require("express");
const {
  getCurrencies,
  convertCurrency,
} = require("../controllers/exchange.controller");
const router = express.Router();

router.get("/currencies", getCurrencies);
router.get("/convert", convertCurrency);

module.exports = router;
