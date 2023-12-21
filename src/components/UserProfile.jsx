import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom'; // Import useParams
import { getUserById } from '../api';
import { setUser } from '../store/slices/UserSlice';
import { setPosts } from '../store/slices/PostSlice';

const UserProfile = () => {
  const { userId } = useParams(); // Use useParams to get userId
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user && state.user.find((u) => u.id === parseInt(userId)));

  const posts = useSelector((state) => state.posts.filter((p) => p.userId === parseInt(userId)));

  useEffect(() => {
    if (!user) {
      getUserById(userId).then((fetchedUser) => {
        dispatch(setUser({ user: fetchedUser }));
      });
    }
  }, [dispatch, user, userId]);

  if (!user) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img src={user.avatar} alt={user.username} className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{user.username}</h1>
            <p className="text-gray-600">{user.bio}</p>
          </div>
        </div>
        <h2 className="text-lg font-bold mb-2">Posts:</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="mb-2">
              <Link to={`/post/${post.id}`} className="text-blue-500 hover:underline">
                {post.caption}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
