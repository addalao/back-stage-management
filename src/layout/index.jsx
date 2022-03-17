import { Layout, Spin } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";
import logo from "../logo.svg";
import HeaderActions from "./headerAtions";
import "./index.css";
import NavMenu from "./navMenu";

const { Header, Footer, Sider, Content } = Layout;

const Home = React.lazy(() => import("../pages/home"));
const User = React.lazy(() => import("../pages/user"));
const Swiper = React.lazy(() => import("../pages/swiper"));
const Category = React.lazy(() => import("../pages/category"));
const Commodity = React.lazy(() => import("../pages/commodity"));

const BasicLayout = () => {
  return (
    <Layout className="layout">
      <Sider className="sider">
        <img className="logo" alt="logo" src={logo}></img>
        <NavMenu></NavMenu>
      </Sider>
      <Layout className="rightLayout">
        <Header className="header">
          <HeaderActions></HeaderActions>
        </Header>
        <Content className="content">
          <React.Suspense
            fallback={<Spin className="loading" tip="Loading..." />}
          >
            <Routes>
              <Route
                path="/commodity"
                element={<Commodity></Commodity>}
              ></Route>
              <Route path="/category" element={<Category></Category>}></Route>
              <Route path="/user" element={<User></User>}></Route>
              <Route path="/swiper" element={<Swiper></Swiper>}></Route>
              <Route path="/" element={<Home></Home>}></Route>
            </Routes>
          </React.Suspense>
        </Content>
        <Footer className="footer">Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
