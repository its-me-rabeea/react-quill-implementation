import React, { useRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
Quill.register("modules/imageResize", ImageResize);

const CustomQuillEditor = () => {
  const value = useRef("");
  const quillRef = useRef(null);
  const updateKeyOnImageUpload = useRef(0);

  useEffect(() => {
    // Ensure images have the necessary attributes for resizing
    if (quillRef.current) {
      quillRef.current
        .getEditor()
        .clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
          delta.ops = delta.ops.map((op) => {
            if (
              op.insert &&
              typeof op.insert === "object" &&
              op.insert.type === "image"
            ) {
              op.attributes = { class: "quill-image" };
            }
            return op;
          });
          return delta;
        });
      quillRef.current
        .getEditor()
        .clipboard.dangerouslyPasteHTML(value.current || "");
    }
  }, [updateKeyOnImageUpload.current]);

  const handleImageUpload = async (file) => {
    try {
      const dummyEndpoint = "https://dummy.restapiexample.com/api/v1/create";
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(dummyEndpoint, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const imageUrl = await response.json();

        const uploadImage =
          "https://images.unsplash.com/photo-1617331140180-e8262094733a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFieSUyMGJveXxlbnwwfHwwfHx8MA%3D%3D";
        const imageDimensions = { width: 300 };

        if (quillRef.current && quillRef.current.getEditor()) {
          const range = quillRef.current.getEditor().getSelection();
          const editor = quillRef.current.getEditor();

          if (range && editor) {
            editor.clipboard.dangerouslyPasteHTML(
              range.index,
              `<img src="${uploadImage}" width="${imageDimensions.width}">`,
              "silent"
            );
            console.log(
              `Image uploaded successfully at ${dummyEndpoint}`,
              imageUrl
            );
            updateKeyOnImageUpload.current = updateKeyOnImageUpload.current + 1;
          }
        }
      } else {
        console.error("Image upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // const handleDropdownChange = (value) => {
  //   const editor = quillRef.current.getEditor();
  //   const range = editor.getSelection();
  //   if (range) {
  //     editor.insertText(range.index, value, "custom-dropdown");
  //     editor.setSelection(range.index + value.length);
  //   }
  // };

  // const modules = {
  //   toolbar: {
  //     container: [
  //       [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //       ["bold", "italic", "underline", "strike"],
  //       ["blockquote", "code-block"],
  //       [{ list: "ordered" }, { list: "bullet" }],
  //       ["link", "image"],
  //       ["clean"],
  //       [
  //         {
  //           label: "My Dropdown",
  //           type: "button",
  //           className: "my-dropdown",
  //           list: ["Option 1", "Option 2"],
  //           handler: function (value) {
  //             const editor = this.quill;
  //             const range = editor.getSelection();
  //             if (range) {
  //               editor.insertText(range.index, value, "custom-dropdown");
  //               editor.setSelection(range.index + value.length);
  //             }
  //           },
  //         },
  //       ],
  //     ],
  //     handlers: {
  //       image: () => {
  //         const input = document.createElement("input");
  //         input.setAttribute("type", "file");
  //         input.setAttribute("accept", "image/*");
  //         input.addEventListener("change", () => {
  //           const file = input.files[0];
  //           if (file) {
  //             handleImageUpload(file);
  //           }
  //         });
  //         input.click();
  //       },
  //     },
  //   },
  //   imageResize: {
  //     modules: ["Resize", "DisplaySize"],
  //   },
  // };
  // const modules = {
  //   toolbar: {
  //     container: [
  //       [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //       ["bold", "italic", "underline", "strike"],
  //       ["blockquote", "code-block"],
  //       [{ list: "ordered" }, { list: "bullet" }],
  //       ["link", "image"],
  //       ["clean"],
  //       [{ "custom-dropdown": ["Option 1", "Option 2"] }],
  //     ],
  //     handlers: {
  //       image: () => {
  //         const input = document.createElement("input");
  //         input.setAttribute("type", "file");
  //         input.setAttribute("accept", "image/*");
  //         input.addEventListener("change", () => {
  //           const file = input.files[0];
  //           if (file) {
  //             handleImageUpload(file);
  //           }
  //         });
  //         input.click();
  //       },
  //       "custom-dropdown": function (value) {
  //         const editor = quillRef.current.getEditor();
  //         const range = editor.getSelection();
  //         if (range) {
  //           editor.insertText(
  //             range.index,
  //             `You selected ${value}`,
  //             "custom-dropdown"
  //           );
  //           editor.setSelection(range.index + `You selected ${value}`.length);
  //         }
  //       },
  //     },
  //   },
  //   imageResize: {
  //     modules: ["Resize", "DisplaySize"],
  //   },
  // };

  // const formats = [
  //   "header",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "strike",
  //   "blockquote",
  //   "code-block",
  //   "list",
  //   "bullet",
  //   "link",
  //   "image",
  //   "clean",
  //   "custom-dropdown",
  // ];

  // const modules = {
  //   toolbar: {
  //     container: [
  //       [{ 'myDropdown': ['Option 1', 'Option 2', 'Option 3'] }], // Custom dropdown
  //       // ...other toolbar items
  //     ],
  //     handlers: {
  //       'myDropdown': (value) => {
  //         if (value) {
  //           // Apply formatting based on selected option
  //           this.quill.format('custom-format', value); // Use a custom format
  //         }
  //       }
  //     }
  //   }
  // };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        // [
        //   {
        //     myDropdown: [
        //       "Option 1",
        //       "Option 2",
        //       "Option 3",
        //       "Option 4",
        //       "Option 5",
        //     ],
        //   },
        // ],

        // [
        //   {
        //     myDropdown: [
        //       { value: "Option 1", label: "Option 1" },
        //       { value: "Option 2", label: "Option 2" },
        //       { value: "Option 3", label: "Option 3" },
        //       { value: "Option 4", label: "Option 4" },
        //       { value: "Option 5", label: "Option 5" },
        //     ],
        //   },
        // ],
        // [
        //   {
        //     label: "My Dropdown",
        //     type: "select",
        //     myDropdown: [
        //       { value: "Option 1", label: "Option 1" },
        //       { value: "Option 2", label: "Option 2" },
        //       { value: "Option 3", label: "Option 3" },
        //       { value: "Option 4", label: "Option 4" },
        //       { value: "Option 5", label: "Option 5" },
        //     ],
        //   },
        // ],
        // [
        //   {
        //     myDropdown: [
        //       "Option 1",
        //       "Option 2",
        //       "Option 3",
        //       "Option 4",
        //       "Option 5",
        //     ],
        //   },
        // ],
        ["clean"],
        // [
        //   {
        //     label: "Custom Dropdown",
        //     type: "dropdown",
        //     values: [
        //       { value: "option1", label: "Option 1" },
        //       { value: "option2", label: "Option 2" },
        //     ],
        //     custom: true,
        //     handler: handleDropdownChange,
        //   },
        // ],

        // [
        //   {
        //     myDropdown:
        //       //{
        //       // Options should be an array of strings
        //       // options:
        //       ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
        //     // },
        //     label: "My Dropdown", // Add a label to the dropdown button
        //   },
        // ],

        // [{ myDropdown: ["Option 1", "Option 2", "Option 3"] }], // Custom dropdown
        [
          "myDropdown", // Use the toolbar item name directly
          {
            // Define dropdown options with correct structure
            options: [
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ],
          },
        ],
        // [
        //   {
        //     myDropdown: [
        //       { value: "Option 1", label: "Option 1" },
        //       { value: "Option 2", label: "Option 2" },
        //       { value: "Option 3", label: "Option 3" },
        //     ],
        //   },
        // ],
      ],
      handlers: {
        image: () => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.addEventListener("change", () => {
            const file = input.files[0];
            if (file) {
              handleImageUpload(file);
            }
          });
          input.click();
        },

        //   handlers: {
        myDropdown: (value) => {
          if (value) {
            // Apply formatting based on selected option
            this.quill.format("custom-format", value);
          }
        },
        // myDropdown: (value) => {
        //   if (value) {
        //     // Apply formatting based on selected option
        //     this.quill.format("custom-format", value); // Use a custom format
        //   }
        // },
        //  },
      },
    },
    imageResize: {
      modules: ["Resize", "DisplaySize"],
    },
  };

  return (
    <ReactQuill
      key={updateKeyOnImageUpload.current}
      theme="snow"
      ref={quillRef}
      value={value?.current}
      onChange={(e) => {
        value.current = e;
      }}
      modules={modules}
      // formats={formats}
    />
  );
};

export default CustomQuillEditor;

// import React, { useRef, useEffect } from "react";
// import ReactQuill, { Quill } from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import ImageResize from "quill-image-resize-module-react";
// Quill.register("modules/imageResize", ImageResize);

// const CustomQuillEditor = () => {
//   const value = useRef("");
//   const quillRef = useRef(null);
//   const updateKeyOnImageUpload = useRef(0);

//   useEffect(() => {
//     // Ensure images have the necessary attributes for resizing
//     if (quillRef.current) {
//       quillRef.current
//         .getEditor()
//         .clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
//           delta.ops = delta.ops.map((op) => {
//             if (
//               op.insert &&
//               typeof op.insert === "object" &&
//               op.insert.type === "image"
//             ) {
//               op.attributes = { class: "quill-image" };
//             }
//             return op;
//           });
//           return delta;
//         });
//       quillRef.current
//         .getEditor()
//         .clipboard.dangerouslyPasteHTML(value.current || "");
//     }
//   }, [updateKeyOnImageUpload.current]);

//   const handleImageUpload = async (file) => {
//     try {
//       const dummyEndpoint = "https://dummy.restapiexample.com/api/v1/create";
//       const formData = new FormData();
//       formData.append("image", file);

//       const response = await fetch(dummyEndpoint, {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         const imageUrl = await response.json();

//         const uploadImage =
//           "https://images.unsplash.com/photo-1617331140180-e8262094733a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFieSUyMGJveXxlbnwwfHwwfHx8MA%3D%3D";
//         // Create a new Image element to get the dimensions
//         const img = new Image();
//         img.src = uploadImage;

//         // Set the dimensions of the image (e.g., width: 500, height: 300)
//         const imageDimensions = { width: 300 };

//         if (quillRef.current && quillRef.current.getEditor()) {
//           // Insert the uploaded image into the editor
//           const range = quillRef.current.getEditor().getSelection();
//           const editor = quillRef.current.getEditor();

//           if (range && editor) {
//             // Check if range and editor are defined
//             editor.clipboard.dangerouslyPasteHTML(
//               range.index,
//               `<img src="${uploadImage}" width="${imageDimensions.width}">`,
//               "silent"
//             );
//             console.log(
//               `Image uploaded successfully at ${dummyEndpoint}`,
//               imageUrl
//             );
//             updateKeyOnImageUpload.current = updateKeyOnImageUpload.current + 1;
//           }
//         }
//       } else {
//         console.error("Image upload failed:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   const handleDropdownChange = (value) => {
//     // Handle the dropdown value change
//     console.log("Selected dropdown value:", value);
//     quillRef.current.getEditor().focus();
//     quillRef.current.getEditor().format("custom-dropdown", value);
//   };

//   const modules = {
//     toolbar: {
//       container: [
//         [{ header: [1, 2, 3, 4, 5, 6, false] }],
//         ["bold", "italic", "underline", "strike"],
//         ["blockquote", "code-block"],
//         [{ list: "ordered" }, { list: "bullet" }],
//         ["link", "image"],
//         ["clean"],
//         [
//           {
//             label: "Custom Dropdown",
//             type: "select",
//             options: [
//               { value: "option1", label: "Option 1" },
//               { value: "option2", label: "Option 2" },
//             ],
//             custom: true,
//             handler: handleDropdownChange,
//             icon: "\u2303", // Unicode character for an icon (you can replace this)
//           },
//         ],
//       ],
//       handlers: {
//         image: () => {
//           // Trigger the image upload when the image button is clicked
//           const input = document.createElement("input");
//           input.setAttribute("type", "file");
//           input.setAttribute("accept", "image/*");
//           input.addEventListener("change", () => {
//             const file = input.files[0];
//             if (file) {
//               handleImageUpload(file);
//             }
//           });
//           input.click();
//         },
//       },
//     },
//     imageResize: {
//       modules: ["Resize", "DisplaySize"],
//     },
//   };

//   return (
//     <ReactQuill
//       key={updateKeyOnImageUpload.current}
//       theme="snow"
//       ref={quillRef}
//       value={value?.current}
//       onChange={(e) => {
//         value.current = e;
//       }}
//       modules={modules}
//     />
//   );
// };

// export default CustomQuillEditor;
