import React, { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CustomQuillEditor = () => {
  const value = useRef("");
  const quillRef = useRef(null);
  const updateKeyOnImageUpload = useRef(0);
  const handleImageUpload = async (file) => {
    // Simulate image upload to a dummy endpoint
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
        // Insert the uploaded image into the editor
        const range = quillRef.current.getEditor().getSelection();
        quillRef.current
          .getEditor()
          .insertEmbed(
            range.index,
            "image",
            "https://images.unsplash.com/photo-1617331140180-e8262094733a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFieSUyMGJveXxlbnwwfHwwfHx8MA%3D%3D"
          );
        console.log(
          `Image uploaded successfully at ${dummyEndpoint}`,
          imageUrl
        );
        updateKeyOnImageUpload.current = updateKeyOnImageUpload.current + 1;
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
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
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
  };
  const formats = ["myDropdown", "image"];
  console.log("value", value);
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
      formats={formats}
    />
  );
};
export default CustomQuillEditor;
/////sahiiii walaaaa haiiiii yehhhhh
