function HomeResponse(req, res) {
  res.send("Express js welcomes you to the home page");
}

function AboutResponse(req, res) {
  res.send("Express js welcomes you to about page");
}

module.exports = { HomeResponse, AboutResponse };
