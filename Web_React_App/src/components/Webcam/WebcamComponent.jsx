import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "./WebcamComponent.scss";
import Prediction from "../Predictions/Prediction";
import ShowPrediction from "../Predictions/ShowPrediction";

const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  const capture = async () => {
    setLoading(true);
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setLoading(false);
    setShowWebcam(false);

    try {
      const blob = await fetch(imageSrc).then((res) => res.blob());

      const result = await Prediction(blob);
      setPredictionResult(result);
    } catch (error) {
      console.error("Error al capturar y predecir:", error);
    }
  };

  const deleteCapture = () => {
    setCapturedImage(null);
    setShowWebcam(true);
    setShowPrediction(false);
  };

  const toggleWebcam = () => {
    setShowWebcam((prevShowWebcam) => !prevShowWebcam);
  };

  const togglePrediction = () => {
    setShowPrediction(true);
  };

  const closeWebcam = () => {
    setShowWebcam(false);
    setCapturedImage(null);
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
              Procesar imagen
            </button>
          )}
          <button onClick={deleteCapture} className="delete-button">
            Repetir imagen
          </button>
        </div>
      )}
      {showPrediction && predictionResult && (
        <ShowPrediction predictionResult={predictionResult} />
      )}

      {loading && (
        <p className="loading-message">Espera mientras se carga la webcam...</p>
      )}
    </div>
  );
};

export default WebcamComponent;
