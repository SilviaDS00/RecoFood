import React, { useState } from "react";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("http://localhost:8000/chatbot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredientes: input.split(",") }),
      });
    
      const data = await response.json();
    
      const botResponse =
        data.resultados && Array.isArray(data.resultados)
          ? data.resultados.map((receta) => ({
              text: `Receta: ${
                receta.nombre || "Nombre no disponible"
              }\nIngredientes: ${
                receta.ingredientes
                  ? receta.ingredientes.join(", ")
                  : "Ingredientes no disponibles"
              }\nPasos: ${
                receta.pasos ? receta.pasos.join("\n") : "Pasos no disponibles"
              }`,
              sender: "bot",
            }))
          : [];
    
      setMessages([...newMessages, ...botResponse]);
      
      console.log(botResponse);
    
      setMessages([...newMessages, ...botResponse]);
    } catch (error) {
      console.error("Error al consultar recetas:", error);
    }
  };

  return (
    <div>
      <div
        style={{
          height: "300px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              color: message.sender === "user" ? "blue" : "green",
            }}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "10px" }}>
        <input type="text" value={input} onChange={handleInputChange} />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default Chatbot;
