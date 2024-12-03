import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define API URL
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Fetch Posts (Fetching all posts)
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Add Post (Adding a new post)
export const addPost = createAsyncThunk("posts/addPost", async (newPost) => {
  const response = await axios.post(API_URL, newPost);
  return response.data;
});

// Delete Post (Deleting a post)
export const deletePost = createAsyncThunk("posts/deletePost", async (postId) => {
  await axios.delete(`${API_URL}/${postId}`);
  return postId; // Return post ID to remove it from the store
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch posts
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Add post
    builder
      .addCase(addPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload); // Add new post to the list
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Delete post
    builder
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
