// Exporting a function that defines the User model
module.exports = (sequelize, Sequelize) => {
  // Define the User model using Sequelize.define
  const User = sequelize.define("users", {
    // Define the username attribute
    username: {
      type: Sequelize.STRING // Data type: String
    },
    // Define the email attribute
    email: {
      type: Sequelize.STRING // Data type: String
    },
    // Define the password attribute
    password: {
      type: Sequelize.STRING // Data type: String
    }
  });

  // Return the User model
  return User;
};
