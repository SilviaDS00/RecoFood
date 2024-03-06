![Logo](/Capturas_Codigo/Logo.png)

# RecoFood

_TFM realizado por **[Silvia Donaire Serrano](https://github.com/SilviaDS00)**, **[Elena Racero González](https://github.com/ElenaRacero3)** y **[Manuel Fajardo Jiménez](https://github.com/Manufajimez)** del Máster de Inteligencia Arficial y Big Data del CPIFP Alan Turing_

---
<div align="center">

[Presentación](https://github.com/SilviaDS00/RecoFood/blob/main/Presentaci%C3%B3n-RecoFood-TFM.pdf) | [Vídeo](#id15)

</div>

---

## Índice

:black_nib: [1. Justificación y descripción del proyecto](#id1)

---

#### Modelo de entrenamiento de clasificación de imágenes

:mag: [2. Obtención de los datos](#id2)

:bar_chart: [3. Exploración y visualización de los datos](#id3)

:hourglass: [4. Preparación de los datos para Machine Learning](#id4)

:chart_with_upwards_trend: [5. Entrenamiento del modelo y comprobación del rendimiento](#id5)

---

#### Modelo de entrenamiendo de predicción del IMC

:chart_with_upwards_trend: [6. Entrenamiento del modelo predictivo del IMC](#id6)

---

:space_invader: [7. Procesamiento del lenguaje natural - ChatBot](#id7)

:computer: [8. Aplicación Web](#id8)

:pencil: [9. Conclusiones](#id9)

## 1. Justificación y descripción del proyecto<a name="id1"></a>

El proyecto propuesto se centra en el desarrollo de un sistema integral destinado a clasificar alimentos mediante el uso del conjunto de datos Food101. Esta iniciativa surge en respuesta a la creciente necesidad de proporcionar información detallada sobre las comidas, con el objetivo de facilitar la toma de decisiones nutricionales. En la actualidad, las personas están cada vez más conscientes de la importancia de una alimentación equilibrada y saludable, pero la variedad y complejidad de los alimentos disponibles pueden dificultar la toma de decisiones informadas.

La clasificación de comidas mediante el conjunto de datos Food101 permitirá a los usuarios identificar rápidamente los alimentos presentes en sus comidas, proporcionando así una base para obtener información nutricional específica. Este enfoque no solo contribuye a la conciencia alimentaria, sino que también facilita la implementación de hábitos dietéticos más saludables.

Además de la clasificación de alimentos, el proyecto se propone ofrecer información detallada sobre los macronutrientes presentes en cada comida. Esta funcionalidad responde a la demanda creciente de conocimientos nutricionales específicos, lo que permite a los usuarios adaptar sus dietas de acuerdo con sus necesidades individuales y metas de salud.

La clasificación de alimentos a través de Food101 es esencial para ayudar a los usuarios a identificar y comprender rápidamente los componentes de sus comidas. Sin embargo, reconocemos que la información sobre la clasificación sola puede no ser suficiente para guiar a los usuarios hacia elecciones alimentarias más saludables. Es por eso que hemos decidido incorporar un chatbot especializado en ofrecer recetas.

---

### Entrenamiento de clasificación de imágenes

Para la creación de nuestro modelo de clasificación de imágenes, lo hemos hecho mediante **Redes Neuronales Convolucionales**, usando las librerías de TensorFlor y Keras.

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

Visualizamos cuántas imágenes tiene cada clase:

![Numero imagenes por clase](/Capturas_Codigo/Num_Images_Category.png)

```
Directorio 'apple_pie' contiene 1000 imágenes.
Directorio 'baby_back_ribs' contiene 1000 imágenes.
Directorio 'baklava' contiene 1000 imágenes.
Directorio 'beef_carpaccio' contiene 1000 imágenes.
Directorio 'beef_tartare' contiene 1000 imágenes.
Directorio 'beet_salad' contiene 1000 imágenes.
Directorio 'beignets' contiene 1000 imágenes.
Directorio 'bibimbap' contiene 1000 imágenes.
Directorio 'bread_pudding' contiene 1000 imágenes.
Directorio 'breakfast_burrito' contiene 1000 imágenes.
Directorio 'bruschetta' contiene 1000 imágenes.
Directorio 'caesar_salad' contiene 1000 imágenes.
Directorio 'cannoli' contiene 1000 imágenes.
Directorio 'caprese_salad' contiene 1000 imágenes.
Directorio 'carrot_cake' contiene 1000 imágenes.
Directorio 'ceviche' contiene 1000 imágenes.
Directorio 'cheesecake' contiene 1000 imágenes.
Directorio 'cheese_plate' contiene 1000 imágenes.
Directorio 'chicken_curry' contiene 1000 imágenes.
Directorio 'chicken_quesadilla' contiene 1000 imágenes.
Directorio 'chicken_wings' contiene 1000 imágenes.
Directorio 'chocolate_cake' contiene 1000 imágenes.
Directorio 'chocolate_mousse' contiene 1000 imágenes.
Directorio 'churros' contiene 1000 imágenes.
Directorio 'clam_chowder' contiene 1000 imágenes.
...
Directorio 'takoyaki' contiene 1000 imágenes.
Directorio 'tiramisu' contiene 1000 imágenes.
Directorio 'tuna_tartare' contiene 1000 imágenes.
Directorio 'waffles' contiene 1000 imágenes.
```

Visualizamos cuántas imágenes tienen establecidos en los ficheros train.txt y test.txt del conjunto de datos:

![Numero imagenes te entrenamiento y de test](/Capturas_Codigo/Num_Images_Train_Test.png)

```
El archivo 'food-101/meta/train.txt' contiene 75750 datos de entrenamiento.
El archivo 'food-101/meta/test.txt' contiene 25250 datos de test.
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

Hemos realizado pruebas con 3 arquitecturas preentrenadas: `InceptionV3`, `ResNet50`, `DenseNet121`.

El que mejores métricas ha dado es: `InceptionV3`.

A continuación se mostrarán los pasos del entrenamiento con el modelo finalmente elegido.

### 5.1 Creación del modelo

En este paso creamos el modelo de entrenamiento, utilizamos la arquitectura `InceptionV3` preentrenada en el conjunto de datos _ImageNet_.

- `inception = InceptionV3(weights='imagenet', include_top=False, input_shape(img_height, img_weight))`: Se crea una instancia del modelo InceptionV3. La opción `weights='imagenet'` carga los pesos preentrenados del modelo en el conjunto de datos "ImageNet". `include_top=False` excluye las capas densas (totalmente conectadas) en la parte superior del modelo, ya que se agregarán capas personalizadas más adelante para adaptar el modelo a un problema específico.

- `x_inception = inception.output`: Se toma la salida de la última capa de la red InceptionV3. Esta salida es una representación de características de alto nivel de la entrada de la imagen.

- `x_inception = GlobalAveragePooling2D()(x_inception)`: Se aplica una capa de pooling global promedio, que toma la media de cada canal a lo largo de todas las posiciones espaciales. Esto reduce la dimensionalidad de la representación de características, capturando la información esencial de las características.

- `predictions_inception = Dense(len(class_names), kernel_regularizer=l1(0.005), activation='softmax')(x_inception)`: Se añade la capa de salida. Esta capa tiene un número de neuronas igual a la cantidad de clases en tu problema (determinado por `len(class_names)`), con una regularización **L1** para penalizar los pesos grandes. La función de activación **softmax** se utiliza para obtener probabilidades normalizadas para cada clase.

- `model_inception = Model(inputs=inception.input, outputs=predictions_inception)`: Se crea el modelo final utilizando el modelo **InceptionV3** como base y añadiendo las capas personalizadas. `inputs=inception.input` establece la entrada del modelo como la entrada original de InceptionV3, y `outputs=predictions_inception` establece la salida del modelo como la capa de predicciones recién añadida.

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

#### InceptionV3

En el modelo de `InceptionV3` se ha establecido un callback de EarlyStopping con los siguientes parámetros:

```
early_stopping_inception = EarlyStopping(
    monitor='val_loss',
    patience=10,
    restore_best_weights=True)
```

Se ha usado un patience de 10, es decir, que cuando en 10 épocas no se ha mejorado la métrica de `val_loss`, el entrenamiento se detiene.

El modelo se ha detenido a las 42 épocas de entrenamiento.

Las métricas de este modelo entrenado son las siguientes:

![Compilacion modelo](/Capturas_Codigo/Inception_Metrics.png)

#### ResNet50

En el modelo entrenado con `ResNet50` se ha establecido el mismo callback:

```
early_stopping_resnet = EarlyStopping(
    monitor='val_loss',
    patience=10,
    restore_best_weights=True)
```

El modelo se ha detenido a las 22 épocas de entrenamiento.

Las métricas de este modelo entrenado son las siguientes:

![Compilacion modelo](/Capturas_Codigo/ResNet_Metrics.png)

#### DenseNet121

En el modelo entrenado con `DenseNet121` se ha establecido el mismo callback:

```
early_stopping_densenet = EarlyStopping(
    monitor='val_loss',
    patience=10,
    restore_best_weights=True)
```

El modelo se ha detenido a las 32 épocas de entrenamiento.

Las métricas de este modelo entrenado son las siguientes:

![Compilacion modelo](/Capturas_Codigo/DenseNet_Metrics.png)

---

## 6. Entrenamiento de predicción del IMC<a name="id6"></a>

El entrenamiendo del modelo de predicción del IMC lo puedes encontrar en este cuaderno de [Jupyter](https://github.com/SilviaDS00/RecoFood/blob/main/Modelos_Entrenamiento/Entrenamiento_bmi/Modelo_BMI.ipynb)

---

## 7. Procesamiento del Lenguaje Natural - ChatBot<a name="id7"></a>

En esta sección, describiremos el funcionamiento de nuestro chatbot. Utilizamos el Procesamiento de Lenguaje Natural (PLN) para interactuar con los usuarios de manera más accesible. Además, hemos implementado la funcionalidad de generación de texto a audio. Esto significa que el usuario tiene la opción de recibir las respuestas del chatbot en formato de audio. Así, ofrecemos una experiencia más versátil y personalizada para nuestros usuarios. Nuestro chatbot ha sido implementado de manera completa, abarcando tanto el frontend como el backend.

## **FRONT-END**

### 7.1 Importación de módulos y componentes

Empezamos importando los módulos necesarios de React, así como un componente de carga y los estilos CSS.

![modules_and_components](https://github.com/SilviaDS00/RecoFood/assets/146923466/f373c04c-1391-4fbc-8bab-8f31f49b34dd)


### 7.2 Inicialización del componente Chatbot

Se define el componente `Chatbot` y se inicializan varios estados y referencias. 

Los estados incluyen:

- `inputValue`: Almacena la entrada del usuario.

- `messages`: Almacena los mensajes del chat.

- `audioUrl`: Almacena la URL del audio.

- `isLoading`: Indicar si se está cargando la respuesta del servidor.
  
- `audioRefs`: Almacena las referencias a los objetos de audio.

Las referencias incluyen:

- `audioRef`: Para referenciar al objeto de audio actual.

- `chatContainerRef`: Para referenciar al contenedor del chat.

![chatbot_initiation](https://github.com/SilviaDS00/RecoFood/assets/146923466/fd3b2d05-4741-44cc-94af-eeb794824be0)


### 7.3 Función para enviar datos al servidor

La función enviarDatos se encarga de enviar la entrada del usuario al servidor y procesar la respuesta. Esta función también maneja la creación y reproducción de archivos de audio.

![enviarDatos_function](https://github.com/SilviaDS00/RecoFood/assets/146923466/8a95a3f0-0fe7-4c3e-9d13-44324f1bd4f6)

### 7.4 Función para manejar la reproducción de audio

La función toggleAudio se encarga de iniciar y detener la reproducción de audio.

![toggleAudio_function](https://github.com/SilviaDS00/RecoFood/assets/146923466/0fa4fa6e-aab2-4663-98c1-69f15153d7c0)

### 7.5 Efectos secundarios

Se utilizan varios efectos secundarios (`useEffect`) para manejar la reproducción de audio y el desplazamiento automático de los mensajes.

![useEffect_function](https://github.com/SilviaDS00/RecoFood/assets/146923466/a33408ea-49e1-47d0-81b0-81f72252e872)

## **BACK-END**

### 7.6 Importación de módulos y componentes

Empezamos importando los módulos necesarios:

- `Django`: Django: Se han utilizado varias funciones y clases de Django para manejar las solicitudes HTTP y las respuestas.

- `Python Standard Library`: Se han utilizado varios módulos de la biblioteca estándar de Python para manejar las operaciones del sistema operativo, la entrada/salida, el registro, las fechas y horas, y las expresiones regulares.

- `dotenv`: Para cargar las variables de entorno.

- `gtts`: Para convertir el texto en voz.
  
- `google.generativeai`: Para interactuar con la API de Google Generative AI.

![components_and_modules](https://github.com/SilviaDS00/RecoFood/assets/146923466/e7185291-25ef-4484-9401-5eca8979328e)


### 7.7 Configuración del modelo de chat

Configuramos el modelo de chat de Gemini-Pro y se inicia una nueva sesión de chat.

![chat_configuration](https://github.com/SilviaDS00/RecoFood/assets/146923466/6614c9f5-4a5b-454d-9423-a777a4697be6)


### 7.8 Definición de la vista del chatbot

Definimos la vista chatbot_view que maneja las solicitudes GET y POST. En caso de una solicitud POST, se obtiene el mensaje del usuario, se envía al modelo de chat y se procesa la respuesta.

![chatbot_view](https://github.com/SilviaDS00/RecoFood/assets/146923466/6cd5d339-1ecc-42f3-bb13-f65b96969924)


### 7.9 Manejo de la solicitud POST

Si se recibe una solicitud POST, se extrae el mensaje del usuario de los datos de la solicitud. Luego, se envía este mensaje al modelo de chat y se obtiene la respuesta.

![post_request_handling](https://github.com/SilviaDS00/RecoFood/assets/146923466/3efdd2f7-5317-4227-b30d-f8f206f40085)


### 7.10 Conversión de la respuesta a audio

La respuesta del chatbot se convierte en audio utilizando la biblioteca gTTS. Se genera un nombre de archivo único para el archivo de audio y se guarda en el directorio de medios.

![audio_conversion](https://github.com/SilviaDS00/RecoFood/assets/146923466/467c9af8-32cd-4f4f-951f-0c9024d225a9)


### 7.11 Respuesta de la solicitud POST

Finalmente, se devuelve la respuesta del chatbot y el nombre del archivo de audio como respuesta a la solicitud POST.

![post_request_response](https://github.com/SilviaDS00/RecoFood/assets/146923466/7e4ea384-8cc0-4ad9-b08c-4f2a0d4c8316)


## 8. Aplicación web<a name="id8"></a>

[Aquí](https://github.com/SilviaDS00/RecoFood/tree/main/Web_React_App) puedes encontrar todos los ficheros de la aplicación de ReactJS.

La aplicación web está realizada en ReactJS, en la cual hemos implementado el modelo entrenado con Django.

### 8.1 Creación de la web

La idea del diseño de la web la hemos obtenido con una AI de creación de diseño para interfaces, llamada [galileo.ai](https://www.usegalileo.ai/explore), la cual le explicas qué diseño quieres y te lo genera.

También esos diseños los hemos exportado a [Figma](https://www.figma.com/file/jdgPz51T3CRJMv2dVcBxoJ/Galileo-Design?type=design&node-id=0%3A1&mode=dev&t=iuc6j96I83u5tPMe-1), haciendo modificaciones y adaptándolo a nuestros requisitos. Hemos usado el diseño como apoyo para darnos ideas, pero no para usarlo de forma estricta.

La web creada tiene una interfaz minimalista, ya que el objetivo de la página es que sea lo más intuitiva y fácil de usar posible. Se prioriza la simplicidad en el diseño para garantizar una experiencia de usuario fluida y eficiente, donde la información y las funciones clave estén al alcance de los usuarios de manera clara y directa. El enfoque minimalista busca eliminar elementos innecesarios y distracciones, centrándose en la funcionalidad principal de la página y mejorando la accesibilidad para una amplia variedad de usuarios.

Primero tenemos el menú de la página, compuesto por el logo, el nombre del proyecto, las páginas principales y la sección de los usuarios:

![TopBar](/Capturas_Codigo/TopBar.PNG)

En la sección de inicio tenemos la parte para realizar la predicción, teniendo como opción hacer una foto o subirla desde el explorador de archivos:

![Home](/Capturas_Codigo/Home.PNG)

Cuando se abre la cámara, se mostraría de la siguiente manera:

![Webcam](/Capturas_Codigo/Webcam.PNG)

Cuando se escanea la imagen o se sube desde el explorador de archivos, se vería la imagen seguido de un botón para procesar la imagen para la predicción.

![Scan image](/Capturas_Codigo/Predict_Hamburguer.PNG)

Una vez pulsado el botón de procesar imagen se mostraría el resultado de la predicción y los macronutrientes de esa comida, permitiendo al usuario calcular los macronutrientes según los gramos que pesa su comida:

**NOTA:** Para calcular los macros de cada comida, hemos creado un [json](https://github.com/SilviaDS00/RecoFood/blob/main/Web_React_App/src/data/macronutrientes.json) con todos los valores aproximados de los macros de cada comida, haciendo la importación dentro de react y procesando los datos. [Aquí](https://github.com/SilviaDS00/RecoFood/blob/main/Web_React_App/src/components/Prediction/ShowPrediction.jsx) puedes encontrar el componente donde se importa el json dicho.

![Macros](/Capturas_Codigo/Macros_Layout.PNG)

Si el usuario tiene la sesión iniciada, podrá calcular los macronutrientes según los gramos que tenga su comida, y los resultados se guardarán en el historial del usuario.

![Macros Calculated](/Capturas_Codigo/Macros_Calculated.PNG)

Si la clasificación de la comida falla (ya que el modelo no tiene una precisión del 100%), el usuario podrá ver las 5 comidas más aproximadas, teniendo la opción de seleccionar la que sea correcta para ver los macros, calcularlos y guardarlo correctamente en el historial.

![If prediction fails](/Capturas_Codigo/Prediction_Failed.PNG)

Para el registro de usuarios hemos hecho el siguiente diseño de la interfaz:

![Sign up](/Capturas_Codigo/Signup.PNG)

Y para el inicio de sesión una interfaz muy parecida:

![Login](/Capturas_Codigo/Login.PNG)

Los formularios de inicio de sesión y registro de usuarios, tienen toda la lógica necesaria para la validación, si no existe el correo o la contraseña está mal, no te deja iniciar sesión.

![Validation Login](/Capturas_Codigo/Validation_Login.PNG)

Para ello hemos usado una librería llamada Yup, la cual sirve para la validación de formularios.

En el registro no puedes dejar campos vacíos, las contraseñas deben coincidir y no debe de haber ninguna cuenta existente con el mismo email o usuario.

![Validation Register](/Capturas_Codigo/Validation_Register.PNG)
![Validation Register](/Capturas_Codigo/Validation_Register2.PNG)

También se han incluido pop-ups informativos con una librería llamada `toastify` para el registro e inicio de sesión:

![Register Success](/Capturas_Codigo/Register.PNG)
![Login Success](/Capturas_Codigo/Login_Success.PNG)

El perfil del usuario está compuesto por los datos del usuario, un historial de las comidas escaneadas, predicción del IMC y ajustes del usuario.

El historial de las comidas se vería de la siguiente manera:

![Profile History](/Capturas_Codigo/Profile_History.PNG)

En la sección de predecir IMC encontramos los datos con los que se hará la predicción y un botón donde se aplicará el modelo, mostrando posteriormente el resultado:

![IMC Prediction](/Capturas_Codigo/IMC_Prediction.PNG)

El usuario también podrá actualizar sus datos cuando sea necesario.

![IMC Prediction](/Capturas_Codigo/User_Update.PNG)

### 8.2 Implementación de los modelos en React.js

El código de Django lo puedes encontrar [aquí](https://github.com/SilviaDS00/RecoFood/tree/main/Django)

#### Implementación del modelo de clasificación de imágenes

Usando Django hemo creado una vista con un endpoint de petición `POST` para el modelo de clasificación de imágenes, procesando a su vez la imagen para adecuarlo al modelo entrenado antes de hacer la clasificación.

![Implementacion modelo](/Capturas_Codigo/Model_Implementation.png)

Creamos la url para el endpoint:

![Url endpoint](/Capturas_Codigo/Url_Endpoint.png)

Desde un componente de React.js, llamamos al endpoint creado con Django de la siguiente manera:

![Endpoint React](/Capturas_Codigo/Endpoint_React.png)

Este componente lo utilizaremos en otros componentes para realizar la predicción, en este, de dos maneras, haciendo una foto o directamente subiendo la foto.

Por ejemplo, dentro del componente de [ImageUploadComponent](https://github.com/SilviaDS00/RecoFood/blob/main/Web_React_App/src/components/ImageUpload/ImageUploadComponent.jsx) utilizamos el componente creado para realizar la clasificación pasándole la imagen subida por el usuario:

![Image predict](/Capturas_Codigo/Predict_Image.png)

#### Implementación del modelo predictivo del IMC

Usando Django hemo creado una vista con un endpoint de petición `POST` para la predicción del modelo, procesando la imagen para adecuarlo al modelo entrenado antes de hacer el predict.

![Implementacion modelo](/Capturas_Codigo/Model_Implementation_bmi.png)

Creamos la url para el endpoint:

![Url endpoint](/Capturas_Codigo/Url_Endpoint_bmi.png)

Desde un componente de React.js, llamamos al endpoint creado con Django de la siguiente manera:

![Endpoint React](/Capturas_Codigo/Endpoint_React_bmi.png)

Dentro del componente de [UserBmi](https://github.com/SilviaDS00/RecoFood/blob/main/Web_React_App/src/components/UserBmi/UserBmi.jsx) utilizamos el componente creado para realizar la predicción pasándole los datos del usuario.

Los datos utilizados serán los que se pidieron al usuario al registarse.

![Image predict](/Capturas_Codigo/Predict_bmi.png)

### 8.3 Back de usuarios e historial

[Ver el proyecto de Strapi aquí](https://github.com/SilviaDS00/RecoFood/tree/main/Strapi)

Para realizar el back para los usuarios y el historial, hemos utilizado **Strapi**, ya que proporciona una interfaz sencilla de utilizar e intuitiva.

Para instalar Strapi primero ejecutamos el siguiente comando: `npm install -g create-strapi-app`.

Una vez instalado, procedemos a crear el proyecto: `create-strapi-app Strapi --quickstart` (Strapi es el nombre que queremos del proyecto).

Una vez creado el proyecto, accedemos a Strapi en el navegador, creamos una cuenta o iniciamos sesión.

![Strapi Login](/Capturas_Codigo/Login_Strapi.PNG)

Y la interfaz sería la siguiente:

![Strapi Layout](/Capturas_Codigo/Strapi_Layout.PNG)

En el menú lateral encontramos el *Content Manager*, que ahí aparecerán todas las entradas de datos que tienen las colecciones creadas.

Después tenemos *Content-Type Builder*, que sería para crear las colecciones:

![Strapi Collections](/Capturas_Codigo/Strapi_Collections.PNG)

Y ya el resto de apartados serían otras configuraciones, pero otra sección importante sería para habilitar los **endpoints** para gestionar los usuarios. Dentro de **Settings**, en el apartado de roles de *users & permissions plugin*, accedemos a la parte para habilitar los endpoints, por ejemplo dentro de public estaría el endpoint para poder registrar un usuario o el de iniciar sesión. Dentro de autenticated, estaría por ejemplo el endpoint de ver los datos del usuario o de actualizar sus datos o contraseña, obtener el hitorial de un usuario, etc.

![Strapi Roles](/Capturas_Codigo/Strapi_Roles.PNG)

## 9. Conclusiones<a name="id9"></a>
