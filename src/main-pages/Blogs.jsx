/* eslint-disable */
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

export default function Blogs() {
  const [heading, setHeading] = useState("");
  const editorRef = useRef(null);

  const blogDb = collection(db, "Articles");

  const handleSubmit = async () => {
    const editorContent = editorRef.current.getContent();
    await addDoc(blogDb, {
      title: heading,
      content: editorContent,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "98%",
      }}
    >
      <input
        style={{ width: "98%" }}
        className="heading"
        placeholder="Enter Your Heading..."
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
      />
      <Editor
        style={{ margin: "20px", width: "80%" }}
        apiKey="3ndhmpe51ugtoclqyqce7168o8jfdix2tf1toojmh5hykc4g"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue=""
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | fontselect fontsizeselect | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | image",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          image_title: true,
          automatic_uploads: true,
          file_picker_types: "image",
          file_picker_callback: (callback, value, meta) => {
            if (meta.filetype === "image") {
              const input = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");

              input.onchange = function () {
                const file = this.files[0];
                const reader = new FileReader();

                reader.onload = function () {
                  const id = `blobid${new Date().getTime()}`;
                  const { blobCache } = editorRef.current.editorUpload;
                  const base64 = reader.result.split(",")[1];
                  const blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);
                  callback(blobInfo.blobUri(), { title: file.name });
                };

                reader.readAsDataURL(file);
              };

              input.click();
            }
          },
        }}
      />
      <button type="button" className="btn" onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
}
