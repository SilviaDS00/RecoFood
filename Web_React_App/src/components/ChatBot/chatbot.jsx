import React from 'react';
import './chatbot.css';

class ChatBot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      responseMessage: ''
    };
  }

  enviarDatos = async () => {
    const inputValue = this.state.inputValue.trim();
    if (inputValue !== '') {
      try {
        const response = await fetch('http://localhost:8000/chatbot/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: inputValue })
        });

        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }

        const data = await response.json();
        this.setState({ responseMessage: data.message }); // Guarda el mensaje de respuesta en el estado
      } catch (error) {
        console.error('Error al enviar datos:', error);
      }
    }
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  render() {
    return (
      <div>
        <input 
          id="textinput"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onKeyUp={(e) => { if (e.key === 'Enter' && this.state.inputValue !== '') this.enviarDatos() }}
          placeholder="Escriba aquí..." 
        />
        <button 
          id="sendButton" 
          onClick={this.enviarDatos}
        >
          Enviar
        </button>
        <div>
          {this.state.responseMessage && <p>{this.state.responseMessage}</p>} {/* Muestra el mensaje de respuesta si está disponible */}
        </div>
      </div>
    );
  }
}

export default ChatBot;
