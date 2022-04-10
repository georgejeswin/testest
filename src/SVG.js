import { useEffect, useState } from "react";
import "./SVG.css";
import * as d3 from "d3";
import Graph from "./data/graph";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const SVG = () => {
  const [state, setState] = useState([
    {
      "rect0.rect0.dx": cookies.get("rect0.rect0.dx"),
      "rect0.rect0.dy": cookies.get("rect0.rect0.dy"),
    },
    {
      "rect1.rect1.dx": cookies.get("rect1.rect1.dx"),
      "rect1.rect1.dy": cookies.get("rect1.rect1.dy"),
    },
    {
      "rect2.rect2.dx": cookies.get("rect2.rect2.dx"),
      "rect2.rect2.dy": cookies.get("rect2.rect2.dy"),
    },
    {
      "rect3.rect3.dx": cookies.get("rect3.rect3.dx"),
      "rect3.rect3.dy": cookies.get("rect3.rect3.dy"),
    },
    {
      "rect4.rect4.dx": cookies.get("rect4.rect4.dx"),
      "rect4.rect4.dy": cookies.get("rect4.rect4.dy"),
    },
    {
      "rect5.rect5.dx": cookies.get("rect5.rect5.dx"),
      "rect5.rect5.dy": cookies.get("rect5.rect5.dy"),
    },
    {
      "rect6.rect6.dx": cookies.get("rect6.rect6.dx"),
      "rect6.rect6.dy": cookies.get("rect6.rect6.dy"),
    },
  ]);

  const width = 1800;
  const height = 900;

  const getLocal = () => {
    setState([
      {
        "rect0.rect0.dx": cookies.get("rect0.rect0.dx"),
        "rect0.rect0.dy": cookies.get("rect0.rect0.dy"),
      },
      {
        "rect1.rect1.dx": cookies.get("rect1.rect1.dx"),
        "rect1.rect1.dy": cookies.get("rect1.rect1.dy"),
      },
      {
        "rect2.rect2.dx": cookies.get("rect2.rect2.dx"),
        "rect2.rect2.dy": cookies.get("rect2.rect2.dy"),
      },
      {
        "rect3.rect3.dx": cookies.get("rect3.rect3.dx"),
        "rect3.rect3.dy": cookies.get("rect3.rect3.dy"),
      },
      {
        "rect4.rect4.dx": cookies.get("rect4.rect4.dx"),
        "rect4.rect4.dy": cookies.get("rect4.rect4.dy"),
      },
      {
        "rect5.rect5.dx": cookies.get("rect5.rect5.dx"),
        "rect5.rect5.dy": cookies.get("rect5.rect5.dy"),
      },
      {
        "rect6.rect6.dx": cookies.get("rect6.rect6.dx"),
        "rect6.rect6.dy": cookies.get("rect6.rect6.dy"),
      },
    ]);
  };
  useEffect(() => {
    window.onload = function () {
      console.log("blaaaaaa");
      const svg = d3
        .select(".svg")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

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
        .call(function () {
          console.log("????????????????????", state);
        })
        .attr("x", function (d, i) {
          console.log(state[i][`rect${i}.rect${i}.dx`]);
          return state[i][`rect${i}.rect${i}.dx`];
        })
        .attr("y", function (d, i) {
          return state[i][`rect${i}.rect${i}.dy`];
        })
        .call(d3.drag().on("drag", dragged))
        .on("start", function (d) {
          console.log("drag start");
        })
        .on("end", function (d) {
          console.log("drag end");
        });
    };
  }, []);

  async function dragged(event, d) {
    d3.select(this).attr("x", function (d) {
      return (d.x += event.dx);
    });
    d3.select(this).attr("y", function (d) {
      return (d.y += event.dy);
    });
    // d3.select(this).attr("x", event.x).attr("y", event.y);
    d.x = event.x;
    d.y = event.y;
    // console.log(">>>>>><<<<<<<<", d);
    await setValForAtt(event.sourceEvent.target.id, d, event);
    // console.log("+++++", this);
  }

  async function setValForAtt(type, cords, event) {
    cookies.set(event.sourceEvent.target.id + "." + type + ".dx", cords.x);
    cookies.set(event.sourceEvent.target.id + "." + type + ".dy", cords.y);

    return true;
  }
  return (
    <div className="svg-container">
      <div className="svg"></div>
    </div>
  );
};

export default SVG;
