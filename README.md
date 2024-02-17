![Logo](/Capturas_Codigo/Logo.png)

# RecoFood

*TFM realizado por **[Silvia Donaire Serrano](https://github.com/SilviaDS00)**, **[Elena Racero Gonzalez](https://github.com/ElenaRacero3)** y **[Manuel Fajardo Jiménez](https://github.com/Manufajimez)** del Máster de Inteligencia Arficial y Big Data del CPIFP Alan Turing*

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

El proyecto tiene como objetivo desarrollar un sistema integral que clasifique comidas utilizando el conjunto de datos Food101. Además, se proporcionará información sobre los macronutrientes de las comidas y se implementará un chatbot para mejorar la interacción. Este proyecto aborda la necesidad de brindar información detallada sobre las comidas y facilitar la toma de decisiones nutricionales.

<div align="center">

## :computer: Tecnologías usadas

### Desarrollo

Lenguajes: 

[![python](https://img.shields.io/badge/python-black?style=for-the-badge&logo=python&logoColor=blue&labelColor=101010)]()

Entornos: Colab, VisualStudio Code, Anaconda, Jupyter Notebook

[![python](https://img.shields.io/badge/Colab-black?style=for-the-badge&logo=Google-Colab&logoColor=orange&labelColor=101010)]()

Frontend: ReactJS, SASS

Backend: Strapi(?), MongoDB(?)

Diseño: Figma

Control de versiones: Github

Gestión de proyectos: Trello

### Análisis

Numpy, Pandas, Matplotlib

### Machine Learning

TensorFlow, Keras

</div>

## 2. Obtención de los datos<a name="id2"></a>

Las imágenes han sido recogidas de un conjunto de datos de 101 categorías de alimentos con un total de 101000 imágenes.

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

* `rescale=1./255`: Este parámetro escala los valores de píxeles de las imágenes. Dividir por 255 normaliza los valores de píxeles para que estén en el rango de 0 a 1. Esto es común en el preprocesamiento de imágenes para facilitar el entrenamiento de modelos.

* `shear_range=0.2`: Se aplica un sesgo (shear) a las imágenes. Este parámetro controla la intensidad del sesgo. El sesgo puede ser útil para la variación de datos durante el entrenamiento, lo que ayuda al modelo a generalizar mejor.

* `zoom_range=0.2`: Este parámetro controla el rango de zoom que se puede aplicar a las imágenes. Al igual que el sesgo, el zoom introduce variabilidad en los datos durante el entrenamiento.

* `horizontal_flip=True`: Permite voltear horizontalmente aleatoriamente las imágenes. Esto también ayuda a aumentar la variabilidad y mejorar la capacidad del modelo para generalizar.

* `validation_split=0.2`: Este parámetro se utiliza para dividir automáticamente el conjunto de datos en conjuntos de entrenamiento y validación. En este caso, el 80% de los datos se utilizarán para entrenamiento y el 20% restante se utilizará para validación.

![Preparacion datos](/Capturas_Codigo/Data_prepair1.png)

A continuación configuramos los generadores del flujo de los datos que alimentarán los lotes de las imágenes preprocesadas al modelo durante el entrenamiento y la evaluación.

* `base_dir`: La ruta al directorio que contiene subdirectorios separados para cada clase de imágenes. Estos subdirectorios son utilizados por el generador para determinar las clases y organizar las imágenes.

* `target_size=(img_height, img_width)`: El tamaño al que se deben redimensionar las imágenes. Todas las imágenes se redimensionarán a este tamaño antes de ser alimentadas al modelo.

* `batch_size`: El tamaño de cada lote de imágenes que se proporcionará al modelo durante cada iteración de entrenamiento.

* `class_mode='categorical'`: La forma en que se deben manejar las etiquetas de clase. En este caso, se utiliza 'categorical' porque parece estar trabajando con un problema de clasificación multiclase.

* `subset="training"` o `subset="validation"`: Esto se utiliza para especificar si el generador está configurado para el conjunto de entrenamiento ("training") o para el conjunto de validación ("validation"). Esto es útil cuando se utiliza la opción validation_split en los generadores de datos de imágenes para dividir automáticamente los datos en conjuntos de entrenamiento y validación.

![Preparacion datos](/Capturas_Codigo/Data_prepair2.png)

```
Found 80800 images belonging to 101 classes.

Found 20200 images belonging to 101 classes.
```

## 5. Entrenamiento del modelo y comprobación del rendimiento<a name="id5"></a>

En este paso creamos el modelo de entrenamiento, utilizamos la actiquectura `InceptionV3` preentrenada en el conjunto de datos *ImageNet*.

* `inception = InceptionV3(weights='imagenet', include_top=False)`: Se crea una instancia del modelo InceptionV3. La opción `weights='imagenet'` carga los pesos preentrenados del modelo en el conjunto de datos "ImageNet". `include_top=False` excluye las capas densas (totalmente conectadas) en la parte superior del modelo, ya que se agregarán capas personalizadas más adelante para adaptar el modelo a un problema específico.

* `x = inception.output`: Se toma la salida de la última capa de la red InceptionV3. Esta salida es una representación de características de alto nivel de la entrada de la imagen.

* `x = GlobalAveragePooling2D()(x)`: Se aplica una capa de pooling global promedio, que toma la media de cada canal a lo largo de todas las posiciones espaciales. Esto reduce la dimensionalidad de la representación de características, capturando la información esencial de las características.

* `x = Dense(128, activation='relu')(x)`: Se agrega una capa densa con 128 neuronas y función de activación ReLU. Esta capa totalmente conectada ayuda a aprender patrones más complejos en los datos.

* `x = Dropout(0.2)(x)`: Se aplica una capa de Dropout con una tasa del 20%. El Dropout ayuda a prevenir el sobreajuste al "apagar" aleatoriamente un porcentaje de las neuronas durante el entrenamiento.

* `predictions = Dense(len(class_names), kernel_regularizer=l1(0.005), activation='softmax')(x)`: Se añade la capa de salida. Esta capa tiene un número de neuronas igual a la cantidad de clases en tu problema (determinado por `len(class_names)`), con una regularización **L1** para penalizar los pesos grandes. La función de activación **softmax** se utiliza para obtener probabilidades normalizadas para cada clase.

* `model = Model(inputs=inception.input, outputs=predictions)`: Se crea el modelo final utilizando el modelo **InceptionV3** como base y añadiendo las capas personalizadas. `inputs=inception.input` establece la entrada del modelo como la entrada original de InceptionV3, y `outputs=predictions` establece la salida del modelo como la capa de predicciones recién añadida.

![Creacion modelo](/Capturas_Codigo/Model_Creation.png)

Compilamos el modelo:

* `optimizer=SGD(learning_rate=0.0001, momentum=0.9)`: Se especifica el optimizador que se utilizará durante el entrenamiento del modelo. En este caso, se está utilizando el optimizador estocástico de descenso de gradiente (SGD). `learning_rate=0.0001` establece la tasa de aprendizaje, que controla el tamaño de los pasos que el optimizador toma para minimizar la función de pérdida. `momentum=0.9` es un término que acelera la convergencia en la dirección correcta y ayuda a evitar oscilaciones.

* `loss='categorical_crossentropy'`: Se especifica la función de pérdida que se utilizará durante el entrenamiento. En este caso, se trata de la entropía cruzada categórica, que es comúnmente utilizada en problemas de clasificación con múltiples clases.

* `metrics=['accuracy']`: Se especifica la métrica que se utilizará para evaluar el rendimiento del modelo durante el entrenamiento y la evaluación. En este caso, se utiliza la precisión (accuracy), que mide la fracción de muestras correctamente clasificadas.

![Compilacion modelo](/Capturas_Codigo/Model_Compile.png)

Antes de entrenar el modelo establecemos un callback para que se vaya guardando el modelo en cada iteracción, siempre que las métricas sean mejor que la anterior.

![Compilacion modelo](/Capturas_Codigo/Model_Checkpoint.png)

Una ver realizado todos los pasos anteriores hacemos el entrenamiento del modelo.

**NOTA**: Para poder realizar el entrenamiento con éxito, hemos tenido que instalar **Anaconda** con TensorFlow, Keras, CUDA y CUDNN de manera local para poder utilizar la GPU de nuestro ordenador (para ello hemos seguido los pasos de este [vídeo](https://www.youtube.com/watch?v=OEFKlRSd8Ic)), ya que al entrenar tantas imágenes, el Google Colab se colapsaba.

![Compilacion modelo](/Capturas_Codigo/Model_Fit.png)

### 5.1 Métricas del entrenamiento

## 6. Procesamiento del lenguaje natural - ChatBot<a name="id6"></a>

## 7. Aplicación web<a name="id7"></a>

La aplicación web está realizada en ReactJS, el cual hemos implementado el modelo entrenado.

La web contiene dos botones, uno para realizar una foto con la cámara, y otro para subir una imagen. Realizando cualquiera de las dos opciones se aplicará el modelo a la imagen.

## 8. Conclusiones<a name="id8"></a>