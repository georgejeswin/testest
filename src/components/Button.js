import React from "react";

const buttonStyles = {
  margin: "30px auto",
  padding: "10px 20px",
  textAlign: "center",
  fontSize: "16px",
  lineHeight: "20px",
  fontFamily: "inherit",
  fontWeight: "bold",
  letterSpacing: "1px",
  clear: "both",
  border: "1px solid #c4c4c4",
  borderRadius: "5px",
};

const Button = ({ type, label, onClick }) => {
  return (
    <button type={type} style={buttonStyles} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
