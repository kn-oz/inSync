import React, { useContext } from "react";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { AuthContext } from "../State/AuthContext";
import { MdLocationPin } from "react-icons/md";
import { useUser } from "../State/Hooks";
import { NavLink } from "react-router-dom";

export default function Profile() {
  const [userData, setUserData] = useUser();

  if (!userData) {
    return <h1>loading</h1>;
  }

  return (
    <div className="profile p-4 max-w-md">
      <div className="navigation-tab p-2 px-16 mb-2 flex justify-between gap-4 bg-white rounded-md">
        <div className="">
          <NavLink className="text-red-300" to={"/profile"}>
            {({ isActive }) => <span className={`${isActive ? 'text-black' : 'text-gray-2'} text-md font-semibold font-serif`}> Profile</span>}
          </NavLink>
        </div>
        <div className="divider">
          <span>/</span>
        </div>
        <div className="">
          <NavLink className="text-red-300" to={"/edit-profile"}>
            {({ isActive }) => <span className={`${isActive ? 'text-black' : 'text-gray-2'} text-md font-semibold font-serif`}> Edit Profile</span>}
          </NavLink>
        </div>
      </div>
      <div>
        <div className="p-1 relative md:p-0">
          <img
            className="rounded-lg w-96 md:w-[484px] md:aspect-[13/16] md:object-contain"
            src={userData.photo.photoURL}
            alt={userData.firstName}
          />
        </div>

        <h2 className="title px-2 pt-2 pb-0 mb-0 text-lg text-black font-bold font-serif">{`${
          userData.firstName
        } ${userData.lastName}, ${
          new Date().getYear() - (new Date(userData.dateOfBirth).getYear())
        }`}</h2>

        <h3 className="mbti px-3 mb-2 text-sm text-md text-gray-2 font-serif">
          {userData.mbti}
        </h3>
        <div className="location">
          <p className="px-2 pt-2 pb-0 mb-0 flex items-center text-lg text-black font-bold font-serif">
            Location{" "}
            <span className="ml-2">
              <MdLocationPin className="text-accent text-[1.4em]" />
            </span>
          </p>
          <p className="px-3 mt-0 pt-0 mb-2 gap-10 text-sm text-gray-2 text-md font-serif">
            <span>{userData.location} </span>
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
              value={userData.bio}
            ></textarea>
          </p>
        </div>
        <div className="interests min-w-[300px]">
          <p className="px-2 pt-2 pb-0 mb-0 flex items-center text-lg text-black font-bold font-serif">
            Interests{" "}
          </p>
          <div className="mt-2 flex flex-wrap">
            {userData.interests && userData.interests.map((interest) => (
              <p key={interest}>
                <span className="bg-primary text-white inline-flex items-center mr-2 mb-2 rounded-full border border-gray py-2 px-4">
                  {interest}
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
