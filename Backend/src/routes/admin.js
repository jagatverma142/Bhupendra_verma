const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", (req, res) => {
  const password = String(req.body?.password || "");
  const expected = process.env.ADMIN_PASSWORD;
  const secret = process.env.JWT_SECRET;

  if (!expected || !secret) return res.status(500).json({ ok: false, error: { code: "AUTH_NOT_CONFIGURED", message: "Auth env missing" } });
  if (!password || password !== expected) return res.status(401).json({ ok: false, error: { code: "INVALID_CREDENTIALS", message: "Invalid password" } });

  const token = jwt.sign({ role: "admin" }, secret, { expiresIn: "2h" });
  res.json({ ok: true, token });
});

module.exports = router;
