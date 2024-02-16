import { useState, useEffect } from "react";
import "../index.css";
import jodelService from "../services/jodel.js";
import JodelForm from "./JodelForm.jsx";
import Jodel from "./Jodels.jsx";
import Title from "./Title.jsx";

const JodelList = () => {
  const [newJodel, setNewJodel] = useState("");
  const [jodels, setJodels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    jodelService.getAll().then((jodels) => {
      setJodels(jodels.reverse());
    });
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
      console.log(returnedJodel);
    });
  };

  const handleJodelChange = (event) => {
    setNewJodel(event.target.value);
  };

  return (
    <div>
      <Title />
      {!isLoading && (
        <div className="jodel-form">
          <JodelForm
            formSubmission={jodelFormSubmission}
            formValue={newJodel}
            formHandler={handleJodelChange}
          />
        </div>
      )}
      {isLoading && (
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
