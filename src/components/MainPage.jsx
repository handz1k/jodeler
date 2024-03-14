import { useState, useEffect } from "react";
import "../index.css";
import jodelService from "../services/jodel.js";
import JodelForm from "./JodelForm.jsx";
import Jodel from "./Jodels.jsx";
import Title from "./Title.jsx";
import LoginForm from "./LoginForm.jsx";
import { Link, useMatch } from "react-router-dom";

const JodelList = ({ handleJodel }) => {
  const [jodels, setJodels] = useState([]);
  const [user, setUser] = useState("");
  const match = useMatch("/jodels/:id");
  const jodel = match
    ? jodels.find((jodel) => jodel.id === Number(match.params.id))
    : null;

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
      {user && (
        <div>
          <button className="logoutbutton" onClick={handleUserLogout}>
            log out
          </button>
          <Title />
          <div className="jodel-form">
            <JodelForm onJodelPost={handleBlogListExpansion} />
          </div>
          <div className="jodels">
            <ul>
              {jodels.map((jodel) => (
                <div key={jodel.id} onClick={() => handleJodel(jodel)}>
                  <Link to={`jodel/${jodel.id}`}>
                    <Jodel jodel={jodel} />
                  </Link>
                </div>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default JodelList;
