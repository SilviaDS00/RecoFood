import React, { useState } from 'react';
import axios from 'axios';

function Chat() {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/chatbot/', { prompt: userInput });
            setChatHistory([...chatHistory, { role: 'user', text: userInput }, { role: 'assistant', text: response.data.message }]);
            setUserInput('');
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            // Maneja el error apropiadamente en tu aplicación React
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
        </div>
    );
}

export default Chat;
