import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import styles from './HeroSection.module.scss';

const HeroSection = () => {
  const svgRef = useRef(null);
  const [currentPhrase, setCurrentPhrase] = useState('Innovate');
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      
      const { width, height } = dimensions;

      svg.attr('width', width).attr('height', height);

      // Clear existing content
      svg.selectAll("*").remove();


      // Create definitions for gradients and patterns
      const defs = svg.append("defs");

      // Linear gradient for background
      const gradient = defs.append("linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%");

      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#1a237e");

      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#4a148c");

      // Pattern for network lines
      const pattern = defs.append("pattern")
        .attr("id", "pattern")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 4)
        .attr("height", 4)
        .attr("patternUnits", "userSpaceOnUse")
        .attr("patternTransform", "rotate(45)");

      pattern.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 2)
        .attr("height", 4)
        .attr("fill", "rgba(255, 255, 255, 0.1)");

      // Add background
      svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "url(#gradient)");

      // Add pattern overlay
      svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "url(#pattern)");

      // Generate nodes for network graph
      const nodeCount = 50;
      const nodes = d3.range(nodeCount).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 4 + 2,
      }));

      // Generate links between nodes
      const links = [];
      for (let i = 0; i < nodeCount; i++) {
        const linkCount = Math.floor(Math.random() * 3);
        for (let j = 0; j < linkCount; j++) {
          links.push({
            source: nodes[i],
            target: nodes[Math.floor(Math.random() * nodeCount)]
          });
        }
      }

      // Create force simulation
      const simulation = d3.forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(-50))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("link", d3.forceLink(links).distance(50))
        .force("collision", d3.forceCollide().radius(d => d.r + 1));

      // Add links to SVG
      const linkElements = svg.append("g")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke", "rgba(255, 255, 255, 0.2)")
        .attr("stroke-width", 1);

      // Add nodes to SVG
      const nodeElements = svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", d => d.r)
        .attr("fill", "rgba(255, 255, 255, 0.5)");

      // Update positions on each tick of the simulation
      simulation.on("tick", () => {
        linkElements
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

        nodeElements
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
      });

      // Cleanup function
      return () => {
        simulation.stop();
      };
    }
  }, [dimensions]);

  useEffect(() => {
    const phrases = [
      "Innovate",
      "Analyze",
      "Strategize",
      "Transform"
    ];

    let currentPhraseIndex = 0;

    const textInterval = setInterval(() => {
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      setCurrentPhrase(phrases[currentPhraseIndex]);
    }, 3000);

    // Cleanup function
    return () => {
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className={styles.heroSection}>
      <svg ref={svgRef} className={styles.heroSvg}></svg>
      <div className={styles.animatedText}>
        <h1 className={styles.animatedTextContent} aria-live="polite">{currentPhrase}</h1>
      </div>
    </div>
  );
};

export default HeroSection;