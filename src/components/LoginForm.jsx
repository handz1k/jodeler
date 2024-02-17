import "../index.css";
import { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    //handle login
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
