import { createContext } from "react";
import backend from "../components/backend";

export const CsrfContext = createContext("");

export const CsrfProvider = ({ children }) => {
  const getCsrfToken = async () => {
    try {
      console.log("Fetching CSRF from backend...");
      const response = await backend.get("/csrf-provider/");
      console.log(`CSRF Response: ${response.data.csrfToken}`);
      if (response.status === 200) {
        return response.data.csrfToken;
      }
    } catch (e) {
      console.log(`Error fetching CSRF Token!! ${e}`);
    }
  };

  console.log("CSRF component loaded");
  return (
    <CsrfContext.Provider value={{ getCsrfToken }}>
      {children}
    </CsrfContext.Provider>
  );
};
