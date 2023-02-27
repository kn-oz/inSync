import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDoc,
  doc,
  getDocs,
  updateDoc,
  collection,
  query,
  where,
  limit,
  arrayUnion,
} from "firebase/firestore";
import { AuthContext } from "../State/AuthContext";
import { db } from "../firebase";
import { MatchesActionDispatchContext } from "../State/MatchContext";
import { useUser } from "../State/Hooks";
import { FaHeart, FaThumbsDown } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";

export default function Find() {
  const { user } = useContext(AuthContext);
  const dispatch = useContext(MatchesActionDispatchContext);
  //console.log("logging user auth data from find component" ,user);
  let navigate = useNavigate();

  const [userData, setUserData] = useUser();
  console.log(userData);

  const [shouldFetch, setShouldFetch] = useState(false);

  const [people, setPeople] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    //console.log("use-effect to fetch people data is being called in find component")
    const getPeopleQuery = query(
      collection(db, "users"),
      where("uid", "!=", String(user.uid)),
      limit(7)
    );
    const getPeople = async () => {
      const peopleQuerySnapShot = await getDocs(getPeopleQuery);
      const peopleData = peopleQuerySnapShot.docs.map((doc) => doc.data());
      //console.log("logging people data from find.jsx", peopleData);
      setPeople(peopleData);
    };

    getPeople();
  }, [userData, shouldFetch]);

  const handleMatching = async () => {
    dispatch({
      type: "UPDATE_MATCH",
      payload: people[index],
    });
    await updateDoc(doc(db, "users", user.email), {
      matches: arrayUnion(people[index].email),
    });
    navigate("/insync/match-chat");
  };

  const handleRejection = () => {
    if (index === people.length - 1) {
      setShouldFetch((fetchFlag) => !fetchFlag);
      setPeople([]);
      setIndex(0);
    }
    setIndex((index) => index + 1);
  };

  if (people.length === 0) {
    return (
      <div>
        <h1>Find</h1>
        <h2>No one to show</h2>
      </div>
    );
  }

  return (
    <div className="find p-4">
      {people.length > 0 && (
        <div>
          <div className="p-1 relative md:p-0">
            <img
              className="rounded-lg w-96 md:mx-auto md:w-[484px] md:aspect-[13/16] md:object-contain"
              src={people[index].photo.photoURL}
              alt={people[index].firstName}
            />
            <button
              className="absolute bottom-3 left-5 p-3 rounded-[50%] bg-white shadow-md md:left-8"
              onClick={handleRejection}
            >
              <FaThumbsDown style={{ color: "#e24f50", fontSize: "2em" }} />
            </button>
            <button
              className="absolute bottom-3 right-5 p-3 rounded-[50%] bg-white shadow-md md:right-8"
              onClick={handleMatching}
            >
              <FaHeart style={{ color: "#e24f50", fontSize: "2em" }} />
            </button>{" "}
          </div>

          <h2 className="title px-2 pt-2 pb-0 mb-0 text-lg text-black font-bold font-serif">{`${
            people[index].firstName
          } ${people[index].lastName}, ${
            new Date().getYear() - new Date(people[index].dateOfBirth).getYear()
          }`}</h2>

          <h3 className="mbti px-3 mb-2 text-sm text-md text-gray-2 font-serif">
            {people[index].mbti}
          </h3>
          <div className="location">
            <p className="px-2 pt-2 pb-0 mb-0 flex items-center text-lg text-black font-bold font-serif">
              Location{" "}
              <span className="ml-2">
                <MdLocationPin className="text-accent text-[1.4em]" />
              </span>
            </p>
            <p className="px-3 mt-0 pt-0 mb-2 gap-10 text-sm text-gray-2 text-md font-serif">
              <span>{people[index].location} </span>
            </p>
          </div>
          <div className="about">
            <p className="px-2 pt-2 pb-0 mb-0 flex items-center text-lg text-black font-bold font-serif">
              About{" "}
            </p>
            <p className="px-3 mt-0 pt-0 mb-2 gap-10 text-sm text-md font-serif">
              <textarea
                readOnly
                wrap="soft"
                className="w-full rounded-lg border border-gray p-2 text-sm shadow-lg font-serif focus:outline-none focus:ring-none focus:border-transparent resize-none"
                value={people[index].bio}
              ></textarea>
            </p>
          </div>
          <div className="interests">
            <p className="px-2 pt-2 pb-0 mb-0 flex items-center text-lg text-black font-bold font-serif">
              Interests{" "}
            </p>
            <div className="mt-2 flex flex-wrap">
              {people[index].interests.map((interest) => (
                <p key={interest}>
                  <span className="bg-primary text-white inline-flex items-center mr-2 mb-2 rounded-full border border-gray py-2 px-4">
                    {interest}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
