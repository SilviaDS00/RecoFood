// ChartComponent.js
import React from "react";
import { Bar } from "react-chartjs-2";

const ChartComponent = ({ predictedClassInfo }) => {
  const { protein_per_100g, fat_per_100g, carbs_per_100g } = predictedClassInfo;

  const data = {
    labels: ["Proteínas", "Grasas", "Carbohidratos"],
    datasets: [
      {
        label: "Macronutrientes por cada 100g",
        backgroundColor: ["rgba(75,192,192,0.6)", "rgba(255,99,132,0.6)", "rgba(255,205,86,0.6)"],
        borderColor: ["rgba(75,192,192,1)", "rgba(255,99,132,1)", "rgba(255,205,86,1)"],
        borderWidth: 1,
        hoverBackgroundColor: ["rgba(75,192,192,0.8)", "rgba(255,99,132,0.8)", "rgba(255,205,86,0.8)"],
        hoverBorderColor: ["rgba(75,192,192,1)", "rgba(255,99,132,1)", "rgba(255,205,86,1)"],
        data: [protein_per_100g, fat_per_100g, carbs_per_100g],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
