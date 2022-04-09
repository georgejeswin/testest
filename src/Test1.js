import { useEffect } from "react";
import "./SVG.css";
import * as d3 from "d3";
import graph from "./data/graph";
import { useNavigate } from "react-router-dom";
import Button from "./components/Button";

function SVG() {
  const width = 1800,
    height = 900;
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
      .attr("width", "260px")
      .attr("height", "140px")
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
      .selectAll("heading")
      .data(graph.content)
      .enter()
      .append("text")
      .attr("x", (d, i) => d.x + 40)
      .attr("y", (d, i) => d.y + 20)
      .attr("class", "heading")
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
      .attr("xlink:href", (d) => d?.image);

    const googleImg = svg
      .selectAll("googleImg")
      .data(graph.content)
      .enter()
      .append("image")
      .attr("x", (d, i) => d.x + 95)
      .attr("y", (d, i) => d.y + 40)
      .attr("class", "googleImg")
      .attr("width", 55)
      .attr("height", 55)
      .attr("href", (d) => d?.google);

    const circle1 = svg
      .selectAll("circleImg1")
      .data(graph.content)
      .enter()
      .append("image")
      .attr("x", (d, i) => d.x + 99)
      .attr("y", (d, i) => d.y + 60)
      .attr("class", "circleImg1")
      .attr("width", 25)
      .attr("height", 25)
      .attr("href", (d) => d?.circle?.img1);

    const circleText1 = svg
      .selectAll("circleText1")
      .data(graph.content)
      .enter()
      .append("text")
      .attr("x", (d, i) => d.x + 99)
      .attr("y", (d, i) => d.y + 95)
      .attr("class", "circleText1")
      .style("font-size", "6px")
      .style("font-family", "Helvetica")
      .style("font-weight", 400)
      .text((d) => d?.circle?.text1);

    const circle2 = svg
      .selectAll("circleImg2")
      .data(graph.content)
      .enter()
      .append("image")
      .attr("x", (d, i) => d.x + 140)
      .attr("y", (d, i) => d.y + 60)
      .attr("class", "circleImg2")
      .attr("width", 25)
      .attr("height", 25)
      .attr("href", (d) => d?.circle?.img2);

    const circleText2 = svg
      .selectAll("circleText2")
      .data(graph.content)
      .enter()
      .append("text")
      .attr("x", (d, i) => d.x + 140)
      .attr("y", (d, i) => d.y + 95)
      .attr("class", "circleText2")
      .style("font-size", "6px")
      .style("font-family", "Helvetica")
      .style("font-weight", 400)
      .text((d) => d?.circle?.text2);

    const circle3 = svg
      .selectAll("circleImg3")
      .data(graph.content)
      .enter()
      .append("image")
      .attr("x", (d, i) => d.x + 180)
      .attr("y", (d, i) => d.y + 60)
      .attr("class", "circleImg3")
      .attr("width", 25)
      .attr("height", 25)
      .attr("href", (d) => d?.circle?.img3);

    const circleText3 = svg
      .selectAll("circleText3")
      .data(graph.content)
      .enter()
      .append("text")
      .attr("x", (d, i) => d.x + 180)
      .attr("y", (d, i) => d.y + 95)
      .attr("class", "circleText3")
      .style("font-size", "6px")
      .style("font-family", "Helvetica")
      .style("font-weight", 400)
      .text((d) => d?.circle?.text3);

    const circle4 = svg
      .selectAll("circleImg4")
      .data(graph.content)
      .enter()
      .append("image")
      .attr("x", (d, i) => d.x + 15)
      .attr("y", (d, i) => d.y + 60)
      .attr("class", "circleImg4")
      .attr("width", 25)
      .attr("height", 25)
      .attr("href", (d) => d?.circle?.img4);

    const circleText4 = svg
      .selectAll("circleText4")
      .data(graph.content)
      .enter()
      .append("text")
      .attr("x", (d, i) => d.x + 15)
      .attr("y", (d, i) => d.y + 95)
      .attr("class", "circleText4")
      .style("font-size", "6px")
      .style("font-family", "Helvetica")
      .style("font-weight", 400)
      .text((d) => d?.circle?.text4);
    const circle5 = svg
      .selectAll("circleImg5")
      .data(graph.content)
      .enter()
      .append("image")
      .attr("x", (d, i) => d.x + 60)
      .attr("y", (d, i) => d.y + 60)
      .attr("class", "circleImg5")
      .attr("width", 25)
      .attr("height", 25)
      .attr("href", (d) => d?.circle?.img5);

    const circleText5 = svg
      .selectAll("circleText5")
      .data(graph.content)
      .enter()
      .append("text")
      .attr("x", (d, i) => d.x + 60)
      .attr("y", (d, i) => d.y + 95)
      .attr("class", "circleText5")
      .style("font-size", "6px")
      .style("font-family", "Helvetica")
      .style("font-weight", 400)
      .text((d) => d?.circle?.text5);

    const circle6 = svg
      .selectAll("circleImg6")
      .data(graph.content)
      .enter()
      .append("image")
      .attr("x", (d, i) => d.x + 220)
      .attr("y", (d, i) => d.y + 60)
      .attr("class", "circleImg6")
      .attr("width", 25)
      .attr("height", 25)
      .attr("href", (d) => d?.circle?.img6);

    const circleText6 = svg
      .selectAll("circleText6")
      .data(graph.content)
      .enter()
      .append("text")
      .attr("x", (d, i) => d.x + 220)
      .attr("y", (d, i) => d.y + 95)
      .attr("class", "circleText6")
      .style("font-size", "6px")
      .style("font-family", "Helvetica")
      .style("font-weight", 400)
      .text((d) => d?.circle?.text6);
    // svg
    // .append("svg")
    // .append("g")
    // .attr("width", "600px")
    // .attr("height", "200px")
    // .attr("class", "newNode")
    // .selectAll("newSVG")
    // .data(graph.content[5].newCircles)
    // .enter()
    // .append("image")
    // .attr("class", "newSVG")
    // .attr("width", 30)
    // .attr("height", 30)
    // .attr("x", (d) => d?.x)
    // .attr("y", (d) => d?.y)
    // .attr("href", (d) => d?.node)
    // .call(d3.drag().on("drag", dragged));

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

      circle1
        .filter((t) => t.source === d)
        .attr("x", d.x + 99)
        .attr("y", d.y + 60);

      circleText1
        .filter((t) => t.source === d)
        .attr("x", d.x + 99)
        .attr("y", d.y + 95);

      circle2
        .filter((t) => t.source === d)
        .attr("x", d.x + 140)
        .attr("y", d.y + 60);

      circleText2
        .filter((t) => t.source === d)
        .attr("x", d.x + 140)
        .attr("y", d.y + 95);

      circle3
        .filter((t) => t.source === d)
        .attr("x", d.x + 180)
        .attr("y", d.y + 60);

      circleText3
        .filter((t) => t.source === d)
        .attr("x", d.x + 180)
        .attr("y", d.y + 95);

      circle4
        .filter((t) => t.source === d)
        .attr("x", d.x + 15)
        .attr("y", d.y + 60);

      circleText4
        .filter((t) => t.source === d)
        .attr("x", d.x + 15)
        .attr("y", d.y + 95);
      circle5
        .filter((t) => t.source === d)
        .attr("x", d.x + 60)
        .attr("y", d.y + 60);

      circleText5
        .filter((t) => t.source === d)
        .attr("x", d.x + 60)
        .attr("y", d.y + 95);
      circle6
        .filter((t) => t.source === d)
        .attr("x", d.x + 220)
        .attr("y", d.y + 60);

      circleText6
        .filter((t) => t.source === d)
        .attr("x", d.x + 220)
        .attr("y", d.y + 95);
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
  return (
    <div className="svg-container">
      <Button type="submit" label="Logout" onClick={handleLogout} />
      <div className="svg"></div>
    </div>
  );
}

export default SVG;
