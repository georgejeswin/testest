import GoogleImg from "../images/google.png";
import BlackIcon from "../images/black.png";
import GreenIcon from "../images/green.png";
import CircleImg from "../images/circle.png";

export default {
  content: [
    {
      image: BlackIcon,
      google: GoogleImg,
      text: "Google",
      x: 700,
      y: 175,
      source: 200,
      target: 100,
    },
    {
      image: GreenIcon,
      text: "New York-Sites",
      x: 200,
      y: 500,
      source: 200,
      target: 700,
      circle: { img1: CircleImg, text1: "Q2KN-M" },
    },
    {
      image: GreenIcon,
      text: "New Jersey-Sites",
      x: 500,
      y: 500,
      source: 300,
      target: 0,
      circle: { img1: CircleImg, text1: "Q2KN-G" },
    },
    {
      image: GreenIcon,
      text: "Vermont-Sites",
      x: 800,
      y: 500,
      source: 300,
      target: 100,
      circle: { img1: CircleImg, text1: "Q2KN-G" },
    },
    {
      image: GreenIcon,
      text: "Massachusetts-Sites",
      x: 1100,
      y: 500,
      source: 400,
      target: 100,
      circle: {
        img1: CircleImg,
        img2: CircleImg,
        text1: "Q2KN-N",
        text2: "Q2KN-P",
      },
    },
    {
      image: GreenIcon,
      text: "California-Sites",
      x: 1400,
      y: 500,
      source: 500,
      target: 100,
      circle: {
        img1: CircleImg,
        img2: CircleImg,
        img3: CircleImg,
        img4: CircleImg,
        img5: CircleImg,
        img6: CircleImg,
        text1: "Q2KN-PJ",
        text2: "Q2KN-K",
        text3: "IO18-FW",
        text4: "I228-FW",
        text5: "Q2KN-73",
        text6: "Q2KN-N",
      },
      // newCircles: [
      //   { node: CircleImg, value: "Q2KN-TEST", x: 1410, y: 560 },
      //   { node: CircleImg, value: "Q2KN-TEST", x: 1450, y: 560 },
      //   { node: CircleImg, value: "Q2KN-TEST", x: 1490, y: 560 },
      //   { node: CircleImg, value: "Q2KN-TEST", x: 1530, y: 560 },
      //   { node: CircleImg, value: "Q2KN-TEST", x: 1570, y: 560 },
      //   { node: CircleImg, value: "Q2KN-TEST", x: 1610, y: 560 },
      // ],
    },
  ],
};
