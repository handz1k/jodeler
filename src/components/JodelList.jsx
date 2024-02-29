import { useState, useEffect } from "react";
import "../index.css";
import jodelService from "../services/jodel.js";
import JodelForm from "./JodelForm.jsx";
import Jodel from "./Jodels.jsx";
import Title from "./Title.jsx";
import LoginForm from "./LoginForm.jsx";
import Loader from "./Loader.jsx";

const JodelList = () => {
  const [jodels, setJodels] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    jodelService.getAll().then((jodels) => {
      setJodels(jodels.reverse());
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      jodelService.setToken(user.token);
      console.log(user);
    }
  }, []);

  const handleUserLogin = (user) => {
    setUser(user);
  };

  const handleUserLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    setUser("");
  };

  const handleBlogListExpansion = (returnedJodel) => {
    setJodels([returnedJodel, ...jodels]);
  };

  return (
    <div>
      {!user && <LoginForm onLoginSuccess={handleUserLogin} />}
      <Title />
      {user && (
        <div className="jodel-form">
          <JodelForm onJodelPost={handleBlogListExpansion} />
          <button onClick={handleUserLogout}></button>
        </div>
      )}
      <div className="jodels">
        <ul>
          {jodels.map((jodel) => (
            <Jodel key={jodel.id} jodel={jodel} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JodelList;
