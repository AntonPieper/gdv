import { swapBuffers } from "./setup-checkerboard";

var currentline = -1;

/**
 * Determines the color of a pixel (x, y) to create
 * a checkerboard pattern and saves it into the data array.
 * The data array holds the linearised pixel data of the target canvas
 * row major. Each pixel is of RGBA format.
 * @param data The linearised pixel array
 * @param x The x coordinate of the pixel
 * @param y The y coordinate of the pixel
 * @param width The width of the canvas
 * @param height The height of the canvas
 */
export function checkerboard(
  data: Uint8ClampedArray,
  x: number,
  y: number,
  width: number,
  height: number
) {
  const index = (x + y * width) * 4;
  const mod = 1 & (x / width * 8 + ~~(y / height * 8));
  for (let i = 0; i < 3; ++i) data[index + i] = ~~(mod > 0 ? 0xff : 0x00);
  data[index + 3] = 0xff;
  // TODO: Imagine an 8x8 tile checkerboard across the width and height of the canvas. Compute if the pixel at position (x, y) is inside a black or white tile. Set the pixel color accordingly in the pixel array 'data'.
}
