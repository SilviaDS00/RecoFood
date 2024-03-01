import json
from googletrans import Translator

class AsistenteRecetas:
    
    #Inicializa la clase y carga las recetas
    def __init__(self):
        self.idioma = {'español': 'es', 'inglés': 'en'}
        self.idioma_elegido = self.elegir_idioma()
        self.recetas = self.carga_json()
        self.ingredientes_usuario = []
        self.translator = Translator()

    # Permite al usuario seleccionar el idioma
    def elegir_idioma(self):
        while True:
            language = input("Seleccione el idioma (español / inglés): ").lower()
            if language in self.idioma:
                return language
            print("Por favor, seleccione un idioma válido.")
            
    # Traduce el texto al idioma elegido
    def traducir(self, text):
        idioma_destino = self.idioma.get(self.idioma_elegido)
        return self.translator.translate(text, dest=idioma_destino).text if idioma_destino else text
    
    # Carga las recetas del archivo JSON
    def carga_json(self):
        with open(f"recetas_{self.idioma[self.idioma_elegido]}.json", 'r') as archivo:
            return json.load(archivo)
        
    # Busca recetas basadas en los ingredientes del usuario
    def buscar_recetas(self):
        while True:
            if not self.ingredientes_usuario:
                self.ingredientes_usuario = input(self.traducir("Ingrese los ingredientes que tiene: ")).replace(' y ', ', ').replace(' and ', ', ').split(',')
                self.ingredientes_usuario = [ingrediente.strip().lower() for ingrediente in self.ingredientes_usuario]

            recetas_posibles = [receta.get('nombre' if self.idioma_elegido == 'español' else 'name', 'Nombre no disponible') for receta in self.recetas if all(ingrediente.lower() in map(str.lower, receta.get('ingredientes' if self.idioma_elegido == 'español' else 'ingredients', [])) for ingrediente in self.ingredientes_usuario)]

            if recetas_posibles:
                print(self.traducir("Puedes realizar las siguientes recetas: "))
                print('\n'.join(f'- {receta}' for receta in recetas_posibles))

                while True:
                    nombre_receta = input(self.traducir("\nIntroduzca el nombre de la receta que quiere ver: ")).lower()
                    if nombre_receta in ['exit', 'salir']:
                        return
                    elif nombre_receta in map(str.lower, recetas_posibles):
                        self.mostrar_receta(nombre_receta)
                        break
                    print(self.traducir("Nombre de receta no válido o no encontrado."))

                if not self.preguntar_otra_receta():
                    return
            else:
                print(self.traducir("No hay recetas disponibles con los ingredientes proporcionados."))
                self.ingredientes_usuario = None

    # Muestra los ingredientes y pasos de una receta.
    def mostrar_receta(self, nombre_receta):
        receta_encontrada = next((receta for receta in self.recetas if receta.get('nombre' if self.idioma_elegido == 'español' else 'name', '').lower() == nombre_receta), None)

        if receta_encontrada:
            print(self.traducir("\nIngredientes:"))
            print('\n'.join(f"{i}. {ingrediente}" for i, ingrediente in enumerate(receta_encontrada.get('ingredientes' if self.idioma_elegido == 'español' else 'ingredients', []), 1)))
            print(self.traducir("\nPasos:"))
            print('\n'.join(f"{i}. {paso}" for i, paso in enumerate(receta_encontrada.get('pasos' if self.idioma_elegido == 'español' else 'steps', ['Receta no disponible']), 1)))
        else:
            print(self.traducir("Receta no encontrada."))

    # Pregunta al usuario si quiere ver otra receta.
    def preguntar_otra_receta(self):
        respuesta = input(self.traducir("\n¿Desea ver otra receta de la lista?: ")).lower()
        if respuesta.startswith('s') or respuesta.startswith('y'):
            return True
        elif respuesta.startswith('n'):
            respuesta_nueva = input(self.traducir("\n¿Desea ver una receta con otros ingredientes?: ")).lower()
            if respuesta_nueva.startswith('s') or respuesta_nueva.startswith('y'):
                self.ingredientes_usuario.clear()
                return True
            elif respuesta_nueva.startswith('n'):
                print(self.traducir("Espero haberle sido de ayuda, ¡Hasta luego! 😊"))
                return False
        else:
            print(self.traducir("Respuesta no válida."))
            return True