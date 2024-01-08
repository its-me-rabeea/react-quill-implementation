// import React from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import Image from "@ckeditor/ckeditor5-image/src/image";
// import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";

// function CKEditorWithCollaboration() {
//   return (
//     <div>
//       <h2>CKEditor 5 React App</h2>
//       <CKEditor
//         editor={ClassicEditor}
//         data="<p>Hello from CKEditor 5!</p>"
//         config={{
//           extraPlugins: [Image, ImageUpload],
//         }}
//         //onError={(chk) => console.log(chk)}
//         onReady={(editor) => {
//           console.log("CKEditor5 React Component is ready to use!", editor);
//         }}
//         onChange={(event, editor) => {
//           const data = editor.getData();
//           console.log({ event, editor, data });
//         }}
//       />
//     </div>
//   );
// }

// export default CKEditorWithCollaboration;

import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function CKEditorWithCollaboration() {
  return (
    <div>
      {" "}
      <h2>CKEditor 5 React App</h2>
      <CKEditor
        onError={(err) => console.log(err)}
        editor={ClassicEditor}
        data="<p>Hello from CKEditor 5!</p>"
        onReady={(editor) => {
          console.log("CKEditor5 React Component is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
      />
    </div>
  );
}

export default CKEditorWithCollaboration;
