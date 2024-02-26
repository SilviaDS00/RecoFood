import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./ImageUploadComponent.scss";
import Prediction from "../Prediction/Prediction"; // Importa la función de predicción

const ImageUploadComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setShowPrediction(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    setLoading(true);

    try {
      const blob = await fetch(selectedImage).then((res) => res.blob());

      const result = await Prediction(blob);
      setPredictionResult(result);

      setLoading(false);
      setShowPrediction(true);
    } catch (error) {
      console.error("Error al realizar la predicción:", error);
      setLoading(false);
    }
  };

  const handleDelete = () => {
    setSelectedImage(null);
    setLoading(false);
    setShowPrediction(false);
  };

  return (
    <div className="image-upload-container">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="image-upload-input"
        id="fileInput"
      />
      <label htmlFor="fileInput" className="custom-image-upload-label">
        <div className="custom-image-upload">Subir foto</div>
      </label>
      {selectedImage && (
        <div className="selected-image-container">
          <img src={selectedImage} alt="Selected" className="selected-image" />
          <div className="button-container">
            <button onClick={handleDelete} className="delete-button">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
          <button onClick={handleUpload} className="prediction-button">
            Procesar Imagen
          </button>
          {loading && (
            <p className="loading-message">
              Espera mientras se procesa la imagen...
            </p>
          )}
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
    </div>
  );
};

export default ImageUploadComponent;
