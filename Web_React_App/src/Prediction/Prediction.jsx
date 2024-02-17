// PredictionComponent.js
import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

const PredictionComponent = ({ imageSrc }) => {
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const [foodNames, setFoodNames] = useState([
    "tarta de manzana",
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
    "ensalada césar",
    "cannoli",
    "caprese_salad",
    "bizcocho de zanahoria",
    "ceviche",
    "cheese_plate",
    "cheesecake",
    "pollo al curry",
    "quesadilla de pollo",
    "chicken_wings",
    "tarta de chocolate",
    "mousse de chocolate",
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
    "hamburguesa",
    "hot_and_sour_soup",
    "perrito caliente",
    "huevos rancheros",
    "hummus",
    "helado",
    "lasaña",
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
    "waffles"
  ]);

  useEffect(() => {
    const predict = async () => {
      setLoading(true);
      
    
      class L1 {
        static className = "L1";

        constructor(config) {
          return tf.regularizers.l1l2(config);
        }
      }
      tf.serialization.registerClass(L1);

      await tf.ready();

      const model = await tf.loadLayersModel("/model/model.json", {
        customObjects: { l1: tf.regularizers.l1 },
      });

      // Preprocesar la imagen
      const img = new Image();
      img.src = imageSrc;
      await img.decode();
      const tensor = tf.browser
        .fromPixels(img)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .expandDims();

      // Realizar la predicción
      const predictions = await model.predict(tensor).data();
      const maxPrediction = Math.max(...predictions);
      const predictedClass = predictions.indexOf(maxPrediction);
      const predictedFoodName = foodNames[predictedClass];

      setPrediction(`La comida escaneada es: ${predictedFoodName}`);
      setLoading(false);
    };

    predict();
  }, [imageSrc, foodNames]);

  return (
    <div>
      {loading && <p>Realizando predicción...</p>}
      {!loading && prediction && <p>{prediction}</p>}
    </div>
  );
};

export default PredictionComponent;
