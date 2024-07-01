import DOMPurify from "dompurify";
import { useCallback, useRef, useState } from "react";
import QuillEditor from "./QuillEditor";

const Comment = ({ data }) => {
  const [commentText, setCommentText] = useState(data.content);
  const [isEditing, setIsEditing] = useState(false);

  const quillRef = useRef(null);

  const handleOnChange = useCallback((content) => {
    console.log("onChange content: ", content);
    // setCommentText(content);
  }, []);

  return (
    <div className="comment-container">
      {isEditing ? (
        <QuillEditor
          ref={quillRef}
          handleOnChange={handleOnChange}
          isEditing={isEditing}
          data={data.content}
        />
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content) }}
        />
      )}

      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => setIsEditing(false)}>Cancel</button>
    </div>
  );
};

export default Comment;
