import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { AuthContext } from "../State/AuthContext";
import ImageUpload from "../Components/ImageUpload";
import TextInput from "../Components/TextInput";
import SelectInput from "../Components/SelectInput";
import TextArea from "../Components/TextArea";

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
    name: "dateofBirth",
    type: "date",
    placeholder: "Enter date of birth",
    label: "Date of Birth",
  },
  {
    name: "gender",
    type: "select",
    placeholder: "Select your gender",
    label: "Gender",
    options: ["Male", "Female"],
  },
  {
    name: "location",
    type: "text",
    placeholder: "Enter your location",
    label: "Location",
  },
  {
    name: "mbti",
    type: "select",
    placeholder: "Your personality type",
    label: "Personality Type",
    options: [
      "ESTJ",
      "ESTP",
      "ENTJ",
      "ENFJ",
      "ESFJ",
      "ESFP",
      "ENTP",
      "ENFP",
      "ISTJ",
      "ISTP",
      "INTJ",
      "INFJ",
      "ISFJ",
      "ISFP",
      "INTP",
      "INFP",
    ],
  },

  {
    name: "photo",
    placeholder: "Select your best photo",
  },
  {
    name: "bio",
    type: "textarea",
    lable: "Bio",
    placeholder: "Write a short and catchy bio",
  },
];

export default function Onboarding() {
  const { user } = useContext(AuthContext);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const propertyName = onboardingParameters[index].name;
    await updateDoc(doc(db, "users", user.email), {
      [propertyName]: input,
    });
    setInput("");
    if (index === onboardingParameters.length - 1) {
      navigate("/insync/find");
    }
    setIndex((index) => index + 1);
  };

  return (
    <div className="onboarding">
      <div className="onboarding-item">
        {(onboardingParameters[index].type === "text" ||
          onboardingParameters[index].type === "date") && (
          <form onSubmit={handleProfileUpdate}>
            <div className="form-control">
            <TextInput onboardingParameters={onboardingParameters} index={index} value={input} setValue={setInput}/>
              <button
                type="submit"
                className="btn bg-accent text-accent-content"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {onboardingParameters[index].type === "select" && (
          <form onSubmit={handleProfileUpdate}>
            <div className="form-control">
            <SelectInput onboardingParameters={onboardingParameters} index={index} value={input} setValue={setInput} />
              <button
                type="submit"
                className="btn bg-accent text-accent-content w-full"
              >
                Next
              </button>
            </div>
          </form>
        )}
        {onboardingParameters[index].type === "textarea" && (
          <form onSubmit={handleProfileUpdate}>
            {
              onboardingParameters[index].name === "bio" && (
                <TextArea onboardingParameters={onboardingParameters} index={index} value={input} setValue={setInput} />
              )
            }
            <button type="submit" className="btn bg-accent text-accent-content">
              Start Exploring
            </button>
          </form>
        )}
        {onboardingParameters[index].name === "photo" && <ImageUpload onboardingIdx={index} setOnboardingIdx={setIndex} />}
      </div>
    </div>
  );
}
