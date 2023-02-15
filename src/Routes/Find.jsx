import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getDoc, doc, getDocs, updateDoc, collection, query, where, limit, arrayUnion } from "firebase/firestore";
import { AuthContext } from "../State/AuthContext";
import { db } from "../firebase";
import { MatchesActionDispatchContext } from "../State/MatchContext";

export default function Find() {
  const { user } = useContext(AuthContext);
  const dispatch = useContext(MatchesActionDispatchContext);
  console.log("logging user auth data from find component" ,user);
  let navigate = useNavigate();
  
  const [userData, setUserData] = useState(null);

  const [shouldFetch, setShouldFetch] = useState(false);


  const [people, setPeople] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    console.log("use-effect to fetch user data is being called in find component");
      if (user) {
        const getUserData = async () => {
          const userDocSnap = await getDoc(doc(db, 'users', user.email));
          console.log("logging user data from find.jsx" ,userDocSnap.data());
            setUserData(userDocSnap.data());
        };
        getUserData();
      } else {
        setUserData(null);
      }
      
    //return () => unsub();
  }, []);

  useEffect(() => {
    console.log("use-effect to fetch people data is being called in find component");
    const getPeopleQuery = query(
      collection(db, "users"),
      where("uid", "!=", String(user.uid)),
      limit(7)
    );
    const getPeople = async () => {
      const peopleQuerySnapShot = await getDocs(getPeopleQuery);
      const peopleData = peopleQuerySnapShot.docs.map(doc => doc.data());
      console.log("logging people data from find.jsx" ,peopleData);
      setPeople(peopleData);
    }

    getPeople();

  }, [userData, shouldFetch]);


  const handleMatching = async () => {
    dispatch({
      type: "UPDATE_MATCH",
      payload: people[index]
    });
    await updateDoc(doc(db, "users", user.email), {
      matches: arrayUnion(people[index].email),
    });
    navigate("/insync/match-chat")
  }

  const handleRejection = () => {
    if(index === people.length-1) {
      setShouldFetch(fetchFlag => !fetchFlag);
      setPeople([]);
      setIndex(0);
    }
    setIndex(index => index + 1);
  }

  if (people.length === 0) {
    return (
      <div>
        <h1>Find</h1>
        <h2>No one to show</h2>
      </div>
    );
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
          <button onClick={handleRejection}>Reject</button>
          <button onClick={handleMatching}>
            Connect
          </button>{" "}
        </div>
      )}
    </div>
  );
}
