/**
 * gradient-descent.js
 * Visualizes the gradient descent algorithm for linear regression. 
 *
 * @author: Hugo Janssen
 * @date:   7/2/2015
 */
"use strict";

function gradientDescent(elt, w, h, numPoints, learningRate) {

	var iter = 1,
		points = [],
		theta0 = 0,
		theta1 = 0,
		alpha = learningRate,
		convergenceTh = 0.0001,
		isConverged = false,
		maxIter = 1000,
		
		slope = 0.5,
		intercept = 2.5,
		stddev = 0.9;
	
	var numberFormat = d3.format(".4f");
	
	var margin = {top: 25, right: 25, bottom: 50, left: 50},
		width = w - margin.left - margin.right,
		height = h - margin.top - margin.bottom;
	
	var svg = d3.select(elt).append("svg")
		.style("width", width + margin.left + margin.right)
		.style("height", height + margin.top + margin.bottom);
	
	
	// The hypothesis plot
	var xHypothesis = d3.scale.linear()
		.domain([0, 10])
		.range([0, w / 2 - margin.left - margin.right]);
	
	var yHypothesis = d3.scale.linear()
		.domain([0, 10])
		.range([height, 0]);
		
	var xHypothesisAxis = d3.svg.axis()
		.scale(xHypothesis)
		.orient("bottom");
		
	var yHypothesisAxis = d3.svg.axis()
		.scale(yHypothesis)
		.orient("left");

	var hypothesisGroup = svg.append("g")
		.attr("class", "hypothesis")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
	hypothesisGroup.append("g").append("text")
		.attr("x", width / 4)
		.attr("class", "title")
		.style("text-anchor", "middle")
		.text("Training data and regression line");
		
	hypothesisGroup.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xHypothesisAxis);

	hypothesisGroup.append("g")
		.attr("class", "y axis")
		.call(yHypothesisAxis);

	hypothesisGroup.append("g")
		.append("text")
		.attr("x", width / 4)
		.attr("y", margin.top)
		.attr("class", "function-label")
		.style("text-anchor", "middle")
		.text("");
		
		
	// The cost function plot
	var xCostFunction = d3.scale.linear()
		.domain([0, intercept])	
		.range([0, w / 2 - margin.left - margin.right]);
	
	var yCostFunction = d3.scale.linear()
		.domain([0, 1])
		.range([height, 0]);
		
	var xCostFunctionAxis = d3.svg.axis()
		.scale(xCostFunction)
		.orient("bottom");
		
	var yCostFunctionAxis = d3.svg.axis()
		.scale(yCostFunction)
		.orient("left");

	var costFunctionGroup = svg.append("g")
		.attr("class", "cost-function")
		.attr("transform", "translate(" + (2 * margin.left + width / 2) + "," + margin.top + ")");
		
	costFunctionGroup.append("g").append("text")
		.attr("x", width / 4)
		.attr("class", "title")
		.style("text-anchor", "middle")
		.text("Cost function");
		
	costFunctionGroup.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xCostFunctionAxis)
	.append("text")
		.attr("x", width / 2 - margin.right)
		.attr("y", -12)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text("θ₁ (intercept)");

	costFunctionGroup.append("g")
		.attr("class", "y axis")
		.call(yCostFunctionAxis)
	.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 12)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text("θ₀ (slope)");

	// Text label
	svg.append("g")
		.append("text")
		.attr("x", margin.left)
		.attr("y", height + margin.top + margin.bottom / 2)
		.attr("dy", ".35em")
		.attr("class", "status-label")
		.style("text-anchor", "center")
		.text("");
	
	/**
	 * Generates a normal distributed error.
	 */
	var error = d3.random.normal(0, stddev);
	
	/**
	 * Returns a point with random x,y-coordinates.
	 */
	function getRandomPoint() {
		var x = Math.round(Math.random() * xHypothesis.domain()[1]);
		return { 
			x: x, 
			y: (slope * x + intercept + error())
		};
	}

	/** 
	 * Generates a specified number of random points.
	 */
	function initializePoints(num) {
		var result = [];
		for (var i = 0; i < num; i++) {
			var point = getRandomPoint();
			point.id = "point-" + i;
			result.push(point);
		}
		return result;
	}
	
	/** 
	 * Returns the regression function
	 */ 
	function hypothesis(x) {
		return theta1 * x + theta0;
	}
	
	/**
	 * Returns the difference between the predicted value and the actual value 
	 * for a specific point.
	 */
	function predictionError(point) {
		return hypothesis(point.x) - point.y;
	}
	
	/**
	 * Returns the squared error for a specific point.
	 */
	function squaredError(point) {	
		return Math.pow(predictionError(point), 2);
	}
	
	/**
	 * Returns the mean squared error for all points in the dataset.
	 */
	function meanSquaredError() {
		var sum = 0;
		points.forEach(function(d) {
			sum += squaredError(d);
		});
		return sum / (2 * points.length);
	}
	
	/**
	 * The partial derivative of the cost function for theta0.
	 */
	function derivativeTheta0() {
		var sum = 0;
		points.forEach(function(d) {
			sum += predictionError(d);
		});
		return sum / points.length;		
	}
	
	/**
	 * The partial derivative of the cost function for theta1.
	 */
	function derivativeTheta1() {
		var sum = 0;
		points.forEach(function(d) {
			sum += predictionError(d) * d.x;
		});
		return sum / points.length;
	}
	
	/**
	 * Appends the data points to the plot.
	 */
	function appendPoints() {
	
		hypothesisGroup.selectAll("circle")
			.data(points)
		.enter().append("circle")
			.attr("id", function(d) { return d.id; })
			.attr("cx", function(d) { return xHypothesis(d.x); })
			.attr("cy", function(d) { return yHypothesis(d.y); })
			.attr("r", 4);        
	}

	/**
	 * Updates the chart.
	 */
	function update() {
	
		var x1 = xHypothesis.domain()[0];
		var x2 = xHypothesis.domain()[1];
		
		var y1 = hypothesis(x1);
		var y2 = hypothesis(x2);
		
		// Draw and update the regression line
		var line = hypothesisGroup.selectAll(".regression-line")
			.data([{y1, y2}]);
		
		line.enter().append("line")
			.attr("class", "regression-line")
			.attr("x1", function(d) { return xHypothesis(x1); })
			.attr("x2", function(d) { return xHypothesis(x2); });
		
		line.transition().delay(0).duration(500)
			.attr("y1", function(d) { return yHypothesis(d.y1); })
			.attr("y2", function(d) { return yHypothesis(d.y2); });
		
		// Draw the cost function circles
		var circle = costFunctionGroup.selectAll(".circle")
			.data([{theta0, theta1}])
		.enter().append("circle")
			.attr("cx", function(d) { return xCostFunction(d.theta0); })
			.attr("cy", function(d) { return yCostFunction(d.theta1); })
			.attr("r", 2);        
			
		// Update the labels
		svg.selectAll(".status-label").text("Iteration " + iter + 
			"; learningRate=" + alpha + "; convergence=" + convergenceTh + 
			"; mse=" + numberFormat(meanSquaredError()));
		
		svg.selectAll(".function-label").text("hθ(x) = " + 
			numberFormat(theta1) + " • x + "  + numberFormat(theta0));
	}
	
	/**
	 * Executes one iteration of the algorithm
	 */
	function iterate() {

		var mse_before = meanSquaredError();

		// The descent step
		var temp0 = theta0 - (alpha * derivativeTheta0());
		var temp1 = theta1 - (alpha * derivativeTheta1());
		theta0 = temp0;
		theta1 = temp1;
		
		isConverged = (mse_before - meanSquaredError() < convergenceTh); 
		
		// Update the chart
		update();
	}
	
	/** 
	 * The main function initializes the algorithm and calls an iteration every 
	 * 100 milliseconds.
	 */
	function initialize() {
		
		// Initialize random points and centroids
		points = initializePoints(numPoints);
		
		// Append points to the chart
		appendPoints();
		
		// Initial drawing
		update();

		var interval = setInterval(function() {
			if(!isConverged & iter < maxIter) {
				iterate();
				iter++;
			} else {
				clearInterval(interval);
			}
		}, 100);
	}

	// Call the main function
	initialize();
}