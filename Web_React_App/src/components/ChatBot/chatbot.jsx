import React, { useState } from "react";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [idioma, setIdioma] = useState("");
  const [step, setStep] = useState(0);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    if (step === 0) {
      setIdioma(input);
      setMessages([...newMessages, { text: "Ingrese los ingredientes que tiene: ", sender: "bot" }]);
      setStep(1);
    } else if (step === 1) {
      const ingredientes = input.split(",");
      setMessages([...newMessages, { text: "Buscando recetas...", sender: "bot" }]);
      buscarRecetas(ingredientes);
    } else if (step === 2) {
      const nombreReceta = input;
      setMessages([...messages, { text: `Seleccionaste la receta: ${nombreReceta}`, sender: "bot" }]);
      mostrarReceta(nombreReceta);
    }
  };

  const buscarRecetas = async (ingredientes) => {
    try {
      const response = await fetch("http://localhost:8000/chatbot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredientes, idioma }),
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
        body: JSON.stringify({ nombreReceta, idioma }),
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
