import "bootstrap";

import { fillscreen } from "./fillscreen";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let imageData: ImageData;

export function swapBuffers() {
  // swap imageData to canvas
  ctx.putImageData(imageData, 0, 0);
}

function drawFillscreen() {
  canvas = document.getElementById("result") as HTMLCanvasElement;
  if (canvas === null) return;
  const context = canvas.getContext("2d");
  if (!context) return;
  ctx = context;

  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      fillscreen(data, x, y, canvas.width, canvas.height);
    }
  }
  swapBuffers();
}
window.addEventListener("load", () => {
  requestAnimationFrame(drawFillscreen);
});
