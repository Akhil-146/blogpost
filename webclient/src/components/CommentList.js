import axios from "axios";
import React, { useEffect, useState } from "react";

const CommentList = ({ postid }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const response = await axios.get(
      `http://localhost:5042/api/posts/${postid}/comments`
    );
    setComments(response.data.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.title}</li>;
  });

  return (
    <div>
      <p>{comments.length} comments</p>
      <ul>{renderedComments}</ul>
    </div>
  );
};

export default CommentList;
