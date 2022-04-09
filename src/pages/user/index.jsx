import {
  Button,
  Image,
  message,
  Popconfirm,
  Space,
  Table,
  Modal,
  Form,
} from "antd";
import axios from "axios";
import { useCallback } from "react";
import FormModal from "../../components/formModal";
import usePagingList from "../../hooks/usePagingList";
import "./index.css";
import GenaralUpload from "../../components/genalUpload";

/* ------------------------------------------------------------ */
const User = () => {
  const request = useCallback(async ({ page, size }) => {
    const res = await axios.get("/user", {
      params: { page, size },
    });

    return res.data;
  }, []);

  const { page, size, total, list, getList } = usePagingList(request);
  const columns = [
    {
      title: "头像",
      dataIndex: "avatar",
      renderFormItem: () => {
        return (
          <Form.Item
            label="商品轮播图"
            name="avatar"
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
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "用户昵称",
      dataIndex: "nickname",
      render: (v, row) => {
        return (
          <>
            <span>{v}</span> <br />
            <span className="level">
              {row.role === "admin" ? "管理员" : "用户"}
            </span>
          </>
        );
      },
    },
    /* {
      title: "用户级别",
      dataIndex: "role",
      render: (v) => {
        return <p>{v === "admin" ? "管理员" : "用户"}</p>;
      },
    }, */
    {
      title: "手机号码",
      dataIndex: "phone",
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
                  hideColKeys: ["username"],
                });
                console.log("111", {
                  id: row.id,

                  ...values,
                  role: row.role,
                });
                const res = await axios.put("/user", {
                  id: row.id,

                  ...values,
                  role: row.role,
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
                const res = await axios.delete("/user", {
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
            <span
              className="actionItem"
              onClick={() => {
                Modal.success({
                  content: "新密码为：12345678",
                });
              }}
            >
              重置密码
            </span>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="User Swiper">
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={async () => {
            const values = await FormModal.show({ columns });
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

export default User;
