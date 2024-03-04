import React, { useState } from 'react';

function Contact() {
    const [dietaGenerada, setDietaGenerada] = useState(null);
    const [entrenamientoGenerado, setEntrenamientoGenerado] = useState(null);

    const generarDieta = async () => {
        try {
            const response = await fetch('http://localhost:8000/contact/generar-dieta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})  // No necesitamos enviar ningún dato en el cuerpo de la solicitud
            });
    
            if (!response.ok) throw new Error('Error en la solicitud');
    
            const data = await response.json();
            console.log('Respuesta del servidor:', data); // Imprime la respuesta del servidor en la consola del navegador
    
            // Guarda la dieta generada en el estado
            setDietaGenerada(data.dieta);
        } catch (error) {
            console.error('Error al generar la dieta:', error);
        }
    };

    const generarEntrenamiento = async () => {
        try {
            const response = await fetch('http://localhost:8000/contact/generar-entrenamiento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})  // No necesitamos enviar ningún dato en el cuerpo de la solicitud
            });
    
            if (!response.ok) throw new Error('Error en la solicitud');
    
            const data = await response.json();
            console.log('Respuesta del servidor:', data); // Imprime la respuesta del servidor en la consola del navegador
    
            // Guarda la dieta generada en el estado
            setEntrenamientoGenerado(data.entrenamiento);
        } catch (error) {
            console.error('Error al generar la dieta:', error);
        }
    };

    return (
        <div>
            <div>
                <button onClick={generarDieta}>Generar Dieta</button>
                {dietaGenerada && <p>Dieta Generada: {dietaGenerada}</p>}
            </div>
            <div>
                <button onClick={generarEntrenamiento}>Generar Entrenamiento</button>
                {entrenamientoGenerado && <p>Entrenamiento Generado: {entrenamientoGenerado}</p>}
            </div>
        </div>
    );
    
}

export default Contact;
