const SVGNS = "http://www.w3.org/2000/svg";
const clockContainer = document.getElementById('clock-container');

function createCircle () {
  const svg = document.createElementNS(SVGNS, 'svg');
  svg.setAttribute("viewBox", "0 0 500 500");
  const circle = document.createElementNS(SVGNS, 'circle');
  circle.setAttribute("cx", "100");
  circle.setAttribute("cy", "100");
  circle.setAttribute("r", "90");
  circle.setAttribute("fill", "white");
  circle.setAttribute("stroke", "black");
  clockContainer.appendChild(svg);
  svg.appendChild(circle)

}
createCircle()








