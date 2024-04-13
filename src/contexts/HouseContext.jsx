import React, { createContext, useContext, useState } from 'react';

const HouseContext = createContext();

export const useHouseContext = () => useContext(HouseContext);

export const HouseProvider = ({ children }) => {
    const [sendData, setSendData] = useState({ currentTab: 0, houseID: null });

  return (
    <HouseContext.Provider value={{ sendData, setSendData }}>
      {children}
    </HouseContext.Provider>
  );
};
