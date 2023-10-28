import React, { createContext, useState } from "react";

const UpdateAppContext = createContext(null);

export const UpdateAppProvider = ({ children }) => {
  const [updateApp, setUpdateApp] = useState(false);

  const updateContext = () => {
    setUpdateApp(!updateApp)
  }

  return (
    <UpdateAppContext.Provider value={updateContext}>
      {children}
    </UpdateAppContext.Provider>
  );
};

export default UpdateAppContext;