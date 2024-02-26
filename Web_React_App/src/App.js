import React from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home/home";
import ChatBot from "./pages/chatbot";
import Contact from "./pages/contact";
import LoginPage from "./pages/log-in";
import SignUpPage from "./pages/sign-up";
import Profile from "./pages/profile";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { user, logout } = useAuth();

  return (
    <div className="App">
      <div className="topBar">
        <div className="left">
          <img
            src="/logo-pequeno.png"
            alt="Logo"
            className="logo"
            width="25px"
          />
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
          {user ? (
            <>
              <Link to="/profile" className="menuItem" onClick={logout}>
                Mi perfil
              </Link>
              <Link to="/" className="menuItem" onClick={logout}>
                Cerrar sesión
              </Link>
            </>
          ) : (
            <>
              <Link to="/log-in" className="menuItem">
                Iniciar sesión
              </Link>
              <Link to="/sign-up" className="menuItem">
                Crear cuenta
              </Link>
            </>
          )}
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/log-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
