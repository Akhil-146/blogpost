import React from "react";

const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content;
    if (comment.status === "approved") content = comment.title;
    else if (comment.status === "pending")
      content = "This Comment is awaiting moderation";
    else if (comment.status === "rejected")
      content = "This Comment has been rejected";
    return <li key={comment.id}>{content}</li>;
  });

  return (
    <div>
      <p>{comments.length} comments</p>
      <ul>{renderedComments}</ul>
    </div>
  );
};

export default CommentList;
