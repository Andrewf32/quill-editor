import { useCallback, useEffect, useRef, useState } from "react";
import { mockComments } from "../../helpers/mockComments";
import Comment from "./Comment";
import QuillEditor from "./QuillEditor";

// Gets Data from API

const Comments = () => {
  const [comments, setComments] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const quillRef = useRef(null);

  const renderComments = () => {
    return comments?.map((comment) => {
      return <Comment key={comment.id} data={comment} />;
    });
  };

  const handleSubmit = () => {
    setComments((prev) => {
      return [...prev, { id: prev.at(-1).id + 1, content: commentText }];
    });

    quillRef.current.__quill.root.innerHTML = "";
    setIsCommenting(false);
  };

  const handleOnChange = useCallback((content) => {
    console.log("onChange content: ", content);
    setCommentText(content);
  }, []);

  useEffect(() => {
    if (!comments) setComments(mockComments);
  }, [comments]);

  console.log("commentText", commentText);

  return (
    <div className="comments-container">
      <h1>Comments</h1>

      {renderComments()}

      <div className="new-comment-wrapper">
        {isCommenting ? (
          <>
            <QuillEditor ref={quillRef} handleOnChange={handleOnChange} />

            <button onClick={handleSubmit}>Submit</button>
          </>
        ) : (
          <button onClick={() => setIsCommenting(true)}>Comment</button>
        )}
      </div>
    </div>
  );
};

export default Comments;
