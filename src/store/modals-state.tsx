import {
  ReactNode,
  useState,
  createContext,
  FC,
  Dispatch,
  SetStateAction,
} from "react";

type ModalsStateType = {
  username: boolean;
};

export const ModalsContext = createContext<{
  modals: ModalsStateType;
  setModals: Dispatch<SetStateAction<ModalsStateType>>;
}>({
  // Default state
  modals: {
    username: false,
  },
  setModals: () => {},
});

export const ModalsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState({
    username: false,
  });

  return (
    <ModalsContext.Provider
      value={{
        modals,
        setModals,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};
