import "../styles/SignupBox.css";
import React from "react";
import ErrorNotification from "./ErrorNotification";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/user";

const CreateAccount = () => {
  const [notification, setNotification] = useState("");
  const navigateTo = useNavigate();
  const accountCreation = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmpassword.value;
    if (
      password === confirmPassword &&
      password.length >= 3 &&
      username.length >= 3
    ) {
      try {
        await userService.create({ username, password });
        navigateTo("/");
      } catch (expection) {
        console.log(expection.response.data.error);
      }
    } else {
      setNotification(
        "the username and password must be atleast 3 characters long"
      );
      setTimeout(() => {
        setNotification("");
      }, 5000);
    }
  };

  return (
    <div className="signup-box">
      <a href="/">
        <b>&lt;--</b>
      </a>
      <div className="tooltip">
        <u>i</u>
        <span className="tooltiptext">
          Username and password must be at least 3 characters long.
        </span>
      </div>
      <h1> </h1>
      <h2>Sign up</h2>
      <form onSubmit={accountCreation}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="input-group">
          <label htmlFor="confirmpassword">Confirm password</label>
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            required
          />
        </div>
        <button>Create account</button>
        <ErrorNotification message={notification} />
      </form>
    </div>
  );
};

export default CreateAccount;
