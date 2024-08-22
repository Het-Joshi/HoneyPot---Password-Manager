const express = require("express");
const bodyParser = require("body-parser");
const winston = require("winston");
const multer = require("multer");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("trust proxy", true);
const upload = multer({ dest: "uploads/" });

// Set up logging
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss", // Format the timestamp
    }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: "result.log" }),
    new winston.transports.Console(),
  ],
});

// Logging
app.use((req, res, next) => {
  const xForwardedFor = req.headers["x-forwarded-for"];
  const proxyChain = xForwardedFor
    ? xForwardedFor.split(",").map((ip) => ip.trim())
    : [];

  const clientIp =
    proxyChain.length > 0
      ? proxyChain[0]i
      : req.connection.remoteAddress || req.ip;

  logger.info(`Request from IP: ${clientIp} for ${req.url}`);

  // If there are multiple proxies, log the entire chain of proxies
  if (proxyChain.length > 1) {
    logger.info(`Proxy chain: ${proxyChain.join(" -> ")}`);
  }

  next();
});

// Home Route
app.get("/", (req, res) => {
  res.render("index");
});

// Login Route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  logger.info(
    `Login attempt by IP: ${req.ip} with username: ${username} and password: ${password}`,
  );
  res.render("dashboard", { username });
});

// Admin Panel Route
app.get("/admin", (req, res) => {
  res.render("admin");
});

app.post("/admin", (req, res) => {
  const { adminUser, adminPass } = req.body;
  logger.info(
    `Admin login attempt by IP: ${req.ip} with username: ${adminUser} and password: ${adminPass}`,
  );
  if (adminUser === "admin" && adminPass === "password") {
    res.render("admin-dashboard");
  } else {
    res.send("Invalid credentials.");
  }
});

// API Endpoints
app.get("/api/users", (req, res) => {
  logger.info(`API call to /api/users from IP: ${req.ip}`);
  res.json([
    { id: 1, username: "user1" },
    { id: 2, username: "user2" },
    { id: 3, username: "user3" },
  ]);
});

app.post("/api/data", (req, res) => {
  const { key, value } = req.body;
  logger.info(
    `API call to /api/data with key: ${key} and value: ${value} from IP: ${req.ip}`,
  );
  res.json({ success: true, message: "Data received" });
});

// File Upload Route
app.get("/upload", (req, res) => {
  res.render("upload");
});

app.post("/upload", upload.single("file"), (req, res) => {
  logger.info(`File uploaded: ${req.file.originalname} by IP: ${req.ip}`);
  res.send("File uploaded successfully!");
});

// Search
// Show search form
app.get("/search", (req, res) => {
  res.render("search");
});

// Handle search form submission
app.post("/search", (req, res) => {
  const query = req.body.query || ""; // Get the query from the form submission
  logger.info(`Search query: ${query}`);

  // Define a list of common SQL injection patterns to check for
  const sqlInjectionPatterns = [
    "' OR '1'='1",
    '" OR "1"="1',
    "' OR 1=1 --",
    '" OR 1=1 --',
    "' UNION SELECT",
    '" UNION SELECT',
    "' AND 1=1",
    '" AND 1=1',
  ];

  // Check if the query matches any of the SQL injection patterns
  const isSqlInjectionAttempt = sqlInjectionPatterns.some((pattern) =>
    query.includes(pattern),
  );

  // Render results page with search query and result
  res.render("search-results", {
    query,
    result: isSqlInjectionAttempt
      ? "Welcome to the API page. Here are the api's : /api/admins, /api/users"
      : "No results found.",
  });
});

// Insecure API Endpoint
app.get("/api/admins", (req, res) => {
  logger.info(`API call to /api/admins from IP: ${req.ip}`);
  res.json([
    { id: 1, username: "admin1", password: "password1" },
    { id: 2, username: "admin2", password: "password2" },
  ]);
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
