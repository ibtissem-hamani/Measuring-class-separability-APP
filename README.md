# Measuring-class-separability-API
This APP is necessary to evaluate the quality of the class representative samples and determine the classes with ambiguous boundaries in feature space, where poor classification accuracy is expected [Link to our Exemple](https://ibtissem.users.earthengine.app/view/measuring-class-separability).

## The area studied
The area studied is Oran, it is known for the diversity of the terrain, the presence of several themes and problems of confusion between the different classes, it is at the edge of the southern shore of the Mediterranean basin, which represents a ideal form for examining the efficiency of the classifier used.
Oran has four thematic classes "Sea", "Urban", "Forest" and "Sebkha".

![Oran](https://user-images.githubusercontent.com/101288856/189245480-8d5c25d6-2189-46a9-ab54-c2a5e6ec0713.png)

## Color Composition Visualization
Now let's try to visualize the image Landsat-08 of Oran in two colored compositions:
- False composition (B2, B3, B4 of Landsat 8)
- Natural composition (B4, B3, B2 of Landsat 8)

## Creation of samples
![Measuring class separability — Mozilla Firefox 2022-09-11 13-06-44(1)](https://user-images.githubusercontent.com/101288856/189526941-cde8e837-5972-4408-a45d-23c6fbc3b929.gif)

## Evaluation of sample separability
The evaluation of the separability of the samples is done from the spectral signatures of the ground elements. We evaluated the separability for each of the pairs of samples by the calculation of the Jeffries-Matisuta-distance index.


