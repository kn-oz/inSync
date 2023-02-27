import {useContext ,useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "./AuthContext";

export function useUser() {
    const {user} = useContext(AuthContext);

    const [userData, setUserData] = useState();

    useEffect(() => {
        //console.log("use-effect to fetch user data is being called in find component");
        if (user) {
          const getUserData = async () => {
            const userDocSnap = await getDoc(doc(db, "users", user.email));
            //console.log("logging user data from find.jsx", userDocSnap.data());
            setUserData(userDocSnap.data());
          };
          getUserData();
        } else {
          setUserData(null);
        }
      }, []);

      return [userData, setUserData];
}
