import React, { useState, useEffect, useRef } from "react";
import { Loader } from "semantic-ui-react";
import "./chatbot.scss";

function Chatbot() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    { type: "bot", text: "¡Hola! Me alegro de verte. ¿En qué puedo ayudarte hoy?" },
  ]);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef();
  const chatContainerRef = useRef();

  const enviarDatos = async () => {
    const trimmedInput = inputValue.trim();
    console.log("Enviando solicitud:", trimmedInput);
    if (trimmedInput !== "") {
      try {
        setIsLoading(true);

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
        console.log("Respuesta del servidor:", data);

        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "bot", text: data.message },
        ]);
        setInputValue("");

        const audioResponse = await fetch(
          `http://localhost:8000/media/respuesta.mp3`
        );
        const audioBlob = await audioResponse.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      } catch (error) {
        console.error("Error al enviar datos:", error);
      } finally {
        setIsLoading(false);
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
    setIsAudioPlaying(false);
  };

  useEffect(() => {
    if (audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.addEventListener("ended", handleAudioEnded);
    }
  }, [audioUrl]);

  useEffect(() => {
    // Desplázate hacia abajo automáticamente cuando los mensajes cambien
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="Chatbot">
      <h2 className="title-chatbot">Bienvenid@ a nuestro ChatBot</h2>
      <div className="chat-container" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.type === "user" ? "message-user" : "message-bot"
            }`}
          >
            {message.type === "user" ? "👤 Tú: " : " 🤖 Bot: "}
            {message.text}
            {message.type === "bot" && audioUrl && (
              <>
                <button onClick={toggleAudio} className="audio-button">
                  {isAudioPlaying ? "⏸️" : "🔊"}
                </button>
                <audio ref={audioRef} />
              </>
            )}
          </div>
        ))}
        <audio ref={audioRef} />
      </div>

      {isLoading && (
        <div className="loader-container">
          <Loader active inline="centered" />
        </div>
      )}

      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading}
        />
        <button onClick={enviarDatos}>Enviar</button>
      </div>
    </div>
  );
}

export default Chatbot;
