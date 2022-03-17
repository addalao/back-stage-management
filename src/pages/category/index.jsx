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

import usePagingList from "../../hooks/usePagingList";

function Category() {
  const request = useCallback(async ({ page, size }) => {
    const res = await axios.get("/category", {
      params: { page, size },
    });

    return res.data;
  }, []);
  const { page, size, total, list, setList, getList } = usePagingList(request);

  const columns = [
    {
      title: "分类名称",
      dataIndex: "name",
      render: (v) => {
        return <Space>{v}</Space>;
      },
    },
    {
      title: "分类图片",
      dataIndex: "icon",
      render: (v) => {
        return <Image src={v} width={50} height={50}></Image>;
      },
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
              await axios.put("/category", {
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
                const res = await axios.put("/category", {
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
                const res = await axios.delete("/category", {
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
        columns={columns}
        dataSource={list}
        pagination={{ pageSize: size, total, current: page }}
      ></Table>
    </div>
  );
}
export default Category;
