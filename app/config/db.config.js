// Exporting an object containing database configuration parameters
module.exports = {
  // Hostname or IP address of the database server
  HOST: "localhost",

  // Username used to connect to the database
  USER: "root",

  // Password used to authenticate the user
  PASSWORD: "Maria@123",

  // Name of the database to connect to
  DB: "testdb",

  // Dialect of the database management system, in this case MySQL
  dialect: "mysql",

  // Pool configuration to manage database connections
  pool: {
    // Maximum number of connections in the pool
    max: 5,

    // Minimum number of connections in the pool
    min: 0,

    // Maximum time (in milliseconds) that a connection can be idle before being released
    acquire: 30000,

    // Maximum time (in milliseconds) that a connection can remain idle in the pool before being closed
    idle: 10000
  }
};
