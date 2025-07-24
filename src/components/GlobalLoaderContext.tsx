import React, { createContext, useContext, useState } from 'react';

interface LoaderContextType {
  showMacbookLoader: boolean;
  setShowMacbookLoader: (show: boolean) => void;
  showCircleLoader: boolean;
  setShowCircleLoader: (show: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [showMacbookLoader, setShowMacbookLoader] = useState(true);
  const [showCircleLoader, setShowCircleLoader] = useState(false);

  return (
    <LoaderContext.Provider value={{ showMacbookLoader, setShowMacbookLoader, showCircleLoader, setShowCircleLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const ctx = useContext(LoaderContext);
  if (!ctx) throw new Error('useLoader must be used within LoaderProvider');
  return ctx;
};
