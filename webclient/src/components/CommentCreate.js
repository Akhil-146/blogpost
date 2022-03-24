import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postid }) => {
  const [comment, setComment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5042/api/posts/${postid}/comments`,
        { title: comment }
      );
      alert(response.data.message);
      setComment("");
    } catch (error) {
      alert(`OOPS Something Went Wrong ${error.message}`);
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Comment</label>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="form-control mb-3"
          ></input>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
