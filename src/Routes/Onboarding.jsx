import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { AuthContext } from "../State/AuthContext";

export default function Onboarding() {
  const { user } = useContext(AuthContext);

  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  
  const onboardingParameters = [
    {
        name: "firstName",
        type: "text",
        placeholder: "Enter first name",
        label: "First Name",
    },
    {
        name: "lastName",
        type: "text",
        placeholder: "Enter last name",
        label: "Last Name",
    },
    {
        name: "DateofBirth",
        type: "date",
        placeholder: "Enter date of birth",
        label: "Date of Birth",
    },
  ]

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const propertyName = e.target[0].name;
    const propertyValue = e.target[0].value;
   
    
    await updateDoc(doc(db, "users", user.email), {
      [propertyName]: propertyValue,
    });
    if (index === onboardingParameters.length - 1) {
        navigate("/insync/profile");
    }
    setIndex(index => index + 1);
  };

  const handlePhotoUpload = async (e) => {
    e.preventDefault();
    const photo = e.target[0].files[0];
    const storageRef = ref(storage, `${photo.name}`);
    try {
      const uploadTask = await uploadBytes(storageRef, photo);
      const photoDownloadURL = await getDownloadURL(storageRef);
      await updateProfile(user, {
        photoURL: photoDownloadURL,
      });
      await updateDoc(doc(db, "users", user.email), {
        photoURL: photoDownloadURL,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="onboarding">
      <div className="onboarding-item">
        <form onSubmit={handleProfileUpdate}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">{onboardingParameters[index].label}</span>
            </label>
            <label className="input-group">
              <span>{onboardingParameters[index].label}</span>
              <input
                name={onboardingParameters[index].name}
                type={onboardingParameters[index].type}
                placeholder={onboardingParameters[index].placeholder}
                className="input input-bordered"
              />
            </label>
            <button type="submit" className="btn bg-accent text-accent-content">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
