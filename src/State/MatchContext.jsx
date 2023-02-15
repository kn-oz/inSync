import { createContext, useContext, useReducer } from "react";
import Cookies from "js-cookie";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const MatchesDataContext = createContext(null);
export const MatchesActionDispatchContext = createContext(null);

const currentMatch = {currentMatch: Cookies.get("currentMatch") ? JSON.parse(Cookies.get("currentMatch")) : null}

export const MatchProvider = ({ children }) => {
  const [matchesData, dispatch] = useReducer(authReducer, currentMatch);
  //console.log("user data provider mounted");

  return (
    <MatchesDataContext.Provider value={matchesData}>
      <MatchesActionDispatchContext.Provider value={dispatch}>
        {children}
      </MatchesActionDispatchContext.Provider>
    </MatchesDataContext.Provider>
  );
};

function authReducer(state, action) {
  switch (action.type) {
    case "UPDATE_MATCH": {
      const newData = action.payload;
      console.log("logging current match data from match context",newData);
      Cookies.set("currentMatch", JSON.stringify(newData))
      return {...state, currentMatch: {...newData} };
    }
    case "CLEAR_USER_DATA": {
      return null;
    }
  }
}
