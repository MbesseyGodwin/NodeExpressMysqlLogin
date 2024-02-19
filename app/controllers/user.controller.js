// Controller function to handle requests for public content
exports.allAccess = (req, res) => {
  // Send a success response with public content
  res.status(200).send("Public Content.");
};

// Controller function to handle requests for user content
exports.userBoard = (req, res) => {
  // Send a success response with user content
  res.status(200).send("User Content.");
};

// Controller function to handle requests for admin content
exports.adminBoard = (req, res) => {
  // Send a success response with admin content
  res.status(200).send("Admin Content.");
};

// Controller function to handle requests for moderator content
exports.moderatorBoard = (req, res) => {
  // Send a success response with moderator content
  res.status(200).send("Moderator Content.");
};
