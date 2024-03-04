import React, { useState, useEffect, useRef  } from 'react';

function ChatComponent() {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [audioUrl, setAudioUrl] = useState(null);
    const audioRef = useRef();

    const enviarDatos = async () => {
        const trimmedInput = inputValue.trim();
        console.log('Enviando solicitud:', trimmedInput);
        if (trimmedInput !== '') {
            try {
                // Agrega el mensaje del usuario al array de mensajes
                setMessages(prevMessages => [...prevMessages, { type: 'user', text: trimmedInput }]);

                const response = await fetch('http://localhost:8000/chatbot/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ prompt: trimmedInput })
                });

                if (!response.ok) throw new Error('Error en la solicitud');

                const data = await response.json();
                console.log('Respuesta del servidor:', data); // Imprime la respuesta del servidor en la consola del navegador

                // Agrega la respuesta al array de mensajes
                setMessages(prevMessages => [...prevMessages, { type: 'bot', text: data.message }]);
                setInputValue(''); // Limpia el input

                // Obtiene el archivo de audio desde el servidor
                const audioResponse = await fetch(`http://localhost:8000/media/respuesta.mp3`);
                const audioBlob = await audioResponse.blob();
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioUrl(audioUrl); // Guarda la URL del audio
            } catch (error) {
                console.error('Error al enviar datos:', error);
            }
        }
    }

    useEffect(() => {
        if (audioUrl) {
            audioRef.current.src = audioUrl;
        }
    }, [audioUrl]);

    return (
        <div>
            <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} />
            <button onClick={enviarDatos}>Enviar</button>
            {messages.map((message, index) => (
                <p key={index}>
                    {message.type === 'user' ? 'You: ' : 'Bot: '}
                    {message.text}
                    {message.type === 'bot' && audioUrl && (
                        <button onClick={() => {
                            const audio = new Audio(audioUrl);
                            audio.play();
                        }}>
                            🔊
                        </button>
                    )}
                </p>
            ))}
            <audio ref={audioRef} />
        </div>
    );
}

export default ChatComponent;
