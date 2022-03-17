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
      onRemove={(v) => {
        setFileList((old) => {
          const i = old.findIndex((f) => f.uid === v.uid);
          old.splice(i, 1);
          const list = old.map((f) => f.response);
          const res = value instanceof Array ? list : v.file.response;
          onChange && onChange(res);
          return [...old];
        });
      }}
      onPreview={(v) => {
        window.open(v.response);
      }}
      onChange={(v) => {
        setFileList(v.fileList);
        if (v.file.status === "done") {
          const list = v.fileList.map((f) => f.response);
          const res = value instanceof Array ? list : v.file.response;
          onChange && onChange(res);
        }
      }}
    >
      {children || <PlusOutlined></PlusOutlined>}
    </Upload>
  );
};

export default GenaralUpload;
