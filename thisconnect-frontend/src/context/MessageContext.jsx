// src/context/MessageContext.jsx
import React, { createContext, useEffect, useState, useContext } from "react";
import Pusher from "pusher-js";
import axios from "axios";

const MessageContext = createContext();

export const MessageProvider = ({ userId, children }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const pusher = new Pusher("d93fe2e6e8f718c860fb", {
      cluster: "ap2",
      authEndpoint: "http://localhost:8000/pusher/auth", 
      auth: { withCredentials: true },
    });

    const channel = pusher.subscribe(`private-chat-${userId}`);
    
    channel.bind("new-message", (data) => {
      console.log("📩 New message received:", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [userId]);

  const sendMessage = async (recipientId, content) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/message/sendmessage",
        { recipientId, content },
        { withCredentials: true }
      );
      setMessages((prev) => [...prev, res.data.data]); 
    } catch (error) {
      console.error("❌ Failed to send message:", error);
    }
  };

  return (
    <MessageContext.Provider value={{ messages, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => useContext(MessageContext);
