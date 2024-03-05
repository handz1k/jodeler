import MainPage from "./components/MainPage";
import CreateAccount from "./components/CreateAccount";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/create" element={<CreateAccount />} />
    </Routes>
  );
}

export default App;
