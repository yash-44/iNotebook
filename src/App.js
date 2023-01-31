import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Navbar from "./components/Navbar";
import NoteState from "./context/Notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useState } from "react";

function App() {

  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1800);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exeact path="/" element={<Home showAlert={showAlert} />}></Route>
              <Route exeact path="/about" element={<About />}></Route>
              <Route exeact path="/login" element={<Login showAlert={showAlert} />}></Route>
              <Route exeact path="/signup" element={<SignUp showAlert={showAlert} />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
