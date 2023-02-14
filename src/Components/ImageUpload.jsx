import React, { useState, useContext } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateDoc, doc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { AuthContext } from "../State/AuthContext";

const style = {
  input: {
    display: "block",
    marginBottom: "10px",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  image: {
    position: "relative",
    width: "100px",
    height: "100px",
    marginRight: "10px",
    marginBottom: "10px",
    objectFit: "cover",
  },
  button: {
    position: "absolute",
    top: "5px",
    right: "5px",
    backgroundColor: "white",
    color: "red",
    border: "none",
    padding: "5px",
    borderRadius: "50%",
    cursor: "pointer",
  },
  placeholder: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
  },
};

const ImageUpload = ({ onboardingIdx, setOnboardingIdx }) => {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  // ...

  const handleImageChange = (event) => {
    //console.log(event.target.files[0]);
    const file = event.target.files[0];

    
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
    setImageUpload(file);
  };

  const handlePhotoUpload = async (e) => {
    e.preventDefault();

    const storageRef = ref(storage, `${imageUpload.name}`);
    try {
      const uploadTask = await uploadBytes(storageRef, imageUpload);
      const photoDownloadURL = await getDownloadURL(storageRef);
      updateDoc(doc(db, "users", user.email), {
        photo: {
          id: crypto.randomUUID(),
          photo: photoDownloadURL,
          date: Timestamp.now(),
        },
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.log("error", error);
    }

    setOnboardingIdx((idx) => idx + 1);
  };

  return (
    <div className="profile-item">
    <form onSubmit={handlePhotoUpload}>
      
      <label className="label">
            <span className="label-text">Upload Photo</span>
          </label>
        <input
          type="file"
          accept="image/*"
          style={style.input}
          onChange={handleImageChange}
        />
        {image ? (
          <div>
            <img src={image} alt="Uploaded image" style={style.image} />
            <button
              style={style.button}
              onClick={() => {
                setImageUpload(null);
                setImage(null);
              }}
            >
              Remove
            </button>
          </div>
        ) : (
          <div>
            <img
              src="https://via.placeholder.com/100x100.png?text=Placeholder"
              alt="Placeholder"
              style={style.placeholder}
            />
          </div>
        )}
      
      <button type="submit" className="btn bg-accent text-accent-content">
        Next
      </button>
    </form>
    </div>
  );
};

export default ImageUpload;
