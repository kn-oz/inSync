import React, { useState } from "react";

export default function SelectInput(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(props?.value);

  const {setValue} = props;

  function handleSelect(option) {
    setSelectedOption(option);
    setValue(option);
    setIsOpen(false);
  }

  return (
    <>
      <p className="label">
        <span className="label-text text-xl font-medium font-mono">{props?.name}</span>
      </p>

      <div className="relative" id={props?.id}>
        <div
          className="w-full bg-white rounded-lg border border-gray p-4 pr-12 text-sm font-serif shadow-sm cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? selectedOption : props.placeholder}
        </div>
        {isOpen && (
          <ul className="w-full top-full left-0 z-50 bg-white rounded-lg border border-gray p-4 shadow-sm">
            {selectedOption && (
              <li key={props.id} className="w-full p-2 bg-gray rounded-lg">
                {props.id}
              </li>
            )}
            {props.options.map((option) => (
              <li
                key={option}
                className="w-full p-2 font-serif cursor-pointer rounded-lg hover:bg-primary hover:text-white"
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
