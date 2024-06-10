const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const urlModel = require("../models/url-model");

router.post('/review-reports', async (req, res) => {
    const { url, user, type } = req.body;
    if (!url || !user || !type) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const url = await urlModel.findById(url).populate('user');
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        if (type === 'accepted') {
            url.result = 'accepted';
        }
        else if (type === 'rejected') {
            url.result = 'rejected';
        }
        else {
            return res.status(400).json({ error: 'Invalid type' });
        }

        await url.save();
        return res.status(200).json({ message: 'URL review processed successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
