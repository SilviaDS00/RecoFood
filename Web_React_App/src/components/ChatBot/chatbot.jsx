import React, { useState, useEffect, useRef } from "react";
import "./chatbot.scss";

function Chatbot() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const audioRef = useRef();

  const enviarDatos = async () => {
    const trimmedInput = inputValue.trim();
    console.log("Enviando solicitud:", trimmedInput);
    if (trimmedInput !== "") {
      try {
        // Agrega el mensaje del usuario al array de mensajes
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "user", text: trimmedInput },
        ]);

        const response = await fetch("http://localhost:8000/chatbot/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: trimmedInput }),
        });

        if (!response.ok) throw new Error("Error en la solicitud");

        const data = await response.json();
        console.log("Respuesta del servidor:", data); // Imprime la respuesta del servidor en la consola del navegador

        // Agrega la respuesta al array de mensajes
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "bot", text: data.message },
        ]);
        setInputValue(""); // Limpia el input

        // Obtiene el archivo de audio desde el servidor
        const audioResponse = await fetch(
          `http://localhost:8000/media/respuesta.mp3`
        );
        const audioBlob = await audioResponse.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl); // Guarda la URL del audio
      } catch (error) {
        console.error("Error al enviar datos:", error);
      }
    }
  };

  const toggleAudio = () => {
    if (isAudioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  const handleAudioEnded = () => {
    // El evento 'ended' se activa cuando el audio termina de reproducirse
    setIsAudioPlaying(false);
  };

  useEffect(() => {
    if (audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.addEventListener("ended", handleAudioEnded);
    }
  }, [audioUrl]);

  return (
    <div className="Chatbot">
      <h2 className="title-chatbot">Bienvenid@ a nuestro ChatBot</h2>
      <div className="chat-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.type === "user" ? "message-user" : "message-bot"
            }`}
          >
            {message.type === "user" ? "You: " : "Bot: "}
            {message.text}
            {message.type === "bot" && audioUrl && (
              <>
                <button
                  onClick={toggleAudio}
                  className="audio-button"
                >
                  {isAudioPlaying ? "⏸️" : "🔊"}
                </button>
                <audio ref={audioRef} />
              </>
            )}
          </div>
        ))}
        <audio ref={audioRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={enviarDatos}>Enviar</button>
      </div>
    </div>
  );
}

export default Chatbot;
