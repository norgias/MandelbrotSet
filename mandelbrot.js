const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

document.body.style.margin = "0";
document.body.style.overflow = "hidden";

canvas.style.display = "block";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas);

let width = canvas.width;
let height = canvas.height;

// Mandelbrot Set variables
let xMin = -2.5;
let xMax = 1;
let yMin = -1.5;
let yMax = 1.5;

const maxIterations = 500;

// Zoom settings
let zoomFactor = 0.95; // Zoom in by 5% each frame
let zoomSpeed = 20; // Lower is faster

function mandelbrot(cx, cy) {
  let x = 0;
  let y = 0;
  let iteration = 0;

  while (x * x + y * y <= 4 && iteration < maxIterations) {
    let xTemp = x * x - y * y + cx;
    y = 2 * x * y + cy;
    x = xTemp;
    iteration++;
  }

  return iteration;
}

function drawMandelbrot() {
  for (let px = 0; px < width; px++) {
    for (let py = 0; py < height; py++) {
      let x0 = xMin + (px / width) * (xMax - xMin);
      let y0 = yMin + (py / height) * (yMax - yMin);

      let iteration = mandelbrot(x0, y0);
      let color = iteration === maxIterations ? 0 : (iteration / maxIterations) * 255;

      ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
      ctx.fillRect(px, py, 1, 1);
    }
  }
}

function zoomIn() {
  let zoomCenterX = (xMin + xMax) / 2;
  let zoomCenterY = (yMin + yMax) / 2;

  let zoomWidth = (xMax - xMin) * zoomFactor;
  let zoomHeight = (yMax - yMin) * zoomFactor;

  xMin = zoomCenterX - zoomWidth / 2;
  xMax = zoomCenterX + zoomWidth / 2;
  yMin = zoomCenterY - zoomHeight / 2;
  yMax = zoomCenterY + zoomHeight / 2;

  drawMandelbrot();
  setTimeout(zoomIn, zoomSpeed); // Keep zooming in
}

window.onload = () => {
  drawMandelbrot();
  zoomIn();
};
