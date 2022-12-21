import React, { useContext } from "react";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { AuthContext } from "../State/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const propertyName = e.target[0].name;
    const propertyValue = e.target[0].value;
    await updateDoc(doc(db, "users", user.email), {
      [propertyName]: propertyValue,
    });
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
        photoURL: photoDownloadURL,}
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="profile flex flex-col p-8 gap-2 justify-center items-center content-center">
      <div className="profile-item w-full">
        <form onSubmit={handleProfileUpdate}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <label className="input-group w-full">
              <span>First Name</span>
              <input
                name="firstName"
                type="text"
                placeholder="Enter first name"
                className="input input-bordered"
              />
            </label>

            <button
              type="submit"
              className="btn bg-accent text-accent-content w-full"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <div className="profile-item w-full">
        <form onSubmit={handleProfileUpdate}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <label className="input-group w-full">
              <span>Last Name</span>
              <input
                name="lastName"
                type="text"
                placeholder="Enter last name"
                className="input input-bordered"
              />
            </label>

            <button
              type="submit"
              className="btn bg-accent text-accent-content w-full"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="profile-item w-full">
        <form onSubmit={handleProfileUpdate}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Enter Height in cm</span>
            </label>
            <label className="input-group w-full">
              <span>Height</span>
              <input
                type="text"
                name="height"
                placeholder="10"
                className="input input-bordered"
              />
              <span>cm</span>
            </label>
          </div>
          <button
            type="submit"
            className="btn bg-accent text-accent-content w-full"
          >
            Save
          </button>
        </form>
      </div>
      <div className="profile-item w-full">
        <form onSubmit={handleProfileUpdate}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Select your gender</span>
            </label>
            <label className="input-group">
              <span>Gender</span>
              <select name="gender" className="select select-accent w-[80%]">
                <option disabled selected>
                  Gender
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
              </select>
            </label>
            <button
              type="submit"
              className="btn bg-accent text-accent-content w-full"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="profile-item w-full">
        <form onSubmit={handleProfileUpdate}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Select your age</span>
            </label>
            <label className="input-group w-full">
              <span>Age</span>
              <input
                name="age"
                type="range"
                min="18"
                max="100"
                className="range range-accent w-full"
              />
            </label>
            <button type="submit" className="btn bg-accent text-accent-content">
              Save
            </button>
          </div>
        </form>
      </div>
      <div className="profile-item">
        <form onSubmit={handleProfileUpdate}>
          <label className="label">
            <span className="label-text">Select your mbti</span>
          </label>
          <label className="input-group">
            <span>MBTI</span>
            <select name="mbti" className="select select-accent w-[80%]">
              <option disabled selected>
                MBTI
              </option>
              <option>ENTP</option>
              <option>INTP</option>
              <option>ENTJ</option>
              <option>INTJ</option>
              <option>ENFJ</option>
              <option>INFJ</option>
              <option>ENFP</option>
              <option>INFP</option>
              <option>ESFJ</option>
              <option>ISFJ</option>
              <option>ESFP</option>
              <option>ISFP</option>
              <option>ESTP</option>
              <option>ISTP</option>
              <option>ESTJ</option>
              <option>ISTJ</option>
            </select>
          </label>
          <button type="submit" className="btn bg-accent text-accent-content">
            Save
          </button>
        </form>
      </div>
      <div className="profile-item">
        <form onSubmit={handleProfileUpdate}>
          <label className="label">
            <span className="label-text">Your Hometown</span>
          </label>
          <label className="input-group w-full">
            <span>Hometown</span>
            <input
              name="hometown"
              type="text"
              placeholder="Enter your hometown"
              className="input input-bordered"
            />
          </label>
          <button type="submit" className="btn bg-accent text-accent-content">
            Save
          </button>
        </form>
      </div>
      <div className="profile-item">
        <form onSubmit={handleProfileUpdate}>
          <label className="label">
            <span className="label-text">Bio</span>
          </label>
          <textarea
            name="bio"
            className="textarea textarea-accent"
            placeholder="Bio"
          ></textarea>
          <button type="submit" className="btn bg-accent text-accent-content">
            Save
          </button>
        </form>
      </div>
      <div className="profile-item">
        <form onSubmit={handlePhotoUpload}>
          <label className="label">
            <span className="label-text">Upload Photo</span>
          </label>
          <input
            name="photo"
            type="file"
            className="file-input file-input-bordered file-input-success w-full max-w-xs"
          />
          <button type="submit" className="btn bg-accent text-accent-content">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
