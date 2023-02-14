import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../State/AuthContext";
import { db } from "../firebase";

export default function Find() {
  const { user } = useContext(AuthContext);
  console.log(user);
  let navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const person = {
    firstName: "John",
    lastName: "Doe",
    age: 21,
    height: "175",
    mbti: "ENFP",
    hometown: "New York",
    bio: "I like to eat food",
    photoURL:
      "https://images.unsplash.com/photo-1616480461419-8e1b5e1b5f1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  };

  const [people, setPeople] = useState([person]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    //console.log("use-effect is being called")
      if (user) {
        const getUserData = async () => {
          const userDocSnap = await getDoc(doc(db, 'users', user.email));
          console.log('getting user data effect was called');
          //console.log(userDocSnap.data());
            setUserData(userDocSnap.data());
        };
        getUserData();
      } else {
        setUserData(null);
      }
      
    //return () => unsub();
  }, []);

  useEffect(() => {
    console.log(user);
    const getPeopleQuery = query(
      collection(db, "users"),
      where("chatToken", "!=", String(user.chatToken)),
      where("gender", "==", "Male")
    );
    const getPeople = onSnapshot(getPeopleQuery, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setPeople((people) => [...people, doc.data()]);
      });
    });
    return getPeople;
  }, [index]);


  const handleMatching = () => {
    return
  }

  return (
    <div>
      <h1>Find</h1>
      {people.length > 0 && (
        <div>
          {/*
          <img src={people[index].photoURL} alt={people[index].firstName} />
          */}
          <h2>{`${people[index].firstName} ${people[index].lastName}`}</h2>
          <h3>{people[index].DateOfBirth}</h3>
          {/*
          <h3>{people[index].height}</h3>
          <h3>{people[index].mbti}</h3>
          <h3>{people[index].hometown}</h3>
          <h3>{people[index].bio}</h3>
          */}
          <button onClick={() => setIndex((prev) => prev + 1)}>Reject</button>
          <button onClick={handleMatching}>
            Connect
          </button>{" "}
        </div>
      )}
    </div>
  );
}
