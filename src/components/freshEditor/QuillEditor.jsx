import { forwardRef, useEffect, useRef } from "react";
import Quill from "quill";

import { options } from "../../helpers/quillOptions";

import "quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

// forwardRef?
const QuillEditor = forwardRef(({ handleOnChange, isEditing, data }, ref) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (ref.current && !quillRef.current) {
      // if (!ref.current.__quill) {
      const quill = new Quill(ref.current, options);

      quillRef.current = quill;

      quill.on("text-change", (delta) => {
        const html = quill.root.innerHTML;

        handleOnChange(html);
      });

      if (isEditing && data) {
        const cleanHTML = DOMPurify.sanitize(data);
        quill.clipboard.dangerouslyPasteHTML(cleanHTML);

        quill.setSelection(quill.getLength(), 0);
      }
    }
    // }
  }, [handleOnChange, ref, isEditing, data]);

  useEffect(() => {
    if (isEditing && quillRef.current) {
      const cleanHTML = DOMPurify.sanitize(data);
      quillRef.current.clipboard.dangerouslyPasteHTML(cleanHTML);

      quillRef.current.setSelection(quillRef.current.getLength(), 0);
    }
  }, [isEditing, data]);

  return (
    <div className="quill-editor-container">
      <div ref={ref} />
    </div>
  );
});

export default QuillEditor;
