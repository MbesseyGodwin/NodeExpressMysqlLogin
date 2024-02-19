const db = require("../models"); // Importing database models
const ROLES = db.ROLES; // Importing roles from the database
const User = db.user; // User model

// Middleware to check if the username or email is already in use
checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Check if the username is already in use
    let user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (user) {
      // If username is already in use, send error response
      return res.status(400).send({
        message: "Failed! Username is already in use!"
      });
    }

    // Check if the email is already in use
    user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (user) {
      // If email is already in use, send error response
      return res.status(400).send({
        message: "Failed! Email is already in use!"
      });
    }

    // If username and email are unique, move to the next middleware or route handler
    next();
  } catch (error) {
    // If an error occurs, send internal server error response
    return res.status(500).send({
      message: error.message
    });
  }
};

// Middleware to check if provided roles exist
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    // Iterate through provided roles
    for (let i = 0; i < req.body.roles.length; i++) {
      // Check if each role exists in the predefined roles
      if (!ROLES.includes(req.body.roles[i])) {
        // If role does not exist, send error response
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  // If all roles exist, move to the next middleware or route handler
  next();
};

// Object containing the verification middleware
const verifySignUp = {
  checkDuplicateUsernameOrEmail, // Middleware to check duplicate username or email
  checkRolesExisted // Middleware to check if roles exist
};

module.exports = verifySignUp; // Export the verifySignUp object containing middleware
