// api.js
import axios from 'axios';

const baseURL = 'https://tu-api-django.com/api'; // Reemplaza con la URL de tu API

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    // Puedes agregar aquí cualquier otra configuración de encabezado que necesites
  },
});

export default api;
