import React from "react";

export default function TextArea({
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
      <textarea
        required
        name={onboardingParameters[index].name}
        className="textarea textarea-accent"
        placeholder={onboardingParameters[index].placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
    </>
  );
}
