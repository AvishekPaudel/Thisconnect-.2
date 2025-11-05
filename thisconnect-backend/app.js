const app = require("./server/server.js");
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db.js');
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./routes/auth.js');
const { registerUser } = require("./controllers/UserRegister.js");
const dotenv = require('dotenv');
const postRoutes = require('./routes/postRoutes.js');
const friendsRoutes = require("./routes/friendsRoutes.js")
const userRoutes = require("./routes/userRoutes.js")
const messageRouter = require("./routes/messagesRoute.js")

const MongoStore = require('connect-mongo');
const pusher = require("./server/pusher.js")

dotenv.config();

app.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectDB();

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI, 
    collectionName: 'sessions',
    ttl: 24 * 60 * 60 
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, 
    httpOnly: true,
    secure: false, 
    sameSite: 'lax'
  }
});

app.use(sessionMiddleware);

app.use('/api', authRoutes);
app.use('/api/posts', postRoutes);
app.use("/api/friends",friendsRoutes)
app.use("/api/user",userRoutes)
app.use("/api/message",messageRouter)
app.get('/', (req, res) => {
  res.send('MongoDB connected to Node.js project');
});

app.post("/pusher/auth", (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusher.authorizeChannel(socketId, channel);
  res.send(auth);
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST']
  }
});

io.engine.use(sessionMiddleware);


const startServer = async () => {
  try {
    const PORT = process.env.PORT || 8000;

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Socket.IO is ready`);
    });
  } catch (err) {
    console.log(err.message);
  }
};  

startServer();

module.exports = { io };