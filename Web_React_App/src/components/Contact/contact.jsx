import React, { useState } from 'react';

function Contact() {
    const [dietaGenerada, setDietaGenerada] = useState(null);

    const generarDieta = () => {
        // Aquí puedes implementar la lógica para generar la dieta
        // Por ahora, simplemente estableceremos un ejemplo de dieta generada aleatoriamente
        const dietas = ['Dieta balanceada', 'Dieta keto', 'Dieta vegana'];
        const randomIndex = Math.floor(Math.random() * dietas.length);
        const dieta = dietas[randomIndex];

        // Establecer la dieta generada en el estado
        setDietaGenerada(dieta);
    };

    return (
        <div>
            <button onClick={generarDieta}>Generar Dieta</button>
            {dietaGenerada && <p>Dieta Generada: {dietaGenerada}</p>}
        </div>
    );
}

export default Contact;
