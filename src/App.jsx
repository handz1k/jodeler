import MainPage from "./components/MainPage";
import CreateAccount from "./components/CreateAccount";
import IndividualJodel from "./components/IndividualJodel";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useMatch,
} from "react-router-dom";
import { useState } from "react";

const App = () => {
  const [singleJodel, setSingleJodel] = useState("");

  const handleIndividualJodel = (returnedJodel) => {
    setSingleJodel(returnedJodel);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<MainPage handleJodel={handleIndividualJodel} />}
      />
      <Route path="/create" element={<CreateAccount />} />
      <Route
        path="/jodel/:id"
        element={<IndividualJodel jodel={singleJodel} />}
      />
    </Routes>
  );
};

export default App;
