// import React, { useState, useRef, useEffect } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import "./CustomQuillEditor.css";

// const DropdownButton = () => {
//   const [editorHtml, setEditorHtml] = useState("");
//   const quillRef = useRef(null);

//   useEffect(() => {
//     const customButton = document.querySelector(".ql-myDropdown");
//     if (customButton) {
//       customButton.innerHTML = `
//         <select class="ql-myDropdownSelect">
//           <option value="selectOption">Select Option</option>
//           <option value="tagButton">Add Tag</option>
//           <option value="Option 1">Option 1</option>
//           <option value="Option 2">Option 2</option>
//           <option value="Option 3">Option 3</option>
//           <option value="Option 4">Option 4</option>
//         </select>
//       `;

//       const select = customButton.querySelector(".ql-myDropdownSelect");
//       select.addEventListener("change", () =>
//         handleCustomDropdownChange(select.value)
//       );
//     }
//   }, [editorHtml]);

//   const handleCustomDropdownChange = (value) => {
//     if (quillRef.current) {
//       const cursorPosition =
//         quillRef.current.getEditor().getSelection()?.index || 0;

//       if (value === "tagButton") {
//         const tagName = prompt("Enter tag name:");
//         if (tagName) {
//           quillRef.current
//             .getEditor()
//             .insertText(cursorPosition, `<${tagName}> `);
//         }
//       } else {
//         quillRef.current
//           .getEditor()
//           .insertText(cursorPosition, `Selected option: ${value}`);
//       }
//     } else {
//       console.error("Quill editor not initialized.");
//     }
//   };

//   const handleImageUpload = async (file) => {
//     // ... (existing image upload code)
//   };

//   const modules = {
//     toolbar: {
//       container: [
//         [{ header: [1, 2, false] }],
//         ["bold", "italic", "underline", "strike", "blockquote"],
//         [{ list: "ordered" }, { list: "bullet" }],
//         ["link", "image"],
//         ["customButton"], // Add the custom button to the toolbar
//         ["clean"],
//         ["myDropdown"],
//         // ["customButton"], // Add the custom button to the toolbar
//       ],
//       handlers: {
//         image: () => {
//           // ... (existing image handler code)
//         },
//         customButton: () => {
//           if (quillRef.current) {
//             const cursorPosition =
//               quillRef.current.getEditor().getSelection()?.index || 0;
//             quillRef.current
//               .getEditor()
//               .insertText(cursorPosition, "Custom Button Clicked!");
//           } else {
//             console.error("Quill editor not initialized.");
//           }
//         },
//       },
//     },
//   };

//   const formats = ["myDropdown", "customButton", "image"];

//   return (
//     <ReactQuill
//       ref={quillRef}
//       theme="snow"
//       value={editorHtml}
//       onEditorChange={(html) => setEditorHtml(html)}
//       modules={modules}
//       formats={formats}
//     />
//   );
// };

// export default DropdownButton;

// // import React, { useState, useRef, useEffect } from "react";
// // import ReactQuill from "react-quill";
// // import "react-quill/dist/quill.snow.css"; // Import the styles
// // import "./CustomQuillEditor.css"; // Import the custom stylesheet

// // const DropdownButton = () => {
// //   const [editorHtml, setEditorHtml] = useState("");
// //   const quillRef = useRef(null);

// //   useEffect(() => {
// //     const customButton = document.querySelector(".ql-myDropdown");
// //     if (customButton) {
// //       customButton.innerHTML = `
// //         <select class="ql-myDropdownSelect">
// //           <option value="selectOption">Select Option</option>
// //           <option value="tagButton">Add Tag</option>
// //           <option value="Option 1">Option 1</option>
// //           <option value="Option 2">Option 2</option>
// //           <option value="Option 3">Option 3</option>
// //           <option value="Option 4">Option 4</option>
// //         </select>
// //       `;

// //       const select = customButton.querySelector(".ql-myDropdownSelect");
// //       select.addEventListener("change", () =>
// //         handleCustomDropdownChange(select.value)
// //       );
// //     }
// //   }, [editorHtml]);
// //   //   useEffect(() => {
// //   //     const customButton = document.querySelector(".ql-myDropdown");
// //   //     if (customButton) {
// //   //       customButton.innerHTML = `
// //   //         <select class="ql-myDropdownSelect">
// //   //           <option value="">Select Option</option>
// //   //           <option value="Option 1">Option 1</option>
// //   //           <option value="Option 2">Option 2</option>
// //   //           <option value="Option 3">Option 3</option>
// //   //           <option value="Option 4">Option 4</option>
// //   //           <option value="Option 5">Option 5</option>
// //   //         </select>
// //   //       `;

// //   //       const select = customButton.querySelector(".ql-myDropdownSelect");
// //   //       select.addEventListener("change", () =>
// //   //         handleCustomDropdownChange(select.value)
// //   //       );
// //   //     }
// //   //   }, [editorHtml]);

// //   //   const handleCustomDropdownChange = (value) => {
// //   //     if (quillRef.current) {
// //   //       const cursorPosition =
// //   //         quillRef.current.getEditor().getSelection()?.index || 0;
// //   //       quillRef.current
// //   //         .getEditor()
// //   //         .insertText(cursorPosition, `Selected option: ${value}`);
// //   //     } else {
// //   //       console.error("Quill editor not initialized.");
// //   //     }
// //   //   };

// //   const handleCustomDropdownChange = (value) => {
// //     if (quillRef.current) {
// //       const cursorPosition =
// //         quillRef.current.getEditor().getSelection()?.index || 0;

// //       if (value === "tagButton") {
// //         // Add your logic to insert the tag into the editor
// //         const tagName = prompt("Enter tag name:");
// //         if (tagName) {
// //           quillRef.current
// //             .getEditor()
// //             .insertText(cursorPosition, `<${tagName}> `);
// //         }
// //       } else {
// //         quillRef.current
// //           .getEditor()
// //           .insertText(cursorPosition, `Selected option: ${value}`);
// //       }
// //     } else {
// //       console.error("Quill editor not initialized.");
// //     }
// //   };

// //   const handleImageUpload = async (file) => {
// //     // Simulate image upload to a dummy endpoint
// //     try {
// //       const dummyEndpoint = "https://dummy.restapiexample.com/api/v1/create";
// //       const formData = new FormData();
// //       formData.append("image", file);

// //       const response = await fetch(dummyEndpoint, {
// //         method: "POST",
// //         body: formData,
// //       });

// //       if (response.ok) {
// //         const imageUrl = await response.json();
// //         // Insert the uploaded image into the editor
// //         const range = quillRef.current.getEditor().getSelection();
// //         quillRef.current
// //           .getEditor()
// //           .insertEmbed(range.index, "image", imageUrl);
// //         console.log(`Image uploaded successfully at ${dummyEndpoint}`);
// //       } else {
// //         console.error("Image upload failed:", response.statusText);
// //       }
// //     } catch (error) {
// //       console.error("Error uploading image:", error);
// //     }
// //   };

// //   const modules = {
// //     toolbar: {
// //       container: [
// //         [{ header: [1, 2, false] }],
// //         ["bold", "italic", "underline", "strike", "blockquote"],
// //         [{ list: "ordered" }, { list: "bullet" }],
// //         ["link", "image"],
// //         ["clean"],
// //         ["myDropdown"], // Explicitly add the custom dropdown to the toolbar
// //       ],
// //       handlers: {
// //         image: () => {
// //           // Trigger the image upload when the image button is clicked
// //           const input = document.createElement("input");
// //           input.setAttribute("type", "file");
// //           input.setAttribute("accept", "image/*");
// //           input.addEventListener("change", () => {
// //             const file = input.files[0];
// //             if (file) {
// //               handleImageUpload(file);
// //             }
// //           });
// //           input.click();
// //         },
// //       },
// //     },
// //   };

// //   const formats = ["myDropdown", "image"];

// //   return (
// //     <ReactQuill
// //       ref={quillRef}
// //       theme="snow"
// //       value={editorHtml}
// //       onEditorChange={(html) => setEditorHtml(html)}
// //       modules={modules}
// //       formats={formats}
// //     />
// //   );
// // };

// // export default DropdownButton;
