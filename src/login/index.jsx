import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import "./index.css";

const Login = () => {
  const navigate = useNavigate();
  const submit = async (values) => {
    const res = await axios.post("/user/login", values);
    if (res.data) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      message.success("登录成功");
      navigate("/", { replace: true });
    }
  };
  return (
    <div className="Login">
      <img src={logo} alt="logo" className="logo" />
      <h1>校滴外卖管理后台</h1>
      <Form className="loginForm" size="large" onFinish={submit}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: "#888" }}></UserOutlined>}
            placeholder="请输入用户名"
          ></Input>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input
            prefix={<LockOutlined style={{ color: "#888" }}></LockOutlined>}
            placeholder="请输入密码"
          ></Input>
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            登 录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
