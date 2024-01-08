import React, { useRef, useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import "./CustomQuillEditor.css";
import { render } from "react-dom";
import CustomDropdown from "./CustomDropdown";

Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/customDropdown", CustomDropdown);

const DropdownButton = () => {
  const quillRef = useRef(null);

  const value = useRef("");
  // const [dropdownsAdded, setDropdownsAdded] = useState(false);
  //const [editorReady, setEditorReady] = useState(false);

  const updateKeyOnImageUpload = useRef(0);

  const handleCustomButtonTags = () => {
    let customFieldNames = [];

    customFieldNames.push("Add Custom Field");
    customFieldNames.push("Option 1");
    customFieldNames.push("Option 2");
    customFieldNames.push("Option 3");
    customFieldNames.push("Option 4");

    const customDropdown = document.querySelector(".ql-customDropdown");
    if (customDropdown) {
      const customDropdownContainer = document.createElement("div");
      customDropdownContainer.classList.add("custom-dropdown-container");

      render(
        <CustomDropdown
          options={customFieldNames}
          //  handleAdd={handleAdd}
          selectedOption={handleSelectedOption}
        />,
        customDropdownContainer
      );

      customDropdown.appendChild(customDropdownContainer);
    }

    let builtInFieldNames = [];

    builtInFieldNames.push("Options");
    builtInFieldNames.push("Options");
    builtInFieldNames.push("Options");
    builtInFieldNames.push("Options");

    const builtInDropdown = document.querySelector(".ql-builtInDropdown");
    if (builtInDropdown) {
      const builtInDropdownContainer = document.createElement("div");
      builtInDropdownContainer.classList.add("custom-dropdown-container");

      render(
        <CustomDropdown
          options={builtInFieldNames}
          selectedOption={handleSelectedOption}
        />,
        builtInDropdownContainer
      );

      builtInDropdown.appendChild(builtInDropdownContainer);
    }
  };

  useEffect(() => {
    // const initializeEditor = async () => {
    handleCustomButtonTags();

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

    // setEditorReady(true);
    // };

    //  initializeEditor();
  }, [updateKeyOnImageUpload.current]);

  const handleSelectedOption = (selectedValue) => {
    if (quillRef.current) {
      const cursorPosition =
        quillRef.current.getEditor().getSelection()?.index || 0;

      quillRef.current
        .getEditor()
        .insertText(cursorPosition, `${selectedValue} `);
    }
  };

  const handleImageUpload = async (file) => {
    try {
      const add = 0;
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
        // Create a new Image element to get the dimensions
        const img = new Image();
        img.src = uploadImage;

        // Set the dimensions of the image (e.g., width: 500, height: 300)
        const imageDimensions = { width: 300 };

        if (quillRef.current && quillRef.current.getEditor()) {
          // Insert the uploaded image into the editor
          const range = quillRef.current.getEditor().getSelection();
          const editor = quillRef.current.getEditor();

          if (range && editor) {
            // Check if range and editor are defined
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

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ newButton: "New Field" }],

        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
          { align: [] },
        ],
        [{ script: "sub" }, { script: "super" }],
        [{ direction: "rtl" }],

        ["link", "image"],

        ["clean"],

        ["customDropdown"],

        ["builtInDropdown"],
      ],
      handlers: {
        image: () => {
          // Trigger the image upload when the image button is clicked
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

        newButton: function () {
          if (quillRef.current) {
            const fieldName = prompt("Enter field name:");
            if (fieldName) {
              const fieldValue = prompt("Enter field value:");
              if (fieldValue) {
                const cursorPosition =
                  quillRef.current.getEditor().getSelection()?.index || 0;

                // Convert fieldValue to lowercase
                const lowercaseValue = fieldName.toLowerCase();

                const insertText = `{${lowercaseValue}}`;

                quillRef.current
                  .getEditor()
                  .insertText(cursorPosition, insertText);
              }
            }
          } else {
            console.error("Quill editor not initialized.");
          }
        },
      },
    },
    imageResize: {
      // parchment: Quill.import('parchment'),
      modules: ["Resize", "DisplaySize"],
    },
  };

  return (
    <ReactQuill
      key={updateKeyOnImageUpload.current}
      ref={quillRef}
      theme="snow"
      value={value?.current}
      onChange={(e) => {
        value.current = e;
      }}
      modules={modules}
      // formats={formats}
    />
  );
};

export default DropdownButton;

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
//         [{ customButton: "Custom Button" }], // Add the custom button to the toolbar with label
//         ["clean"],
//         ["myDropdown"],
//         // [{ customButton: "Custom Button" }], // Add the custom button to the toolbar with label
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
