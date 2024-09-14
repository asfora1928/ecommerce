import { createContext, useEffect, useState } from "react";
export let UserContext = createContext();
export function UserContextProvider(props) {
  const [userLogin, setUserLogin] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setUserLogin(localStorage.getItem("token"));
    }
  }, []);
  return (
    <UserContext.Provider value={{ userLogin, setUserLogin }}>
      {" "}
      {props.children}{" "}
    </UserContext.Provider>
  );
}
