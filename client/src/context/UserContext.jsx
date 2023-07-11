import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [picture, setPicture] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      // setPicture(localStorage.getItem("picture"))
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    // localStorage.setItem("picture", picture)
    // console.log("picture=",picture)
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser,picture,setPicture }}>
      {children}
    </UserContext.Provider>
  );
}
