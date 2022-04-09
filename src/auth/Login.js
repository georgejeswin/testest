import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Error from "../components/Error";
import Input from "../components/Input";

const formStyles = {
  width: "500px",
  margin: "60px auto",
  padding: "10px",
  marginTop: "200px",
};

const Login = () => {
  const navigate = useNavigate();
  const emptyForm = {
    username: {
      data: "",
      errors: false,
    },
    password: {
      data: "",
      errors: false,
    },
  };

  const [userForm, setUserForm] = useState(emptyForm);
  const [errorCounts, updateErrorCounts] = useState(0);

  const handleChange = ({ target }) => {
    setUserForm((prevFormData) => ({
      ...prevFormData,
      [target.name]: {
        data: target.value,
        errors: false,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateErrorCounts(0);

    const currentForm = userForm;
    for (let field in currentForm) {
      if (
        undefined !== currentForm[field].data &&
        !currentForm[field].data.length
      ) {
        updateErrorCounts((errorCounts) => errorCounts + 1);
        currentForm[field].errors = `Invalid ${field} !!!`;
      }
    }
    setUserForm((prevFormData) => ({ ...currentForm }));
    if (errorCounts === 0) {
      console.log(`No Errors in the Form. Good to submit !`);
    }
    if (
      userForm.username.data === "admin" &&
      userForm.password.data === "123456"
    ) {
      localStorage.setItem("username", userForm.username.data);
      localStorage.setItem("password", userForm.password.data);
      navigate("/home");
    } else if (userForm.password.data !== "123456") {
      console.log(currentForm);
      updateErrorCounts((errorCounts) => errorCounts + 1);
      currentForm.password.errors = "Password does not match..";
    } else if (userForm.username.data !== "admin") {
      updateErrorCounts((errorCounts) => errorCounts + 1);
      currentForm.username.errors = "No user with that username..";
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} style={formStyles}>
      <Input
        name="username"
        label="Username"
        value={userForm.username.data}
        type="text"
        handleChange={handleChange}
      />
      {userForm.username.errors.length && (
        <Error text={userForm.username.errors} />
      )}
      <Input
        name="password"
        label="Password"
        value={userForm.password.data}
        type="password"
        handleChange={handleChange}
      />
      {userForm.password.errors.length && (
        <Error text={userForm.password.errors} />
      )}
      <Button type="submit" label="Login" />
    </form>
  );
};

export default Login;
