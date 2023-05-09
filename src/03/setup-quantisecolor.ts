import { quantiseColor } from "./quantisecolor";

function quantise(evt: Event) {
  const originalCanvas = document.getElementById(
    "original"
  ) as HTMLCanvasElement;
  if (originalCanvas === null) return;
  const original = originalCanvas.getContext("2d");
  if (original == null) return;
  original.drawImage(evt.target as HTMLImageElement, 0, 0, 512, 384);
  const originalData = original.getImageData(
    0,
    0,
    originalCanvas.width,
    originalCanvas.height
  );

  const colorCanvas = document.getElementById("result") as HTMLCanvasElement;
  const color = colorCanvas.getContext("2d");
  if (color == null) return;
  const colorData = color.getImageData(
    0,
    0,
    colorCanvas.width,
    colorCanvas.height
  );

  for (let y = 0; y < colorCanvas.height; y++) {
    for (let x = 0; x < colorCanvas.width; x++) {
      quantiseColor(
        x,
        y,
        originalData.data,
        colorData.data,
        colorCanvas.width,
        colorCanvas.height
      );
    }
  }
  color.putImageData(colorData, 0, 0);
}

window.addEventListener("load", () => {
  const squirrel = new Image();
  squirrel.onload = quantise;
  squirrel.src = "quantise.jpg";
});
