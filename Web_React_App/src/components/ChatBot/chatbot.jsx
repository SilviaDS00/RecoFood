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
  const [audioRefs, setAudioRefs] = useState({});

  const audioRef = useRef();
  const chatContainerRef = useRef();

  const handleAudioEnded = () => {
    setIsAudioPlaying(false);
  };

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
          `http://localhost:8000/media/${data.audio}`
        );
        const audioBlob = await audioResponse.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioRefs((prevRefs) => ({
          ...prevRefs,
          [data.message]: { url: audioUrl, isPlaying: false },
        }));
      } catch (error) {
        console.error("Error al enviar datos:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleAudio = (message) => {
    const audioRef = audioRefs[message];
    
    // Si no existe una instancia de Audio para este mensaje, la crea
    if (!audioRef.audioInstance) {
      audioRef.audioInstance = new Audio(audioRef.url);
    }
    
    // Si el audio está reproduciéndose, se detiene
    if (audioRef.isPlaying) {
      audioRef.audioInstance.pause();
      setIsAudioPlaying(false); // Actualiza el estado a falso
    } else {
      audioRef.audioInstance.play();
      setIsAudioPlaying(true); // Actualiza el estado a verdadero
    }
    
    // Actualiza el estado para reflejar si el audio está reproduciéndose o no
    setAudioRefs((prevRefs) => ({
      ...prevRefs,
      [message]: { ...audioRef, isPlaying: !audioRef.isPlaying },
    }));
  };

  useEffect(() => {

    if (audioUrl) {
      audioRef.current = new Audio(audioUrl);
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
            className={`${message.type === "user" ? "message-user" : "message-bot"
              }`}
          >
            {message.type === "user" ? "👤 Tú: " : " 🤖 Bot: "}
            {message.text}
            {message.type === "bot" && audioRefs[message.text] && (
              <>
                <button
                  onClick={() => toggleAudio(message.text)}
                  className="audio-button"
                >
                  {audioRefs[message.text].isPlaying ? "⏸️" : "🔊"}
                </button>
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
