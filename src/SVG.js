import { useEffect, useState } from "react";
import "./SVG.css";
import * as d3 from "d3";
import Graph from "./data/graph";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const SVG = () => {
  const [state, setState] = useState({
    "rect0.rect0.dx": cookies.get("rect0.rect0.dx"),
    "rect0.rect0.dy": cookies.get("rect0.rect0.dy"),
  });

  useEffect(() => {
    setState({
      "rect0.rect0.dx": cookies.get("rect0.rect0.dx"),
      "rect0.rect0.dy": cookies.get("rect0.rect0.dy"),
    });
  }, []);
  console.log("-----------", state);
  const width = 1800;
  const height = 900;

  useEffect(() => {
    const svg = d3
      .select(".svg")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Graph.content.forEach(function (d) {
    //   d.source = Graph.nodes[d.source];
    //   d.target = Graph.nodes[d.target];
    // });

    svg
      .append("g")
      .attr("class", "node")
      .selectAll("rect")
      .data(Graph.content)
      .enter()
      .append("rect")
      .attr("class", (d, i) => "rect" + i)
      .attr("id", (d, i) => "rect" + i)
      .attr("width", "260px")
      .attr("height", "140px")
      .style("rx", 6)
      .attr("x", function (d, i) {
        console.log(">>>>>>>>>>>", state["rect0.rect0.dx"]);
        return state["rect0.rect0.dx"];
      })
      .attr("y", function (d, i) {
        return state["rect0.rect0.dy"];
      })
      .call(d3.drag().on("drag", dragged));

    async function dragged(event, d) {
      d.x = event.x;
      d.y = event.y;
      await setValForAtt(event.sourceEvent.target.id, d, event);
      console.log("+++++", this);
      d3.select(this).attr("x", event.x).attr("y", event.y);
    }

    async function setValForAtt(type, cords, event) {
      cookies.set(event.sourceEvent.target.id + "." + type + ".dx", cords.x);
      cookies.set(event.sourceEvent.target.id + "." + type + ".dy", cords.y);

      // return true;
    }
  }, []);
  return (
    <div className="svg-container">
      <div className="svg"></div>
    </div>
  );
};

export default SVG;
