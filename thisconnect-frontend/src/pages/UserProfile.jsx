import React, { useState, useEffect, useContext } from 'react';
import { Heart, MessageSquare } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext'; // ✅ assuming you have a global user context

const UserProfile = () => {
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const { userId } = useParams();
  const { user: currentUser } = useContext(UserContext); // ✅ logged-in user from context

  // ✅ Fetch user and posts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/profileAndPosts/${userId}`, {
          withCredentials: true,
        });
        setUser(response.data.user);
        setPosts(response.data.posts);

        if (response.data.user.followers.includes(currentUser._id)) {
          setIsFollowing(true);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId, currentUser]);

  const handleFollow = async () => {
    try {
      const endpoint = isFollowing
        ? `http://localhost:8000/api/friends/unfollow/${userId}`
        : `http://localhost:8000/api/friends/follow/${userId}`;

      await axios.post(endpoint, {}, { withCredentials: true });

      setIsFollowing(!isFollowing);
      setUser((prev) => ({
        ...prev,
        followers: isFollowing
          ? prev.followers.filter((id) => id !== currentUser._id)
          : [...prev.followers, currentUser._id],
      }));
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
  };

  const handleLike = (postId) => {
    setLikedPosts((prevLiked) => {
      const updated = new Set(prevLiked);
      updated.has(postId) ? updated.delete(postId) : updated.add(postId);
      return updated;
    });
  };

  const truncateWords = (text, wordLimit) => {
    const words = text.split(' ');
    return words.length <= wordLimit ? text : words.slice(0, wordLimit).join(' ') + '...';
  };

  const getGenreColor = (genre) => {
    const colors = {
      Travel: 'bg-blue-500',
      Nature: 'bg-green-500',
      Adventure: 'bg-orange-500',
      Photography: 'bg-purple-500',
      Paradise: 'bg-pink-500',
    };
    return colors[genre] || 'bg-gray-500';
  };

  if (loading) {
    return <div className="text-center mt-20 text-gray-600">Loading profile...</div>;
  }

  if (!user) {
    return <div className="text-center mt-20 text-red-600">User not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen">
      {/* Profile Header */}
      <div className="px-4 py-8">
        <div className="flex items-center gap-8 mb-6">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-light mb-4">
                {user.firstName} {user.lastName}
              </h1>

              {/* ✅ Follow button (only if not viewing own profile) */}
              {currentUser && currentUser._id !== user._id && (
                <button
                  onClick={handleFollow}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isFollowing
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div className="text-center">
                <span className="block text-xl font-semibold">{posts.length}</span>
                <span className="text-gray-500 text-sm">posts</span>
              </div>
              <div className="text-center">
                <span className="block text-xl font-semibold">{user.followers?.length || 0}</span>
                <span className="text-gray-500 text-sm">followers</span>
              </div>
              <div className="text-center">
                <span className="block text-xl font-semibold">{user.following?.length || 0}</span>
                <span className="text-gray-500 text-sm">following</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="px-4">
        {posts.length === 0 ? (
          <p className="text-center text-gray-600">No posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post._id} className="flex justify-center">
                <div
                  className="rounded-xl shadow bg-white p-4 flex flex-col"
                  style={{ width: 400, height: 500 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                      alt={user.firstName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h2 className="font-semibold">
                        {user.firstName} {user.lastName}
                      </h2>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-left">{post.title}</h3>
                  <p className="text-gray-600 flex-grow text-left">
                    {truncateWords(post.subtitle, 10)}
                  </p>

                  {post.image?.url && (
                    <img
                      src={post.image.url}
                      alt={post.title}
                      className="w-full h-60 object-cover rounded-lg"
                    />
                  )}

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-1 rounded-full text-white ${getGenreColor(
                          post.genre
                        )}`}
                      >
                        {post.genre}
                      </span>
                      <button
                        onClick={() => handleLike(post._id)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors ${
                          likedPosts.has(post._id)
                            ? 'bg-red-100 text-red-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Heart
                          size={16}
                          className={likedPosts.has(post._id) ? 'fill-current' : ''}
                        />
                        <span>{post.likes?.length || 0}</span>
                      </button>
                      <button className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                        <MessageSquare size={16} />
                        <span>{post.comments?.length || 0}</span>
                      </button>
                    </div>
                    <span className="text-gray-500 text-xs">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
