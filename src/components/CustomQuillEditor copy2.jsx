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
            // quillRef.current.getEditor().clipboard.dangerouslyPasteHTML(
            //   range.index,
            //   `<img src="${uploadImage}" width="${imageDimensions.width}">`,
            //   "silent"
            //   // .insertEmbed(
            //   //   range.index,
            //   //   "image",
            //   //   "https://images.unsplash.com/photo-1617331140180-e8262094733a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFieSUyMGJveXxlbnwwfHwwfHx8MA%3D%3D",
            //   //   { ...imageDimensions }
            // );
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

        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],

        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
          { align: [] },
        ],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ direction: "rtl" }], // text direction,

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme

        ["link", "image"],

        ["clean"],
        // [{ header: [1, 2, false] }],
        // ["bold", "italic", "underline", "strike", "blockquote"],
        // [{ list: "ordered" }, { list: "bullet" }],
        // ["link", "image"],
        // ["clean"],
        // // Alignment options
        // [{ align: [] }],
        // // // Additional options
        // // ["color", "background"],
        // // [{ size: ["small", false, "large", "huge"] }],
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
      },
    },
    // // Enable the image resize module
    // imageResize: {},

    imageResize: {
      // parchment: Quill.import('parchment'),
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
    />
  );
};

export default CustomQuillEditor;
