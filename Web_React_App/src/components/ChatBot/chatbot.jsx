import React, { useState } from 'react';
import axios from 'axios';

const chatWithBot = async (prompt) => {
  try {
    const response = await axios.post('http://localhost:8000/chatbot/', { prompt: prompt }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
    throw error; 
  }
};

const ChatBot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await chatWithBot(userInput);
      console.log(response); // Verifica la respuesta en la consola
      setChatHistory([...chatHistory, { role: 'user', text: userInput }, { role: 'assistant', text: response.message }]);
      setUserInput('');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setErrorMessage('Error al enviar la solicitud al servidor.');
    }
  };

  return (
    <div>
      {chatHistory.map((message, index) => (
        <p key={index}><strong>{message.role}:</strong> {message.text}</p>
      ))}
      <form onSubmit={handleSubmit}>
        <input type="text" value={userInput} onChange={e => setUserInput(e.target.value)} />
        <button type="submit">Enviar</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default ChatBot;
