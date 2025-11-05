const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

const logoutUser = (req, res) => {
  try {
    if (!req.session) {
      return res.status(400).json({ error: 'No active session' });
    }

    const currentUserId = req.session.userId;
    console.log("----")
    console.log(req.session)
    console.log("----")

    if (!currentUserId) {
      return res.status(400).json({ error: 'No user logged in' });
    }

    console.log('Destroying session for user:', currentUserId);

    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ error: 'Could not log out' });
      }

      res.clearCookie('connect.sid', { 
        path: '/',
        httpOnly: true,
        secure: false, 
        sameSite: 'lax'
      });

      console.log('Session destroyed successfully ✅');

      return res.status(200).json({
        message: 'Logout successful',
        userId: currentUserId.toString(), 
      });
    });
  } catch (error) {
    console.error('Logout error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { logoutUser };