import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MessageCircle, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ searchQuery, setSearchQuery }) {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/posts/profile', { withCredentials: true });
        setUserProfile(response.data.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    getProfile();
  }, []);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <NavLink to="/" 
              className="ml-2 text-xl font-bold text-gray-900 hover:underline">
              ThisKonnect
            </NavLink>

          </div>

          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search posts, users, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <MessageCircle className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>

            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Users className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
            </button>

            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition-colors">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <NavLink to="/profile" 
              className="text-sm font-medium text-gray-700">
                {userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : 'Loading...'}
            </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
