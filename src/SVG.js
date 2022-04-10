import { useEffect, useState } from "react";
import "./SVG.css";
import * as d3 from "d3";
import Graph from "./data/graph";
import { useNavigate } from "react-router-dom";
import Button from "./components/Button";

const SVG = () => {
  const [state, setState] = useState({
    "rect0.rect0.dx": localStorage.getItem("rect0.rect0.dx"),
    "rect0.rect0.dy": localStorage.getItem("rect0.rect0.dy"),
  });
  const width = 1800;
  const height = 900;
  const navigate = useNavigate();
  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    if (username !== "admin" && password !== "123456") {
      navigate("/");
    }
  }, [navigate]);
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    navigate("/");
    window.location.reload();
  };
  useEffect(() => {
    const svg = d3
      .select(".svg")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    Graph.content.forEach(function (d) {
      d.source = Graph.nodes[d.source];
      d.target = Graph.nodes[d.target];
    });

    let link = svg
      .append("g")
      .attr("class", "link")
      .selectAll("line")
      .data(Graph.content)
      .enter()
      .append("line")
      .attr("transform", "translate(0," - 60 + ")")
      .attr("id", (d, i) => "rect" + i + ".link")
      .attr("x1", function (d, i) {
        return localStorage.getItem(`rect${i}.link.dx1`) !== null
          ? localStorage.getItem(`rect${i}.link.dx1`)
          : d.source.x + 70;
      })
      .attr("y1", function (d, i) {
        return localStorage.getItem(`rect${i}.link.dy1`) !== null
          ? localStorage.getItem(`rect${i}.link.dy1`)
          : d.source.y;
      })
      .attr("x2", function (d, i) {
        return localStorage.getItem(`rect${i}.link.dx2`) !== null
          ? localStorage.getItem(`rect${i}.link.dx2`)
          : d.target.x + 50;
      })
      .attr("y2", function (d, i) {
        return localStorage.getItem(`rect${i}.link.dy2`) !== null
          ? localStorage.getItem(`rect${i}.link.dy2`)
          : d.target.y + 10;
      });

    svg
      .append("g")
      .attr("class", "node")
      .selectAll("rect")
      .data(Graph.nodes)
      .enter()
      .append("rect")
      .attr("class", (d, i) => "rect" + i)
      .attr("id", (d, i) => "rect" + i)
      .attr("width", "260px")
      .attr("height", "140px")
      .style("fill", "no")
      .style("rx", 6)
      .attr("x", state["rect0.rect0.dx"])
      .attr("y", state["rect0.rect0.dy"])
      .call(d3.drag().on("drag", dragged));

    async function dragged(event, d) {
      //   console.log('event', event);
      //   console.log('d', d);
      if (
        event.sourceEvent.target.id.length > 0 &&
        event.sourceEvent.target.id.split(".").length === 1
      ) {
        d.x = event.x;
        d.y = event.y;
        await setValForAtt(event.sourceEvent.target.id, d, event);
        d3.select(this).attr("x", d.x).attr("y", d.y);

        link
          .filter(function (l) {
            return l.source === d;
          })
          .attr("x1", d.x + 70)
          .attr("y1", d.y)
          .filter(await setValForAtt("link1", d, event));
        link
          .filter(function (l) {
            return l.target === d;
          })
          .attr("x2", d.x + 70)
          .attr("y2", d.y + 10);
        // .filter(await setValForAtt("link2", d, event));
      }
    }

    async function setValForAtt(type, d, event) {
      if (type === "link1") {
        localStorage.setItem(
          event.sourceEvent.target.id + ".link" + ".dx1",
          d.x + 70
        );
        localStorage.setItem(
          event.sourceEvent.target.id + ".link" + ".dy1",
          d.y
        );
      } else if (type === "link2") {
        localStorage.setItem(
          event.sourceEvent.target.id + ".link" + ".dx2",
          d.x + 50
        );
        localStorage.setItem(
          event.sourceEvent.target.id + ".link" + ".dy2",
          d.y + 10
        );
      } else {
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dx",
          d.x
        );
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dy",
          d.y
        );
      }
      return true;
    }
  }, []);
  return (
    <div className="svg-container">
      <Button type="submit" label="Logout" onClick={handleLogout} />
      <div className="svg"></div>
    </div>
  );
};

export default SVG;
