import React, { createContext, useState } from 'react';

export const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {
  const [duration, setDuration] = useState("14");
	const [auditeeEmail, setAuditeeEmail] = useState({});
  const setDurationValue = (newDuration) => {
    setDuration(newDuration);
  };

  return (
    <GeneralContext.Provider value={{ duration, setDurationValue, auditeeEmail, setAuditeeEmail }}>
      {children}
    </GeneralContext.Provider>
  );
};
