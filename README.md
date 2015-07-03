# Visualization of the gradient descent algorithm for linear regression in D3.js
================================================================================


> Gradient descent is a first-order optimization algorithm. To find a local 
minimum of a function using gradient descent, one takes steps proportional to 
the negative of the gradient (or of the approximate gradient) of the function 
at the current point.

source: [wikipedia](https://en.wikipedia.org/wiki/Gradient_descent)

![Gradient descent](/media/thumbnail.png "Gradient descent")

See the algorithm in action [here](http://nl-hugo.github.io/d3-gradient-descent/index.html)


## Source Code Layout

    media\					media files
    gradient-descent.css    CSS stylesheet
    gradient-descent.js     JavaScript file with the source code for the algorithm visualization
    index.html          	webpage demonstrating the algorithm
    README.md           	README file that appears on the website's github page


## Raw Data

Data are randomly generated x,y-coordinates using the function `slope * x + 
intercept + error()` where `error()` is a zero-mean normal distribution with a 
standard deviation of `0.9`.


## The hypothesis function

The hypothesis function has the general form for a straight line:

```
h(x) = intercept + slope * x
```

## The cost function

The accuracy of the hypothesis function can be measured with a cost function, 
which takes an average of all the results of the hypothesis compared to the 
actual outputs. 

```
J(intercept, slope) = 1 / (2*m) * sum(h(x) - y) ^ 2
```

This function is also known as the mean squared error.


## The Algorithm

1. The algorithm is initialized with _n_ random points using the function 
`y = slope * x + intercept + error()`. Cost function arguments _intercept_ and 
_slope_ are initialized at 0.

2. _intercept_ and _slope_ are simultaneously computed as: 
	* intercept := intercept - learning rate * partial derivative of the cost function
	* slope := slope - learning rate * partial derivative of the cost function

3. Step 2 is repeated until convergence. Each step makes the regression 
function more accurate. Convergence is declared when the mean squared error 
(or cost) between two steps is less than 0.0001. 
