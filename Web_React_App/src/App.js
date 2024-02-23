/* App.js */

import React from "react";
import WebcamComponent from "./components/Webcam/WebcamComponent";
import ImageUploadComponent from "./components/ImageUpload/ImageUploadComponent";
import Chat from './chat/chatbot.js'; 
import "./App.scss";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WebcamComponent />
        <h1>O</h1>
        <ImageUploadComponent />
        <Chat /> 
      </header>
    </div>
  );
}

export default App;
