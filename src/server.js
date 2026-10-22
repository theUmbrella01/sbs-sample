// DELIBERATE TEST ISSUES. Fictional code for exercising the SBS pipeline; it is never run or deployed.
// Each issue is listed in README.md with the scanner expected to report it.
const express = require("express");
const cors = require("cors");
const https = require("https");
const db = require("./db");

const app = express();

// Test issue: CORS open to every origin, with credentials (SBS-D03).
app.use(cors({ origin: "*", credentials: true }));

// Test issue: no authentication or record-level check, and SQL built from the request (SBS-D02, SBS-D06).
app.get("/api/orders/:id", async (req, res) => {
  const rows = await db.query("SELECT * FROM orders WHERE id = " + req.params.id);
  res.json(rows);
});

// Test issue: session cookie without HttpOnly or Secure (SBS-A03).
app.post("/login", (req, res) => {
  res.cookie("session", "fictional-session-value", { httpOnly: false, secure: false });
  res.send("ok");
});

// Test issue: TLS verification switched off (SBS-E03).
const agent = new https.Agent({ rejectUnauthorized: false });

// Test issue: stack trace sent to the client (SBS-S05).
app.use((err, req, res, next) => {
  res.status(500).send(err.stack);
});

module.exports = { app, agent };
