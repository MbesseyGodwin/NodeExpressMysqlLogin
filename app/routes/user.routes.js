// Importing middleware functions from the "../middleware" directory
const { authJwt } = require("../middleware");

// Importing controller functions from the "../controllers/user.controller" file
const controller = require("../controllers/user.controller");

// Exporting a function that configures routes for the user-related API endpoints
module.exports = function(app) {
  // Middleware to set custom Access-Control-Allow-Headers header for CORS
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers", // Set Access-Control-Allow-Headers header
      "Origin, Content-Type, Accept" // Define allowed headers
    );
    next();
  });

  // Route for accessing public content
  app.get("/api/test/all", controller.allAccess); // GET request to /api/test/all

  // Route for accessing user-specific content
  app.get(
    "/api/test/user", // GET request to /api/test/user
    [authJwt.verifyToken], // Middleware to verify JWT token
    controller.userBoard // Controller function to handle user-specific content
  );

  // Route for accessing moderator-specific content
  app.get(
    "/api/test/mod", // GET request to /api/test/mod
    [authJwt.verifyToken, authJwt.isModerator], // Middleware to verify JWT token and check if user is a moderator
    controller.moderatorBoard // Controller function to handle moderator-specific content
  );

  // Route for accessing admin-specific content
  app.get(
    "/api/test/admin", // GET request to /api/test/admin
    [authJwt.verifyToken, authJwt.isAdmin], // Middleware to verify JWT token and check if user is an admin
    controller.adminBoard // Controller function to handle admin-specific content
  );
};
