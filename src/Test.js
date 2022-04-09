import { useEffect } from "react";
import "./App.css";
import * as d3 from "d3";
import Graph from "./data/graph";

const App = () => {
  const width = 1800;
  const height = 900;
  useEffect(() => {
    const svg = d3
      .select("div")
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
      .attr("width", "230px")
      .attr("height", "130px")
      .style("fill", "no")
      .style("rx", 6)
      .attr("x", function (d, i) {
        return localStorage.getItem(`rect${i}.rect${i}.dx`) !== null
          ? localStorage.getItem(`rect${i}.rect${i}.dx`)
          : d.x;
      })
      .attr("y", function (d, i) {
        return localStorage.getItem(`rect${i}.rect${i}.dy`) !== null
          ? localStorage.getItem(`rect${i}.rect${i}.dy`)
          : d.y;
      })
      .call(d3.drag().on("drag", dragged));

    let text = svg
      .selectAll("text")
      .data(Graph.content)
      .enter()
      .append("text")
      .attr("id", (d, i) => "rect" + i + ".text")
      .attr("x", (d, i) =>
        localStorage.getItem(`rect${i}.text.dx`) !== null
          ? localStorage.getItem(`rect${i}.text.dx`)
          : d.x + 40
      )
      .attr("y", (d, i) =>
        localStorage.getItem(`rect${i}.text.dy`) !== null
          ? localStorage.getItem(`rect${i}.text.dy`)
          : d.y + 20
      )
      .style("font-size", "11px")
      .style("font-family", "Helvetica")
      .style("font-weight", 800)
      .style("letter-spacing", "1px")
      .text((d) => d.text);

    let icons = svg
      .selectAll("icons")
      .data(Graph.content)
      .enter()
      .append("a")
      .append("image")
      .attr("class", "icons")
      .attr("id", (d, i) => "rect" + i + ".icons")
      .attr("x", (d, i) =>
        localStorage.getItem(`rect${i}.icons.dx`) !== null
          ? localStorage.getItem(`rect${i}.icons.dx`)
          : d.x + 2
      )
      .attr("y", (d, i) =>
        localStorage.getItem(`rect${i}.icons.dy`) !== null
          ? localStorage.getItem(`rect${i}.icons.dy`)
          : d.y - 2
      )
      .attr("width", 35)
      .attr("height", 35)
      .attr("xlink:href", (d) => d.image);

    let googleImg = svg
      .selectAll("googleImg")
      .data(Graph.content)
      .enter()
      .append("image")
      .attr("id", (d, i) => "rect" + i + ".googleImg")
      .attr("x", (d, i) =>
        localStorage.getItem(`rect${i}.googleImg.dx`) !== null
          ? localStorage.getItem(`rect${i}.googleImg.dx`)
          : d.x + 85
      )
      .attr("y", (d, i) =>
        localStorage.getItem(`rect${i}.googleImg.dy`) !== null
          ? localStorage.getItem(`rect${i}.googleImg.dy`)
          : d.y + 40
      )
      .attr("class", "googleImg")
      .attr("width", 55)
      .attr("height", 55)
      .attr("href", (d) => d.google);

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

        text
          .filter((t) => t.source === d)
          .attr("x", d.x + 40)
          .attr("y", d.y + 20)
          .filter(await setValForAtt("text", d, event));
        icons
          .filter((t) => t.source === d)
          .attr("x", d.x + 2)
          .attr("y", d.y - 2)
          .filter(await setValForAtt("icons", d, event));
        googleImg
          .filter((t) => t.source === d)
          .attr("x", d.x + 85)
          .attr("y", d.y + 40)
          .filter(await setValForAtt("googleImg", d, event));
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
      } else if (type === "text") {
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dx",
          d.x + 40
        );
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dy",
          d.y + 20
        );
      } else if (type === "icons") {
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dx",
          d.x + 2
        );
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dy",
          d.y - 2
        );
      } else if (type === "googleImg") {
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dx",
          d.x + 85
        );
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dy",
          d.y + 40
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
  return <div className="app"></div>;
};

export default App;
