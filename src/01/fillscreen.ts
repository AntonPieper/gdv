/**
 * Determines the color of a pixel (x, y)
 * and saves it into the data array.
 * The data array holds the linearized pixel data of the target canvas
 * row major. Each pixel is of RGBA format.
 * @param data The linearized pixel array
 * @param x The x coordinate of the pixel
 * @param y The y coordinate of the pixel
 * @param width The width of the canvas
 * @param height The height of the canvas
 */
export function fillscreen(
  data: Uint8ClampedArray,
  x: number,
  y: number,
  width: number,
  height: number
) {
  const index = (x + y * width) * 4;
  data[index] = 0xff;
  data[index + 3] = 0xff;
  // TODO: Compute the position of pixel (x, y) in the linearized 'data' array. Each pixel is using 4 bytes in the data array, one each for red, green, blue and alpha.
  // TODO:  Set the red and alpha component of pixel (x, y) to maximum (255).
}
