import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import PredictionComponent from "../Prediction/Prediction";
import "./WebcamComponent.scss";

const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);

  useEffect(() => {
    // Puedes realizar alguna lógica aquí si necesitas hacer algo al cargar el componente
  }, []); // Dependencia vacía para que solo se ejecute una vez al montar el componente

  const capture = async () => {
    setLoading(true);
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setLoading(false);
    setShowWebcam(false); // Ocultar la webcam después de capturar la imagen
  };

  const deleteCapture = () => {
    setCapturedImage(null);
    setShowWebcam(true); // Mostrar la webcam después de borrar la foto
    setShowPrediction(false); // Ocultar el resultado de la predicción al repetir la imagen
  };

  const toggleWebcam = () => {
    setShowWebcam((prevShowWebcam) => !prevShowWebcam);
  };

  const togglePrediction = () => {
    setShowPrediction(true); // Mostrar el resultado de la predicción
  };

  const closeWebcam = () => {
    setShowWebcam(false);
    setCapturedImage(null); // También puedes borrar la imagen al cerrar la cámara
  };

  return (
    <div className="webcam-container">
      {showWebcam ? (
        <>
          <button onClick={closeWebcam} className="close-webcam-button">
            Cerrar Cámara
          </button>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
          />
        </>
      ) : null}
      {!showWebcam && !capturedImage && (
        <button onClick={toggleWebcam} className="toggle-webcam-button">
          Escanear comida
        </button>
      )}
      {showWebcam && !capturedImage && (
        <button onClick={capture} className="capture-button">
          {loading ? "Cargando..." : <FontAwesomeIcon icon={faCamera} />}
        </button>
      )}
      {capturedImage && (
        <div className="captured-image-container">
          <h2>Imagen Capturada:</h2>
          <img src={capturedImage} alt="Captured" className="captured-image" />
          {capturedImage && !showPrediction && (
            <button onClick={togglePrediction} className="prediction-button">
              Ver Predicción
            </button>
          )}
          <button onClick={deleteCapture} className="delete-button">
            Repetir imagen
          </button>
          {showPrediction && <PredictionComponent imageSrc={capturedImage} />}
        </div>
      )}

      {loading && (
        <p className="loading-message">Espera mientras se carga la webcam...</p>
      )}
    </div>
  );
};

export default WebcamComponent;
