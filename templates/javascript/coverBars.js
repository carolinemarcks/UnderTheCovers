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
    textStart = 30,
    barHeightBuffer = barHeight * .2,
    barHeightWithBuffer = barHeightBuffer + barHeight,
    progressBarHeight = barHeight - 1,
    progressBarWidth = 5,
    bodyBackgroundColor = "#999966";

    this.time = 0;
    this.song = 1;

function secondsList(a){
	returnArray = new Array()
	for(var i = 0; i < covers.length; i++)
		returnArray.push(a[i].seconds);
	return returnArray;
}

var scale = d3.scale.linear()
    .domain([0, d3.max(secondsList(covers))])
    .range([0, width]);

function drawSongBars(){
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
	    .attr("height", barHeight - 1)
	    .on("click", moveProgressBar);

	bar.append("text")
	    .attr("x", function(d, i) { return textStart + (textJump * i); })
	    .attr("y", barHeight / 2)
	    .attr("dy", ".35em")
	    .text(function(d) { return d.artist; });
}

function moveProgressBar(d, i){
	song = i;
}

function clearSongBars(){
	var chart = d3.select(".chart")
	var bar = chart.selectAll("g");
	bar.remove();
}

function clearProgressBar(){
	var chart = d3.select(".chart");

	chart.append("rect")
		.attr("x", this. time - 1)
		.attr("y", barHeightWithBuffer * song)
	    .attr("width", progressBarWidth)
	    .attr("height", barHeight)
	    .attr("style", "fill:" + colors[song]);
/*
	chart.append("rect")
		.attr("x", this. time - 1)
		.attr("y", (barHeightWithBuffer * song) - (barHeightBuffer / 2))
	    .attr("width", progressBarWidth)
	    .attr("height", barHeightBuffer / 2)
	    .attr("style", "fill:" + bodyBackgroundColor);

	chart.append("rect")
		.attr("x", this. time - 1)
		.attr("y", barHeightWithBuffer * (song + 1) - barHeightBuffer)
	    .attr("width", progressBarWidth)
	    .attr("height", barHeightBuffer / 2)
	    .attr("style", "fill:" + bodyBackgroundColor);	
*/
}

function drawProgressBar(time, color){
	//clearProgressBar();
	clearSongBars();
	drawSongBars();

	var chart = d3.select(".chart");

	chart.append("rect")
		.attr("x", this.time)
		.attr("y", barHeightWithBuffer * song)
	    .attr("width", progressBarWidth)
	    .attr("height", progressBarHeight)
	    .attr("style", "fill:black");


	this.time++;
}

function startPlaying(){
	drawSongBars();
	setInterval(drawProgressBar,500);
}


window.addEventListener('load', startPlaying, false);
