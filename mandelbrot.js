const canvas = document.getElementById("mandelbrotCanvas");
const ctx = canvas.getContext("2d");

// Fullscreen canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const maxIterations = 100; // Medium speed rendering
const zoom = 300;          // Zoom factor (adjust for detail)
const offsetX = -canvas.width / (zoom * 2); // Center x
const offsetY = -canvas.height / (zoom * 2); // Center y

function mandelbrot(cRe, cIm) {
  let zRe = 0, zIm = 0, iterations = 0;

  while (iterations < maxIterations && zRe * zRe + zIm * zIm <= 4) {
    let tempRe = zRe * zRe - zIm * zIm + cRe;
    zIm = 2 * zRe * zIm + cIm;
    zRe = tempRe;
    iterations++;
  }

  return iterations;
}

function renderMandelbrot() {
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const pixels = imageData.data;

  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      // Map pixel to Mandelbrot coordinates
      const cRe = (x / zoom) + offsetX;
      const cIm = (y / zoom) + offsetY;

      // Get number of iterations
      const iterations = mandelbrot(cRe, cIm);

      // Determine color based on iterations (green gradient)
      const color = Math.floor(255 * (iterations / maxIterations));
      const index = (y * canvas.width + x) * 4;

      // Set green shades
      pixels[index] = 0; // Red
      pixels[index + 1] = color; // Green
      pixels[index + 2] = 0; // Blue
      pixels[index + 3] = 255; // Alpha
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

// Render the Mandelbrot set
renderMandelbrot();

// Adjust canvas on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  renderMandelbrot();
});
