// PostDetails.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPostById } from '../api';
import { toggleLike, addComment } from '../store/slices/PostSlice';

const PostDetails = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.find((p) => p.id === parseInt(postId)));

  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    if (!post) {
      // Fetch post details if not available in the state
      getPostById(postId).then((fetchedPost) => {
        dispatch(addPost(fetchedPost));
      });
    }
  }, [dispatch, post, postId]);

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

  if (!post) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg overflow-hidden shadow-lg">
      <img src={post.image} alt={post.caption} className="w-full h-64 object-cover" />
      <div className="p-4">
        <p className="text-2xl font-bold text-gray-800">{post.caption}</p>
        <p className="text-gray-600">
          Likes: {post.likes} Comments: {post.comments.length}
        </p>
        <button
          onClick={handleLike}
          className={`text-blue-500 mr-2 ${post.liked ? 'text-red-500' : ''}`}
        >
          {post.liked ? 'Unlike' : 'Like'}
        </button>
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Comments:</h2>
          <ul>
            {post.comments.map((comment, index) => (
              <li key={index} className="mb-2">
                {comment}
              </li>
            ))}
          </ul>
        </div>
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentInput}
          onChange={handleCommentChange}
          className="border p-2 w-full"
        />
        <button onClick={handleComment} className="text-blue-500 mt-2">
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default PostDetails;
