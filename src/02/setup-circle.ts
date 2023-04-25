import { circle } from "./circle";
import { Node } from "../ui/ui";

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var imageData: ImageData;

export function swapBuffers() {
  // swap imageData to canvas
  ctx.putImageData(imageData, 0, 0);
}

function drawCircle(canvas: HTMLCanvasElement, cx: number, cy: number) {
  const context = canvas.getContext("2d");
  if (!context) return;
  ctx = context;
  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      circle(data, x, y, cx, cy, canvas.width, canvas.height, canvas.width / 3);
    }
  }

  swapBuffers();
}

window.addEventListener("load", (evt) => {
  canvas = document.getElementById("result") as HTMLCanvasElement;
  if (canvas === null) return;
  const context = canvas.getContext("2d");
  if (!context) return;
  ctx = context;
  
  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  var node1 = new Node({
    canvas: canvas,
    x: canvas.width / 2,
    y: canvas.height / 2,
    color: "red",
  });

  drawCircle(canvas, canvas.width / 2, canvas.height / 2);

  canvas.addEventListener("moved", (e) => {
    drawCircle(canvas, (<CustomEvent>e).detail.x, (<CustomEvent>e).detail.y);
  });
});
