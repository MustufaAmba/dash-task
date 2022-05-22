import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';
import csvData from "./stock_values.csv"
function BarChart({ width, height }) {

  const ref = useRef();
  useEffect(() => {
    draw();
  }, []);

  const draw = () => {
    const svg = d3.select(ref.current);

    svg.append("text")
      .attr("transform", "translate(100,0)")
      .attr("x", 50)
      .attr("y", 50)
      .attr("font-size", "24px")
      .text("Stock Price").attr("width", width)
      .attr("height", height)
      .style("border", "1px solid black")

    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
      yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
      .attr("transform", "translate(" + 100 + "," + 100 + ")");

    d3.csv(csvData).then(function (data) {
      xScale.domain(data.map(function (d) { return d.year; }));
      yScale.domain([0, d3.max(data, function (d) { return d.value; })]);
      g.append("g")
        .call(d3.axisTop(xScale))
      
     

      g.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function (d) { return "$" + d; }).ticks(5))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 10)
        .attr('dy', '-5em')
        .attr('text-anchor', 'end')
        .attr('stroke', 'black')
        .text('Stock Price in USD')
        
      g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return xScale(d.year); })
        .attr("y", function (d) { return yScale(d.value); })
        .attr("width", xScale.bandwidth())
        .transition()
        .ease(d3.easeLinear)
        .duration(500)
        .delay(function (d, i) { return i * 50 })
        .attr("height", function (d) { return height - yScale(d.value); })
    })
  }
  return (
    <div className="chart">
      <svg width="500" height="500" ref={ref}>
      </svg>
    </div>

  )

}

export default BarChart;