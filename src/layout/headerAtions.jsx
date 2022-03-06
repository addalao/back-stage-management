import {
  BellOutlined,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";

const HeaderActions = () => {
  return (
    <div className="HeaderActions">
      <div className="action">
        <SearchOutlined />
      </div>
      <div className="action">
        <BellOutlined />
      </div>
      <Dropdown
        overlay={
          <Menu className="logoutMenu">
            <Menu.Item key="logout">
              <LogoutOutlined /> 退出登录
            </Menu.Item>
          </Menu>
        }
      >
        <span className="action account">
          <Avatar
            className="avatar"
            size="small"
            src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          />
          <span>liujie</span>
        </span>
      </Dropdown>
    </div>
  );
};

export default HeaderActions;
