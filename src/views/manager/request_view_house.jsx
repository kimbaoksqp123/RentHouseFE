import React from "react";
import { Tabs } from "antd";
import TenantRequestViewHouse from "../request/tenant_request_view_house";
import RentRequestViewHouse from "../request/rent_request_view_house";
const items = [
  {
    key: "1",
    label: "Yêu cầu của tôi",
    children: <RentRequestViewHouse/>,
  },
  {
    key: "2",
    label: "Yêu cầu từ khách",
    children: <TenantRequestViewHouse/>,
  },
];

export default function ManagerRequestViewHouse() {
  return (
    <div className="main">
      <Tabs type="card" defaultActiveKey="1" items={items} />;
    </div>
  );
}
