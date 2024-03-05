import "../styles/SignupBox.css";

const CreateAccount = () => {
  const accountCreation = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmpassword.value;
    if (
      password === confirmPassword &&
      password.length >= 3 &&
      username.length >= 3
    ) {
      console.log("post account");
    } else {
      console.log("error");
    }
  };

  return (
    <div className="signup-box">
      <a href="/">
        <b>&lt;--</b>
      </a>
      <div class="tooltip">
        <u>i</u>
        <span class="tooltiptext">
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
      </form>
    </div>
  );
};

export default CreateAccount;
