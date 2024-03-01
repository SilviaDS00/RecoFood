import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button, Form } from "semantic-ui-react";
import predictionBmi from "../Predictions/Prediction_bmi";
import "./UserBmi.scss";

export function UserBmi() {
  const { user } = useAuth();
  const [predictionResult, setPredictionResult] = useState(null);

  const valores = {
    0: "Bajo Peso",
    1: "Peso Normal",
    2: "Sobrepeso",
    3: "Obesidad Clase 1",
    4: "Obesidad Clase 2",
    5: "Obesidad Clase 3",
  };

  const handleSumit = async (e) => {
    e.preventDefault();
    try {
      const result = await predictionBmi(user);
      setPredictionResult(result);
    } catch (error) {
      console.error("Error al realizar la predicción:", error);
      if (error.isAxiosError && error.response) {
        console.error("Detalles del error:", error.response.data);
      }
    }
  };

  return (
    <div className="user-bmi-container">
      <h3>IMC</h3>
      <p>
        El índice de masa corporal (IMC) es una medida de asociación entre el
        peso y la talla de una persona. El IMC es una medida útil para
        identificar el sobrepeso y la obesidad en adultos.
      </p>
      <p>Edad: {user.age} años</p>
      <p>Peso: {user.weight}kg</p>
      <p>Altura: {user.height}m</p>

      <Form className="form-container" onSubmit={handleSumit}>
        <Button type="submit">Predecir IMC</Button>
      </Form>

      {predictionResult && (
        <div className="prediction-result">
          <h3>Resultado de la predicción:</h3>
          <p>
            Su IMC es de: <strong>{predictionResult.bmi}</strong>
          </p>
          <p>
            Su categoría es:{" "}
            <strong>{valores[predictionResult.prediction]}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
