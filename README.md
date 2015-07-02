# Visualization of the k-means clustering algorithm in D3.js
============================================================


> k-means clustering is a method of vector quantization, originally from signal 
processing, that is popular for cluster analysis in data mining. k-means 
clustering aims to partition n observations into k clusters in which each 
observation belongs to the cluster with the nearest mean, serving as a 
prototype of the cluster. This results in a partitioning of the data space into 
Voronoi cells.

source: [wikipedia](https://en.wikipedia.org/wiki/K-means_clustering)

![k-means clustering](/media/kmeans.png "K-means clustering")

See the algorithm in action [here](http://nl-hugo.github.io/d3-kmeans/index.html).


## Source Code Layout

    media\				media files
    kmeans.css          CSS stylesheet
    index.html          webpage demonstrating the algorithm
    kmeans.js           JavaScript file with the source code for the algorithm visualization
    README.md           README file that appears on the website's github page


## Raw Data

Data are randomly generated x,y-coordinates between 0 and the width/height of 
the canvas.


## The Algorithm

1. The algorithm is initialized with _n_ random points, along with _k_ randomly 
generated 'means' (centroid) within the data domain. 
2. When the algorithm starts, each point is assigned the color of the closest 
centroid, forming _k_ clusters. _Closest_ is defined as the smallest 
[Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_geometry) between 
two points.
3. The centroids are moved to the center of the cluster.
4. Steps 2 and 3 are repeated until the maximum number of iterations is reached.