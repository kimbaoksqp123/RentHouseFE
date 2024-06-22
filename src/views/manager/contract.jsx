import React from "react";
import { Tabs } from "antd";
import RentContract from "../contract/rent_contract";
import TenantContract from "../contract/tenant_contract";
const items = [
  {
    key: "1",
    label: "Hợp đồng cho thuê",
    children: <RentContract/>,
  },
  {
    key: "2",
    label: "Hợp đồng thuê",
    children: <TenantContract/>,
  },
];

export default function ManagerContract() {
  return (
    <div className="main">
      <Tabs type="card" defaultActiveKey="1" items={items} />
    </div>
  );
}
