// // import { CKEditor } from "@ckeditor/ckeditor5-react";
// // import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// import CKEditorWithCollaboration from "./components/CKEditorWithCollaboration";

// export default function App() {
//   return (
//     <div className="App">
//       <CKEditorWithCollaboration />
//       {/* <h2>CKEditor 5 React App</h2>
//       <CKEditor
//         editor={ClassicEditor}
//         data="<p>Hello from CKEditor 5!</p>"
//         onReady={(editor) => {
//           console.log("CKEditor5 React Component is ready to use!", editor);
//         }}
//         onChange={(event, editor) => {
//           const data = editor.getData();
//           console.log({ event, editor, data });
//         }}
//       /> */}
//     </div>
//   );
// }

import "./App.css";
// import "@ckeditor/ckeditor5-react";

// import CKEditorWithCollaboration from "./components/CKEditorWithCollaboration";
import CustomQuillEditor from "./components/CustomQuillEditor";
import DropdownButton from "./components/DropdownButton";

function App() {
  // const handleCollaborationInit = (collaborativeEditing) => {
  //   console.log("Real-time collaboration initialized:", collaborativeEditing);
  //   // Do additional setup or handling here
  // };

  return (
    <div className="App">
      {/* <h1>hello</h1> */}
      {/* <CustomQuillEditor /> */}
      <DropdownButton />
      {/* <h1>Real-Time Collaboration Editor</h1>
      <CKEditorWithCollaboration
        onCollaborationInit={handleCollaborationInit}
      /> */}
    </div>
  );
}

export default App;
