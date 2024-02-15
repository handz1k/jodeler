import "../index.css";

const LoginForm = () => {
  return (
    <div className="login-form">
      <form>
        <h2>
          Login to <i>Jodeler ✨</i>
        </h2>
        <div>
          <label> Username </label>
          <input type="text"></input>
        </div>
        <div>
          <label> Password </label>
          <input type="password"></input>
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
