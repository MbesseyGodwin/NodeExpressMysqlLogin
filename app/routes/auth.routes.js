// Importing middleware functions from the "../middleware" directory
const { verifySignUp } = require("../middleware");

// Importing controller functions from the "../controllers/auth.controller" file
const controller = require("../controllers/auth.controller");

// Exporting a function that configures routes for the authentication API endpoints
module.exports = function(app) {
  // Middleware to set custom Access-Control-Allow-Headers header for CORS
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers", // Set Access-Control-Allow-Headers header
      "Origin, Content-Type, Accept" // Define allowed headers
    );
    next();
  });

  // Route for user signup endpoint
  app.post(
    "/api/auth/signup", // POST request to /api/auth/signup
    [
      // Array of middleware functions to execute before the controller function
      verifySignUp.checkDuplicateUsernameOrEmail, // Check if username or email already exists
      verifySignUp.checkRolesExisted // Check if provided roles exist
    ],
    controller.signup // Controller function to handle user signup
  );

  // Route for user signin endpoint
  app.post("/api/auth/signin", controller.signin); // POST request to /api/auth/signin

  // Route for user signout endpoint
  app.post("/api/auth/signout", controller.signout); // POST request to /api/auth/signout
};
