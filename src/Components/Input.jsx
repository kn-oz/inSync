import React from "react";

export default function Input(props) {
  return (
    <>
      <label htmlFor={props?.id} className="text-xl font-medium font-mono ">
        {props?.name}
      </label>
      <div className="relative mt-1">
        <input
         
          className="w-full rounded-lg border border-gray p-4 text-sm shadow-sm font-serif focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
         {...props}
        
        />
      </div>
    </>
  );
}
