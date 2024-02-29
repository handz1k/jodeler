import JodelList from "./components/JodelList";
import LoginForm from "./components/LoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<JodelList />} />
    </Routes>
  );
}

export default App;
