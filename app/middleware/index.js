const authJwt = require("./authJwt"); // Importing JWT authentication middleware
const verifySignUp = require("./verifySignUp"); // Importing user signup verification middleware

// Exporting the imported middleware modules for use in other parts of the application
module.exports = {
  authJwt, // Exporting JWT authentication middleware
  verifySignUp // Exporting user signup verification middleware
};
