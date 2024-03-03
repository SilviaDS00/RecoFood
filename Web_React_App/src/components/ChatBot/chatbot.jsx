import React, { useState } from "react";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ text: "¡Hola! Soy tu asistente de recetas", sender: "bot" }]);
  const [step, setStep] = useState(0);
  const [ingredientes, setIngredientes] = useState([]);
  const [idioma, setIdioma] = useState("español");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
  
    switch (step) {
      case 0:
        setMessages([...newMessages, { text: "Ingrese los ingredientes que tiene: ", sender: "bot" }]);
        setStep(1);
        break;
  
      case 1:
        const ingredientesUsuario = input.split(",");
        setIngredientes(ingredientesUsuario);
        setMessages([...newMessages, { text: "Buscando recetas...", sender: "bot" }]);
        buscarRecetas(ingredientesUsuario);
        break;
  
      case 2:
        const nombreReceta = input;
        setMessages([...messages, { text: `Seleccionaste la receta: ${nombreReceta}`, sender: "bot" }]);
        mostrarReceta(nombreReceta);
        break;
  
      case 3:
        setMessages([...messages, { text: "¿Desea ver otra receta de la lista? (s/n): ", sender: "bot" }]);
        setStep(4);
        break;
  
      case 4:
        const respuesta4 = input.toLowerCase();
        if (respuesta4 === "s" || respuesta4 === "si") {
          setMessages([...messages, { text: "Buscando recetas...", sender: "bot" }]);
          buscarRecetas(ingredientes); // busca recetas con los mismos ingredientes
        } else if (respuesta4 === "n" || respuesta4 === "no") {
          setMessages([...messages, { text: "¿Desea ver una receta con otros ingredientes? (s/n): ", sender: "bot" }]);
          setStep(5);
        } else {
          setMessages([...messages, { text: "Respuesta no válida.", sender: "bot" }]);
        }
        break;
  
      case 5:
        const respuesta5 = input.toLowerCase();
        if (respuesta5 === "s" || respuesta5 === "si") {
          setMessages([...messages, { text: "Ingrese los ingredientes que tiene: ", sender: "bot" }]);
          setStep(1);
        } else {
          setMessages([...messages, { text: "Espero haberle sido de ayuda, ¡Hasta luego! 😊", sender: "bot" }]);
          setStep(0);
        }
        break;
  
      default:
        break;
    }
  };

  const buscarRecetas = async (ingredientes) => {
    try {
      const response = await fetch("http://localhost:8000/chatbot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredientes }),
      });

      const data = await response.json();

      const nombresRecetas =
        data.resultados && Array.isArray(data.resultados)
          ? data.resultados.map((receta) => receta.nombre || "Nombre no disponible")
          : [];

      setMessages([
        ...messages,
        { text: "Recetas encontradas:", sender: "bot" },
        ...nombresRecetas.map((nombreReceta) => ({ text: `- ${nombreReceta}`, sender: "bot" })),
        { text: "Selecciona la receta de la que quieras ver la elaboración:", sender: "bot" },
      ]);
      setStep(2);
    } catch (error) {
      console.error("Error al consultar recetas:", error);
    }
  };

  const mostrarReceta = async (nombreReceta) => {
    try {
      const response = await fetch("http://localhost:8000/chatbot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombreReceta }),
      });

      const data = await response.json();

      const botResponse = data.receta
        ? {
          text: `Receta: ${data.receta.nombre || "Nombre no disponible"
            }\nIngredientes:\n${data.receta.ingredientes
              ? data.receta.ingredientes.map((ingrediente) => `- ${ingrediente}`).join("\n")
              : "Ingredientes no disponibles"
            }\nPasos:\n${data.receta.pasos ? data.receta.pasos.map((paso, i) => `${i + 1}. ${paso}`).join("\n") : "Pasos no disponibles"
            }`,
          sender: "bot",
        }
        : { text: "Receta no encontrada.", sender: "bot" };

      setMessages([...messages, botResponse]);
      setStep(3);
    } catch (error) {
      console.error("Error al obtener detalles de la receta:", error);
    }
  };

  return (
    <div className="Chatbot">
      <div className="chat-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input type="text" value={input} onChange={handleInputChange} />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default Chatbot;
