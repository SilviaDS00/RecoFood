import React, { useState } from 'react';
import { useAuth } from "../../hooks/useAuth";

function Contact() {
    const [resultadoGenerado, setResultadoGenerado] = useState(null);
    const { user } = useAuth();

    const generarResultado = async (tipo) => {
        try {

            const userData = {
                age: user.age, 
                height: user.height,
                weight: user.weight  

            };

            const response = await fetch('http://localhost:8000/contact/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tipo, userData })
            });

            if (!response.ok) throw new Error('Error en la solicitud');

            const data = await response.json();
            console.log('Respuesta del servidor:', data);

            setResultadoGenerado(data[tipo]);
        } catch (error) {
            console.error('Error al generar el resultado:', error);
        }
    };

    return (
        <div>
            <button onClick={() => generarResultado('dieta')}>Generar Dieta</button>
            <button onClick={() => generarResultado('entrenamiento')}>Generar Entrenamiento</button>
            {resultadoGenerado && <p>{`Resultado Generado: ${resultadoGenerado}`}</p>}
        </div>
    );

}

export default Contact;
