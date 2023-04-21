import React, { useState } from "react";
const UserContext = React.createContext();


export const UserStore = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
        token,
        setToken,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;