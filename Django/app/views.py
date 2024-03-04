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
from .asistente_receta import AsistenteRecetas
# from dotenv import load_dotenv
# import google.generativeai as gen_ai


logger = logging.getLogger(__name__)

@csrf_exempt
def chatbot_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            ingredientes_usuario = data.get("ingredientes", [])
            nombre_receta = data.get("nombreReceta")

            asistente_recetas = AsistenteRecetas()

            if ingredientes_usuario:
                # Si se proporcionaron ingredientes, busca recetas
                resultados = asistente_recetas.buscar_recetas(ingredientes_usuario)
                return JsonResponse({"resultados": resultados})
            elif nombre_receta:
                # Si se proporcionó un nombre de receta, muestra la receta
                receta = asistente_recetas.mostrar_receta(nombre_receta)
                if receta:
                    return JsonResponse({"receta": receta})
                else:
                    return JsonResponse({"receta": None, "message": "Receta no encontrada."})
            else:
                return JsonResponse({"error": "Datos insuficientes"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    elif request.method == "GET":
        return JsonResponse({"message": "Esta vista responde a solicitudes GET."})
    else:
        # Si la solicitud no es ni POST ni GET, devuelve un error
        return JsonResponse({"error": "Método no permitido"}, status=405)

    
model = tf.keras.models.load_model('model/best_model_densenet.h5')
@csrf_exempt
def prediction(request):
    if request.method == "POST":
        try:
        
            # Obtén la imagen del cuerpo de la solicitud POST
            image_data = request.FILES['imagen'].read()
            image = Image.open(io.BytesIO(image_data))

            # Preprocesa la imagen para que coincida con el formato esperado por el modelo
            image = image.resize((200, 200)) 
            image = np.array(image) / 255.0
            image = np.expand_dims(image, axis=0)

            # Realiza la predicción con el modelo cargado
            prediction = model.predict(image)
            # En este ejemplo, simplemente se obtiene la clase con la mayor probabilidad
            top5_classes = np.argsort(-prediction[0])[:6]
            print("Top 5 clases: ",top5_classes)
# En este ejemplo, simplemente se obtiene la clase con la mayor probabilidad
            predicted_class = top5_classes[0]

            # Devuelve la respuesta en formato JSON
            response_data = {
                "message": "Predicción exitosa",
                "predicted_class": int(predicted_class),
                "confidence": float(prediction[0][predicted_class]),
                "top5_classes": top5_classes.astype(int).tolist() if top5_classes is not None else None
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

import json
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
import joblib

modelo_bmi = joblib.load("model/modelo_bmi.pkl")


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


# # Load environment variables
# load_dotenv()

# GOOGLE_API_KEY = "AIzaSyBgMaYQkaDOv-4OGykVdXLPZcTrN9dM-WY"
# GOOGLE_API_KEY1 = os.getenv("GOOGLE_API_KEY")

# # Set up Google Gemini-Pro AI model
# gen_ai.configure(api_key=GOOGLE_API_KEY1)
# model = gen_ai.GenerativeModel("gemini-pro")

# # Start chat session
# chat_session = model.start_chat(history=[])


# # Function to translate roles between Gemini-Pro and Streamlit terminology
# def translate_role(user_role):
#     if user_role == "model":
#         return "assistant"
#     else:
#         return user_role

# @csrf_exempt
# def chatbot_view(request):
#     if request.method == "GET":
#         response_data = {
#             "message": "Hola. Has realizado una solicitud GET a la página de inicio."
#         }
#         return JsonResponse(response_data)

#     elif request.method == "POST":
#         # Get user prompt from POST data
#         user_prompt = request.POST.get("prompt", "")
#         if user_prompt:
#             # Send user's message to Gemini-Pro and get the response
#             gemini_response = chat_session.send_message(user_prompt)

#             # Return Gemini-Pro's response
#             response_data = {"message": gemini_response.text}
#         else:
#             response_data = {
#                 "error": "No se proporcionó ningún prompt de usuario en la solicitud POST."
#             }

#         return JsonResponse(response_data)
#     else:
#         return HttpResponse(status=405)