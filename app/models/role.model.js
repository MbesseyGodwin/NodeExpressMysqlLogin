// Exporting a function that defines the Role model
module.exports = (sequelize, Sequelize) => {
  // Define the Role model using Sequelize.define
  const Role = sequelize.define("roles", {
    // Define the id attribute
    id: {
      type: Sequelize.INTEGER, // Data type: Integer
      primaryKey: true // Primary key constraint
    },
    // Define the name attribute
    name: {
      type: Sequelize.STRING // Data type: String
    }
  });

  // Return the Role model
  return Role;
};
