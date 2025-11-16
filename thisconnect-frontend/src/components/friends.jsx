import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function FriendsList() {
  const [friends, setFriends] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriendsAndFollowing = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/friends/friendsAndFollowing", {
          withCredentials: true,
        });

        setFriends(response.data.followers || []);
        setFollowing(response.data.following || []);
      } catch (error) {
        console.error("Error fetching friends/following:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendsAndFollowing();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 w-64 h-95 text-center text-gray-500">
        Loading connections...
      </div>
    );
  }

  const renderUserLink = (user) => (
    <NavLink
      key={user._id}
      to={`/user/${user._id}`}
      className={({ isActive }) =>
        `flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors ${
          isActive ? "bg-blue-100" : ""
        }`
      }
    >
      <div className="relative">
        <img
          src={user.avatar || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
          alt={user.firstName}
          className="w-8 h-8 rounded-full"
        />
        <div
          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
            user.status === "online"
              ? "bg-green-500"
              : user.status === "away"
              ? "bg-yellow-500"
              : "bg-gray-400"
          }`}
        />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-xs text-gray-500 capitalize">{user.status || "offline"}</p>
      </div>
    </NavLink>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 w-64 h-95 overflow-y-auto">
      {/* Friends Section */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Followers</h3>
      {friends.length === 0 ? (
        <p className="text-sm text-gray-500 mb-6">No followers yet.</p>
      ) : (
        <div className="space-y-3 mb-6">
          {friends.map(renderUserLink)}
        </div>
      )}

      {/* Following Section */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Following</h3>
      {following.length === 0 ? (
        <p className="text-sm text-gray-500">Not following anyone yet.</p>
      ) : (
        <div className="space-y-3">
          {following.map(renderUserLink)}
        </div>
      )}

      <button className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
        See all connections
      </button>
    </div>
  );
}
