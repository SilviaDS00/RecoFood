from django.db import models
class Receta(models.Model):
    nombre = models.CharField(max_length=255)
    ingredientes = models.TextField()
    pasos = models.TextField()