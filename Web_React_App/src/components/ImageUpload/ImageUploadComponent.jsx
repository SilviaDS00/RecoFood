import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PredictionComponent from "../../Prediction/Prediction";
import "./ImageUploadComponent.scss";

const ImageUploadComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);

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

  const handleUpload = () => {
    setLoading(true);
    setLoading(false);
    setShowPrediction(true);
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
        <div className="custom-image-upload">Seleccionar Imagen</div>
      </label>
      {selectedImage && (
        <div className="selected-image-container">
          <img src={selectedImage} alt="Selected" className="selected-image" />
          <div className="button-container">
            <button onClick={handleDelete} className="delete-button">
              <FontAwesomeIcon icon={faTrash} /> {/* Ícono de borrado */}
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
          {showPrediction && <PredictionComponent imageSrc={selectedImage} />}
        </div>
      )}
    </div>
  );
};

export default ImageUploadComponent;
