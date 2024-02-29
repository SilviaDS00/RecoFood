// PredictionComponent.js
import React, { useState } from "react";
import "./ShowPrediction.scss";
import { Button, Form, Message } from "semantic-ui-react";
import { History } from "../../api/history";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const historyCtrl = new History();

const ShowPrediction = ({ predictionResult }) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const classnames = [
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

  const translations = {
    apple_pie: "tarta de manzana",
    baby_back_ribs: "costillas de cerdo",
    baklava: "baklava",
    beef_carpaccio: "carpaccio de ternera",
    beef_tartare: "tartar de ternera",
    beet_salad: "ensalada de remolacha",
    beignets: "buñuelos",
    bibimbap: "bibimbap",
    bread_pudding: "puddin de pan",
    breakfast_burrito: "burrito de desayuno",
    bruschetta: "bruschetta",
    caesar_salad: "ensalada cesar",
    cannoli: "cannoli",
    caprese_salad: "ensalada caprese",
    carrot_cake: "tarta de zanahoria",
    ceviche: "ceviche",
    cheese_plate: "tabla de quesos",
    cheesecake: "tarta de queso",
    chicken_curry: "pollo al curry",
    chicken_quesadilla: "quesadilla de pollo",
    chicken_wings: "alitas de pollo",
    chocolate_cake: "tarta de chocolate",
    chocolate_mousse: "mousse de chocolate",
    churros: "churros",
    clam_chowder: "sopa de almejas",
    club_sandwich: "sándwich club",
    crab_cakes: "tortitas de cangrejo",
    creme_brulee: "crema catalana",
    croque_madame: "croque madame",
    cup_cakes: "magdalenas",
    deviled_eggs: "huevos rellenos",
    donuts: "donuts",
    dumplings: "empanadillas chinas",
    edamame: "edamame",
    eggs_benedict: "huevos benedict",
    escargots: "caracoles",
    falafel: "falafel",
    filet_mignon: "filete mignon",
    fish_and_chips: "pescado con patatas fritas",
    foie_gras: "foie gras",
    french_fries: "patatas fritas",
    french_onion_soup: "sopa de cebolla francesa",
    french_toast: "tostadas francesas",
    fried_calamari: "calamares fritos",
    fried_rice: "arroz frito",
    frozen_yogurt: "yogur helado",
    garlic_bread: "pan de ajo",
    gnocchi: "ñoquis",
    greek_salad: "ensalada griega",
    grilled_cheese_sandwich: "sándwich de queso a la plancha",
    grilled_salmon: "salmón a la parrilla",
    guacamole: "guacamole",
    gyoza: "gyoza",
    hamburger: "hamburguesa",
    hot_and_sour_soup: "sopa agripicante",
    hot_dog: "perrito caliente",
    huevos_rancheros: "huevos rancheros",
    hummus: "hummus",
    ice_cream: "helado",
    lasagna: "lasaña",
    lobster_bisque: "sopa de langosta",
    lobster_roll_sandwich: "sándwich de langosta",
    macaroni_and_cheese: "macarrones con queso",
    macarons: "macarons",
    miso_soup: "sopa de miso",
    mussels: "mejillones",
    nachos: "nachos",
    omelette: "tortilla francesa",
    onion_rings: "anillas de cebolla",
    oysters: "ostras",
    pad_thai: "pad thai",
    paella: "paella",
    pancakes: "tortitas",
    panna_cotta: "panna cotta",
    peking_duck: "pato pekinés",
    pho: "pho",
    pizza: "pizza",
    pork_chop: "chuleta de cerdo",
    poutine: "poutine",
    prime_rib: "costilla de ternera",
    pulled_pork_sandwich: "sándwich de cerdo desmenuzado",
    ramen: "ramen",
    ravioli: "ravioli",
    red_velvet_cake: "tarta de terciopelo rojo",
    risotto: "risotto",
    samosa: "samosa",
    sashimi: "sashimi",
    scallops: "vieiras",
    seaweed_salad: "ensalada de algas",
    shrimp_and_grits: "gambas y sémola",
    spaghetti_bolognese: "espaguetis a la boloñesa",
    spaghetti_carbonara: "espaguetis a la carbonara",
    spring_rolls: "rollitos de primavera",
    steak: "filete",
    strawberry_shortcake: "tarta de fresas",
    sushi: "sushi",
    tacos: "tacos",
    takoyaki: "takoyaki",
    tiramisu: "tiramisú",
    tuna_tartare: "tartar de atún",
    waffles: "gofres",
  };

  const classInfo = require("../../data/macronutrientes.json");
  const predictClass = predictionResult.predicted_class;
  const predictedClassInfo = classInfo.find(
    (item) => item.name === classnames[predictionResult.predicted_class]
  );
  const predictedClassTranslation =
    translations[classnames[predictionResult.predicted_class]];

  const [gramsInput, setGramsInput] = useState(100);
  const [calculatedMacros, setCalculatedMacros] = useState(null);

  const handleGramsInputChange = (e) => {
    setGramsInput(e.target.value);
  };

  const calculateMacros = (grams) => {
    const multiplier = grams / 100;
    return {
      calories: predictedClassInfo.calories_per_100g * multiplier,
      protein: predictedClassInfo.protein_per_100g * multiplier,
      fat: predictedClassInfo.fat_per_100g * multiplier,
      carbs: predictedClassInfo.carbs_per_100g * multiplier,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const calculatedMacros = calculateMacros(gramsInput);
    setCalculatedMacros(calculatedMacros);
    const response = await historyCtrl.add(
      user.id,
      predictedClassTranslation,
      calculatedMacros
    );
    console.log(response);
  };

  return (
    <div className="prediction-result">
      <h3>La comida escaneada es... </h3>
      <p>{predictedClassTranslation || predictClass}</p>
      <hr />
      <div className="macros-info">
        <Message>
          <Message.Header>Macros por cada 100g</Message.Header>
          <Message.List>
            <Message.Item>
              Calorías: {predictedClassInfo.calories_per_100g}
            </Message.Item>
            <Message.Item>
              Proteínas: {predictedClassInfo.protein_per_100g}
            </Message.Item>
            <Message.Item>
              Grasas: {predictedClassInfo.fat_per_100g}
            </Message.Item>
            <Message.Item>
              Carbohidratos: {predictedClassInfo.carbs_per_100g}
            </Message.Item>
          </Message.List>
        </Message>
      </div>

      <div className="form-container">
        <Form onSubmit={handleSubmit} className="form-macros">
          <h3>Calcular macros</h3>
          <label>
            Introduce los gramos de tu comida para calcular los macronutrientes
            de una forma más aproximada:
            <Form.Input
              className="input-grams"
              type="number"
              value={gramsInput}
              onChange={handleGramsInputChange}
            />
          </label>
        </Form>
      </div>
      {!user ? (
            <div className="login-register-container">
              <label className="login-register">
                Regístrate o inicia sesión para guardar el historial de tus
                comidas y calcular los macros
              </label>
              <div>
              <Button onClick={() => navigate("/register")}>Registrarse</Button>
              <Button onClick={() => navigate("/login")}>Iniciar Sesión</Button>
              </div>
            </div>
          ) : (
            <Button type="submit" className="calculate-button">
              Calcular Macros
            </Button>
          )}
      {calculatedMacros && (
        <div className="calculated-macros">
          <Message positive>
            <Message.Header>Macros Calculados</Message.Header>
            <Message.List>
              <Message.Item>
                Calorías: {calculatedMacros.calories.toFixed(0)}
              </Message.Item>
              <Message.Item>
                Proteínas: {calculatedMacros.protein.toFixed(0)}
              </Message.Item>
              <Message.Item>
                Grasas: {calculatedMacros.fat.toFixed(0)}
              </Message.Item>
              <Message.Item>
                Carbohidratos: {calculatedMacros.carbs.toFixed(0)}
              </Message.Item>
            </Message.List>
          </Message>
        </div>
      )}
    </div>
  );
};

export default ShowPrediction;
