import React, { useState } from 'react';
import { Heart, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

export default function PostCard({ post, getGenreColor, currentUserId }) {
  

  const [likeCount, setLikeCount] = useState(post.likes.length);
  const {user} = useContext(UserContext)
  const [isLiked, setIsLiked] = useState(
  user ? post.likes.includes(user._id) : false
);
  if (!post || !post.user) return null; 

  const truncateWords = (text, wordLimit) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const handleLike = async () => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/posts/${post._id}/like/toggle`,
      {},
      { withCredentials: true }
    );

    setLikeCount(response.data.likesCount);
    setIsLiked(response.data.liked);

  } catch (error) {
    console.error("Error liking post:", error);
  }
};

  const handleComment = () => {
    console.log('Comment clicked');
  };

  const { user: postUser, title, subtitle, genre, image, comments, timeAgo } = post;
  const genreColor = getGenreColor ? getGenreColor(genre) : 'bg-blue-500';

  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div
        className="rounded-xl shadow bg-white p-4 flex flex-col"
        style={{ width: 400, height: 500 }}
      >
        <NavLink to={`/user/${postUser._id}`}>
        <div className="flex items-center gap-3 mb-2">
          <img 
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                class="w-10 h-10 rounded-full"
                alt="User avatar"
              />
          <div>
            <h2 className="font-semibold">{post.user.firstName} {post.user.lastName}</h2>
          </div>
        </div>
        </NavLink>

        <h3 className="text-lg font-bold text-left">{title}</h3>
        <p className="text-gray-600 flex-grow text-left">{truncateWords(subtitle, 10)}</p>

        {image && image.url && (
          <img
            src={image.url}
            alt={title}
            className="w-full h-60 object-cover rounded-lg" 
          />
        )}

        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <span className={`px-2 py-1 rounded-full text-white ${genreColor}`}>
              {genre}
            </span>
            <button
            disabled={!user}
              onClick={handleLike}
              className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors ${
                isLiked 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Heart 
                size={16} 
                className={isLiked ? 'fill-current' : ''} 
              />
              <span>{likeCount}</span>
            </button>
            <button
              onClick={handleComment}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <MessageSquare size={16} />
              <span>{comments}</span>
            </button>
          </div>
          <span className="text-gray-500">{timeAgo}</span>
        </div>
      </div>
    </div>
  );
}