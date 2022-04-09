import React from "react";

const inputStyles = {
  margin: "5px 0 0px",
  padding: "10px",
  display: "block",
  width: "300px",
  borderRadius: "5px",
  backgroundColor: "transparent",
  border: "1px solid #aaa",
  textAlign: "left",
  fontSize: "16px",
  lineHeight: "20px",
  fontFamily: "inherit",
  letterSpacing: "1px",
};

const labelStyles = {
  margin: "32px 0 0",
  padding: "0",
  display: "block",
  textAlign: "left",
  fontSize: "16px",
  lineHeight: "20px",
  fontWeight: "bold",
  letterSpacing: "1px",
};

const Input = ({ name, label, value, type, handleChange }) => {
  return (
    <>
      <label htmlFor={name} style={labelStyles}>
        {label}:
      </label>
      <input
        style={inputStyles}
        type={type}
        value={value}
        name={name}
        id={name}
        placeholder={`Enter ${name}...`}
        onChange={(e) => handleChange(e)}
      />
    </>
  );
};

export default Input;
