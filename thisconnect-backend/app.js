const app = require("./server/server.js");
const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const { registerUser } = require("./controllers/UserRegister.js");

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('MongoDB connected to Node.js project');
});

const startServer = async () => {
  try {
    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err.message);
  }
};  

startServer();