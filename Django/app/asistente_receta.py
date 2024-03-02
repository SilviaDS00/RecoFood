import json
from sys import displayhook
from googletrans import Translator
from gtts import gTTS
from IPython.display import Audio

# Mensaje de bienvenida
print("Bienvenido soy tu asistente de recetas.")

class AsistenteRecetas:
    def __init__(self):
        
        # Diccionario para mapear idiomas con códigos de lenguaje
        self.idioma = {'español': 'es', 'inglés': 'en'}
        
        # Idioma elegido por el usuario
        self.idioma_elegido = self.elegir_idioma()
        self.recetas = self.carga_json()
        
        # Lista para almacenar los ingredientes proporcionados por el usuario
        self.ingredientes_usuario = []
        self.translator = Translator()

    def elegir_idioma(self):
        # Método para que el usuario seleccione un idioma
        while True:
            language = input("Seleccione el idioma (español / inglés): ").lower()
            if language in self.idioma:
                return language
            print("Por favor, seleccione un idioma válido.")

    def traducir(self, text):
        # Método para traducir texto al idioma elegido por el usuario
        idioma_destino = self.idioma.get(self.idioma_elegido)
        return self.translator.translate(text, dest=idioma_destino).text if idioma_destino else text

    def carga_json(self):
        # Método para cargar datos de recetas desde un archivo JSON
        with open(f"recetas_{self.idioma[self.idioma_elegido]}.json", 'r') as archivo:
            return json.load(archivo)

    def hablar(self, texto):
        # Método para generar audio a partir de texto utilizando gTTS
        texto = texto.replace('_', ' ')
        tts = gTTS(text=texto, lang=self.idioma[self.idioma_elegido])
        tts.save("respuesta.mp3")
        return Audio("respuesta.mp3", autoplay=True)

    def buscar_recetas(self):
        # Método principal para buscar recetas basado en los ingredientes proporcionados por el usuario
        while True:
            if not self.ingredientes_usuario:
                # Si no se han proporcionado ingredientes, solicitarlos al usuario
                self.ingredientes_usuario = input(self.traducir("Ingrese los ingredientes que tiene: ")).replace(' y ', ', ').replace(' and ', ', ').split(',')
                self.ingredientes_usuario = [ingrediente.strip().lower() for ingrediente in self.ingredientes_usuario]

            # Filtrar recetas posibles que se pueden hacer con los ingredientes proporcionados
            recetas_posibles = [receta.get('nombre' if self.idioma_elegido == 'español' else 'name', 'Nombre no disponible') for receta in self.recetas if all(ingrediente.lower() in map(str.lower, receta.get('ingredientes' if self.idioma_elegido == 'español' else 'ingredients', [])) for ingrediente in self.ingredientes_usuario)]

            if recetas_posibles:
                # Si hay recetas disponibles, mostrarlas al usuario
                mensaje = self.traducir("Puedes realizar las siguientes recetas:\n ") + '\n'.join(f'- {receta}' for receta in recetas_posibles)
                print(mensaje)
                # Reproducir el mensaje de recetas disponibles
                displayhook(self.hablar(mensaje))
                while True:
                    nombre_receta = input(self.traducir("\nIntroduzca el nombre de la receta que quiere ver: ")).lower().replace(' ', '_')
                    if nombre_receta in ['exit', 'salir']:
                        return
                    elif nombre_receta in map(str.lower, recetas_posibles):
                        self.mostrar_receta(nombre_receta)
                        break
                    print(self.traducir("Nombre de receta no válido o no encontrado."))

                if not self.preguntar_otra_receta():
                    return
            else:
                # Si no hay recetas disponibles con los ingredientes proporcionados, notificar al usuario
                print(self.traducir("No hay recetas disponibles con los ingredientes proporcionados."))
                self.ingredientes_usuario = None

    def mostrar_receta(self, nombre_receta):
        # Método para mostrar los detalles de una receta específica
        receta_encontrada = next((receta for receta in self.recetas if receta.get('nombre' if self.idioma_elegido == 'español' else 'name', '').lower() == nombre_receta), None)

        if receta_encontrada:
            # Si se encuentra la receta, mostrar ingredientes y pasos
            print(self.traducir("\nIngredientes:"))
            print('\n'.join(f"{i}. {ingrediente}" for i, ingrediente in enumerate(receta_encontrada.get('ingredientes' if self.idioma_elegido == 'español' else 'ingredients', []), 1)))
            print(self.traducir("\nPasos:"))
            print('\n'.join(f"{i}. {paso}" for i, paso in enumerate(receta_encontrada.get('pasos' if self.idioma_elegido == 'español' else 'steps', ['Receta no disponible']), 1)))
        else:
            # Si no se encuentra la receta, notificar al usuario
            print(self.traducir("Receta no encontrada."))

    def preguntar_otra_receta(self):
        # Método para preguntar al usuario si desea ver otra receta o salir del programa
        respuesta = input(self.traducir("\n¿Desea ver otra receta de la lista?: ")).lower()
        if respuesta.startswith('s') or respuesta.startswith('y'):
            return True
        elif respuesta.startswith('n'):
            respuesta_nueva = input(self.traducir("\n¿Desea ver una receta con otros ingredientes?: ")).lower()
            if respuesta_nueva.startswith('s') or respuesta_nueva.startswith('y'):
                self.ingredientes_usuario.clear()
                return True
            elif respuesta_nueva.startswith('n'):
                # Si el usuario no desea ver más recetas, preguntar si quiere ver recetas con otros ingredientes o salir
                print(self.traducir("Espero haberle sido de ayuda, ¡Hasta luego! 😊"))
                return False
        else:
            # Manejar respuestas no válidas
            print(self.traducir("Respuesta no válida."))
            return True

# Ejemplo de uso del asistente de recetas
asistente = AsistenteRecetas()
