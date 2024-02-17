/* App.js */

import React from "react";
import WebcamComponent from "./components/Webcam/WebcamComponent";
import ImageUploadComponent from "./components/ImageUpload/ImageUploadComponent";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WebcamComponent />
        <h1>O</h1>
        <ImageUploadComponent />
      </header>
    </div>
  );
}

export default App;
