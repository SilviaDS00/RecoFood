
""" Hay que instalar esto antes de ejecutar:
    - pip install django djangorestframework
    - pip install django-cors-headers
"""

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse

@csrf_exempt
def chatbot_view(request):
    if request.method == 'GET':
        response_data = {"message": "Hola. Has realizado una solicitud GET a la página de inicio."}
        return JsonResponse(response_data)
    elif request.method == 'POST':
        response_data = {"message": "Hola. Has realizado una solicitud POST a la página de inicio."}
        return JsonResponse(response_data)
    else:
        return HttpResponse(status=405) 

