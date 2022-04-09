import {
  Button,
  Form,
  Image,
  message,
  Popconfirm,
  Space,
  Switch,
  Table,
  Select,
} from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import WEditor from "../../components/editor";
import FormModal from "../../components/formModal";
import GenaralUpload from "../../components/genalUpload";

import usePagingList from "../../hooks/usePagingList";

function Commodity() {
  const [cates, setCates] = useState([]);
  const getCates = async () => {
    const res = await axios.get("/category", {
      params: { page: 1, size: 1000 },
    });
    setCates(res.data.list);
  };

  useEffect(() => {
    getCates();
  }, []);
  const request = useCallback(async ({ page, size }) => {
    const res = await axios.get("/goods", {
      params: { page, size },
    });

    return res.data;
  }, []);
  const { page, size, total, list, setList, getList } = usePagingList(request);

  const columns = [
    {
      title: "分类名称",
      fixed: "left",
      dataIndex: "name",
      render: (v) => {
        return <Space>{v}</Space>;
      },
    },
    {
      title: "商品图片",
      dataIndex: "cover",
      renderFormItem: () => {
        return (
          <Form.Item
            label="商品图"
            name="cover"
            rules={[
              {
                required: true,
                message: "请上传图片",
              },
            ]}
          >
            <GenaralUpload maxCount={1}></GenaralUpload>
          </Form.Item>
        );
      },
      render: (v) => {
        return <Image src={v} width={50} height={50}></Image>;
      },
    },
    {
      title: "商品轮播图",
      dataIndex: "imgs",
      renderFormItem: () => {
        return (
          <Form.Item
            label="商品轮播图"
            name="imgs"
            rules={[
              {
                required: true,
                message: "请上传图片",
              },
            ]}
          >
            <GenaralUpload></GenaralUpload>
          </Form.Item>
        );
      },
    },
    {
      title: "所属分类",
      dataIndex: "cates",
      renderFormItem: () => {
        return (
          <Form.Item label="所属分类" name="cates" required>
            <Select
              mode="multiple"
              options={cates.map((v) => {
                return {
                  label: v.name,
                  value: v.id,
                };
              })}
            ></Select>
          </Form.Item>
        );
      },
      render: (v) => v.map((i) => i.name).join("，"),
    },
    {
      title: "是否上架",
      dataIndex: "active",
      renderFormItem: () => {
        return (
          <Form.Item
            label="是否上架"
            name="active"
            valuePropName="checked"
            required
          >
            <Switch></Switch>
          </Form.Item>
        );
      },
      render: (v, row, i) => {
        return (
          <Switch
            checked={v}
            onChange={async (value) => {
              setList((data) => {
                data[i].active = value;
                return [...data];
              });
              await axios.put("/goods", {
                ...row,
                active: value,
              });
              message.success("操作成功");
            }}
          ></Switch>
        );
      },
    },
    {
      title: "详情",
      dataIndex: "details",
      span: 24,
      renderFormItem: () => {
        return (
          <Form.Item name="details" noStyle>
            <WEditor></WEditor>
          </Form.Item>
        );
      },
    },
    {
      title: "操作",
      fixed: "right",
      render: (_, row) => {
        return (
          <Space size={15}>
            <span
              className="actionItem"
              onClick={async () => {
                const values = await FormModal.show({
                  columns,
                  width: 1500,
                  height: 700,
                  initialValues: {
                    ...row,
                    cates: row.cates.map((v) => v.id),
                  },
                });
                const res = await axios.put("/goods", {
                  ...values,
                  id: row.id,
                });

                if (res) {
                  getList();
                  message.success("操作成功");
                }
              }}
            >
              编辑
            </span>
            <Popconfirm
              className="actionItem dangerText"
              title="是否确认删除？"
              onConfirm={async () => {
                const res = await axios.delete("/goods", {
                  params: {
                    id: row.id,
                  },
                });
                if (res) {
                  getList();
                  message.success("操作成功");
                }
              }}
            >
              删除
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <div className="Swiper">
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={async () => {
            const values = await FormModal.show({
              width: 1500,
              height: 700,
              columns,
              initialValues: { active: true },
            });
            const res = await axios.post("/category", values);

            if (res) {
              getList();
              message.success("操作成功");
            }
          }}
        >
          新增
        </Button>
      </Space>
      <Table
        rowKey="id"
        columns={columns.filter(
          (v) => !(v.dataIndex === "imgs" || v.dataIndex === "details")
        )}
        dataSource={list}
        pagination={{ pageSize: size, total, current: page }}
        scroll={{ x: 1000, y: 300 }}
      ></Table>
    </div>
  );
}
export default Commodity;
