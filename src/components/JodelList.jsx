import { useState, useEffect } from "react";
import "../App.jsx";
import jodelService from "../services/jodel.js";
import JodelForm from "./JodelForm.jsx";
import Jodel from "./Jodels.jsx";

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
      <h1 className="title">
        Jodeler - Jodeling made <em> easy </em> ✨
      </h1>
      {!isLoading && (
        <div className="jodel-form">
          <main>
            <JodelForm
              formSubmission={jodelFormSubmission}
              formValue={newJodel}
              formHandler={handleJodelChange}
            />
          </main>
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
