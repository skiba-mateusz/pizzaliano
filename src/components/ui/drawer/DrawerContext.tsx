import React, { createContext, Ref, useContext } from "react";

interface DrawerContextProps extends React.PropsWithChildren {
  onClose: () => void;
  titleID: string;
  closeBtnRef: Ref<HTMLButtonElement | null>;
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

const DrawerProvider: React.FC<DrawerContextProps> = ({
  onClose,
  titleID,
  children,
  closeBtnRef,
}) => {
  return (
    <DrawerContext.Provider value={{ onClose, titleID, closeBtnRef }}>
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
