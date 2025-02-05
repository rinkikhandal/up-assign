import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";

export const RichTextEditor = () => {
  const [value, setValue] = React.useState(() => {
    const savedValue = localStorage.getItem("TextEditorValue");
    return savedValue ? savedValue : "";
  });

  const handleChange = (content) => {
    setValue(content);
  };

  useEffect(() => {
    localStorage.setItem("TextEditorValue", value);
  }, [value]);

  return (
    <>
      <main className="flex w-[100%] min-h-[100dvh] overflow-y-auto">
        <div className="content-grid w-[100%] ">
          <div className="my-auto  w-[100%] ">
            <h2 className="heading mb-[20px] ">Rich Text Editor</h2>
            <div className="text-editor  text-center">
              <EditorToolbar />
              <ReactQuill
                theme="snow"
                value={value}
                onChange={handleChange}
                placeholder={"Write something awesome..."}
                modules={modules}
                formats={formats}
                className="h-80"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
