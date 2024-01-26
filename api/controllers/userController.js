const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Sähköposti on jo käytössä' });
        }


        const hashedPassword = await bcrypt.hash(req.body.password, 10);


        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        const savedUser = await user.save();


        const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET);

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            return res.status(401).json({ message: 'Virheellinen sähköposti tai salasana' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};