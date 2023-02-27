import React from "react";
import { useState } from "react";
import classNames from "classnames";

export default function CheckBoxInput(props) {
  const [selectedOptions, setSelectedOptions] = useState(props?.value ? props.value: []);
  const {setValue} = props;

  const handleOptionChange = (option) => {
    let newSelectedOptions = selectedOptions.slice();

    if (selectedOptions.includes(option)) {
      newSelectedOptions = newSelectedOptions.filter(
        (selectedOption) => selectedOption !== option
      );
    } else {
      if(selectedOptions.length < 5) {
        newSelectedOptions.push(option);
      }
    }

    setSelectedOptions(newSelectedOptions);
    setValue(newSelectedOptions);
  };

  return (
    <>
      <p className="label">
        <span className="label-text text-xl font-medium font-mono">{props.name}</span>
      </p>
      <fieldset className="mt-4 border rounded-lg p-4">
        <legend id={props.id} className="text-base font-semibold">
          {props.placeholder}
        </legend>
        <div className="mt-2 flex flex-wrap">
          {props.options.map((option) => (
            <label
              key={option}
              className={classNames(
                "inline-flex items-center mr-2 mb-2 rounded-full border border-gray py-2 px-4 cursor-pointer",
                {
                  "bg-primary": selectedOptions.includes(option),
                  "text-white": selectedOptions.includes(option),
                }
              )}
            >
              <input
                type="checkbox"
                name={props.name}
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionChange(option)}
                className="appearance-none hidden"
              />
              <span className="mr-2">{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </>
  );
}
