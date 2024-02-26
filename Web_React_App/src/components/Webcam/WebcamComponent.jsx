import PredictionComponent from "../Prediction/Prediction";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./WebcamComponent.scss";
import Prediction from "../Prediction/Prediction";

const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  const classnames = 
  [
    "apple_pie",
    "baby_back_ribs",
    "baklava",
    "beef_carpaccio",
    "beef_tartare",
    "beet_salad",
    "beignets",
    "bibimbap",
    "bread_pudding",
    "breakfast_burrito",
    "bruschetta",
    "caesar_salad",
    "cannoli",
    "caprese_salad",
    "carrot_cake",
    "ceviche",
    "cheese_plate",
    "cheesecake",
    "chicken_curry",
    "chicken_quesadilla",
    "chicken_wings",
    "chocolate_cake",
    "chocolate_mousse",
    "churros",
    "clam_chowder",
    "club_sandwich",
    "crab_cakes",
    "creme_brulee",
    "croque_madame",
    "cup_cakes",
    "deviled_eggs",
    "donuts",
    "dumplings",
    "edamame",
    "eggs_benedict",
    "escargots",
    "falafel",
    "filet_mignon",
    "fish_and_chips",
    "foie_gras",
    "french_fries",
    "french_onion_soup",
    "french_toast",
    "fried_calamari",
    "fried_rice",
    "frozen_yogurt",
    "garlic_bread",
    "gnocchi",
    "greek_salad",
    "grilled_cheese_sandwich",
    "grilled_salmon",
    "guacamole",
    "gyoza",
    "hamburger",
    "hot_and_sour_soup",
    "hot_dog",
    "huevos_rancheros",
    "hummus",
    "ice_cream",
    "lasagna",
    "lobster_bisque",
    "lobster_roll_sandwich",
    "macaroni_and_cheese",
    "macarons",
    "miso_soup",
    "mussels",
    "nachos",
    "omelette",
    "onion_rings",
    "oysters",
    "pad_thai",
    "paella",
    "pancakes",
    "panna_cotta",
    "peking_duck",
    "pho",
    "pizza",
    "pork_chop",
    "poutine",
    "prime_rib",
    "pulled_pork_sandwich",
    "ramen",
    "ravioli",
    "red_velvet_cake",
    "risotto",
    "samosa",
    "sashimi",
    "scallops",
    "seaweed_salad",
    "shrimp_and_grits",
    "spaghetti_bolognese",
    "spaghetti_carbonara",
    "spring_rolls",
    "steak",
    "strawberry_shortcake",
    "sushi",
    "tacos",
    "takoyaki",
    "tiramisu",
    "tuna_tartare",
    "waffles",
  ];

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
      console.error('Error al capturar y predecir:', error);
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
              Ver Predicción
            </button>
          )}
          <button onClick={deleteCapture} className="delete-button">
            Repetir imagen
          </button>
          {showPrediction && predictionResult && (
            <div className="prediction-result">
              <h3>Resultado de la Predicción:</h3>
              <p>Clase Predicha: {predictionResult.predicted_class}</p>
              <p>Confianza: {predictionResult.confidence}</p>
              <p>Clase: {classnames[predictionResult.predicted_class]}</p>
            </div>
          )}
        </div>
      )}

      {loading && (
        <p className="loading-message">Espera mientras se carga la webcam...</p>
      )}
    </div>
  );
};

export default WebcamComponent;
