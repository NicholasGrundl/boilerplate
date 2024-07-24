// src/components/TechnoEconomicChart/TechnoEconomicChart.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

/**
 * TechnoEconomicChart component renders a D3 chart visualizing techno-economic data.
 *
 * @returns {React.Element} A D3 chart visualizing techno-economic data
 */
const TechnoEconomicChart = () => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (d3Container.current) {
      const svg = d3.select(d3Container.current);
      
      // Clear any existing content
      svg.selectAll("*").remove();

      // Set up dimensions
      const width = 300;
      const height = 200;
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };

      // Create scales
      const x = d3.scaleLinear()
        .domain([0, 10])
        .range([margin.left, width - margin.right]);

      const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height - margin.bottom, margin.top]);

      // Add X and Y axes
      svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

      svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

      // Add a line
      const line = d3.line()
        .x((d, i) => x(i))
        .y(d => y(d));

      const data = [10, 30, 50, 80, 45, 60, 70, 90, 85, 100];

      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#4a00e0")
        .attr("stroke-width", 2)
        .attr("d", line);
    }
  }, []);

  return <svg ref={d3Container} width={300} height={200}></svg>;
};

export default TechnoEconomicChart;