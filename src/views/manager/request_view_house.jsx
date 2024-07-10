import React, { createContext, useState } from "react";
import { Tabs } from "antd";
import TenantRequestViewHouse from "../request/tenant_request_view_house";
import RentRequestViewHouse from "../request/rent_request_view_house";
const items = [
  {
    key: "1",
    label: "Yêu cầu của tôi",
    children: <RentRequestViewHouse />,
  },
  {
    key: "2",
    label: "Yêu cầu từ khách",
    children: <TenantRequestViewHouse />,
  },
];

export const RequestContext = createContext();

export default function ManagerRequestViewHouse() {
  const [viewUserID, setViewUserID] = useState(null);
  const [openUserModal, setOpenUserModal] = useState(null);
  const contextValue = { viewUserID, setViewUserID, openUserModal, setOpenUserModal };
  return (
    <RequestContext.Provider value={contextValue}>
      <div className="main">
        <Tabs type="card" defaultActiveKey="1" items={items} />
      </div>
    </RequestContext.Provider>
  );
}
