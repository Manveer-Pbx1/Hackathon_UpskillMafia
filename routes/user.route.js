// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// Get user profile by ID
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const updatedUserData = req.body;
      const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.delete('/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });



module.exports = router;
