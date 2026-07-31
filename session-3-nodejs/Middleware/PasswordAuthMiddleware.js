require("dotenv").config();
const SECRET_SERVER_PASSWORD = process.env.SECRET_SERVER_PASSWORD;

function passwordAuthMiddleware(req, res, next) {
  const headers = req.headers;
  const passwordInput = headers.authorization;

  if (passwordInput !== SECRET_SERVER_PASSWORD) {
    return res.status(401).json({
      message: "You are not authorized to access this resource",
      success: false,
    });
  } else {
    next();
  }
}

module.exports = passwordAuthMiddleware;
