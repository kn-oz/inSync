import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateDoc, doc, serverTimestamp, Timestamp } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { AuthContext } from "../State/AuthContext";
import { onboardingParameters } from "../State/onboardingParameters";
import Input from "../Components/Input";
import ButtonWithIcon from "../Components/ButtonWithIcon";
import ImageUpload from "../Components/ImageUpload";
import SelectInput from "../Components/SelectInput";
import CheckBoxInput from "../Components/CheckBoxInput";
import TextArea from "../Components/TextArea";



export default function Onboarding() {
  const { user } = useContext(AuthContext);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const navigate = useNavigate();

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const propertyName = onboardingParameters[index].id;
    console.log("logging input", input);
    await updateDoc(doc(db, "users", user.email), {
      [propertyName]: input,
    });
    setInput("");
    if (index === onboardingParameters.length - 1) {
      navigate("/find");
    }
    setIndex((index) => index + 1);
  };

  const handlePhotoUpload = async (e) => {
    e.preventDefault();
    const propertyName = onboardingParameters[index].id;
    const storageRef = ref(storage, `${imageUpload.name}`);
    try {
      const uploadTask = await uploadBytes(storageRef, imageUpload);
      const photoDownloadURL = await getDownloadURL(storageRef);
      updateDoc(doc(db, "users", user.email), {
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
    if (index === onboardingParameters.length - 1) {
      navigate("/find");
    }
    setIndex((index) => index + 1);
  };

  return (
    <div className="onboarding h-screen">
      <div className="onboarding-item h-full">
        {(onboardingParameters[index].type === "text" ||
          onboardingParameters[index].type === "date") && (
          <form className="h-full" onSubmit={handleProfileUpdate}>
            <div className="h-full form-control p-12 mx-auto md:mt-64 max-w-lg">
              <div className="onboarding-input mb-4">
                <Input
                  isRequired={true}
                  id={onboardingParameters[index].id}
                  name={onboardingParameters[index].name}
                  type={onboardingParameters[index].type}
                  placeholder={onboardingParameters[index].placeholder}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <div className="next-button flex justify-end">
                <ButtonWithIcon type="submit" value="Next" />
              </div>
            </div>
          </form>
        )}

        {onboardingParameters[index].type === "select" && (
          <div className="form-control p-12 mx-auto max-w-lg">
            <div className="onboarding-input mb-4">
              <SelectInput
                id={onboardingParameters[index].id}
                name={onboardingParameters[index].name}
                placeholder={onboardingParameters[index].placeholder}
                setValue={setInput}
                options={onboardingParameters[index].options}
              />
            </div>
            <div className="next-button flex justify-end">
              <ButtonWithIcon onClick={handleProfileUpdate} value="Next" />
            </div>
          </div>
        )}
        {onboardingParameters[index].id === "photo" && (
          <form onSubmit={handlePhotoUpload}>
            <div className="form-control p-12 mx-auto max-w-lg">
              <div className="onboarding-input mb-4">
                <ImageUpload
                  id={onboardingParameters[index].id}
                  placeholder={onboardingParameters[index].placeholder}
                  setImageUpload={setImageUpload}
                />
              </div>
              <div className="next-button flex justify-end">
                <ButtonWithIcon type="submit" value="Next" />
              </div>
            </div>
          </form>
        )}

        {onboardingParameters[index].id === "interests" && (
          <form onSubmit={handleProfileUpdate}>
            <div className="form-control p-12 mx-auto max-w-lg">
              <div className="onboarding-input mb-4">
                <CheckBoxInput
                  id={onboardingParameters[index].id}
                  name={onboardingParameters[index].name}
                  placeholder={onboardingParameters[index].placeholder}
                  setValue={setInput}
                  options={onboardingParameters[index].options}
                />
              </div>
              <div className="next-button flex justify-end">
                <ButtonWithIcon type="submit" value="Next" />
              </div>
            </div>
          </form>
        )}
        {onboardingParameters[index].type === "textarea" && (
          <form onSubmit={handleProfileUpdate}>
            <div className="form-control p-12 mx-auto max-w-lg">
              <div className="onboarding-input mb-4">
                <TextArea
                  id={onboardingParameters[index].id}
                  name={onboardingParameters[index].name}
                  placeholder={onboardingParameters[index].placeholder}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <div className="next-button flex justify-end">
                <ButtonWithIcon type="submit" value="Finish" />
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
