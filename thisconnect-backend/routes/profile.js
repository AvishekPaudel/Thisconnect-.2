app.get('/profile', isAuthenticated, async (req, res) => {
  const user = await User.findById(req.session.userId).select('-password');
  res.json({ user });
});
