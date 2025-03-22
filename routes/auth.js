const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const router = express.Router();
const SECRET = "supersecret"; // Change this in production
const USERS_FILE = "./users.json";

// Read users from JSON file
const readUsers = () => JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));

// Write users to JSON file
const writeUsers = (users) => fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

// 🛡️ Register User
router.post("/register", (req, res) => {
    const { username, email, password, role } = req.body;
    const users = readUsers();

    if (users.find((u) => u.email === email)) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ username, email, password: hashedPassword, role: role || "user" });
    writeUsers(users);

    res.status(201).json({ message: "User registered successfully" });
});

// 🔑 Login User & Get JWT Token
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    const user = users.find((u) => u.email === email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ email: user.email, role: user.role }, SECRET, { expiresIn: "1h" });
    res.json({ token });
});

module.exports = router;
