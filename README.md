# Measuring-class-separability-APP
This APP is necessary to evaluate the quality of the class representative samples and determine the classes with ambiguous boundaries in feature space, where poor classification accuracy is expected [Link to our Exemple](https://ibtissem.users.earthengine.app/view/measuring-class-separability).
![image](https://github.com/user-attachments/assets/7483b20a-77bc-4bc4-83dd-3673aa98d96c)

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

## Jeffries Matisuta Distance
The Jeffries–Matusita (JM) distance is a widely used statistical separability criterion. It is a parametric criterion, for which the values range between 0 and 2. For the separability measurement, the normal distribution is usually considered. In this case, the JM separability criterion takes into account the distance between class means andthe distribution of values from the means. This is achieved by involving the covariance matrices of the classes in the separability measurement. This separability criterion can be used to pairwise measure the separability between classes, allowing the assessment of the quality of the selected class samples in the available feature space(Ghoggali and Melgani 2009 [Link](https://ieeexplore.ieee.org/document/4806102)).

## Theoretical background
The JM separability criterion is a widely used criterion in the field of pattern recognition and feature selection. In the literature, the JM separability criterion (J) between two classes wi and wj that are members of a set of C classes (i, j = 1, 2,…, C, i ≠ j) has been defined as follows (Swain and Davis 1978):
##### J_(t,j)=2(1-e^(-B_(i,j) ) )     

Where dij is the Bhattacharyya distance between the classes wi and wj, defined as (Swain and Davis 1978 [Link](https://www.sciencedirect.com/science/article/abs/pii/S0167865514000166?via%3Dihub)):
##### d_ij= -ln⁡{∫√(P(x/W_i )P(x/W_j ))dx}

where P(x/wi) and P(x/wj) are the conditional probability density functions of the random variable x, given the data classes wi and wj, respectively. Usually, the multivariate normal distribution is assumed and the Bhattacharyya distance takes the form (Duda, Hart, and Stork 2000 [link](https://www.amazon.fr/Pattern-Classification-2e-RO-Duda/dp/0471056693)):
##### B=  1/8 (M_i-M_j )^t {(C_i+C_j)/2}^(-1) (M_i-M_j )+1/2 Ln{|(C_i+C_j)/2|/(|C_i |^(1/2) |C_j |^(1/2) )} 

where mi and mj denote the mean values and Si and Sj denote the covariance matrices of the classes wi and wj, respectively. Superscript T denotes the transpose of a matrix. This index takes a value between 0 and 2. A separability index greater than 1.90 indicates good separability of classes while a value less than 1.0 shows poor separability.

## Results
![res](https://user-images.githubusercontent.com/101288856/190254591-aa1388e0-3f3d-4b14-8eee-2bf2d2622265.gif)
