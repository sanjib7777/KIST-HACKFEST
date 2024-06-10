const express = require("express");
const router = express.Router();
const { PythonShell } = require('python-shell');
const path = require('path');

const urlModel = require("../models/url-model");
const User = require('../models/user-model'); // Adjust the path as necessary

router.post('/predict-url', async (req, res) => {
    console.log(req.body);
    const { url, user, type } = req.body;
    console.log('data',req.body);

    if (!url || !user || !type) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        if (type === 'predict') {
            // Call your AI model to get the prediction result
            const result = await getPredictionResult(url);
            // console.log('result:',result);

            // Save the URL with the result in the database
            const newUrl = new urlModel({
                url,
                user,
                type,
                result
            });

            await newUrl.save();
            await User.findByIdAndUpdate(user, { $push: { urls: newUrl._id } });
            return res.status(201).json({ message: 'URL prediction saved', result, success: true});

        } else if (type === 'report') {
            // Save the reported URL in the database without a result
            const newUrl = new urlModel({
                url,
                user,
                type,
                result: 'pending' // No result for reported URLs
            });

            await newUrl.save();
            await User.findByIdAndUpdate(user, { $push: { urls: newUrl._id } });
            return res.status(201).json({ message: 'URL reported for further review' });

        } else {
            return res.status(400).json({ error: 'Invalid type' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getPredictionResult = async (url) => {

    return new Promise((resolve, reject) => {
        const cleanedUrl = url.replace(/^(https?:\/\/)/, '');
        console.log( 'clearn url',cleanedUrl);
        let options = {
            args: [cleanedUrl]
        };

        PythonShell.run('ML_file/predict.py', options).then(messages => {
            // it should return phishing or not phishing on the basis of messages[0], as if its 0 then it is not phishing and if it is 1 then it is phishing

            if (messages[0] === '0') {
                resolve('phishing');
            }
            else if (messages[0] === '1') {
                resolve('not-phishing');
            }
            else {
                reject('Error in Python script');
            }
            // console.log('finished');
            // console.log('results: %j', messages);
            // resolve(messages[0]);
        }
        ).catch((error) => {
            console.error(error);
            reject('Error in Python script');
        });
    }
    );
};

router.post('/extensionblockurl', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await getPredictionResult(url);
        console.log('result:',result);
        return res.status(200).json({data: result});
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
);
module.exports = router;
