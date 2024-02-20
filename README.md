![Logo](/Capturas_Codigo/Logo.png)

# RecoFood

_TFM realizado por **[Silvia Donaire Serrano](https://github.com/SilviaDS00)**, **[Elena Racero González](https://github.com/ElenaRacero3)** y **[Manuel Fajardo Jiménez](https://github.com/Manufajimez)** del Máster de Inteligencia Arficial y Big Data del CPIFP Alan Turing_

## Índice

:black_nib: [1. Justificación y descripción del proyecto](#id1)

:mag: [2. Obtención de los datos](#id2)

:bar_chart: [3. Exploración y visualización de los datos](#id3)

:hourglass: [4. Preparación de los datos para Machine Learning](#id4)

:chart_with_upwards_trend: [5. Entrenamiento del modelo y comprobación del rendimiento](#id5)

:space_invader: [6. Procesamiento del lenguaje natural - ChatBot](#id6)

:computer: [7. Aplicación Web](#id7)

:pencil: [8. Conclusiones](#id8)

## 1. Justificación y descripción del proyecto<a name="id1"></a>

El proyecto propuesto se centra en el desarrollo de un sistema integral destinado a clasificar alimentos mediante el uso del conjunto de datos Food101. Esta iniciativa surge en respuesta a la creciente necesidad de proporcionar información detallada sobre las comidas, con el objetivo de facilitar la toma de decisiones nutricionales. En la actualidad, las personas están cada vez más conscientes de la importancia de una alimentación equilibrada y saludable, pero la variedad y complejidad de los alimentos disponibles pueden dificultar la toma de decisiones informadas.

La clasificación de comidas mediante el conjunto de datos Food101 permitirá a los usuarios identificar rápidamente los alimentos presentes en sus comidas, proporcionando así una base para obtener información nutricional específica. Este enfoque no solo contribuye a la conciencia alimentaria, sino que también facilita la implementación de hábitos dietéticos más saludables.

Además de la clasificación de alimentos, el proyecto se propone ofrecer información detallada sobre los macronutrientes presentes en cada comida. Esta funcionalidad responde a la demanda creciente de conocimientos nutricionales específicos, lo que permite a los usuarios adaptar sus dietas de acuerdo con sus necesidades individuales y metas de salud.

La clasificación de alimentos a través de Food101 es esencial para ayudar a los usuarios a identificar y comprender rápidamente los componentes de sus comidas. Sin embargo, reconocemos que la información sobre la clasificación sola puede no ser suficiente para guiar a los usuarios hacia elecciones alimentarias más saludables. Es por eso que hemos decidido incorporar un chatbot especializado en ofrecer recetas adaptadas a las preferencias y necesidades individuales de los usuarios.

## 2. Obtención de los datos<a name="id2"></a>

**NOTA:** Todos los pasos de obtención de los datos, visualización de los datos y entrenamiento del modelo se hacen en [este Cuaderno de Jupyter](https://github.com/SilviaDS00/RecoFood/blob/main/Modelo_Entrenamiento/Modelo_RecoFood.ipynb)

Las imágenes han sido recogidas de un conjunto de datos de 101 categorías de alimentos con un total de 101.000 imágenes.

[Fuente de los datos](https://data.vision.ee.ethz.ch/cvl/datasets_extra/food-101/)

[Link a la web de TensorFlow](https://www.tensorflow.org/datasets/catalog/food101?hl=es-419)

Se han descargado y extraído desde el cuaderno de Jupyter de la siguiente manera:

![Obtencion de las imagenes](/Capturas_Codigo/Data_obtein.png)

## 3. Exploración y visualización de los datos<a name="id3"></a>

Primero visualizamos todas las clases de comida que hay en el conjunto de datos:

![Obtencion de las clases](/Capturas_Codigo/Classes.png)

```
['apple_pie', 'baby_back_ribs', 'baklava', 'beef_carpaccio', 'beef_tartare', 'beet_salad', 'beignets', 'bibimbap', 'bread_pudding', 'breakfast_burrito', 'bruschetta', 'caesar_salad', 'cannoli', 'caprese_salad', 'carrot_cake', 'ceviche', 'cheese_plate', 'cheesecake', 'chicken_curry', 'chicken_quesadilla', 'chicken_wings', 'chocolate_cake', 'chocolate_mousse', 'churros', 'clam_chowder', 'club_sandwich', 'crab_cakes', 'creme_brulee', 'croque_madame', 'cup_cakes', 'deviled_eggs', 'donuts', 'dumplings', 'edamame', 'eggs_benedict', 'escargots', 'falafel', 'filet_mignon', 'fish_and_chips', 'foie_gras', 'french_fries', 'french_onion_soup', 'french_toast', 'fried_calamari', 'fried_rice', 'frozen_yogurt', 'garlic_bread', 'gnocchi', 'greek_salad', 'grilled_cheese_sandwich', 'grilled_salmon', 'guacamole', 'gyoza', 'hamburger', 'hot_and_sour_soup', 'hot_dog', 'huevos_rancheros', 'hummus', 'ice_cream', 'lasagna', 'lobster_bisque', 'lobster_roll_sandwich', 'macaroni_and_cheese', 'macarons', 'miso_soup', 'mussels', 'nachos', 'omelette', 'onion_rings', 'oysters', 'pad_thai', 'paella', 'pancakes', 'panna_cotta', 'peking_duck', 'pho', 'pizza', 'pork_chop', 'poutine', 'prime_rib', 'pulled_pork_sandwich', 'ramen', 'ravioli', 'red_velvet_cake', 'risotto', 'samosa', 'sashimi', 'scallops', 'seaweed_salad', 'shrimp_and_grits', 'spaghetti_bolognese', 'spaghetti_carbonara', 'spring_rolls', 'steak', 'strawberry_shortcake', 'sushi', 'tacos', 'takoyaki', 'tiramisu', 'tuna_tartare', 'waffles']
```

A continuación visualizamos una imagen aleatoria de cada clase:

![Codigo imagenes aleatorias](/Capturas_Codigo/Code_Imagenes_Aleatorias.png)

![Imagenes aleatorias](/Capturas_Codigo/Imagenes_Aleatorias.png)

## 4. Preparación de los datos para Machine Learning<a name="id4"></a>

Primero realizamos la configuración los generadores de los datos de las imágenes:

- `rescale=1./255`: Normaliza los valores de píxeles de las imágenes dividiendo cada píxel por 255. Esto escala los valores de píxeles al rango de [0, 1].

- `shear_range=0.2`: Se aplica un sesgo (shear) a las imágenes. Este parámetro controla la intensidad del sesgo. El sesgo puede ser útil para la variación de datos durante el entrenamiento, lo que ayuda al modelo a generalizar mejor.

- `zoom_range=0.2`: Aplica transformaciones de zoom aleatorio a las imágenes. Esto puede ayudar al modelo a generalizar mejor y mejorar su robustez.

- `horizontal_flip=True`: Voltea aleatoriamente las imágenes horizontalmente. Esto aumenta la variabilidad de los datos.

- `vertical_flip=True`: Voltea aleatoriamente las imágenes verticalmente. Similar al horizontal_flip, aumenta la variabilidad.

- `fill_mode='nearest'`: Rellena los píxeles recién creados después de una transformación. 'nearest' indica que se utilizarán los valores de píxeles más cercanos.

- `channel_shift_range=0.2`: Cambia aleatoriamente los valores de píxeles en los canales de color. Esto puede introducir variabilidad en los colores de las imágenes.

- `rotation_range=40`: Rota aleatoriamente las imágenes en un rango de 40 grados. Esto puede ayudar al modelo a reconocer objetos en diferentes orientaciones.

- `brightness_range=[0.5, 1.5]`: Ajusta aleatoriamente el brillo de las imágenes dentro del rango especificado.

- `width_shift_range=0.2` y `height_shift_range=0.2`: Realiza desplazamientos aleatorios en anchura y altura respectivamente. Ayuda a que el modelo sea más robusto a cambios en la posición de los objetos.

- `validation_split=0.2`: Divide automáticamente el conjunto de datos en entrenamiento y validación, reservando el 20% de los datos para validación. Esto es útil para evaluar el rendimiento del modelo en un conjunto de datos separado durante el entrenamiento.

![Preparacion datos](/Capturas_Codigo/Data_prepair1.png)

A continuación configuramos los generadores del flujo de los datos que alimentarán los lotes de las imágenes preprocesadas al modelo durante el entrenamiento y la evaluación.

- `base_dir`: La ruta al directorio que contiene subdirectorios separados para cada clase de imágenes. Estos subdirectorios son utilizados por el generador para determinar las clases y organizar las imágenes.

- `target_size=(img_height, img_width)`: El tamaño al que se deben redimensionar las imágenes. Todas las imágenes se redimensionarán a este tamaño antes de ser alimentadas al modelo.

- `batch_size`: El tamaño de cada lote de imágenes que se proporcionará al modelo durante cada iteración de entrenamiento.

- `class_mode='categorical'`: La forma en que se deben manejar las etiquetas de clase. En este caso, se utiliza 'categorical' porque parece estar trabajando con un problema de clasificación multiclase.

- `subset="training"` o `subset="validation"`: Esto se utiliza para especificar si el generador está configurado para el conjunto de entrenamiento ("training") o para el conjunto de validación ("validation"). Esto es útil cuando se utiliza la opción validation_split en los generadores de datos de imágenes para dividir automáticamente los datos en conjuntos de entrenamiento y validación.

![Preparacion datos](/Capturas_Codigo/Data_prepair2.png)

```
Found 80800 images belonging to 101 classes.

Found 20200 images belonging to 101 classes.
```

## 5. Entrenamiento del modelo y comprobación del rendimiento<a name="id5"></a>

Hemos realizado pruebas con 3 modelos preentrenados: `InceptionV3`, `ResNet50`, `DenseNet121`.

El que mejores métricas ha dado es: ``.

A continuación se mostrarán los pasos del entrenamiento con el modelo finalmente elegido.

### 5.1 Creación del modelo

En este paso creamos el modelo de entrenamiento, utilizamos la arquitectura `InceptionV3` preentrenada en el conjunto de datos _ImageNet_.

- `inception = InceptionV3(weights='imagenet', include_top=False)`: Se crea una instancia del modelo InceptionV3. La opción `weights='imagenet'` carga los pesos preentrenados del modelo en el conjunto de datos "ImageNet". `include_top=False` excluye las capas densas (totalmente conectadas) en la parte superior del modelo, ya que se agregarán capas personalizadas más adelante para adaptar el modelo a un problema específico.

- `x = inception.output`: Se toma la salida de la última capa de la red InceptionV3. Esta salida es una representación de características de alto nivel de la entrada de la imagen.

- `x = GlobalAveragePooling2D()(x)`: Se aplica una capa de pooling global promedio, que toma la media de cada canal a lo largo de todas las posiciones espaciales. Esto reduce la dimensionalidad de la representación de características, capturando la información esencial de las características.

- `x = Dense(128, activation='relu')(x)`: Se agrega una capa densa con 128 neuronas y función de activación ReLU. Esta capa totalmente conectada ayuda a aprender patrones más complejos en los datos.

- `x = Dropout(0.2)(x)`: Se aplica una capa de Dropout con una tasa del 20%. El Dropout ayuda a prevenir el sobreajuste al "apagar" aleatoriamente un porcentaje de las neuronas durante el entrenamiento.

- `predictions = Dense(len(class_names), kernel_regularizer=l1(0.005), activation='softmax')(x)`: Se añade la capa de salida. Esta capa tiene un número de neuronas igual a la cantidad de clases en tu problema (determinado por `len(class_names)`), con una regularización **L1** para penalizar los pesos grandes. La función de activación **softmax** se utiliza para obtener probabilidades normalizadas para cada clase.

- `model = Model(inputs=inception.input, outputs=predictions)`: Se crea el modelo final utilizando el modelo **InceptionV3** como base y añadiendo las capas personalizadas. `inputs=inception.input` establece la entrada del modelo como la entrada original de InceptionV3, y `outputs=predictions` establece la salida del modelo como la capa de predicciones recién añadida.

![Creacion modelo](/Capturas_Codigo/Model_Creation.png)

### 5.2 Compilación del modelo

Compilamos el modelo:

- `optimizer=SGD(learning_rate=0.0001, momentum=0.9)`: Se especifica el optimizador que se utilizará durante el entrenamiento del modelo. En este caso, se está utilizando el optimizador estocástico de descenso de gradiente (SGD). `learning_rate=0.0001` establece la tasa de aprendizaje, que controla el tamaño de los pasos que el optimizador toma para minimizar la función de pérdida. `momentum=0.9` es un término que acelera la convergencia en la dirección correcta y ayuda a evitar oscilaciones.

- `loss='categorical_crossentropy'`: Se especifica la función de pérdida que se utilizará durante el entrenamiento. En este caso, se trata de la entropía cruzada categórica, que es comúnmente utilizada en problemas de clasificación con múltiples clases.

- `metrics=['accuracy']`: Se especifica la métrica que se utilizará para evaluar el rendimiento del modelo durante el entrenamiento y la evaluación. En este caso, se utiliza la precisión (accuracy), que mide la fracción de muestras correctamente clasificadas.

![Compilacion modelo](/Capturas_Codigo/Model_Compile.png)

### 5.3 Callbacks

Antes de entrenar el modelo establecemos el callback `EarlyStopping`, que usa una técnica que detiene el entrenamiento si no hay mejoreas de las métricas:

- `monitor='val_loss'`: Significa que la métrica que se está monitoreando es la pérdida en el conjunto de validación (val_loss).

- `patience=10`: Indica que el entrenamiento se detendrá después de 10 épocas consecutivas sin mejora en la pérdida de validación.

- `restore_best_weights=True`: Restaurará los pesos del modelo a la época en la que se obtuvo la mejor métrica de validación. Esto es útil para evitar que el modelo se sobreajuste al conjunto de entrenamiento.

Y también añadimos el callback de `ModelCheckpoint`, que éste guarda el modelo durante el entrenamiento después de cada época siempre y cuando la métrica sea mejor que la anterior:

- `filepath='Modelos entrenados/best_model_inception.h5'`: Indica la ruta donde se guardará el modelo. En este caso, el modelo se guardará como un archivo HDF5 llamado "best_model_inception.h5" en el directorio "Modelos entrenados".

- `verbose=1`: Proporciona información detallada sobre la guarda del modelo (por ejemplo, qué época se guardó, etc.).

- `save_best_only=True`: Guarda solo el mejor modelo en términos de la métrica monitorizada (en este caso, la pérdida de validación). Esto asegura que solo se guarde el modelo si es mejor que los modelos anteriores.

![Compilacion modelo](/Capturas_Codigo/Model_Callbacks.png)

### 5.4 Entrenamiento del modelo

Una ver realizado todos los pasos anteriores hacemos el entrenamiento del modelo.

**NOTA**: Para poder realizar el entrenamiento con éxito, hemos tenido que instalar **Anaconda** con TensorFlow, Keras, CUDA y CUDNN de manera local para poder utilizar la GPU de nuestro ordenador (para ello hemos seguido los pasos de este [vídeo](https://www.youtube.com/watch?v=OEFKlRSd8Ic)), ya que al entrenar tantas imágenes, el Google Colab se colapsaba.

![Compilacion modelo](/Capturas_Codigo/Model_Fit.png)

### 5.5 Métricas del entrenamiento

El modelo, como hemos dicho anteriormente, ha sido entrenado con 3 modelos preentrenados diferentes, a continuación se muestran las gráficas de cada resultado obtenido:

En el modelo de `InceptionV3` se ha establecido un callback de EarlyStopping con los siguientes parámetros:

```
early_stopping_inception = EarlyStopping(
    monitor='val_loss',
    patience=15,
    restore_best_weights=True)
```

Se ha usado un patience de 15, es decir, que cuando en 15 épocas no se ha mejorado la métrica de `val_loss`, el entrenamiento se detiene.

El modelo se ha detenido a las 73 épocas de entrenamiento.

Las métricas de este modelo entrenado son las siguientes:

![Compilacion modelo](/Capturas_Codigo/Inception_Metrics.png)

En el modelo entrenado con `ResNet50` se ha establecido el mismo callback pero con un patience de 10:

```
early_stopping_resnet = EarlyStopping(
    monitor='val_loss',
    patience=10,
    restore_best_weights=True)
```

El modelo se ha detenido a las 30 épocas de entrenamiento.

Las métricas de este modelo entrenado son las siguientes:

![Compilacion modelo](/Capturas_Codigo/ResNet_Metrics.png)

En el modelo entrenado con `ResNet50` se ha establecido el mismo callback con un patience de 10:

```
early_stopping_densenet = EarlyStopping(
    monitor='val_loss',
    patience=10,
    restore_best_weights=True)
```

El modelo se ha detenido a las 25 épocas de entrenamiento.

Las métricas de este modelo entrenado son las siguientes:

![Compilacion modelo](/Capturas_Codigo/DenseNet_Metrics.png)

### 5.6 Conversión del modelo entrenado

Este paso lo hacemos en el siguiente [Cuaderno de Jupyter](https://github.com/SilviaDS00/RecoFood/blob/main/Modelo_Entrenado/Conversion_Modelo_Entrenado_Web.ipynb).

Para garantizar la implementación del modelo en nuestra aplicación web, primero debemos convertirlo a un formato apto para ello.

Nuestro modelo entrenado estará en formato `.h5`, pero debemos transformarlo a `.json`.

Para ello ejecutaremos el siguiente comando:

```
!tensorflowjs_converter --input_format keras '/content/best_model_trained.h5' /content/drive/MyDrive/TFM-RecoFood/Modelo_Convertido_Web
```

Y obtendremos una carpeta que contendrá el modelo en formato JSON y otros ficheros necesarios, puedes verlos [aquí](https://github.com/SilviaDS00/RecoFood/tree/main/Modelo_Entrenado/Modelo_Transformado).

## 6. Procesamiento del lenguaje natural - ChatBot<a name="id6"></a>

En esta sección, se detalla el progreso de nuestro Asistente de Recetas. Este emplea el Procesamiento de Lenguaje Natural (PLN) para interactuar con los usuarios de una manera más accesible. En particular, hemos implementado la traducción automática, que es una aplicación del PLN, para permitir que los usuarios accedan a las recetas en dos idiomas: inglés y español.

### 6.1 Importación de paquetes

Importamos aquellos paquetes necesarios para ejecutar nuestro programa

- `json`: nos permite trabajar con objetos JSON.
- `googletrans`: es una biblioteca que implementa la API de Google Translate, permitiéndonos traducir texto de un idioma a otro.

![importacion](https://github.com/SilviaDS00/RecoFood/assets/146923466/eef3995c-3e77-4b5a-aa0b-9376443b888e)

### 6.2 Definición de la clase AsistenteRecetas

La clase `AsistenteRecetas` es la principal de nuestro programa, donde implementamos todas las funcionalidades relacionadas con la gestión y visualización de recetas.

En su constructor (init), se inicializan varias variables de instancia:

- `self.translator`: Un objeto de la clase Translator que se utilizará para traducir texto.

- `self.idioma`: Un diccionario que mapea los nombres de los idiomas a sus códigos correspondientes (es o en).

- `self.idioma_elegido`: El idioma elegido por el usuario, obtenido llamando a la función elegir_idioma().

- `self.recetas`: Las recetas cargadas desde un archivo JSON, obtenidas llamando a la función carga_json().

![Inicializador](https://github.com/SilviaDS00/RecoFood/assets/146923466/bbb1f866-1662-4e57-a7a3-04a5fc806b00)

El método `elegir_idioma` permite al usuario seleccionar un idioma. Continúa solicitando un idioma hasta que el usuario ingresa español o inglés.

![eleccion_idioma](https://github.com/SilviaDS00/RecoFood/assets/146923466/e9d321ac-298b-459c-b0d0-2b92e33888dc)

El método `traducir` utiliza el traductor para convertir un texto dado al idioma elegido por el usuario, lo que garantiza la comprensión adecuada de las recetas independientemente del idioma original.

![traductor](https://github.com/SilviaDS00/RecoFood/assets/146923466/88032901-7586-4129-b0a0-1d9aa6cdf5e5)

El método `carga_json` carga las recetas desde archivos JSON según el idioma seleccionado

![carga_json](https://github.com/SilviaDS00/RecoFood/assets/146923466/eb9154b1-f323-419d-b571-f0e5875eb0ea)

El método `ver_receta` verifica si la receta especificada por el usuario existe en el sistema. Si existe, muestra el nombre de la receta, seguido de la lista de ingredientes y pasos de preparación, todo ello en el idioma elegido por el usuario. Si la receta no existe, muestra un mensaje indicando que no se encontró la receta.

![ver_receta](https://github.com/SilviaDS00/RecoFood/assets/146923466/3c50b868-0ab9-4423-a03f-63f85aeb0cd0)

Por último, el método `otras_recetas` muestra todas las recetas disponibles y después pide al usuario que proporcione el nombre de una receta para poder mostrársela.

![otras_recetas](https://github.com/SilviaDS00/RecoFood/assets/146923466/ff84bde7-9c56-483f-9b9f-0d0b17fc0bc3)

Después de definir la clase, creamos una instancia de esta clase llamada Bot.

### 6.3 Interacción con el usuario

El código proporciona un bucle que permite al usuario interactuar con el asistente de recetas. Dependiendo de la opción seleccionada, el programa ejecuta el método correspondiente de la clase, garantizando una interacción fluida y amigable con el usuario. En caso de ingresar una opción no válida, se muestra un mensaje de error y se solicita al usuario que ingrese nuevamente una opción válida.

![menu](https://github.com/SilviaDS00/RecoFood/assets/146923466/1ff6434d-9e2f-4842-a46c-8ece0fb186d3)

## 7. Aplicación web<a name="id7"></a>

[Aquí](https://github.com/SilviaDS00/RecoFood/tree/main/Web_React_App) puedes encontrar todos los ficheros de la aplicación de ReactJS.

La aplicación web está realizada en ReactJS, el la cual hemos implementado el modelo entrenado.

La web contiene dos botones, uno para realizar una foto con la cámara, y otro para subir una imagen. Realizando cualquiera de las dos opciones se aplicará el modelo a la imagen.

## 8. Conclusiones<a name="id8"></a>
