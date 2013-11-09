var colors = ["steelblue", "red", "green"];

var covers = [
		{artist  : "Jackson Five",
		 seconds : 230},
		{artist  : "Lake Street Dive",
		 seconds : 240},
		{artist  : "Z-Trip Remix",
		 seconds : 250}
		];

var width = 800,
    barHeight = 80,
    textJump = 30,
    textStart = 30
    barHeightWithBuffer = 1.1 * barHeight;

function secondsList(a){
	returnArray = new Array()
	for(var i = 0; i < covers.length; i++)
		returnArray.push(a[i].seconds);
	return returnArray;
}

var scale = d3.scale.linear()
    .domain([0, d3.max(secondsList(covers))])
    .range([0, width]);

function updateChart(){
	var chart = d3.select(".chart")
	    .attr("width", width)
	    .attr("height", barHeightWithBuffer * covers.length );

	var bar = chart.selectAll("g")
	    .data(covers)
	    .enter().append("g")
	    .attr("transform", function(d, i) {return "translate(0," + i * barHeightWithBuffer + ")"; })
	    .attr("style", function(d, i) {return "fill:" + colors[i % colors.length];});

	bar.append("rect")
	    .attr("width", function (d) { return scale(d.seconds)})
	    .attr("height", barHeight - 1);

	bar.append("text")
	    .attr("x", function(d, i) { return textStart + (textJump * i); })
	    .attr("y", barHeight / 2)
	    .attr("dy", ".35em")
	    .text(function(d) { return d.artist; });
}

window.addEventListener('load', updateChart, false);
