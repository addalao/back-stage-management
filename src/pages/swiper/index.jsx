import {
  Button,
  Form,
  Image,
  message,
  Popconfirm,
  Space,
  Switch,
  Table,
} from "antd";
import axios from "axios";
import { useCallback } from "react";
import FormModal from "../../components/formModal";
import GenaralUpload from "../../components/genalUpload";

import usePagingList from "../../hooks/usePagingList";

const Swiper = () => {
  const request = useCallback(async ({ page, size }) => {
    const res = await axios.get("/swiper", {
      params: { page, size },
    });

    return res.data;
  }, []);
  const { page, size, total, list, setList, getList } = usePagingList(request);

  const columns = [
    {
      title: "图片",
      dataIndex: "url",
      renderFormItem: () => {
        return (
          <Form.Item
            label="图片"
            name="url"
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
        return <Image src={v} width={100} height={50}></Image>;
      },
    },
    {
      title: "跳转地址",
      dataIndex: "jumpUrl",
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
              await axios.put("/swiper", {
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
      title: "操作",
      render: (_, row) => {
        return (
          <Space size={15}>
            <span
              className="actionItem"
              onClick={async () => {
                const values = await FormModal.show({
                  columns,
                  initialValues: row,
                });
                const res = await axios.put("/swiper", {
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
                const res = await axios.delete("/swiper", {
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
              columns,
              initialValues: { active: true },
            });
            const res = await axios.post("/swiper", values);

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
        columns={columns}
        dataSource={list}
        pagination={{ pageSize: size, total, current: page }}
      ></Table>
    </div>
  );
};

export default Swiper;
