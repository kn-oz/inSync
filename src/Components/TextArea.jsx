import React from "react";

export default function TextArea(props) {
  return (
    <>
      <label className="label text-xl font-medium font-mono" id={props.id}>
        <span className="label-text">{props.name}</span>
      </label>
      <div className="relative mt-1">
        <textarea
          wrap="soft"
          className="w-full h-48 rounded-lg border border-gray p-4 text-sm shadow-sm font-serif focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          {...props}
          
        ></textarea>
      </div>
    </>
  );
}
