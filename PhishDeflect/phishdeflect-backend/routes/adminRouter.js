const express = require("express");
const router = express.Router();
const adminModel = require("../models/admin-model");

// if (process.env.NODE_ENV !== "development") {
    router.post('/create', async (req, res) => {
        console.log('admin info:',req.body);
        let admins = await adminModel.find();
        if(admins.length > 0) {
            return res
            .status(504).
             json({ error: "you don't have permission to create a new admin." });
        }
        let { adminName, email, password } = req.body;
        let createdAdmin = await adminModel.create({
            adminName,
            email,
            password
        });
        res.status(201).json({ message: "Admin created successfully" , createdAdmin});
        })
// }

module.exports = router;