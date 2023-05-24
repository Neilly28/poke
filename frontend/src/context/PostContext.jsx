import React, { createContext, useState } from "react";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState(null);

  const setPost = (newPosts) => {
    setPosts(newPosts);
  };

  const createPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const deletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  return (
    <PostContext.Provider value={{ posts, setPost, createPost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};
