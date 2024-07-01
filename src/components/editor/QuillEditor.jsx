import React, { useEffect, useRef } from "react";
import Quill from "quill";
import DOMPurify from "dompurify";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

const QuillEditor = ({ initialContent, handleOnChange, isEditing }) => {
  const quillRef = useRef(null);
  // const quillInstanceRef = useRef(null);

  useEffect(() => {
    let quill;

    if (quillRef.current) {
      if (!quillRef.current.__quill) {
        const options = {
          modules: {
            markdownShortcuts: {},
            toolbar: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
              ["bold", "italic", "underline"],
              ["code-block"],
            ],
          },
          placeholder: "Compose an epic...",
          theme: "snow",
        };

        quill = new Quill(quillRef.current, options);
        quillRef.current.__quill = quill;

        quill.on("text-change", () => {
          const html = quill.root.innerHTML;
          console.log("html", html);

          handleOnChange(html); // Call your custom onChange handler
        });
      }
    }
  }, [initialContent, handleOnChange, isEditing]);

  return <div ref={quillRef} />;
};

export default QuillEditor;
