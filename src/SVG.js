import { useEffect } from "react";
import "./SVG.css";
import * as d3 from "d3";
import Graph from "./data/graph";
import { useNavigate } from "react-router-dom";
import Button from "./components/Button";

const SVG = () => {
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

    const circle1 = svg
      .selectAll("circleImg1")
      .data(Graph.content)
      .enter()
      .append("image")
      .attr("id", (d, i) => "rect" + i + ".circle1")
      .attr("x", (d, i) =>
        localStorage.getItem(`rect${i}.circle1.dx`) !== null
          ? localStorage.getItem(`rect${i}.circle1.dx`)
          : d.x + 99
      )
      .attr("y", (d, i) =>
        localStorage.getItem(`rect${i}.circle1.dy`) !== null
          ? localStorage.getItem(`rect${i}.circle1.dy`)
          : d.y + 60
      )
      .attr("class", "circleImg1")
      .attr("width", 25)
      .attr("height", 25)
      .attr("href", (d) => d?.circle?.img1);

    const circleText1 = svg
      .selectAll("circleText1")
      .data(Graph.content)
      .enter()
      .append("text")
      .attr("id", (d, i) => "rect" + i + ".circleText1")
      .attr("x", (d, i) =>
        localStorage.getItem(`rect${i}.circleText1.dx`) !== null
          ? localStorage.getItem(`rect${i}.circleText1.dx`)
          : d.x + 99
      )
      .attr("y", (d, i) =>
        localStorage.getItem(`rect${i}.circleText1.dy`) !== null
          ? localStorage.getItem(`rect${i}.circleText1.dy`)
          : d.y + 95
      )
      .attr("class", "circleText1")
      .style("font-size", "6px")
      .style("font-family", "Helvetica")
      .style("font-weight", 400)
      .text((d) => d?.circle?.text1);

    const circle2 = svg
      .selectAll("circleImg2")
      .data(Graph.content)
      .enter()
      .append("image")
      .attr("id", (d, i) => "rect" + i + ".circle2")
      .attr("x", (d, i) =>
        localStorage.getItem(`rect${i}.circle2.dx`) !== null
          ? localStorage.getItem(`rect${i}.circle2.dx`)
          : d.x + 140
      )
      .attr("y", (d, i) =>
        localStorage.getItem(`rect${i}.circle2.dy`) !== null
          ? localStorage.getItem(`rect${i}.circle2.dy`)
          : d.y + 60
      )
      .attr("class", "circleImg2")
      .attr("width", 25)
      .attr("height", 25)
      .attr("href", (d) => d?.circle?.img2);

    const circleText2 = svg
      .selectAll("circleText2")
      .data(Graph.content)
      .enter()
      .append("text")
      .attr("id", (d, i) => "rect" + i + ".circleText2")
      .attr("x", (d, i) =>
        localStorage.getItem(`rect${i}.circleText2.dx`) !== null
          ? localStorage.getItem(`rect${i}.circleText2.dx`)
          : d.x + 140
      )
      .attr("y", (d, i) =>
        localStorage.getItem(`rect${i}.circleText2.dy`) !== null
          ? localStorage.getItem(`rect${i}.circleText2.dy`)
          : d.y + 95
      )
      .attr("class", "circleText2")
      .style("font-size", "6px")
      .style("font-family", "Helvetica")
      .style("font-weight", 400)
      .text((d) => d?.circle?.text2);

    const circle3 = svg
      .selectAll("circleImg3")
      .data(Graph.content)
      .enter()
      .append("image")
      .attr("id", (d, i) => "rect" + i + ".circle3")
      .attr("x", (d, i) =>
        localStorage.getItem(`rect${i}.circle3.dx`) !== null
          ? localStorage.getItem(`rect${i}.circle3.dx`)
          : d.x + 180
      )
      .attr("y", (d, i) =>
        localStorage.getItem(`rect${i}.circle3.dy`) !== null
          ? localStorage.getItem(`rect${i}.circle3.dy`)
          : d.y + 60
      )
      .attr("class", "circleImg3")
      .attr("width", 25)
      .attr("height", 25)
      .attr("href", (d) => d?.circle?.img3);

    const circleText3 = svg
      .selectAll("circleText3")
      .data(Graph.content)
      .enter()
      .append("text")
      .attr("id", (d, i) => "rect" + i + ".circleText3")
      .attr("x", (d, i) =>
        localStorage.getItem(`rect${i}.circleText3.dx`) !== null
          ? localStorage.getItem(`rect${i}.circleText3.dx`)
          : d.x + 180
      )
      .attr("y", (d, i) =>
        localStorage.getItem(`rect${i}.circleText3.dy`) !== null
          ? localStorage.getItem(`rect${i}.circleText3.dy`)
          : d.y + 95
      )
      .attr("class", "circleText3")
      .style("font-size", "6px")
      .style("font-family", "Helvetica")
      .style("font-weight", 400)
      .text((d) => d?.circle?.text3);

    const circle4 = svg
      .selectAll("circleImg4")
      .data(Graph.content)
      .enter()
      .append("image")
      .attr("id", (d, i) => "rect" + i + ".circle4")
      .attr("x", (d, i) =>
        localStorage.getItem(`rect${i}.circle4.dx`) !== null
          ? localStorage.getItem(`rect${i}.circle4.dx`)
          : d.x + 15
      )
      .attr("y", (d, i) =>
        localStorage.getItem(`rect${i}.circle4.dy`) !== null
          ? localStorage.getItem(`rect${i}.circle4.dy`)
          : d.y + 60
      )
      .attr("class", "circleImg4")
      .attr("width", 25)
      .attr("height", 25)
      .attr("href", (d) => d?.circle?.img4);

    const circleText4 = svg
      .selectAll("circleText4")
      .data(Graph.content)
      .enter()
      .append("text")
      .attr("id", (d, i) => "rect" + i + ".circleText4")
      .attr("x", (d, i) =>
        localStorage.getItem(`rect${i}.circleText4.dx`) !== null
          ? localStorage.getItem(`rect${i}.circleText4.dx`)
          : d.x + 15
      )
      .attr("y", (d, i) =>
        localStorage.getItem(`rect${i}.circleText4.dy`) !== null
          ? localStorage.getItem(`rect${i}.circleText4.dy`)
          : d.y + 95
      )
      .attr("class", "circleText4")
      .style("font-size", "6px")
      .style("font-family", "Helvetica")
      .style("font-weight", 400)
      .text((d) => d?.circle?.text4);

    const circle5 = svg
      .selectAll("circleImg5")
      .data(Graph.content)
      .enter()
      .append("image")
      .attr("id", (d, i) => "rect" + i + ".circle5")
      .attr("x", (d, i) =>
        localStorage.getItem(`rect${i}.circle5.dx`) !== null
          ? localStorage.getItem(`rect${i}.circle5.dx`)
          : d.x + 60
      )
      .attr("y", (d, i) =>
        localStorage.getItem(`rect${i}.circle5.dy`) !== null
          ? localStorage.getItem(`rect${i}.circle5.dy`)
          : d.y + 60
      )
      .attr("class", "circleImg5")
      .attr("width", 25)
      .attr("height", 25)
      .attr("href", (d) => d?.circle?.img5);

    const circleText5 = svg
      .selectAll("circleText5")
      .data(Graph.content)
      .enter()
      .append("text")
      .attr("id", (d, i) => "rect" + i + ".circleText5")
      .attr("x", (d, i) =>
        localStorage.getItem(`rect${i}.circleText5.dx`) !== null
          ? localStorage.getItem(`rect${i}.circleText5.dx`)
          : d.x + 60
      )
      .attr("y", (d, i) =>
        localStorage.getItem(`rect${i}.circleText5.dy`) !== null
          ? localStorage.getItem(`rect${i}.circleText5.dy`)
          : d.y + 95
      )
      .attr("class", "circleText5")
      .style("font-size", "6px")
      .style("font-family", "Helvetica")
      .style("font-weight", 400)
      .text((d) => d?.circle?.text5);

    const circle6 = svg
      .selectAll("circleImg6")
      .data(Graph.content)
      .enter()
      .append("image")
      .attr("id", (d, i) => "rect" + i + ".circle6")
      .attr("x", (d, i) =>
        localStorage.getItem(`rect${i}.circle6.dx`) !== null
          ? localStorage.getItem(`rect${i}.circle6.dx`)
          : d.x + 220
      )
      .attr("y", (d, i) =>
        localStorage.getItem(`rect${i}.circle6.dy`) !== null
          ? localStorage.getItem(`rect${i}.circle6.dy`)
          : d.y + 60
      )
      .attr("class", "circleImg6")
      .attr("width", 25)
      .attr("height", 25)
      .attr("href", (d) => d?.circle?.img6);

    const circleText6 = svg
      .selectAll("circleText6")
      .data(Graph.content)
      .enter()
      .append("text")
      .attr("id", (d, i) => "rect" + i + ".circleText6")
      .attr("x", (d, i) =>
        localStorage.getItem(`rect${i}.circleText6.dx`) !== null
          ? localStorage.getItem(`rect${i}.circleText6.dx`)
          : d.x + 220
      )
      .attr("y", (d, i) =>
        localStorage.getItem(`rect${i}.circleText6.dy`) !== null
          ? localStorage.getItem(`rect${i}.circleText6.dy`)
          : d.y + 95
      )
      .attr("class", "circleText6")
      .style("font-size", "6px")
      .style("font-family", "Helvetica")
      .style("font-weight", 400)
      .text((d) => d?.circle?.text6);

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

        circle1
          .filter((t) => t.source === d)
          .attr("x", d.x + 99)
          .attr("y", d.y + 60)
          .filter(await setValForAtt("circle1", d, event));

        circleText1
          .filter((t) => t.source === d)
          .attr("x", d.x + 99)
          .attr("y", d.y + 95)
          .filter(await setValForAtt("circleText1", d, event));

        circle2
          .filter((t) => t.source === d)
          .attr("x", d.x + 140)
          .attr("y", d.y + 60)
          .filter(await setValForAtt("circle2", d, event));

        circleText2
          .filter((t) => t.source === d)
          .attr("x", d.x + 140)
          .attr("y", d.y + 95)
          .filter(await setValForAtt("circleText2", d, event));

        circle3
          .filter((t) => t.source === d)
          .attr("x", d.x + 180)
          .attr("y", d.y + 60)
          .filter(await setValForAtt("circle3", d, event));

        circleText3
          .filter((t) => t.source === d)
          .attr("x", d.x + 180)
          .attr("y", d.y + 95)
          .filter(await setValForAtt("circleText3", d, event));

        circle4
          .filter((t) => t.source === d)
          .attr("x", d.x + 15)
          .attr("y", d.y + 60)
          .filter(await setValForAtt("circle4", d, event));

        circleText4
          .filter((t) => t.source === d)
          .attr("x", d.x + 15)
          .attr("y", d.y + 95)
          .filter(await setValForAtt("circleText4", d, event));

        circle5
          .filter((t) => t.source === d)
          .attr("x", d.x + 60)
          .attr("y", d.y + 60)
          .filter(await setValForAtt("circle5", d, event));

        circleText5
          .filter((t) => t.source === d)
          .attr("x", d.x + 60)
          .attr("y", d.y + 95)
          .filter(await setValForAtt("circleText5", d, event));

        circle6
          .filter((t) => t.source === d)
          .attr("x", d.x + 220)
          .attr("y", d.y + 60)
          .filter(await setValForAtt("circle6", d, event));

        circleText6
          .filter((t) => t.source === d)
          .attr("x", d.x + 220)
          .attr("y", d.y + 95)
          .filter(await setValForAtt("circleText6", d, event));
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
      } else if (type === "circle1") {
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dx",
          d.x + 99
        );
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dy",
          d.y + 60
        );
      } else if (type === "circleText1") {
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dx",
          d.x + 99
        );
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dy",
          d.y + 95
        );
      } else if (type === "circle2") {
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dx",
          d.x + 140
        );
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dy",
          d.y + 60
        );
      } else if (type === "circleText2") {
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dx",
          d.x + 140
        );
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dy",
          d.y + 95
        );
      } else if (type === "circle3") {
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dx",
          d.x + 180
        );
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dy",
          d.y + 60
        );
      } else if (type === "circleText3") {
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dx",
          d.x + 180
        );
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dy",
          d.y + 95
        );
      } else if (type === "circle4") {
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dx",
          d.x + 15
        );
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dy",
          d.y + 60
        );
      } else if (type === "circleText4") {
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dx",
          d.x + 15
        );
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dy",
          d.y + 95
        );
      } else if (type === "circle5") {
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dx",
          d.x + 60
        );
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dy",
          d.y + 60
        );
      } else if (type === "circleText5") {
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dx",
          d.x + 60
        );
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dy",
          d.y + 95
        );
      } else if (type === "circle6") {
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dx",
          d.x + 220
        );
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dy",
          d.y + 60
        );
      } else if (type === "circleText6") {
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dx",
          d.x + 220
        );
        localStorage.setItem(
          event.sourceEvent.target.id + "." + type + ".dy",
          d.y + 95
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
