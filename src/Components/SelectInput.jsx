import React from "react";

export default function SelectInput({
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
        <select
          required
          name="gender"
          className="select select-accent w-[80%]"
          value={value ? value : onboardingParameters[index].placeholder}
          onChange={(e) => setValue(e.target.value)}
        >
          <option disabled selected>
            {onboardingParameters[index].placeholder}
          </option>
          {onboardingParameters[index].options.map((option) => {
            return <option>{option}</option>;
          })}
        </select>
      </label>
    </>
  );
}
