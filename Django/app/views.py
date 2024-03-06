""" 
Hay que instalar esto antes de ejecutar:
    - pip install django djangorestframework
    - pip install django-cors-headers
    - pip install google.generativeai
    - pip install dotenv / pip install python-dotenv
    - pip install googletrans==4.0.0-rc1
    - Arrancar el Servidor: python manage.py runserver 
"""

from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
import os, io, json, logging, joblib
import tensorflow as tf
import numpy as np
from PIL import Image
import json
from dotenv import load_dotenv
import google.generativeai as gen_ai
from django.conf import settings
from gtts import gTTS
import re
from datetime import datetime

# from .asistente_receta import AsistenteRecetas


logger = logging.getLogger(__name__)

# Carga las variables de entorno
load_dotenv()

# Configura la clave API de Google
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Configura el modelo de Gemini-Pro
gen_ai.configure(api_key=GOOGLE_API_KEY)
model = gen_ai.GenerativeModel("gemini-pro")

# Inicia la sesión de chat
chat_session = model.start_chat(history=[])


@csrf_exempt
def chatbot_view(request):
    logger.info("Received a POST request to chatbot_view")
    if request.method == "GET":
        response_data = {
            "message": "Hola. Has realizado una solicitud GET a la página de inicio."
        }
        return JsonResponse(response_data)

    elif request.method == "POST":
        # Obtiene los datos de la solicitud POST
        data = json.loads(request.body)
        user_prompt = data.get("prompt", "")

        # Imprime el contenido de la solicitud POST
        logger.debug("Contenido de la solicitud POST:", data)

        if user_prompt:
            # Envía el mensaje del usuario a Gemini-Pro y obtiene la respuesta
            gemini_response = chat_session.send_message(user_prompt)

            # Imprime la respuesta de Gemini-Pro
            logger.debug("Respuesta de Gemini-Pro:", gemini_response.text)

            # Convierte la respuesta del chatbot en audio
            clean_text = re.sub(r'[^\w\s]', '', gemini_response.text)  # Elimina todos los caracteres no alfanuméricos
            tts = gTTS(text=clean_text, lang="es")

            # Genera un nombre de archivo único
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            filename = f"respuesta_{timestamp}.mp3"

            tts.save(os.path.join(settings.MEDIA_ROOT, filename))

            # Devuelve la respuesta de Gemini-Pro
            response_data = {"message": gemini_response.text, "audio": filename}
        else:
            response_data = {
                "error": "No se proporcionó ningún prompt de usuario en la solicitud POST."
            }

        return JsonResponse(response_data)
    else:
        return HttpResponse(status=405)


@csrf_exempt
def generar_resultado_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        tipo = data.get("tipo")
        userData = data.get("userData")

        if tipo == "dieta":
            user_prompt = f"Hazme una dieta de tipo {userData['opciones']}, que sea específica para una persona de, {userData['age']}, años de edad, {userData['height']} centímetros de altura y {userData['weight']}kg de peso"
        elif tipo == "entrenamiento":
            user_prompt = f"Hazme una entrenamiento que sea específico para una persona de, {userData['age']}, años de edad, {userData['height']} centímetros de altura y {userData['weight']}kg de peso, cuyo objetivo es {userData['objetivo']}"
        else:
            return HttpResponse(
                status=400
            )  # Si el tipo de acción no es válido, devuelve un error

        # Envía el mensaje del usuario a Gemini-Pro y obtiene la respuesta
        gemini_response = chat_session.send_message(user_prompt)

        # Devuelve la respuesta de Gemini-Pro
        response_data = {tipo: gemini_response.text}
        return JsonResponse(response_data)
    else:
        return HttpResponse(status=405)


model = tf.keras.models.load_model("model/model_inception.h5")


@csrf_exempt
def prediction(request):
    if request.method == "POST":
        try:
            # Obtén la imagen del cuerpo de la solicitud POST
            image_data = request.FILES["imagen"].read()
            image = Image.open(io.BytesIO(image_data))

            # Preprocesa la imagen para que coincida con el formato esperado por el modelo
            image = image.resize((200, 200))
            image = np.array(image) / 255.0
            image = np.expand_dims(image, axis=0)

            # Realiza la predicción con el modelo cargado
            prediction = model.predict(image)
            top5_classes = np.argsort(-prediction[0])[:6]
            print("Top 5 clases: ", top5_classes)
            predicted_class = top5_classes[0]

            response_data = {
                "message": "Predicción exitosa",
                "predicted_class": int(predicted_class),
                "confidence": float(prediction[0][predicted_class]),
                "top5_classes": {
                    "classes": top5_classes.astype(int).tolist(),
                    "confidences": prediction[0][top5_classes].astype(float).tolist(),
                },
            }
            return JsonResponse(response_data)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    elif request.method == "GET":
        response_data = {
            "message": "Hola. Has realizado una solicitud GET a la página de inicio."
        }
        return JsonResponse(response_data)

    else:
        return JsonResponse({"message": "Método no permitido"}, status=405)


modelo_bmi = joblib.load("model/model_bmi.pkl")


@csrf_exempt
def prediction_bmi(request):
    print("Servidor:", request)
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            age = data["age"]
            height_cm = data["height"]  # Altura en centímetros
            weight = data["weight"]

            # Convertir altura de centímetros a metros
            height_m = height_cm / 100.0

            # Calcular el BMI
            bmi = weight / (height_m**2)

            # Agregar el BMI calculado a la lista de datos_usuario
            datos_usuario = [age, height_m, weight, bmi]

            # Realizar la predicción
            prediccion = modelo_bmi.predict([datos_usuario])

            return JsonResponse({"prediction": prediccion[0], "bmi": bmi})
        except json.JSONDecodeError as e:
            logger.error("Error al decodificar JSON: %s", str(e))
            return HttpResponseBadRequest("Error en el formato JSON: " + str(e))
    elif request.method == "GET":
        response_data = {
            "message": "Hola. Has realizado una solicitud GET a la página de inicio."
        }
        return JsonResponse(response_data)
    else:
        return JsonResponse({"message": "Método no permitido"}, status=405)


