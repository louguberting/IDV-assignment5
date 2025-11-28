function chartone() {
    const data = [
        { model: "BERT", acc1: 74.4, acc2: 64.8 },
        { model: "RoBERTa", acc1: 81.9, acc2: 65.5 },
        { model: "BART", acc1: 73.1, acc2: 63.5 }
    ];

    const bar = d3.select("#barChart"),
        width = +bar.attr("width"),
        height = +bar.attr("height"),
        margin = { top: 70, right: 40, bottom: 70, left: 60 },
        chartWidth = width - margin.left - margin.right,
        chartHeight = height - margin.top - margin.bottom;

    const x = d3.scaleBand()
        .domain(data.map(d => d.model))
        .range([0, chartWidth])
        .padding(0.4);

    const y = d3.scaleLinear()
        .domain([0, 100])
        .nice()
        .range([chartHeight, 0]);

    const g = bar.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Y axis
    g.append("g")
        .call(d3.axisLeft(y).ticks(1))
        .selectAll("text")
        .style("font-size", "18px")
        .attr("class", "ylabel")

    // Bars
    g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.model))
        .attr("y", d => y(d.acc1))
        .attr("width", x.bandwidth() / 2)
        .attr("height", d => chartHeight - y(d.acc1));

    // Dashed bars (outline)
    g.selectAll(".bar-dashed")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar-dashed")
        .attr("x", d => x(d.model) + x.bandwidth() / 2)
        .attr("y", d => y(d.acc2))
        .attr("width", x.bandwidth() / 2)
        .attr("height", d => chartHeight - y(d.acc2));

    // Model labels
    g.append("g")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("font-size", "20px")
        .style("font-weight", "bold");

    // Title
    bar.append("text")
        .attr("x", width / 2)
        .attr("y", 40)
        .attr("text-anchor", "middle")
        .style("font-size", "28px")
        .text("Cross Validation Accuracy (%)");

    // Numeric labels on top of bars
    g.selectAll(".label1")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "label1")
        .attr("x", d => x(d.model) + x.bandwidth() / 4)
        .attr("y", d => y(d.acc1) - 5)
        .text(d => d.acc1.toFixed(1));

    g.selectAll(".label2")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "label2")
        .attr("x", d => x(d.model) + 3 * x.bandwidth() / 4)
        .attr("y", d => y(d.acc2) - 5)
        .text(d => d.acc2.toFixed(1));
}
function charttwo() {
    const venn = d3.select("#venndiagram");
    const width = +venn.attr("width");
    const height = +venn.attr("height");

    // Circle data: Delete, Replace, Rewrite
    const circles = [
        { name: "Delete", x: 230, y: 230, r: 110, color: "#b6a6db" },
        { name: "Replace", x: 300, y: 150, r: 110, color: "#cbb8b8" },
        { name: "Rewrite", x: 370, y: 230, r: 110, color: "#edd98b" }
    ];

    // Draw circles with transparency
    venn.selectAll("circle")
        .data(circles)
        .enter()
        .append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.r)
        .attr("fill", d => d.color)
        .attr("fill-opacity", 0.6);

    // Labels for the circles
    venn.append("text")
        .attr("x", 110)
        .attr("y", 250)
        .attr("class", "label")
        .text("Delete");

    venn.append("text")
        .attr("x", 300)
        .attr("y", 50)
        .attr("class", "label")
        .text("Replace");

    venn.append("text")
        .attr("x", 490)
        .attr("y", 250)
        .attr("class", "label")
        .text("Rewrite");

    // Roman numeral positions (approximate)
    const regions = [
        { text: "I", x: 180, y: 250 },
        { text: "II", x: 300, y: 140 },
        { text: "III", x: 420, y: 250 },
        { text: "IV", x: 235, y: 200 },
        { text: "V", x: 355, y: 200 },
        { text: "VI", x: 310, y: 260 },
        { text: "VII", x: 300, y: 220 }
    ];

    venn.selectAll(".region")
        .data(regions)
        .enter()
        .append("text")
        .attr("class", "region")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .text(d => d.text);

}
function chartthree() {
    const svg = d3.select("#badvector");
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const margin = 40;

    // Create grid
    const xScale = d3.scaleLinear().domain([0, 8]).range([margin, width - margin]);
    const yScale = d3.scaleLinear().domain([0, 4]).range([height - margin, margin]);

    const xAxisGrid = d3.axisBottom(xScale)
        .ticks(8)
        .tickSize(-height + 2 * margin)
        .tickFormat("");

    const yAxisGrid = d3.axisLeft(yScale)
        .ticks(4)
        .tickSize(-width + 2 * margin)
        .tickFormat("");

    svg.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0,${height - margin})`)
        .call(xAxisGrid);

    svg.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(${margin},0)`)
        .call(yAxisGrid);

    // Arrowhead marker
    svg.append("defs").append("marker")
        .attr("id", "arrow")
        .attr("viewBox", [0, 0, 10, 10])
        .attr("refX", 10)
        .attr("refY", 5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", "M0,0L10,5L0,10")
        .attr("fill", "currentColor");

    // Coordinates of vectors
    const points = {
        e1a: [6, 2],
        e2a: [4, 3],
        e1b: [4, 1],
        e2b: [2, 1]
    };

    // Helper to map to SVG coordinates
    const X = d => xScale(d[0]);
    const Y = d => yScale(d[1]);

    // Solid black lines
    svg.append("line")
        .attr("class", "vector solid")
        .attr("x1", X([4, 1])).attr("y1", Y([4, 1]))
        .attr("x2", X(points.e1a)).attr("y2", Y(points.e1a));

    svg.append("line")
        .attr("class", "vector solid")
        .attr("x1", X(points.e2b)).attr("y1", Y(points.e2b))
        .attr("x2", X(points.e2a)).attr("y2", Y(points.e2a));

    // Dashed blue diagonals
    svg.append("line")
        .attr("class", "vector dashed1")
        .attr("x1", X(points.e1a))
        .attr("y1", Y(points.e1a))
        .attr("x2", X(points.e2b))
        .attr("y2", Y(points.e2b));

    svg.append("line")
        .attr("class", "vector dashed2")
        .attr("x1", X(points.e2a))
        .attr("y1", Y(points.e2a))
        .attr("x2", X(points.e1b))
        .attr("y2", Y(points.e1b));

    // Labels
    const labels = [
        { text: "eᵅ1", pos: points.e1a, dx: 25, dy: -10 },
        { text: "eᵅ2", pos: points.e2a, dx: -10, dy: -20 },
        { text: "eᵝ1", pos: points.e1b, dx: 25, dy: 15 },
        { text: "eᵝ2", pos: points.e2b, dx: -10, dy: 15 }
    ];

    svg.selectAll(".label")
        .data(labels)
        .enter()
        .append("text")
        .attr("x", d => X(d.pos) + d.dx)
        .attr("y", d => Y(d.pos) + d.dy)
        .attr("class", "label")
        .text(d => d.text);
}


function worsevector() {
    const svg = d3.select("#worsevector");
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const margin = 40;

    // Scales for grid (8x4 grid)
    const xScale = d3.scaleLinear().domain([0, 8]).range([margin, width - margin]);
    const yScale = d3.scaleLinear().domain([0, 4]).range([height - margin, margin]);

    // Grid lines
    const xAxisGrid = d3.axisBottom(xScale).ticks(8).tickSize(-height + 2 * margin).tickFormat("");
    const yAxisGrid = d3.axisLeft(yScale).ticks(4).tickSize(-width + 2 * margin).tickFormat("");

    svg.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0,${height - margin})`)
        .call(xAxisGrid);

    svg.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(${margin},0)`)
        .call(yAxisGrid);

    // Arrowhead marker
    svg.append("defs").append("marker")
        .attr("id", "arrow")
        .attr("viewBox", [0, 0, 10, 10])
        .attr("refX", 10)
        .attr("refY", 5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", "M0,0L10,5L0,10")
        .attr("fill", "currentColor");

    // Coordinates for the key points
    const pts = {
        e1a: [6, 3],  // e₁^α
        e2a: [3, 3],  // e₂^α
        e1b: [5, 1],  // e₁^β
        e2b: [2, 1]   // e₂^β
    };

    const X = d => xScale(d[0]);
    const Y = d => yScale(d[1]);

    // Solid rhombus edges
    svg.append("line")
        .attr("class", "vector solid")
        .attr("x1", X(pts.e2b)).attr("y1", Y(pts.e2b))
        .attr("x2", X(pts.e2a)).attr("y2", Y(pts.e2a));

    svg.append("line")
        .attr("class", "vector solid")
        .attr("x1", X(pts.e1b)).attr("y1", Y(pts.e1b))
        .attr("x2", X(pts.e1a)).attr("y2", Y(pts.e1a));

    // Dashed diagonals
    svg.append("line")
        .attr("class", "vector dashed-dark")
        .attr("x1", X(pts.e1a)).attr("y1", Y(pts.e1a))
        .attr("x2", X(pts.e2b)).attr("y2", Y(pts.e2b));

    svg.append("line")
        .attr("class", "vector dashed-light")
        .attr("x1", X(pts.e2a)).attr("y1", Y(pts.e2a))
        .attr("x2", X(pts.e1b)).attr("y2", Y(pts.e1b));

    // Labels with Greek superscripts using Unicode
    const labels = [
        { text: "e₁ᵅ", pos: pts.e1a, dx: 15, dy: -10 },
        { text: "e₂ᵅ", pos: pts.e2a, dx: -15, dy: -10 },
        { text: "e₁ᵝ", pos: pts.e1b, dx: 15, dy: 15 },
        { text: "e₂ᵝ", pos: pts.e2b, dx: -15, dy: 15 }
    ];

    svg.selectAll(".label")
        .data(labels)
        .enter()
        .append("text")
        .attr("x", d => X(d.pos) + d.dx)
        .attr("y", d => Y(d.pos) + d.dy)
        .attr("class", "label")
        .text(d => d.text);
}
function vector() {
    const svg = d3.select("#vector");
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const margin = 40;

    // Scales for grid
    const xScale = d3.scaleLinear().domain([0, 8]).range([margin, width - margin]);
    const yScale = d3.scaleLinear().domain([0, 4]).range([height - margin, margin]);

    // Grid lines
    const xAxisGrid = d3.axisBottom(xScale).ticks(8).tickSize(-height + 2 * margin).tickFormat("");
    const yAxisGrid = d3.axisLeft(yScale).ticks(4).tickSize(-width + 2 * margin).tickFormat("");

    svg.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0,${height - margin})`)
        .call(xAxisGrid);

    svg.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(${margin},0)`)
        .call(yAxisGrid);

    // Coordinates
    const pts = {
        e1a: [6, 3],
        e2a: [3, 3],
        e1b: [5, 1],
        e2b: [2, 1]
    };

    const X = d => xScale(d[0]);
    const Y = d => yScale(d[1]);

    // === RHOMBUS (solid black) ===
    const rhombus = [pts.e1a, pts.e2a, pts.e2b, pts.e1b, pts.e1a];

    svg.append("path")
        .datum(rhombus)
        .attr("d", d3.line().x(d => X(d)).y(d => Y(d)))
        .attr("class", "vector solid");

    // === DASHED DIAGONALS ===
    svg.append("line")
        .attr("class", "vector dashed-dark")
        .attr("x1", X(pts.e1a)).attr("y1", Y(pts.e1a))
        .attr("x2", X(pts.e2b)).attr("y2", Y(pts.e2b));

    svg.append("line")
        .attr("class", "vector dashed-light")
        .attr("x1", X(pts.e2a)).attr("y1", Y(pts.e2a))
        .attr("x2", X(pts.e1b)).attr("y2", Y(pts.e1b));

    // === LABELS with SUPERSCRIPTS ===
    const labels = [
        { base: "e₁", sup: "α", pos: pts.e1a, dx: 20, dy: -10 },
        { base: "e₂", sup: "α", pos: pts.e2a, dx: -25, dy: -10 },
        { base: "e₁", sup: "β", pos: pts.e1b, dx: 20, dy: 20 },
        { base: "e₂", sup: "β", pos: pts.e2b, dx: -25, dy: 20 }
    ];

    const labelGroup = svg.selectAll(".label")
        .data(labels)
        .enter()
        .append("text")
        .attr("x", d => X(d.pos) + d.dx)
        .attr("y", d => Y(d.pos) + d.dy);

    labelGroup.each(function (d) {
        const t = d3.select(this);
        t.append("tspan").text(d.base);
        t.append("tspan")
            .attr("class", "sup")
            .text(d.sup);
    });
}

function areachart() {
    // 1. --- Setup ---
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const width = 900 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Create the SVG container
    const svg = d3.select("#area-chart-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 2. --- Data ---
    // Synthesized data based on the provided image
    const data = [
        { year: 1980, "Set model": 0, "Sequence model": 0, "Vector model": 0, "End-to-end": 0 },
        { year: 1986, "Set model": 0, "Sequence model": 0, "Vector model": 0, "End-to-end": 0 },
        { year: 1987, "Set model": 1, "Sequence model": 0, "Vector model": 0, "End-to-end": 0 },
        { year: 1988, "Set model": 0.2, "Sequence model": 0, "Vector model": 0.5, "End-to-end": 0 },
        { year: 1989, "Set model": 0, "Sequence model": 0, "Vector model": 1, "End-to-end": 0 },
        { year: 1990, "Set model": 0, "Sequence model": 0.2, "Vector model": 0, "End-to-end": 0 },
        { year: 1991, "Set model": 0, "Sequence model": 1.2, "Vector model": 0, "End-to-end": 0 },
        { year: 1992, "Set model": 0, "Sequence model": 0.5, "Vector model": 0, "End-to-end": 0 },
        { year: 1994, "Set model": 0, "Sequence model": 0, "Vector model": 0, "End-to-end": 0.5 },
        { year: 1995, "Set model": 0, "Sequence model": 0, "Vector model": 0, "End-to-end": 1 },
        { year: 1996, "Set model": 0, "Sequence model": 0, "Vector model": 1, "End-to-end": 1 },
        { year: 1997, "Set model": 0.2, "Sequence model": 0, "Vector model": 1, "End-to-end": 1 },
        { year: 1998, "Set model": 0, "Sequence model": 1, "Vector model": 0, "End-to-end": 0.5 },
        { year: 2000, "Set model": 1, "Sequence model": 0, "Vector model": 0.5, "End-to-end": 0 },
        { year: 2001, "Set model": 0.5, "Sequence model": 0, "Vector model": 1, "End-to-end": 0 },
        { year: 2003, "Set model": 2, "Sequence model": 0.5, "Vector model": 1.5, "End-to-end": 0 },
        { year: 2004, "Set model": 1, "Sequence model": 1, "Vector model": 2.5, "End-to-end": 0.2 },
        { year: 2006, "Set model": 0, "Sequence model": 2.2, "Vector model": 1, "End-to-end": 1 },
        { year: 2008, "Set model": 0, "Sequence model": 1, "Vector model": 2.5, "End-to-end": 0.5 },
        { year: 2009, "Set model": 0, "Sequence model": 0, "Vector model": 1.8, "End-to-end": 0 },
        { year: 2011, "Set model": 0, "Sequence model": 0, "Vector model": 0, "End-to-end": 2 },
        { year: 2012, "Set model": 0, "Sequence model": 0, "Vector model": 3, "End-to-end": 5 },
        { year: 2013, "Set model": 0, "Sequence model": 0, "Vector model": 4, "End-to-end": 3 },
        { year: 2014, "Set model": 0, "Sequence model": 0, "Vector model": 5, "End-to-end": 4 },
        { year: 2015, "Set model": 0, "Sequence model": 0.5, "Vector model": 3, "End-to-end": 6 },
        { year: 2017, "Set model": 0, "Sequence model": 1, "Vector model": 2, "End-to-end": 4 },
        { year: 2018, "Set model": 0, "Sequence model": 0.5, "Vector model": 1.5, "End-to-end": 8 },
        { year: 2019, "Set model": 0, "Sequence model": 0, "Vector model": 0.5, "End-to-end": 10 },
        { year: 2020, "Set model": 0, "Sequence model": 1, "Vector model": 1, "End-to-end": 3 },
        { year: 2021, "Set model": 0, "Sequence model": 0, "Vector model": 0, "End-to-end": 1 },
        { year: 2022, "Set model": 0, "Sequence model": 0, "Vector model": 0, "End-to-end": 0 }
    ];

    // Define categories and colors
    const categories = ["Set model", "Sequence model", "Vector model", "End-to-end"];

    // Colors sampled from the image
    const colors = {
        "Set model": "#a6d8b2",
        "Sequence model": "#d9ad8b",
        "Vector model": "#b0b7d1",
        "End-to-end": "#d9a0c7"
    };

    const colorScale = d3.scaleOrdinal()
        .domain(categories)
        .range(Object.values(colors));

    // 3. --- Scales ---
    const x = d3.scaleLinear()
        .domain([1980, 2022]) // Fixed domain to match the image
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, 10]) // Fixed domain [0, 10]
        .range([height, 0]);

    // 4. --- Axes ---
    // X-Axis
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x)
            .tickValues([1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020])
            .tickFormat(d3.format("d")) // Format as integer
        );

    // X-Axis Label
    svg.append("text")
        .attr("class", "axis-label")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .text("Year");

    // Y-Axis
    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y)
            .tickValues([0, 2, 4, 6, 8, 10])
        );

    // Y-Axis Label
    svg.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height / 2))
        .attr("y", -margin.left + 20)
        .text("Frequency");

    // 5. --- Draw Areas ---

    // Loop through each category to draw a separate area
    categories.forEach(category => {
        // Create the area generator for this category
        const areaGen = d3.area()
            .x(d => x(d.year))
            .y0(y(0)) // Bottom line is always at y=0
            .y1(d => y(d[category])) // Top line is the value
            .curve(d3.curveLinear); // Use curveLinear for the sharp peaks

        // Append the path for this area
        svg.append("path")
            .datum(data)
            .attr("fill", colorScale(category))
            .attr("opacity", 0.6) // Set opacity for overlap
            .attr("d", areaGen);
    });

    // 6. --- Draw Legend ---
    // Use D3 to create an HTML legend inside the #legend div

    const legend = d3.select("#legend");

    const legendItem = legend.selectAll(".legend-item")
        .data(categories)
        .enter()
        .append("div")
        .attr("class", "legend-item");

    legendItem.append("div")
        .attr("class", "legend-swatch")
        .style("background-color", d => colorScale(d))
        .style("opacity", 0.6); // Match area opacity

    legendItem.append("span")
        .text(d => d);
}
function sketchcanvas() {
    const svg = d3.select("#sketchcanvas");

    // Offset for the entire drawing to center it a bit
    const offsetX = 50;
    const offsetY = 20;

    // --- The Block (Seat) ---
    svg.append("rect")
        .attr("class", "sketch-line")
        .attr("x", offsetX + 50)
        .attr("y", offsetY + 300)
        .attr("width", 200)
        .attr("height", 60);

    // Perspective lines for the block
    svg.append("line")
        .attr("class", "sketch-line")
        .attr("x1", offsetX + 50)
        .attr("y1", offsetY + 300)
        .attr("x2", offsetX + 70) // Top-left back point
        .attr("y2", offsetY + 280);

    svg.append("line")
        .attr("class", "sketch-line")
        .attr("x1", offsetX + 250)
        .attr("y1", offsetY + 300)
        .attr("x2", offsetX + 270) // Top-right back point
        .attr("y2", offsetY + 280);

    svg.append("line")
        .attr("class", "sketch-line")
        .attr("x1", offsetX + 270)
        .attr("y1", offsetY + 280)
        .attr("x2", offsetX + 270) // Bottom-right back point
        .attr("y2", offsetY + 340);

    svg.append("line")
        .attr("class", "sketch-line")
        .attr("x1", offsetX + 70)
        .attr("y1", offsetY + 280)
        .attr("x2", offsetX + 270)
        .attr("y2", offsetY + 280);

    // --- Monitor Head ---
    const headX = offsetX + 150;
    const headY = offsetY + 50;
    const headWidth = 100;
    const headHeight = 80;

    svg.append("rect")
        .attr("class", "sketch-line")
        .attr("x", headX)
        .attr("y", headY)
        .attr("width", headWidth)
        .attr("height", headHeight);

    // Monitor screen (inner rectangle)
    svg.append("rect")
        .attr("class", "sketch-line")
        .attr("x", headX + 15)
        .attr("y", headY + 15)
        .attr("width", headWidth - 30)
        .attr("height", headHeight - 30);

    // Monitor face (eyes and mouth)
    svg.append("line")
        .attr("class", "sketch-line")
        .attr("x1", headX + 35)
        .attr("y1", headY + 35)
        .attr("x2", headX + 45)
        .attr("y2", headY + 35);

    svg.append("line")
        .attr("class", "sketch-line")
        .attr("x1", headX + 65)
        .attr("y1", headY + 35)
        .attr("x2", headX + 75)
        .attr("y2", headY + 35);

    svg.append("line")
        .attr("class", "sketch-line")
        .attr("x1", headX + 45)
        .attr("y1", headY + 55)
        .attr("x2", headX + 65)
        .attr("y2", headY + 55);

    // --- Stick Figure Body ---
    const bodyTopY = headY + headHeight;
    const bodyMidY = bodyTopY + 80; // Torso length

    // Neck
    svg.append("line")
        .attr("class", "sketch-line")
        .attr("x1", headX + headWidth / 2)
        .attr("y1", bodyTopY)
        .attr("x2", headX + headWidth / 2)
        .attr("y2", bodyTopY + 15);

    // Torso
    svg.append("line")
        .attr("class", "sketch-line")
        .attr("x1", headX + headWidth / 2)
        .attr("y1", bodyTopY + 15)
        .attr("x2", headX + headWidth / 2)
        .attr("y2", bodyMidY);

    // Shoulders to elbows
    svg.append("line") // Left arm (from our perspective)
        .attr("class", "sketch-line")
        .attr("x1", headX + headWidth / 2)
        .attr("y1", bodyTopY + 30)
        .attr("x2", headX + headWidth / 2 - 40)
        .attr("y2", bodyTopY + 80);

    svg.append("line") // Right arm (from our perspective)
        .attr("class", "sketch-line")
        .attr("x1", headX + headWidth / 2)
        .attr("y1", bodyTopY + 30)
        .attr("x2", headX + headWidth / 2 + 40)
        .attr("y2", bodyTopY + 80);

    // Elbows to hands
    svg.append("line") // Left forearm
        .attr("class", "sketch-line")
        .attr("x1", headX + headWidth / 2 - 40)
        .attr("y1", bodyTopY + 80)
        .attr("x2", offsetX + 190) // Hand position for pencil
        .attr("y2", offsetY + 270);

    svg.append("line") // Right forearm
        .attr("class", "sketch-line")
        .attr("x1", headX + headWidth / 2 + 40)
        .attr("y1", bodyTopY + 80)
        .attr("x2", offsetX + 260) // Hand position for paper
        .attr("y2", offsetY + 275);

    // --- Pencil and Paper ---
    // Pencil
    svg.append("line")
        .attr("class", "sketch-line")
        .attr("x1", offsetX + 180)
        .attr("y1", offsetY + 260)
        .attr("x2", offsetX + 200)
        .attr("y2", offsetY + 280);
    svg.append("circle") // Hand holding pencil
        .attr("class", "filled-circle")
        .attr("cx", offsetX + 190)
        .attr("cy", offsetY + 270)
        .attr("r", 4);

    // Paper
    svg.append("path")
        .attr("class", "sketch-line")
        .attr("d", `M ${offsetX + 250} ${offsetY + 260} 
                        L ${offsetX + 280} ${offsetY + 270} 
                        L ${offsetX + 270} ${offsetY + 300} 
                        L ${offsetX + 240} ${offsetY + 290} Z`);
    svg.append("circle") // Hand holding paper
        .attr("class", "filled-circle")
        .attr("cx", offsetX + 260)
        .attr("cy", offsetY + 275)
        .attr("r", 4);

    // --- Legs ---
    const legStart = bodyMidY;
    const legBendY = offsetY + 310;
    const footY = offsetY + 345;

    // Left leg (from our perspective)
    svg.append("line")
        .attr("class", "sketch-line")
        .attr("x1", headX + headWidth / 2 - 10)
        .attr("y1", legStart)
        .attr("x2", headX + headWidth / 2 - 20)
        .attr("y2", legBendY);

    svg.append("line") // Shin
        .attr("class", "sketch-line")
        .attr("x1", headX + headWidth / 2 - 20)
        .attr("y1", legBendY)
        .attr("x2", headX + headWidth / 2 - 30)
        .attr("y2", footY);

    svg.append("path") // Left foot
        .attr("class", "sketch-line")
        .attr("d", `M ${headX + headWidth / 2 - 30} ${footY} 
                        a 10 10 0 1 0 0 10`);

    // Right leg (from our perspective)
    svg.append("line")
        .attr("class", "sketch-line")
        .attr("x1", headX + headWidth / 2 + 10)
        .attr("y1", legStart)
        .attr("x2", headX + headWidth / 2 + 20)
        .attr("y2", legBendY);

    svg.append("line") // Shin
        .attr("class", "sketch-line")
        .attr("x1", headX + headWidth / 2 + 20)
        .attr("y1", legBendY)
        .attr("x2", headX + headWidth / 2 + 30)
        .attr("y2", footY);

    svg.append("path") // Right foot
        .attr("class", "sketch-line")
        .attr("d", `M ${headX + headWidth / 2 + 30} ${footY} 
                        a 10 10 0 1 0 0 10`);
}

chartone()
charttwo()
chartthree()
worsevector()
vector()
areachart()
sketchcanvas()