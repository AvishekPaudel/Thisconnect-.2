import React, { useState, useEffect, useRef, useContext } from 'react';
import { Send, User, ArrowLeft } from 'lucide-react';
import { MessageProvider } from '../context/MessageContext';
import { UserContext } from '../context/UserContext';


const MessagingUI = () => {
  const { user } = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const [following, setFollowing] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch friends and following list
  useEffect(() => {
    const fetchFriendsAndFollowing = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/friends/friendsAndFollowing", {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setFriends(data.followers || []);
          setFollowing(data.following || []);
        }
      } catch (error) {
        console.error("Error fetching friends/following:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendsAndFollowing();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      loadConversation(selectedUser._id);
    }
  }, [selectedUser]);

  const loadConversation = async (userId) => {
    setLoadingMessages(true);
    try {
      const response = await fetch(`http://localhost:8000/api/message/conversation/${userId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      } else {
        console.error('Failed to load conversation:', response.status);
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    const messageContent = newMessage;
    const tempMessage = {
      _id: Date.now(),
      content: messageContent,
      sender: { _id: user._id, firstName: user.firstName || 'You', lastName: user.lastName || '' },
      recipient: { _id: selectedUser._id, firstName: selectedUser.firstName, lastName: selectedUser.lastName },
      createdAt: new Date().toISOString(),
      isTemp: true
    };

    setMessages([...messages, tempMessage]);
    setNewMessage('');

    try {
      const response = await fetch('http://localhost:8000/api/message/sendmessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          recipientId: selectedUser._id,
          content: messageContent,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // The backend returns the message without populated fields, so we need to manually add them
        const messageWithPopulatedFields = {
          ...data.data,
          sender: { _id: user._id, firstName: user.firstName, lastName: user.lastName },
          recipient: { _id: selectedUser._id, firstName: selectedUser.firstName, lastName: selectedUser.lastName }
        };
        setMessages(prev => prev.filter(m => !m.isTemp).concat(messageWithPopulatedFields));
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Failed to send message' }));
        alert(errorData.message || 'Failed to send message');
        setMessages(prev => prev.filter(m => !m.isTemp));
        setNewMessage(messageContent);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
      setMessages(prev => prev.filter(m => !m.isTemp));
      setNewMessage(messageContent);
    }
  };

  const formatTime = (date) => {
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const renderUserItem = (person) => (
    <div
      key={person._id}
      onClick={() => setSelectedUser(person)}
      className={`flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors ${
        selectedUser?._id === person._id ? 'bg-blue-50' : ''
      }`}
    >
      <div className="relative">
        <img
          src={person.avatar || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
          alt={person.firstName}
          className="w-10 h-10 rounded-full"
        />
        <div
          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
            person.status === "online"
              ? "bg-green-500"
              : person.status === "away"
              ? "bg-yellow-500"
              : "bg-gray-400"
          }`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {person.firstName} {person.lastName}
        </p>
        <p className="text-xs text-gray-500 capitalize truncate">
          {person.status || "offline"}
        </p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-gray-500">Loading connections...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Conversations List */}
      <div className={`${selectedUser ? 'hidden md:flex' : 'flex'} w-full md:w-80 bg-white border-r border-gray-200 flex-col`}>
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {/* Followers Section */}
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Followers</h3>
          {friends.length === 0 ? (
            <p className="text-sm text-gray-500 mb-6">No followers yet.</p>
          ) : (
            <div className="space-y-2 mb-6">
              {friends.map(renderUserItem)}
            </div>
          )}

          {/* Following Section */}
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Following</h3>
          {following.length === 0 ? (
            <p className="text-sm text-gray-500">Not following anyone yet.</p>
          ) : (
            <div className="space-y-2">
              {following.map(renderUserItem)}
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${selectedUser ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-white`}>
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
              <button
                onClick={() => setSelectedUser(null)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="relative">
                <img
                  src={selectedUser.avatar || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                  alt={selectedUser.firstName}
                  className="w-10 h-10 rounded-full"
                />
                <div
                  className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                    selectedUser.status === "online"
                      ? "bg-green-500"
                      : selectedUser.status === "away"
                      ? "bg-yellow-500"
                      : "bg-gray-400"
                  }`}
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {selectedUser.firstName} {selectedUser.lastName}
                </h3>
                <p className="text-sm text-gray-500 capitalize">
                  {selectedUser.status || "offline"}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {loadingMessages ? (
                <div className="flex justify-center items-center h-full">
                  <div className="text-gray-500">Loading messages...</div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                  <div className="text-gray-500">No messages yet. Start the conversation!</div>
                </div>
              ) : (
                messages.map((msg) => {
                  const isOwn = msg.sender._id === user._id || msg.isTemp;
                  return (
                    <div
                      key={msg._id}
                      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                          isOwn
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-900'
                        } ${msg.isTemp ? 'opacity-70' : ''}`}
                      >
                        <p className="break-words">{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            isOwn ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {formatTime(msg.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <Send size={18} />
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center text-gray-500">
            <div className="text-center">
              <User size={64} className="mx-auto mb-4 text-gray-400" />
              <p className="text-lg">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingUI;