import "./App.css";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Compiler from "./Compiler";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/compiler" element={<Compiler />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
