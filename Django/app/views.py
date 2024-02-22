from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from .predict import hacer_prediccion

@csrf_exempt
def endpoint_prediccion(request):
    if request.method == 'POST':
        datos_de_entrada = request.POST.get('datos_de_entrada')  # Ajusta según tu formato de datos
        # Realiza cualquier preprocesamiento necesario en tus datos de entrada

        # Hacer la predicción
        prediccion = hacer_prediccion(datos_de_entrada)

        # Devuelve la predicción como respuesta JSON
        return JsonResponse({'prediccion': prediccion})

    return JsonResponse({'error': 'Se esperaba una solicitud POST'})
def home(request):
    return JsonResponse({'message': '¡Bienvenido a la API de mi proyecto!'})