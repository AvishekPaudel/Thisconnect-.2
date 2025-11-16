import React, { useState } from 'react';
import UserPost from '../components/userPost';
import PostModal from '../components/postModal';
import { NavLink } from "react-router";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";


const PostsModal = ({ post, isOpen, onClose }) => {
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {user} = useContext(UserContext)

  if (!isOpen || !post) return null;

  const getGenreColor = (genre) => {
    const colors = {
      'Travel': 'bg-blue-500',
      'Nature': 'bg-green-500',
      'Adventure': 'bg-orange-500',
      'Photography': 'bg-purple-500',
      'Paradise': 'bg-pink-500'
    };
    return colors[genre] || 'bg-gray-500';
  };

  const handleLike = () => {
    const newLikedPosts = new Set(likedPosts);
    if (likedPosts.has(post._id)) {
      newLikedPosts.delete(post._id);
    } else {
      newLikedPosts.add(post._id);
    }
    setLikedPosts(newLikedPosts);
  };

  const isLiked = likedPosts.has(post._id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* Image Section */}
          {post.image?.url && (
            <div className="md:w-2/3 bg-black flex items-center justify-center">
              <img
                src={post.image.url}
                alt={post.title}
                className="w-full h-full max-h-[60vh] md:max-h-full object-contain"
              />
            </div>
          )}

          {/* Content Section */}
          <div className={`${post.image?.url ? 'md:w-1/3' : 'w-full'} p-6 flex flex-col text-left`}>
            {/* Post Header */}
            <div className="border-b pb-4 mb-4">
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" 
                  alt="User" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">{user ? `${user.firstName} ${user.lastName}` : 'Loading...'}</p>
                </div>
              </div>
               <div className="flex-shrink-0 relative">
                  {/* Edit Icon */}
                  <NavLink
                    to="/feed"
                    className="absolute bottom-2 right-10 w-10 h-10 bg-white hover:bg-white text-gray-600 rounded-full flex items-center justify-center  transition-colors duration-200 border-4 border-white"
                  >
                    <svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
                      />
                    </svg>
                  </NavLink>
              </div>
            </div>

            {/* Post Details */}
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
                  {post.subtitle && (
                    <p className="text-gray-600 text-lg">{post.subtitle}</p>
                  )}
                </div>

                {post.genre && (
                  <div>
                    <span
                      className={`inline-block px-4 py-2 text-sm font-medium text-white rounded-full ${getGenreColor(post.genre)}`}
                    >
                      {post.genre}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t pt-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isLiked 
                        ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>

                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-sm">Comment</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsModal;