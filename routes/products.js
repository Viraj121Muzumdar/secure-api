const express = require("express");
const axios = require("axios");
const { authenticateToken } = require("./auth");

const router = express.Router();
const FAKESTORE_API = "https://fakestoreapi.com/products";

// 🛒 Fetch All Products (Public)
router.get("/", async (req, res) => {
    const response = await axios.get(FAKESTORE_API);
    res.json(response.data);
});

// 🛒 Fetch Single Product (Public)
router.get("/:id", async (req, res) => {
    const response = await axios.get(`${FAKESTORE_API}/${req.params.id}`);
    res.json(response.data);
});

module.exports = router;
