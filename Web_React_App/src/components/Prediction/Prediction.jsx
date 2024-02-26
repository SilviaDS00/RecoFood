// PredictionService.js

import axios from 'axios';

const predictImage = async (imageBlob) => {
  try {
    const formData = new FormData();
    formData.append('imagen', imageBlob, 'imagen.png');

    const response = await axios.post('http://localhost:8000/prediction/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al realizar la predicción:', error);
    throw error; // Propaga el error para manejarlo en el componente que llama a esta función
  }
};

export default predictImage;
