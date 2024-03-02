import axios from 'axios';

const predictionBmi = async (user) => {
  try {

    const response = await axios.post('http://localhost:8000/prediction-bmi/', user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al realizar la predicción:', error);
    throw error; 
  }
};

export default predictionBmi;
