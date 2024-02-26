// Home.jsx
import React from 'react';
import WebcamComponent from "../../components/Webcam/WebcamComponent";
import ImageUploadComponent from "../../components/ImageUpload/ImageUploadComponent";
import './home.scss'; // Importa el archivo SCSS

const Home = () => {
  return (
    <div className="container"> {/* Asigna la clase al contenedor principal */}
      <h1>¡Bienvenid@ a RecoFood!</h1>
      <p>Puedes escanear la comida con la cámara o si lo prefieres puedes subir la foto.</p>
      <WebcamComponent />
      <h3>o</h3>
      <ImageUploadComponent />
    </div>
  );
};

export default Home;
