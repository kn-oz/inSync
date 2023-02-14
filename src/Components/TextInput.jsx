import React, { useState, useContext } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";

export default function TextInput({
  onboardingParameters,
  index,
  value,
  setValue,
}) {
  return (
    <>
      <label className="label">
        <span className="label-text">{onboardingParameters[index].label}</span>
      </label>
      <label className="input-group">
        <span>{onboardingParameters[index].label}</span>
        <input
          required
          name={onboardingParameters[index].name}
          type={onboardingParameters[index].type}
          placeholder={onboardingParameters[index].placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input input-bordered"
        />
      </label>
    </>
  );
}
