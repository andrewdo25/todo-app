const express = require("express");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv/config");

const router = express.Router();
const User = require("../models/User");


// @route POST api/auth/register
// @desc Register user
// @access public
router.post("/register", async (req, res) => {
	const { username, password } = req.body;

	// validation
	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: "Missing username and/or password" });
	try {
		// check for existing user
		const user = await User.findOne({ username });

		if (user)
			return res.status(400).json({ success: false, message: "Username alredy exist!" });

		// all good
		const hashedPassword = await argon2.hash(password);
		const newUser = new User({ username, password: hashedPassword });
		await newUser.save();

		// return token
		const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);
		res.json({ success: true, message: "Created", accessToken });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: "Server error!" });
	}
});


// @route POST api/auth/login
// @desc Login user
// @access public
router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	// validation
	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: "Missing username and/or password" });
	try {
		// check for existing user
		const user = await User.findOne({ username });

		if (!user)
			return res
				.status(400)
				.json({ success: false, message: "Incorrect username or password" });

		// Username found
		const passwordValid = await argon2.verify(user.password, password);

		if (!passwordValid)
			return res
				.status(400)
				.json({ success: false, message: "Incorrect username or password" });
		// all good
		const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
		res.json({ success: true, message: "Login Successfully", accessToken });
	} catch (error) {
        console.log(error);
		res.status(500).json({ success: false, message: "Server error!" });
    }
});

module.exports = router;
