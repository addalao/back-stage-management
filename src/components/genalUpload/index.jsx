import React, { useState } from "react";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

/**
 *
 * @param props.value example 多图片上传时:value = ["htttp://url.png"],单图片上传时:value = "htttp://url.png"
 * @param props.onChange 多图片上传时:onChange(["htttp://url.png"]),单图片上传时:onChange("htttp://url.png")
 * @returns
 */
const GenaralUpload = (props) => {
  const token = localStorage.getItem("token");
  const { value, onChange, children } = props;

  const getInitFileList = () => {
    if (!value) return [];
    if (value instanceof Array) {
      return value.map((v) => {
        return {
          url: v,
          response: v,
        };
      });
    }
    return [{ url: value, response: value }];
  };

  const [fileList, setFileList] = useState(getInitFileList());

  return (
    <Upload
      {...props}
      listType="picture-card"
      fileList={fileList}
      name="file"
      headers={{ Authorization: `Bearer ${token}` }}
      action={`/api/general/upload`}
      onPreview={(v) => {
        window.open(v.response);
      }}
      onChange={(v) => {
        setFileList(v.fileList);
        const list = v.fileList.map((f) => f.response);
        const value = v.file.status === "removed" ? "" : v.file.response;
        const res = value instanceof Array ? list : value;
        onChange && onChange(res);
      }}
    >
      {children || <PlusOutlined></PlusOutlined>}
    </Upload>
  );
};

export default GenaralUpload;
