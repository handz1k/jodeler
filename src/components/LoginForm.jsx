import "../index.css";
import { useState } from "react";
import loginService from "../services/login";
import jodelService from "../services/jodel";

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      jodelService.setToken(user.token);
      onLoginSuccess(user);
    } catch (expection) {
      console.log(expection);
    }
  };

  return (
    <div className="login-form">
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
