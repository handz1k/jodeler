import "../index.css";
import { useState, useRef } from "react";
import loginService from "../services/login";
import jodelService from "../services/jodel";
import Notification from "./Notification";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");
  const toastId = useRef(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      toastId.current = toast.loading("Loading...");
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      jodelService.setToken(user.token);
      onLoginSuccess(user);
    } catch (expection) {
      toast.update(toastId.current, {
        render: "Invalid username or password",
        autoClose: 2000,
        type: "error",
        isLoading: false,
        position: "bottom-left",
      });
    }
  };

  return (
    <div className="login-form">
      <Notification message={notification} />
      <ToastContainer />
      <form onSubmit={handleLogin}>
        <h2>
          Login to <i>Jodeler ✨</i>
        </h2>
        <div>
          <label> Username </label>
          <input
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div>
          <label> Password </label>
          <input
            type="password"
            name="current-password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button className="login-button">Log in</button>
        </div>
        <div>
          <u>enter</u> as a guest or <u>create</u> an account
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
