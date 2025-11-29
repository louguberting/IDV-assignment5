const margin = { top: 30, right: 25, bottom: 5, left: 150 }
const width = 825 - margin.left - margin.right,
    height = 640 - margin.top - margin.bottom;

const svg = d3.select("#heatMap")
    .append("svg")
    .attr("width", width + 200)
    .attr("height", height + 35)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const rawdata = await d3.csv("data.csv");


let data = [];
for (let d of rawdata) {
    for (let col of rawdata.columns.slice(1)) {
        let row = {};
        row[rawdata.columns[0]] = d[rawdata.columns[0]];
        row['method'] = col;
        row['rate'] = d[col];
        data.push(row);
    }
};


//console.log(data)

// Extract the Header Row labels
const trainingMethods = Array.from(new Set(data.map(d => d.method)))
//console.log(trainingMethods)
// Extract the Attack labels from the first column
const attacks = Array.from(new Set(data.map(d => d.Attack)))
//console.log(attacks)

// Build X scale and axis
const x = d3.scaleBand()
    .range([0, width])
    .domain(trainingMethods)
    .padding(0.05);
svg.append("g")
    .style("font-size", 15)
    .call(d3.axisTop(x).tickSize(0))
    .select(".domain").remove()

// Build Y scales and axis:
const y = d3.scaleBand()
    .range([0, height])
    .domain(attacks)
    .padding(0.05);
svg.append("g")
    .style("font-size", 15)
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove()

// Build color scale
const myColor = d3.scaleSequential()
    .domain([0, 100])
    .interpolator(d3.interpolateGreens)

// create a tooltip
const tooltip = d3.select("#heatMap")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

// Three function that change the tooltip when user hover / move / leave a cell
const mouseover = function (event, d) {
    tooltip
        .style("opacity", 1)
    d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
}
const mousemove = function (event, d) {
    tooltip
        .html(d.method + " has a defense success rate of " + d.rate + "% against " + d.Attack)
        .style("left", (event.x + 10) + "px")
        .style("top", (event.y + 10) + "px")
}
const mouseleave = function (event, d) {
    tooltip
        .style("opacity", 0)
    d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
}

// add the squares
svg.selectAll()
    .data(data, function (d) { return d.method + ':' + d.Attack; })
    .join("rect")
    .attr("x", function (d) { return x(d.method) })
    .attr("y", function (d) { return y(d.Attack) })
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .style("fill", function (d) { return myColor(d.rate) })
    .style("stroke-width", 4)
    .style("stroke", "none")
    .style("opacity", 0.)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
    .transition()
    .duration(1000)
    .style("opacity", 1)