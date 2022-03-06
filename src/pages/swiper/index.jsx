import { Image, Switch, Table } from "antd";
import axios from "axios";
import { useCallback } from "react";
import usePagingList from "../../hooks/usePagingList";

const Swiper = () => {
  const request = useCallback(async ({ page, size }) => {
    const res = await axios.get("/swiper", {
      params: { page, size },
    });

    return res.data;
  }, []);
  const { page, size, total, list, setList } = usePagingList(request);

  const columns = [
    {
      title: "图片",
      dataIndex: "url",
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
      render: (v, _, i) => {
        return (
          <Switch
            checked={v}
            onChange={(value) => {
              setList((data) => {
                data[i].active = value;
                return [...data];
              });
            }}
          ></Switch>
        );
      },
    },
    {
      title: "操作",
      render: () => {
        return <span className="actionItem">编辑</span>;
      },
    },
  ];

  return (
    <div className="Swiper">
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
