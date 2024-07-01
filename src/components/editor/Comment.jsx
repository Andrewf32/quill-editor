import React, { useState } from "react";
import DOMPurify from "dompurify";
import QuillEditor from "./QuillEditor";

const Comment = ({ comment, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Perform save operation and pass edited content to parent component
    onEdit(comment.id, editedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset edited content and exit isEditing mode
    setEditedContent(comment.content);
    setIsEditing(false);
  };

  const handleChange = (content) => {
    console.log("content", content);
    setEditedContent(content);
  };

  // console.log("comment", comment);
  // console.log("editedContent", editedContent);
  console.log("isEditing", isEditing);

  return (
    <div className="comment">
      {isEditing ? (
        <div>
          <QuillEditor
            content={comment.content}
            handleOnChange={handleChange}
            isEditing={isEditing}
            handleCancel={handleCancel}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(comment.content),
            }}
          />
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Comment;
