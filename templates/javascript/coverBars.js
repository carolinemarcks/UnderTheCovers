var colors = ["FF6840", "2D3B83", "22884f"];

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
    progressBarWidth = 10,
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
	    .on("click", moveProgressBar)

	bar.append("text")
	    .attr("x", function(d, i) { return textStart + (textJump * i); })
	    .attr("y", barHeight / 2)
	    .attr("dy", ".35em")
	   	.on("click", moveProgressBar)
	    .text(function(d) { return d.artist; });
}

function moveProgressBar(d, i){
	song = i;
}

function dragProgressBar(a, b, c, d){
	console.log("a: " + a + ", b: " + b + ", c: " + c + ",d :" + d)
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
/*
var drag = d3.behavior.drag()
    .on("drag", function(d,i) {
        d.x += d3.event.dx
        d3.select(this).attr("transform", function(d,i){
            return "translate(" + [ d.x,d.y ] + ")"
        })
    });
*/
/*

var drag = d3.behavior.drag()
.on("drag", function( d, i) {
    var selection = d3.selectAll( '.selected');
 
    if( selection[0].indexOf( this)==-1) {
        selection.classed( "selected", false);
        selection = d3.select( this);
        selection.classed( "selected", true);
    } 
 
    selection.attr("transform", function( d, i) {
        d.x += d3.event.dx;
        //d.y += d3.event.dy;
        return "translate(" + [ d.x,d.y ] + ")"
    })
    d3.event.sourceEvent.stopPropagation();
});
*/

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
	    .attr("style", "fill:black")
	    .call(drag);
}

function startPlaying(){
	drawSongBars();
	setInterval(drawProgressBar,250);
	setInterval(function(){this.time++;}, 1000)
}


window.addEventListener('load', startPlaying, false);
