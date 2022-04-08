import { useEffect } from "react";
import "./App.css";
import * as d3 from "d3";
import graph from "./data/graph";

function App() {
  const width = 1800,
    height = 900;
  useEffect(() => {
    const svg = d3
      .select("div")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    graph.content.forEach(function (d) {
      d.source = graph.nodes[d.source];
      d.target = graph.nodes[d.target];
    });

    // console.log(graph);

    const link = svg
      .append("g")
      .attr("class", "link")
      .selectAll("line")
      .data(graph.content)
      .enter()
      .append("line")
      .attr("fill", "#DCDCDC")
      .attr("x1", function (d) {
        return d.source.x + 70;
      })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x + 50;
      })
      .attr("y2", function (d) {
        return d.target.y + 10;
      });

    svg
      .append("g")
      .attr("class", "node")
      .selectAll("rect")
      .data(graph.nodes)
      .enter()
      .append("rect")
      .attr("class", (d, i) => "rect" + i)
      .attr("width", "230px")
      .attr("height", "130px")
      .style("fill", "no")
      .style("rx", 6)
      .attr("x", function (d) {
        return d.x;
      })
      .attr("y", function (d) {
        return d.y;
      })
      .call(d3.drag().on("drag", dragged));

    const text = svg
      .selectAll("text")
      .data(graph.content)
      .enter()
      .append("text")
      .attr("x", (d, i) => d.x + 40)
      .attr("y", (d, i) => d.y + 20)
      .style("font-size", "11px")
      .style("font-family", "Helvetica")
      .style("font-weight", 800)
      .style("letter-spacing", "1px")
      .text((d) => d.text);

    const icons = svg
      .selectAll("icons")
      .data(graph.content)
      .enter()
      .append("a")
      .append("image")
      .attr("class", "icons")
      .attr("x", (d, i) => d.x + 2)
      .attr("y", (d, i) => d.y - 2)
      .attr("width", 35)
      .attr("height", 35)
      .attr("xlink:href", (d) => d.image);

    const googleImg = svg
      .selectAll("googleImg")
      .data(graph.content)
      .enter()
      .append("image")
      .attr("x", (d, i) => d.x + 85)
      .attr("y", (d, i) => d.y + 40)
      .attr("class", "googleImg")
      .attr("width", 55)
      .attr("height", 55)
      .attr("href", (d) => d.google);

    function dragged(event, d) {
      d.x = event.x;
      d.y = event.y;
      d3.select(this).attr("x", d.x).attr("y", d.y);
      text
        .filter((t) => t.source === d)
        .attr("x", d.x + 40)
        .attr("y", d.y + 20);
      icons
        .filter((t) => t.source === d)
        .attr("x", d.x + 2)
        .attr("y", d.y - 2);
      googleImg
        .filter((t) => t.source === d)
        .attr("x", d.x + 85)
        .attr("y", d.y + 40);

      link
        .filter(function (l) {
          return l.source === d;
        })
        .attr("x1", d.x + 70)
        .attr("y1", d.y);
      link
        .filter(function (l) {
          return l.target === d;
        })
        .attr("x2", d.x + 70)
        .attr("y2", d.y + 10);
    }
  }, []);
  return <div className="app"></div>;
}

export default App;
