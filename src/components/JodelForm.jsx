import { useState } from "react";
import jodelService from "../services/jodel.js";

const JodelForm = ({ onJodelPost }) => {
  const [jodels, setJodels] = useState([]);
  const [newJodel, setNewJodel] = useState("");

  const jodelFormSubmission = (event) => {
    event.preventDefault();
    const trimmedJodel = newJodel.trim();
    if (!trimmedJodel || trimmedJodel.length < 3) {
      console.error("Jodel must contain atleast 3 characters");
      return;
    }

    const jodelObject = { content: newJodel };
    jodelService.create(jodelObject).then((returnedJodel) => {
      onJodelPost(returnedJodel);
      setNewJodel("");
    });
  };

  const handleJodelChange = (event) => {
    setNewJodel(event.target.value);
  };
  return (
    <form className="jodel-form" onSubmit={jodelFormSubmission}>
      <label htmlFor="content"> Message </label>
      <textarea
        className="u-full-width"
        type="text"
        placeholder="Jodel away!"
        id="content"
        name="content"
        value={newJodel}
        onChange={handleJodelChange}
      ></textarea>
      <button className="button-primary" id="primary-button" type="submit">
        {" "}
        Send your jodel!
      </button>
    </form>
  );
};

export default JodelForm;
