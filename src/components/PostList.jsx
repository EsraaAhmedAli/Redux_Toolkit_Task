import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../features/posts/postsSlice";
import { Link } from "react-router-dom";

const PostList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts()); // Fetch posts on load
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Posts</h1>
      <Link to="/add-post">Add New Post</Link>
      <ul>
        {items.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
            <button onClick={() => dispatch(deletePost(post.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
