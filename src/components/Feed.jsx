import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts,getUsers } from '../api';
import { setUsers } from '../store/slices/UserSlice';
import { setPosts, toggleLike, addComment } from '../store/slices/PostSlice';
import PullToRefresh from 'react-simple-pull-to-refresh';

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) =>state.user.find((u) => u.id === post.userId));
  const [commentInput, setCommentInput] = useState('');

  const handleLike = () => {
    dispatch(toggleLike({ postId: post.id }));
  };

  const handleCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

  const handleComment = () => {
    if (commentInput) {
      dispatch(addComment({ postId: post.id, comment: commentInput }));
      setCommentInput('');
    }
  };

  return (
    <div className="mb-8">
      <Link to={`/user/${user.id}`} className="flex items-center mb-2">
        <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full mr-2" />
        <span className="text-gray-800 font-bold">{user.username}</span>
      </Link>
      <Link to={`/post/${post.id}`}>
        <img
          src={post.image}
          alt={post.caption}
          className="w-full h-64 object-cover rounded"
        />
      </Link>
      <div className="mt-2">
        <p className="text-gray-800 font-bold">{post.caption}</p>
        <p className="text-gray-600">
          Likes: {post.likes} Comments: {post.comments.length}
        </p>
        <button onClick={handleLike} className="text-blue-500 mr-2">
          {post.liked ? 'Unlike' : 'Like'}
        </button>
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentInput}
          onChange={handleCommentChange}
          className="border p-1"
        />
        <button onClick={handleComment} className="text-blue-500 ml-2">
          Comment
        </button>
      </div>
    </div>
  );
};

const Feed = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    console.log('Pull to refresh started');
    setRefreshing(true);
  
    try {
      const fetchedPosts = await getPosts();
      const shuffledPosts = [...fetchedPosts].sort(() => Math.random() - 0.5);
  
      dispatch(setPosts({ posts: shuffledPosts }));
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setRefreshing(false);
      console.log('Pull to refresh completed');
    }
  };
  

  useEffect(() => {
    getUsers().then((usersData) => dispatch(setUsers(usersData)));
    getPosts().then((posts) => dispatch(setPosts({ posts })));
  }, [dispatch]);

  return (
    <PullToRefresh onRefresh={handleRefresh} refreshing={refreshing}>
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Feed</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </PullToRefresh>
  );
};

export default Feed;
