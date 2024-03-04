import React from "react";
import "./DietComponent.scss"; // Ruta al archivo SCSS

export function DietComponent(props) {
  const { history } = props;
  return (
    <>
      <div className="card">
        <h2>Dieta</h2>
        <p className="title">{history.attributes.diet}</p>
        <p className="updatedAt">Fecha: {history.attributes.updatedAt}</p>
      </div>
    </>
  );
}
