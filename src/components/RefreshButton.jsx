import React from 'react';
import { ReloadOutlined } from '@ant-design/icons';

const RefreshButton = ({ handleRefresh }) => {
  return (
    <div className="w-32 text-15" style={{ marginBottom: 16 }}>
      <button
        key="refresh"
        className="w-full border bg-green-50 hover:bg-green-100 border-green-500  text-green-500 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleRefresh}
      >
        Làm mới
        <ReloadOutlined className="text-15 ml-2" />
      </button>
    </div>
  );
};

export default RefreshButton;
