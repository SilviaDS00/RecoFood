import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./ImageUploadComponent.scss";
import Prediction from "../Predictions/Prediction"; // Importa la función de predicción
import ShowPrediction from "../Predictions/ShowPrediction"

const ImageUploadComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

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
      if (error.isAxiosError && error.response) {
        console.error("Detalles del error:", error.response.data);
      }
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
            <ShowPrediction
              predictionResult={predictionResult}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploadComponent;
