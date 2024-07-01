import React, { useState } from "react";
import Comment from "./Comment";

const CommentingSystem = () => {
  const [comments, setComments] = useState([
    { id: 1, content: "<h1>First comment</h1>" },
    { id: 2, content: "<p>Second comment</p>" },
    // Add more comments as needed
  ]);

  console.log("comments", comments);

  const handleEditComment = (commentId, editedContent) => {
    // Update the content of the edited comment
    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, content: editedContent }
        : comment
    );

    setComments(updatedComments);
  };

  return (
    <div className="commenting-system">
      <h2>Comments</h2>

      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onEdit={handleEditComment}
        />
      ))}
    </div>
  );
};

export default CommentingSystem;
