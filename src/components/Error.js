import React from "react";

const errorStyles = {
  margin: 0,
  padding: "8px",
  fontSize: "11px",
  fontWeight: "bold",
  color: "red",
  clear: "both",
  display: "block",
  textAlign: "left",
};

const Error = ({ text }) => {
  return <span style={errorStyles}>{text}</span>;
};

export default Error;
