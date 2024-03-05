import React, { useState } from 'react';
import { useAuth } from "../../hooks/useAuth";

function Contact() {
    const [resultadoGenerado, setResultadoGenerado] = useState(null);
    const [objetivo, setObjetivo] = useState(null);
    const [mostrarObjetivos, setMostrarObjetivos] = useState(false);
    const { user } = useAuth();

    const objetivos = [
        'Perder peso',
        'Ganar masa muscular',
        'Mejorar la postura',
        'Aumentar la flexibilidad',
        'Fortalecer el sistema cardiovascular',
        'Tonificar el cuerpo'
    ];

    const generarResultado = async (tipo) => {
        try {
            const userData = {
                age: 12, 
                height: 143,
                weight: 30,
                objetivo
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
            setMostrarObjetivos(false);
        } catch (error) {
            console.error('Error al generar el resultado:', error);
        }
    };

    return (
        <div>
            <button onClick={() => generarResultado('dieta')}>Generar Dieta</button>
            <button onClick={() => setMostrarObjetivos(true)}>Generar Entrenamiento</button>
            {mostrarObjetivos && (
                <div>
                    {objetivos.map((obj, index) => (
                        <div key={index}>
                            <input type="radio" id={obj} name="objetivo" value={obj} onChange={(e) => setObjetivo(e.target.value)} />
                            <label htmlFor={obj}>{obj}</label>
                        </div>
                    ))}
                    <button onClick={() => generarResultado('entrenamiento')}>Seleccionar</button>
                </div>
            )}
            {resultadoGenerado && <p>{`Resultado Generado: ${resultadoGenerado}`}</p>}
        </div>
    );
}

export default Contact;
