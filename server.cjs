const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3002;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).send("OK");
  }

  next();
});

app.use(express.json());

// Load db.json
const dbPath = path.join(__dirname, "db.json");
let db = {};

try {
  db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
} catch (err) {
  console.error("Error loading db.json:", err);
  process.exit(1);
}

// Serve all endpoints from db.json as JSON
Object.keys(db).forEach((key) => {
  app.get(`/${key}`, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(db[key]);
  });
});

// Auth POST endpoint
app.post("/auth", (req, res) => {
  const { email, password } = req.body;
  const users = db.auth || [];

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json({
      token: user.token,
      user: user.user,
    });
  }

  return res.status(401).json({
    error: "Invalid credentials",
  });
});

app.listen(PORT, () => {
  console.log(`Mock Server is running on http://localhost:${PORT}`);
});
