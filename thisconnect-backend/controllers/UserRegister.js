const bcrypt = require('bcrypt');
const User = require('../models/UserModel'); 

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {registerUser};
