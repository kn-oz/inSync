import { createContext, useContext, useReducer } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const UserDataContext = createContext(null);
export const UserDataActionDispatchContext = createContext(null);

export const UserDataProvider = ({ children }) => {
  const [userData, dispatch] = useReducer(authReducer, {});
  //console.log("user data provider mounted");

  return (
    <UserDataContext.Provider value={userData}>
      <UserDataActionDispatchContext.Provider value={dispatch}>
        {children}
      </UserDataActionDispatchContext.Provider>
    </UserDataContext.Provider>
  );
};

function authReducer(state, action) {
  switch (action.type) {
    case "updateUserData": {
      const newData = action.payload;
      //console.log(newData);
      return { ...state, ...newData };
    }
    case "clearUserData": {
      return null;
    }
  }
}
