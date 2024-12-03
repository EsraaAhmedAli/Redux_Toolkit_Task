import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/posts/postsSlice";
import { useParams } from "react-router-dom";

const PostDetails = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();  // Getting postId from URL
  const { items, loading, error } = useSelector((state) => state.posts);

  // Find the specific post using the postId from URL
  const post = items.find((p) => p.id === parseInt(postId));

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchPosts()); // Fetch posts only if not already fetched
    }
  }, [dispatch, items]);

  // Loading and error handling
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!post) {
    return <p>Post not found</p>; // If post not found, display this message
  }

  return (
    <div className="post-details">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default PostDetails;
