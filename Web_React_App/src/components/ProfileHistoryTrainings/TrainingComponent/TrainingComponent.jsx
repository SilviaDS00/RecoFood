import React from "react";
import "./TrainingComponent.scss"; // Ruta al archivo SCSS

export function TrainingComponent(props) {
  const { history } = props;
  return (
    <>
      <div className="card">
        <h3>Entrenamiento</h3>
        <p className="title">{history.attributes.training}</p>
        <p className="updatedAt">Fecha: {history.attributes.updatedAt}</p>
      </div>
    </>
  );
}
