import { useEffect, useState } from 'react';
import axios from 'axios';

const getGenreColor = (genre) => {
  const colors = {
    'Action': 'bg-red-500',
    'Adventure': 'bg-green-500',
    'Comedy': 'bg-yellow-500',
    'Drama': 'bg-purple-500',
    'Fantasy': 'bg-pink-500',
    'Horror': 'bg-gray-800',
    'Mystery': 'bg-indigo-500',
    'Romance': 'bg-rose-500',
    'Sci-Fi': 'bg-blue-500',
    'Thriller': 'bg-red-700',
    'Documentary': 'bg-teal-500',
    'Biography': 'bg-amber-500',
    'History': 'bg-brown-500',
    'Music': 'bg-violet-500',
    'Sports': 'bg-orange-500'
  };
  return colors[genre] || 'bg-gray-500';
};

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

   useEffect(() => {
    axios.get('/api/users/profile', { withCredentials: true })
      .then(res => {
        setUser(res.data.user);               // Save user data in state
        setPosts(res.data.posts || []);       // Save posts, or empty array if none
      })
      .catch(err => {
        console.error('Error fetching profile:', err);
      });
  }, []);

  if (error) return <p className="text-red-600 text-center mt-5">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {user && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-2">{user.username}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      )}

      <h3 className="text-xl font-semibold mb-4">Your Posts</h3>

      <div className="grid gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="bg-white shadow-md rounded-lg p-4">
                {/* Title + Genre */}
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-bold">{post.title}</h4>
                  <span
                    className={`text-white text-xs px-2 py-1 rounded ${getGenreColor(post.genre)}`}
                  >
                    {post.genre}
                  </span>
                </div>
            
                {/* Subtitle */}
                <p className="text-sm text-gray-700">{post.subtitle}</p>
            
                {/* Image (optional) */}
                {post.image?.url && (
                  <img
                    src={post.image.url}
                    alt={post.title}
                    className="mt-2 rounded-lg w-full h-60 object-cover"
                  />
                )}
      </div>
    ))
  ) : (
    <p>No posts yet.</p>
  )}
      </div>

    </div>
  );
};

export default UserProfile;
