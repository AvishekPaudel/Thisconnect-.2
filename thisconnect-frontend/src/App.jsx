import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Home from "./pages/home";
import Register from "./pages/UserRegister";
import Login from "./pages/UserLogin";
import ThisConnectLanding from "./pages/landingPage";
import UserProfile from "./pages/UserProfile";
import MyProfile from "./pages/MyProfile";
import MessagingUI from "./pages/MessaginUI.jsx";
import CreatePOst from "./pages/CreatePost.jsx"


import { MessageProvider } from "./context/MessageContext.jsx";
import { UserContext } from "./context/UserContext.jsx";
import { useContext } from "react";
import CreatePost from "./pages/CreatePost.jsx";

function App() {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-600">
        Loading user...
      </div>
    );
  }

  return (
    <MessageProvider userId={user?._id}>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<ThisConnectLanding />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/foryou"
          element={user ? <Home /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/profile"
          element={user ? <MyProfile /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/user/:userId"
          element={user ? <UserProfile /> : <Navigate to="/login" replace />}
        />

        <Route path="/messages"
         element={user ? <MessagingUI /> : <Navigate to='/login' replace />} />

         <Route path="/CreatePost"
         element={user ? <CreatePost /> : <Navigate to='/login' replace /> } />

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </MessageProvider>
  );
}

export default App;
