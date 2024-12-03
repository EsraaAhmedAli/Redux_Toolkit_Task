import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addPost } from "../features/posts/postsSlice";

// Validation Schema with yup
const schema = yup.object().shape({
  title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
  body: yup.string().required("Body is required").min(5, "Body must be at least 5 characters"),
});

const AddPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(addPost(data)); // Dispatch the addPost action
    navigate("/"); // Redirect to Post List page after successful addition
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title</label>
        <input {...register("title")} />
        {errors.title && <p>{errors.title.message}</p>}
      </div>
      <div>
        <label>Body</label>
        <textarea {...register("body")} />
        {errors.body && <p>{errors.body.message}</p>}
      </div>
      <button type="submit">Add Post</button>
    </form>
  );
};

export default AddPostForm;
