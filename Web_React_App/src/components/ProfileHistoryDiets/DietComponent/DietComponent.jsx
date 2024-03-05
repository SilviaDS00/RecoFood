import React from "react";
import "./DietComponent.scss"; // Ruta al archivo SCSS

export function DietComponent(props) {
  const { history } = props;
  return (
    <>
      <div className="card">
        <h3>Dieta</h3>
        <p className="text">{history.attributes.diet}</p>
        <p className="updatedAt">Fecha: {history.attributes.updatedAt}</p>
      </div>
    </>
  );
}
