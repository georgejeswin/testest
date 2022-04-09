import GoogleImg from "../images/google.png";
import BlackIcon from "../images/black.png";
import GreenIcon from "../images/green.png";
import CircleImg from "../images/circle.png";

export default {
  nodes: [
    { x: 400, y: 175 },
    { x: 200, y: 500 },
    { x: 500, y: 500 },
    { x: 800, y: 500 },
    { x: 1100, y: 500 },
    { x: 1400, y: 500 },
  ],
  content: [
    {
      image: BlackIcon,
      google: GoogleImg,
      text: "Google",
      x: 400,
      y: 175,
      source: 0,
      target: 0,
    },
    {
      image: GreenIcon,
      text: "New York-Sites",
      x: 200,
      y: 500,
      source: 1,
      target: 0,
      circle: { data: CircleImg, circle: "Q2KN-M" },
    },
    {
      image: GreenIcon,
      text: "New Jersey-Sites",
      x: 500,
      y: 500,
      source: 2,
      target: 0,
      circle: { data: CircleImg, circle: "Q2KN-G" },
    },
    {
      image: GreenIcon,
      text: "Vermont-Sites",
      x: 800,
      y: 500,
      source: 3,
      target: 0,
      circle: { data: CircleImg, circle: "Q2KN-G" },
    },
    {
      image: GreenIcon,
      text: "Massachusetts-Sites",
      x: 1100,
      y: 500,
      source: 4,
      target: 0,
      circle: { data: CircleImg, circle: "Q2KN-N" },
    },
    {
      image: GreenIcon,
      text: "California-Sites",
      x: 1400,
      y: 500,
      source: 5,
      target: 0,
      circle: { data: CircleImg, circle: "Q2KN-PJ" },
    },
  ],
};
