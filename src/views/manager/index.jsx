import React, { useState, useEffect } from "react";
import "./index.css";
import "react-slideshow-image/dist/styles.css";

import {
  AuditOutlined,
  HomeOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import ManagerRequestViewHouse from "./request_view_house";
import ManagerHouse from "./house";
import ManagerAccount from "./account";
const { Content, Sider } = Layout;

export default function Manager() {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedItem, setSelectedItem] = useState(
    sessionStorage.getItem("selectedItem") || "1"
  );

  useEffect(() => {
    // Lưu giá trị của selectedItem vào session storage
    sessionStorage.setItem("selectedItem", selectedItem);
  }, [selectedItem]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const renderContent = () => {
    switch (selectedItem) {
      case "1":
        return <ManagerAccount />;
      case "2":
        return <ManagerHouse />;
      case "3":
        return <ManagerRequestViewHouse />;
      case "4":
        return <p>Quản lý hợp đồng</p>;
      default:
        return null;
    }
  };

  return (
    <div className="main-box">
      <Layout hasSider>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            paddingTop: "56px",
          }}
          collapsible
          collapsed={collapsed}
          onCollapse={toggleCollapsed}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            inlineCollapsed={collapsed}
            onSelect={({ key }) => setSelectedItem(key)}
            selectedKeys={[selectedItem]}
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              Quản lý tài khoản
            </Menu.Item>
            <Menu.Item key="2" icon={<HomeOutlined />}>
              Quản lý phòng trọ
            </Menu.Item>
            <Menu.Item key="3" icon={<VideoCameraOutlined />}>
              Quản lý yêu cầu xem phòng
            </Menu.Item>
            <Menu.Item key="4" icon={<AuditOutlined />}>
              Quản lý hợp đồng
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial",
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
