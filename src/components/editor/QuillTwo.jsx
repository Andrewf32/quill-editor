import { useEffect, useRef } from "react";
import Quill from "quill";

import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

const QuillTwo = ({ handleOnChange }) => {
  const quillRef = useRef(null);

  console.log("quillRef", quillRef);

  useEffect(() => {
    if (quillRef.current && !quillRef.current.__quill) {
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

      const quill = new Quill(quillRef.current, options);
      quillRef.current.__quill = quill;

      quill.on("text-change", () => {
        const html = quill.root.innerHTML;

        handleOnChange(html); // Call your custom onChange handler
      });
    }
  }, [handleOnChange]);

  return <div ref={quillRef} id="editor" />;
};

export default QuillTwo;
