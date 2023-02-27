import React from "react";

export default function ButtonWithIcon(props) {
  return (
    <>
      <button
        className="inline-flex items-center gap-2 rounded border border-primary bg-primary px-8 py-3 text-white hover:bg-transparent hover:text-primary focus:outline-none focus:ring active:text-primary active:bg-transparent transition ease-in-out duration-150"
        {...props}
      >
        <span className="text-lg font-medium font-serif"> {props.value} </span>
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>
    </>
  );
}
