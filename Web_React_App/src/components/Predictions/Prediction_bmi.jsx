import axios from 'axios';

const predictionBmi = async (user) => {
  try {

    const response = await axios.post('https://django-app-recofood-9ere.onrender.com/prediction-bmi/', user, {
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
