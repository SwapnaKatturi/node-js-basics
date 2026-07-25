const axios = require("axios");

const getCurrencies = async (req, res) => {
  try {
    const response = await axios.get("https://open.er-api.com/v6/latest");
    const rates = response.data.rates;

    const currencies = Object.keys(rates);
    return res.status(200).json({ data: currencies });
  } catch (err) {
    return res.status(500).json({
      message: "The server is currently down. Please check again later",
    });
  }
};

const convertCurrency = async (req, res) => {
  try {
    const { value, currency, to_currency } = req.query;
    const numericValue = Number(value);

    if (value == undefined || isNaN(numericValue) || numericValue < 0) {
      return res
        .status(400)
        .json({ message: "Incomplete or incorrect data passed" });
    }

    if (
      !currency ||
      typeof currency != "string" ||
      currency.trim().length !== 3 ||
      !to_currency ||
      typeof to_currency != "string" ||
      to_currency.trim().length !== 3
    ) {
      return res
        .status(400)
        .json({ message: "Incomplete or incorrect data is passed" });
    }

    const baseCurrency = currency.toUpperCase().trim();
    const targetCurrency = to_currency.toUpperCase().trim();

    let apiResponse;
    try {
      apiResponse = await axios.get(
        `https://open.er-api.com/v6/latest/${baseCurrency}`,
      );
    } catch (error) {
      return res.status(500).json({
        message: "The server is currently down. Please try again later",
      });
    }
    const { result, rates } = apiResponse.data;
    if (result == "error" || !rates || rates[targetCurrency] === undefined) {
      return res
        .status(404)
        .json({ message: "Cannot find given currency code" });
    }

    const rate = rates[targetCurrency];
    const convertedValue = rate * numericValue;

    return res.status(200).json({
      result: convertedValue,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server is down. Please check again in sometime",
    });
  }
};

module.exports = {
  getCurrencies,
  convertCurrency,
};
