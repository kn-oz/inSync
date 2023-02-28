import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateDoc, doc, serverTimestamp, Timestamp } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { useUser } from "../State/Hooks";
import { onboardingParameters } from "../State/onboardingParameters";
import Input from "../Components/Input";
import ButtonWide from "../Components/ButtonWide";
import ImageUpload from "../Components/ImageUpload";
import SelectInput from "../Components/SelectInput";
import CheckBoxInput from "../Components/CheckBoxInput";
import TextArea from "../Components/TextArea";

export default function EditProfile() {
  const [userData, setUserData] = useUser();

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState(null);
  const [location, setLocation] = useState(null);
  const [bio, setBio] = useState(null);
  const [mbti, setMbti] = useState(null);
  const [interests, setInterests] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setDateOfBirth(userData.dateOfBirth);
      setGender(userData.gender);
      setLocation(userData.location);
      setBio(userData.bio);
      setMbti(userData.mbti);
      setInterests(userData.interests);
      setImageUpload(userData.photo.photoURL);

      setFlag(true);
    }
  }, [userData]);

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("handleUpdate called");
    handleProfileUpdate("firstName", firstName);
    handleProfileUpdate("lastName", lastName);
    handleProfileUpdate("dateOfBirth", dateOfBirth);
    handleProfileUpdate("gender", gender);
    handleProfileUpdate("location", location);
    handleProfileUpdate("bio", bio);
    handleProfileUpdate("mbti", mbti);
    handleProfileUpdate("interests", interests);
    handlePhotoUpload();
  };
  const handleProfileUpdate = async (propertyName, propertyValue) => {
    await updateDoc(doc(db, "users", userData.email), {
      [propertyName]: propertyValue 
    });
  };

  const handlePhotoUpload = async (e) => {
    const propertyName = "photo";
    const storageRef = ref(storage, `${imageUpload.name}`);
    try {
      const uploadTask = await uploadBytes(storageRef, imageUpload);
      const photoDownloadURL = await getDownloadURL(storageRef);
      updateDoc(doc(db, "users", userData.email), {
        [propertyName]: {
          id: crypto.randomUUID(),
          photoURL: photoDownloadURL,
          date: Timestamp.now(),
        },
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  //console.log(Boolean(userData));
  //console.log(userData);

  if (!flag) {
    return <h1>loading</h1>;
  }
  return (
    <div className="edit-profile p-4 max-w-md">
      <div className="navigation-tab p-2 px-16 mb-2 flex justify-between gap-4 bg-white rounded-md">
        <div className="">
          <NavLink className="text-red-300" to={"/profile"}>
            {({ isActive }) => (
              <span
                className={`${
                  isActive ? "text-black" : "text-gray-2"
                } text-md font-semibold font-serif`}
              >
                {" "}
                Profile
              </span>
            )}
          </NavLink>
        </div>
        <div className="divider">
          <span>/</span>
        </div>
        <div className="">
          <NavLink className="text-red-300" to={"/edit-profile"}>
            {({ isActive }) => (
              <span
                className={`${
                  isActive ? "text-black" : "text-gray-2"
                } text-md font-semibold font-serif`}
              >
                {" "}
                Edit Profile
              </span>
            )}
          </NavLink>
        </div>
      </div>
      <div className="">
        <div className="h-full form-control p-2 md:mt-4 max-w-lg">
          <form onSubmit={handleUpdate}>
            <div className="onboarding-input mb-8">
              <ImageUpload
                required={true}
                id={onboardingParameters[6].id}
                name={onboardingParameters[6].name}
                placeholder={onboardingParameters[6].placeholder}
                imageUpload={imageUpload}
                setImageUpload={setImageUpload}
              />
            </div>
            <div className="onboarding-input mb-8">
              <Input
                required={true}
                id={onboardingParameters[0].id}
                name={onboardingParameters[0].name}
                type={onboardingParameters[0].type}
                placeholder={onboardingParameters[0].placeholder}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="onboarding-input mb-8">
              <Input
                required={true}
                id={onboardingParameters[1].id}
                name={onboardingParameters[1].name}
                type={onboardingParameters[1].type}
                placeholder={onboardingParameters[1].placeholder}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="onboarding-input mb-8">
              <Input
                required={true}
                id={onboardingParameters[2].id}
                name={onboardingParameters[2].name}
                type={onboardingParameters[2].type}
                placeholder={onboardingParameters[2].placeholder}
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div className="onboarding-input mb-8">
              <SelectInput
                id={onboardingParameters[3].id}
                name={onboardingParameters[3].name}
                placeholder={onboardingParameters[3].placeholder}
                value={gender}
                setValue={setGender}
                options={onboardingParameters[3].options}
              />
            </div>
            <div className="onboarding-input mb-8">
              <Input
                required={true}
                id={onboardingParameters[4].id}
                name={onboardingParameters[4].name}
                type={onboardingParameters[4].type}
                placeholder={onboardingParameters[4].placeholder}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="onboarding-input mb-8">
              <SelectInput
                id={onboardingParameters[5].id}
                name={onboardingParameters[5].name}
                placeholder={onboardingParameters[5].placeholder}
                value={mbti}
                setValue={setMbti}
                options={onboardingParameters[5].options}
              />
            </div>
            <div className="onboarding-input mb-8">
              <CheckBoxInput
                id={onboardingParameters[7].id}
                name={onboardingParameters[7].name}
                placeholder={onboardingParameters[7].placeholder}
                options={onboardingParameters[7].options}
                value={interests}
                setValue={setInterests}
              />
            </div>
            <div className="onboarding-input mb-8">
              <TextArea
                id={onboardingParameters[8].id}
                name={onboardingParameters[8].name}
                placeholder={onboardingParameters[8].placeholder}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className="onboarding-input mb-8">
                <ButtonWide type="submit" value="Update" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
