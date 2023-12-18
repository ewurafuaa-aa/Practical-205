const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/register', async(req, res) => {
  try {
    const {username, password} = req.body;
    
    const existingUser = await User.findOne({username});
    if(existingUser) {
      return res.status(400).json({error: 'Username already exists.'});
    }
   
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword
    });
    
    const savedUser = await user.save();

    res.status(201).json({message: 'User registered successfully.'});
  } catch(error) {
    console.error(error);
    res.status(500).json({error: 'An error occurred while registering the user.'});
  }
});

router.post('/login', async(req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if(!user) {
      return res.status(401).json({error: 'Invalid username or password.'});
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({error: 'Invalid username or password.'});
    }
    
    const token = jwt.sign({userId: user._id }, 'your-secret-key', {expiresIn: '1h'});

    res.json({ token });
  } catch(error) {
    console.error(error);
    res.status(500).json({error: 'An error occurred while logging in.'});
  }
});

module.exports = router;