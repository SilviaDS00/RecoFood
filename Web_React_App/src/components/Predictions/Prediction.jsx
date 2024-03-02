import axios from 'axios';

const predictImage = async (imageBlob) => {
  try {
    const formData = new FormData();
    formData.append('imagen', imageBlob, 'imagen.png');

    const response = await axios.post('http://localhost:8000/prediction/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    console.log('Predicción realizada:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al realizar la predicción:', error);
    throw error; 
  }
};

export default predictImage;
