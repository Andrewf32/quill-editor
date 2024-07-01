import Quill from "quill";
import MarkdownShortcuts from "quill-markdown-shortcuts";

import Comments from "./freshEditor/Comments";

Quill.register("modules/markdownShortcuts", MarkdownShortcuts);

/*
  TODO:
    - Pass change handler (mutationHandler)
    - Extract the values <p>, <h1>, etc..
    - Gets sent to the BE
    - Make test Commenting system
      - Fix chat gpt code
      - Identify workflow of data to editor and back
*/

function App() {
  return (
    <div className="app-container">
      <Comments />
    </div>
  );
}

export default App;

// "<ol><li data-list=\"checked\"><span class=\"ql-ui\" contenteditable=\"false\"></span>Testing</li></ol><h1>Heading 1</h1>"
