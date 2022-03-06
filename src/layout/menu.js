import { HomeOutlined, PictureOutlined, UserOutlined } from "@ant-design/icons";

const menuList = [
  {
    name: "首页",
    icon: <HomeOutlined></HomeOutlined>,
    path: "/",
  },
  {
    name: "用户管理",
    icon: <UserOutlined></UserOutlined>,
    path: "/user",
  },
  {
    name: "轮播图管理",
    icon: <PictureOutlined></PictureOutlined>,
    path: "/swiper",
  },
];

export default menuList;
