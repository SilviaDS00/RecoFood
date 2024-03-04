import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import "./generar-dieta.scss";
import { Dimmer, Loader } from "semantic-ui-react";

function Contact() {
  const [resultadoGenerado, setResultadoGenerado] = useState(null);
  const { user } = useAuth(); // Agregamos isAuthenticated para saber si el usuario está autenticado
  const [cargando, setCargando] = useState(false); // Nuevo estado para el indicador de carga

  const generarResultado = async (tipo) => {
    try {
      setCargando(true);

      const userData = {
        age: user.age,
        height: user.height,
        weight: user.weight,
      };

      const response = await fetch("http://localhost:8000/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tipo, userData }),
      });

      if (!response.ok) throw new Error("Error en la solicitud");

      const data = await response.json();
      setResultadoGenerado(data[tipo]);
    } catch (error) {
      console.error("Error al generar el resultado:", error);
    } finally {
      setCargando(false); // Indicar que la carga ha finalizado, independientemente del resultado
    }
  };

  return (
    <div className="contact-container">
      {user ? (
        <>
          <h1>Generador de Dietas y Entrenamientos</h1>
            <p>
                ¡Hola {user.firstname}! ¿Quieres generar una dieta o un entrenamiento
                personalizado? Haz clic en el botón correspondiente para obtener
                tu resultado.
            </p>
          <div className="button-container">
            <button onClick={() => generarResultado("dieta")}>
              Generar Dieta
            </button>
            <button onClick={() => generarResultado("entrenamiento")}>
              Generar Entrenamiento
            </button>
          </div>

          {cargando && <p>Estamos generando la respuesta adecuada a ti...</p>}
          {cargando && (
            <div className="spinner">
              <Loader active inline="centered" />
            </div>
          )}
          {resultadoGenerado && (
            <div className="response">
              {resultadoGenerado.split("**").map((fragment, index) => (
                <p key={index}>{fragment}</p>
              ))}
            </div>
          )}
        </>
      ) : (
        <div>
          <p>Debes iniciar sesión para generar una dieta o entrenamiento</p>
          <div className="button-container">
            <button>Inicio de Sesión</button>
            <button>Crear Cuenta</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact;
