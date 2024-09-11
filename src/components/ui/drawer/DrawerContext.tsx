import React, { createContext, useContext } from "react";

interface DrawerContextProps extends React.PropsWithChildren {
  onClose: () => void;
  titleID: string;
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

const DrawerProvider: React.FC<DrawerContextProps> = ({
  onClose,
  titleID,
  children,
}) => {
  return (
    <DrawerContext.Provider value={{ onClose, titleID }}>
      {children}
    </DrawerContext.Provider>
  );
};

const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error("useDrawer used outsied its provider");
  }

  return context;
};

export { DrawerProvider, useDrawer };
