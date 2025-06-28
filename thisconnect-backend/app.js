const app = require("./server/server.js");
const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const { registerUser } = require("./controllers/UserRegister.js");
const dotenv = require('dotenv');
const postRoutes = require('./routes/postRoutes.js')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectDB();

dotenv.config();

app.use('/api', authRoutes);
app.use('/api/posts',postRoutes);

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