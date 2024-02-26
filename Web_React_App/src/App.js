import React from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home/home";
import ChatBot from "./pages/chatbot";
import Contact from "./pages/contact";
import Login from "./pages/login";
import SignUp from "./pages/signup";

function App() {
  return (
    <div className="App">
      <div className="topBar">
        <div className="left">
          <img src="/logo-pequeno.png" alt="Logo" className="logo" width="25px" />
          <Link to="/">RecoFood</Link>
        </div>

        <div className="center">
          <Link to="/" className="menuItem">
            Inicio
          </Link>
          <Link to="/chatbot" className="menuItem">
            ChatBot
          </Link>
          <Link to="/contact" className="menuItem">
            Contacto
          </Link>
        </div>

        <div className="right">
          <Link to="/log-in" className="menuItem">
            Iniciar sesión
          </Link>
          /
          <Link to="/sign-up" className="menuItem">
            Crear cuenta
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
