import { createContext, useContext, useState } from "react";

export const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <NavContext.Provider
      value={{
        isNavOpen,
        handleNav,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => {
  return useContext(NavContext);
};
