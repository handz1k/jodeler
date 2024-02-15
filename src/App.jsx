import JodelList from "./components/JodelList";
import LoginForm from "./components/LoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<JodelList />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
}

export default App;
