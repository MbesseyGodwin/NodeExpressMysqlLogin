const db = require("../models"); // Importing database models
const config = require("../config/auth.config"); // Importing authentication configuration
const User = db.user; // User model
const Role = db.role; // Role model

const Op = db.Sequelize.Op; // Sequelize operators

const jwt = require("jsonwebtoken"); // JSON Web Token for authentication
const bcrypt = require("bcryptjs"); // Library for password hashing

// User signup function
exports.signup = async (req, res) => {
  try {
    // Create a new user with hashed password
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8), // Hashing password
    });

    // Assign roles to the user if provided
    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });
      // Set user roles
      const result = user.setRoles(roles);
      if (result) res.send({ message: "User registered successfully!" });
    } else {
      // Set default role (role = 1) if no roles provided
      const result = user.setRoles([1]);
      if (result) res.send({ message: "User registered successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message }); // Handle error
  }
};

// User signin function
exports.signin = async (req, res) => {
  try {
    // Find user by username
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    // If user not found, return error
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    // Compare password
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    // If password is invalid, return error
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    // Get user roles
    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    // Set token in session
    req.session.token = token;

    // Return user data and token
    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message }); // Handle error
  }
};

// User signout function
exports.signout = async (req, res) => {
  try {
    req.session = null; // Clear session
    return res.status(200).send({
      message: "You've been signed out!", // Success message
    });
  } catch (err) {
    this.next(err); // Handle error
  }
};
