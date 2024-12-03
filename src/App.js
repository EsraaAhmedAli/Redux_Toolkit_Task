import React from "react";
import { Routes, Route } from "react-router-dom";
import PostList from "./components/PostList";
import AddPostForm from "./components/AddPostForm";
import PostDetails from "./components/PostDetails";
import './App.css';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/add-post" element={<AddPostForm />} />
        <Route path="/post/:postId" element={<PostDetails />} />
      </Routes>
    </div>
  );
};

export default App;
