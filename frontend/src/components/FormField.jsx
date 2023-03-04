import React from "react";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label htmlFor="{name}">{labelName}</label>
        {isSurpriseMe && (
          <button type="button" onClick={handleSurpriseMe} className="text-xs">
            Surprise Me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-[#4649ff] block w-full p-3"
      />
    </div>
  );
};

export default FormField;
