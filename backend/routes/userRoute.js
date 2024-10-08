const express = require('express');
const router = express.Router();
const userModel = require('../model/user');

router.post('/register', async (req, res) => {
    const newUser = new userModel({ name: req.body.name, email: req.body, email, password: req.body.password })
    try {
        const user = await newUser.save();

    } catch (error) {
        return res.status(500).json({ error })
    }

});

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findone({ email: email })
        if (user) {
            const temp = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id,
            }
            res.send(temp)
        } else {
            return res.status(400).json({ message: 'Login failed' })
        }
    } catch (error) {
        return res.status(500).json({ error })
    }
})

module.exports = router;