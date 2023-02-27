import React, { useState, useContext, useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateDoc, doc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { AuthContext } from "../State/AuthContext";
import placeholderImage from "../assets/placeholder.png"

const style = {
  input: {
    display: "none",
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

const ImageUpload = (props) => {
  console.log("image upload mounted");
  console.log(props.imageUpload)
  console.log(Boolean(props.imageUpload))
  const [image, setImage] = useState(props?.imageUpload);
  const {setImageUpload} = props;
  // ...
  const fileRef = useRef();
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

  return (
    <div className="profile-item">
      <label className="label">
        <span className="label-text text-xl font-medium font-mono">
          {props.placeholder}
        </span>
      </label>
      {image ? (
        <div className="flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={() => {
              fileRef.current.click();
            }}
          >
            <input
              type="file"
              accept="image/*"
              id={props.id}
              style={{ display: "none" }}
              onChange={handleImageChange}
              ref={fileRef}
              className="hidden"
            />
            <div className="flex items-center justify-center">
              <img
                src={image}
                alt="Uploaded image"
                className="block rounded-lg w-96 md:w-[484px] md:aspect-[13/16] md:object-contain"
              />
            </div>
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={() => {
              fileRef.current.click();
            }}
          >
            <input
              type="file"
              accept="image/*"
              id={props.id}
              onChange={handleImageChange}
              ref={fileRef}
              className="hidden"
            />
            <div className="flex items-center justify-center">
              <img
                src={placeholderImage}
                alt="Placeholder"
                className="block rounded-lg w-96 md:w-[484px] md:aspect-[13/16] md:object-contain"
              />
            </div>
          </button>
        </div>
      )}
      
    </div>
  );
};

export default ImageUpload;
