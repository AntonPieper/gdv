import { quantisegrayscale } from "./quantisegrayscale";

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

  const grayscaleCanvas = document.getElementById(
    "result"
  ) as HTMLCanvasElement;
  const grayscale = grayscaleCanvas.getContext("2d");
  if (grayscale == null) return;
  const pixel = grayscale.createImageData(1, 1);
  const grayscaleData = grayscale.getImageData(
    0,
    0,
    grayscaleCanvas.width,
    grayscaleCanvas.height
  );

  for (let y = 0; y < grayscaleCanvas.height; y++) {
    for (let x = 0; x < grayscaleCanvas.width; x++) {
      quantisegrayscale(
        x,
        y,
        originalData.data,
        grayscaleData.data,
        grayscaleCanvas.width,
        grayscaleCanvas.height
      );
    }
  }
  grayscale.putImageData(grayscaleData, 0, 0);
}

window.addEventListener("load", () => {
  const squirrel = new Image();
  squirrel.onload = quantise;
  squirrel.src = "quantise.jpg";
});
