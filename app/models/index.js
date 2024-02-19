// Importing the database configuration from the db.config.js file
const config = require("../config/db.config.js");

// Importing Sequelize ORM
const Sequelize = require("sequelize");

// Creating a new Sequelize instance with the database configuration
const sequelize = new Sequelize(
  config.DB, // Database name
  config.USER, // Database username
  config.PASSWORD, // Database password
  {
    host: config.HOST, // Database host
    dialect: config.dialect, // Database dialect (e.g., MySQL)
    pool: {
      // Connection pool configuration
      max: config.pool.max, // Maximum number of connections in the pool
      min: config.pool.min, // Minimum number of connections in the pool
      acquire: config.pool.acquire, // Maximum time (in milliseconds) that a connection can be idle before being released
      idle: config.pool.idle, // Maximum time (in milliseconds) that a connection can remain idle in the pool before being closed
    },
  }
);

// Object to store Sequelize and sequelize instances, and database models
const db = {};

// Assigning Sequelize and sequelize instances to db object
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importing and initializing user and role models
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

// Defining many-to-many relationship between user and role models
db.role.belongsToMany(db.user, {
  through: "user_roles", // Specifies the intermediate table name for the many-to-many relationship
});
db.user.belongsToMany(db.role, {
  through: "user_roles", // Specifies the intermediate table name for the many-to-many relationship
});

// Array containing predefined roles
db.ROLES = ["user", "admin", "moderator"];

// Exporting the db object
module.exports = db;
