import React from "react";
import { Tabs } from "antd";
import RentContract from "../contract/rent_contract";
import RentRequestViewHouse from "../request/rent_request_view_house";
const items = [
  {
    key: "1",
    label: "Hợp đồng cho thuê",
    children: <RentRequestViewHouse/>,
  },
  {
    key: "2",
    label: "Hợp đồng thuê",
    children: <RentContract/>,
  },
];

export default function ManagerContract() {
  return (
    <div className="main">
      <Tabs type="card" defaultActiveKey="1" items={items} />
    </div>
  );
}
