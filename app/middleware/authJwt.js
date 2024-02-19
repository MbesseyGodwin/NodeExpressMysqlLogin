const jwt = require("jsonwebtoken"); // JSON Web Token for authentication
const config = require("../config/auth.config.js"); // Importing authentication configuration
const db = require("../models"); // Importing database models
const User = db.user; // User model

// Middleware to verify JWT token
verifyToken = (req, res, next) => {
  let token = req.session.token;

  // Check if token is provided
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  // Verify token
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      // Token verification failed
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    // Extract user ID from decoded token and attach it to the request
    req.userId = decoded.id;
    next(); // Move to the next middleware or route handler
  });
};

// Middleware to check if user is an admin
isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    // Check if user has admin role
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next(); // User is admin, move to next middleware or route handler
      }
    }

    // User does not have admin role
    return res.status(403).send({
      message: "Require Admin Role!",
    });
  } catch (error) {
    // Error handling
    return res.status(500).send({
      message: "Unable to validate User role!",
    });
  }
};

// Middleware to check if user is a moderator
isModerator = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    // Check if user has moderator role
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        return next(); // User is moderator, move to next middleware or route handler
      }
    }

    // User does not have moderator role
    return res.status(403).send({
      message: "Require Moderator Role!",
    });
  } catch (error) {
    // Error handling
    return res.status(500).send({
      message: "Unable to validate Moderator role!",
    });
  }
};

// Middleware to check if user is a moderator or admin
isModeratorOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    // Check if user has moderator or admin role
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator" || roles[i].name === "admin") {
        return next(); // User is moderator or admin, move to next middleware or route handler
      }
    }

    // User does not have moderator or admin role
    return res.status(403).send({
      message: "Require Moderator or Admin Role!",
    });
  } catch (error) {
    // Error handling
    return res.status(500).send({
      message: "Unable to validate Moderator or Admin role!",
    });
  }
};

// Object containing all authentication middleware
const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
};
module.exports = authJwt; // Export the authJwt object
