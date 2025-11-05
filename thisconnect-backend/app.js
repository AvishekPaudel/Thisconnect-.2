const app = require("./server/server.js");
const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
const session = require('express-session')
const authRoutes = require('./routes/auth.js');
const { registerUser } = require("./controllers/UserRegister.js");
const dotenv = require('dotenv');
const postRoutes = require('./routes/postRoutes.js')
const MongoStore = require('connect-mongo'); 


app.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectDB();

dotenv.config();

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://avishekpaudel:DJHE21ooFlqoPjhk@avishek-0.au09edd.mongodb.net/?retryWrites=true&w=majority&appName=Avishek-0', 
    collectionName: 'sessions',
    ttl: 24 * 60 * 60 
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, 
    httpOnly: true,
    secure: false, 
    sameSite: 'lax'
  }
}));
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