import { useState, useEffect } from "react";
import "../index.css";
import jodelService from "../services/jodel.js";
import JodelForm from "./JodelForm.jsx";
import Jodel from "./Jodels.jsx";
import Title from "./Title.jsx";
import LoginForm from "./LoginForm.jsx";

const JodelList = () => {
  const [newJodel, setNewJodel] = useState("");
  const [jodels, setJodels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const jodelFormSubmission = (event) => {
    event.preventDefault();
    const trimmedJodel = newJodel.trim();
    if (!trimmedJodel || trimmedJodel.length < 3) {
      console.error("Jodel must contain atleast 3 characters");
      return;
    }

    const jodelObject = { content: newJodel };
    setIsLoading(true);
    jodelService.create(jodelObject).then((returnedJodel) => {
      setJodels((jodels) => [returnedJodel, ...jodels]);
      setNewJodel("");
      setIsLoading(false);
      console.log("dds");
    });
  };

  const handleJodelChange = (event) => {
    setNewJodel(event.target.value);
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    setUser("");
  };

  return (
    <div>
      {!user && <LoginForm />}
      <Title />
      {!isLoading && user && (
        <div className="jodel-form">
          <JodelForm
            formSubmission={jodelFormSubmission}
            formValue={newJodel}
            formHandler={handleJodelChange}
          />
          <button onClick={handleLogout}></button>
        </div>
      )}
      {isLoading && user && (
        <div className="loading">
          <img src="loader.gif"></img>
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
