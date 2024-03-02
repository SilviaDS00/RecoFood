import React from "react";
import "./FoodComponent.scss"; // Ruta al archivo SCSS

export function FoodComponent(props) {
  const { history } = props;
  return (
    <>
      <div className="card">
        <p className="title">{history.attributes.food}</p>
        <div className="macros">
          <p>Calorías: {history.attributes.macros.calories}</p>
          <p>Proteínas: {history.attributes.macros.protein}g</p>
          <p>Carbohidratos: {history.attributes.macros.carbs}g</p>
          <p>Grasas: {history.attributes.macros.fat}g</p>
        </div>
        <p className="updatedAt">Fecha: {history.attributes.updatedAt}</p>
      </div>
    </>
  );
}
