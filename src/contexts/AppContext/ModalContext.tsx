"use client";

import { createContext, useContext, useState } from "react";

const ModalContext = createContext<any>({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
});

export const ModalContextProvider = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </ModalContext.Provider>
  );
};

export const ModalContextConsumer = ModalContext.Consumer;

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(
      "useModalContext must be used within a ModalContextProvider"
    );
  }

  return context;
};
