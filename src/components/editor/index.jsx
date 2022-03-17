import axios from "axios";
import { useEffect } from "react";
import WangEditor from "wangeditor";
let editor = null;

const WEditor = ({ value, onChange }) => {

  useEffect(() => {
    editor = new WangEditor("#editor");
    editor.config.onchange = onChange;
    editor.config.styleWithCSS = true;
    editor.config.height = 200;
    editor.config.customUploadImg = async (files, insert) => {
      const formData = new FormData();
      formData.append("file", files[0]);
      const res = await axios.post("/general/upload", formData);
      insert(res.data);
    };
    editor.create();
    editor.txt.html(value);

    return () => {
      editor.destroy();
    };
  }, [value, onChange]);
  
  return <div id="editor"></div>;
};

export default WEditor;
