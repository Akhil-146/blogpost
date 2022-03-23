import React from "react";
import PostCreate from "./components/PostCreate";
import PostList from "./components/PostList";

const App = () => {
  return (
    <div className="container mt-4">
      <h1 className="mb-3">Create Post</h1>
      <PostCreate />
      <hr></hr>
      <PostList />
    </div>
  );
};

export default App;
