import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import menuList from "./menu";

const NavMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Menu className="menu" theme="dark" defaultSelectedKeys={location.pathname}>
      {menuList.map((item) => {
        return (
          <Menu.Item
            icon={item.icon}
            key={item.path}
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default NavMenu;
