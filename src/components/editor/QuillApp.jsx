import React, { useRef, useState } from "react";
import Editor from "./QuillExample";
import Quill from "quill";

const Delta = Quill.import("delta");

const QuillApp = () => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);

  const [comments, setComments] = useState([
    { id: 1, content: "<h1>First comment</h1>" },
    { id: 2, content: "<p>Second comment</p>" },
    // Add more comments as needed
  ]);

  // Use a ref to access the quill instance directly
  const quillRef = useRef();

  console.log("range", range);
  console.log("lastChange", lastChange);

  return (
    <div>
      <Editor
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={new Delta()
          .insert("Hello")
          .insert("\n", { header: 1 })
          .insert("Some ")
          .insert("initial", { bold: true })
          .insert(" ")
          .insert("content", { underline: true })
          .insert("\n")}
        onSelectionChange={setRange}
        onTextChange={setLastChange}
      />
    </div>
  );
};

export default QuillApp;
