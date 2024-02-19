// Import required modules
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

// Initialize Express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS) middleware
app.use(cors());

/* For Angular Client (withCredentials) */
app.use(
  cors({
    credentials: true,
    origin: ["*"],
  })
);

// Parse requests with content-type - application/json
app.use(express.json());

// Parse requests with content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Configure cookie session middleware
app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"], // Should be replaced with a secret environment variable
    httpOnly: true,
    sameSite: "strict",
  })
);

// Import database models and synchronize them with the database
const db = require("./app/models");
const Role = db.role;
db.sequelize.sync();

// Define a simple route to provide information about the API
app.get("/", (req, res) => {
  res.json(
    {
    message: "Welcome to the backend API for the Login Authentication System.",
    1: `POST /api/auth/signup: Create a new user account`,
    2: `POST /api/auth/signin: Authenticate an existing user.`,
    3: `POST /api/auth/signout: Logout the current user.`,
    4: `GET /api/test/all: Get public content.`,
    5: `GET /api/test/user: Get user-specific content.`,
    6: `GET /api/test/mod: Get content for users with moderator role.`,
    7: `GET /api/test/admin: Get content for users with admin role.`,
  });
});

// Import and configure routes for authentication and user-related operations
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// Define the port to listen for incoming requests
const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Initialize database with predefined roles (commented out for production use)
function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

// initial();
