# En tu_app/predict.py
from tensorflow.keras.models import load_model
import os

model_path = os.path.join(os.path.dirname(__file__), 'models', 'best_model_trained.h5')
model = load_model(model_path)

def hacer_prediccion(datos_de_entrada):
    prediccion = model.predict(datos_de_entrada)
    return prediccion.tolist()
