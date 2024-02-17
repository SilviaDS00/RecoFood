# RecoFood

*TFM realizado por **[Silvia Donaire Serrano](https://github.com/SilviaDS00)**, **[Elena Racero Gonzalez](https://github.com/ElenaRacero3)** y **[Manuel Fajardo Jiménez](https://github.com/Manufajimez)** del Máster de Inteligencia Arficial y Big Data del CPIFP Alan Turing*


## Índice

 :black_nib: [1. Justificación y descripción del proyecto](#id1)
 
 :mag: [2. Obtención de los datos](#id2)
  
 :bar_chart: [3. Exploración y visualización de los datos](#id4)
 
 :hourglass: [4. Preparación de los datos para Machine Learning](#id5)
 
 :chart_with_upwards_trend: [5. Entrenamiento del modelo y comprobación del rendimiento](#id6)
 
 :computer: [6. Aplicación Web](#id7)
 
 :pencil: [7. Conclusiones](#id8)


## 1. Justificación y descripción del proyecto<a name="id1"></a>
El proyecto tiene como objetivo desarrollar un sistema integral que clasifique comidas utilizando el conjunto de datos Food101. Además, se proporcionará información sobre los macronutrientes de las comidas y se implementará un chatbot para mejorar la interacción. Este proyecto aborda la necesidad de brindar información detallada sobre las comidas y facilitar la toma de decisiones nutricionales.

## 2. Obtención de los datos<a name="id2"></a>
Las imágenes han sido recogidas de un conjunto de datos de 101 categorías de alimentos con un total de 101000 imágenes.

[Fuente de los datos](https://data.vision.ee.ethz.ch/cvl/datasets_extra/food-101/)

[Link a la web de TensorFlow](https://www.tensorflow.org/datasets/catalog/food101?hl=es-419)

Se han descargado y extraído desde el cuaderno de Jupyter de la siguiente manera:

![Obtencion de las imagenes](/Capturas_Codigo/Data_obtein.png)

## 3. Exploración y visualización de los datos<a name="id4"></a>

Primero visualizamos todas las clases de comida que hay en el conjunto de datos:

![Obtencion de las clases](/Capturas_Codigo/Classes.png)

```
['apple_pie', 'baby_back_ribs', 'baklava', 'beef_carpaccio', 'beef_tartare', 'beet_salad', 'beignets', 'bibimbap', 'bread_pudding', 'breakfast_burrito', 'bruschetta', 'caesar_salad', 'cannoli', 'caprese_salad', 'carrot_cake', 'ceviche', 'cheese_plate', 'cheesecake', 'chicken_curry', 'chicken_quesadilla', 'chicken_wings', 'chocolate_cake', 'chocolate_mousse', 'churros', 'clam_chowder', 'club_sandwich', 'crab_cakes', 'creme_brulee', 'croque_madame', 'cup_cakes', 'deviled_eggs', 'donuts', 'dumplings', 'edamame', 'eggs_benedict', 'escargots', 'falafel', 'filet_mignon', 'fish_and_chips', 'foie_gras', 'french_fries', 'french_onion_soup', 'french_toast', 'fried_calamari', 'fried_rice', 'frozen_yogurt', 'garlic_bread', 'gnocchi', 'greek_salad', 'grilled_cheese_sandwich', 'grilled_salmon', 'guacamole', 'gyoza', 'hamburger', 'hot_and_sour_soup', 'hot_dog', 'huevos_rancheros', 'hummus', 'ice_cream', 'lasagna', 'lobster_bisque', 'lobster_roll_sandwich', 'macaroni_and_cheese', 'macarons', 'miso_soup', 'mussels', 'nachos', 'omelette', 'onion_rings', 'oysters', 'pad_thai', 'paella', 'pancakes', 'panna_cotta', 'peking_duck', 'pho', 'pizza', 'pork_chop', 'poutine', 'prime_rib', 'pulled_pork_sandwich', 'ramen', 'ravioli', 'red_velvet_cake', 'risotto', 'samosa', 'sashimi', 'scallops', 'seaweed_salad', 'shrimp_and_grits', 'spaghetti_bolognese', 'spaghetti_carbonara', 'spring_rolls', 'steak', 'strawberry_shortcake', 'sushi', 'tacos', 'takoyaki', 'tiramisu', 'tuna_tartare', 'waffles']
```



## 4. Preparación de los datos para Machine Learning<a name="id5"></a>
![Preparacion datos](/Capturas_Codigo/Data_prepair1.png)
![Preparacion datos](/Capturas_Codigo/Data_prepair2.png)
```
Found 80800 images belonging to 101 classes.

Found 20200 images belonging to 101 classes.
```
## 5. Entrenamiento del modelo y comprobación del rendimiento<a name="id6"></a>

## 6. Aplicación web<a name="id7"></a>

## 7. Conclusiones<a name="id8"></a>
