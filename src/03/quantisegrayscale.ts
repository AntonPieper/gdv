import { getYChannel } from "./grayscale";

/**
 * Posterise the source image and save the result in the target image.
 * Restrict the amount of used brightness levels to four equidistant values.
 *
 * @param x The x coordinate of the pixel to posterise
 * @param y The y coordinate of the pixel to posterise
 * @param source The source image data
 * @param target The image data to save the converted color information to
 * @param width The width of the canvas
 * @param height The height of the canvas
 */
export function quantisegrayscale(
  x: number,
  y: number,
  source: Uint8ClampedArray,
  target: Uint8ClampedArray,
  width: number,
  height: number
) {
  const index = (x + y * width) * 4;
  const yChannel = getYChannel(source, index);
  const grayscale = (~~((yChannel / 255) * 4) * 255) / (4 - 1);
  for (let i = 0; i < 3; ++i) {
    target[index + i] = grayscale;
  }
  target[index + 3] = 0xff;
  // TODO: Convert the pixel at position (x, y) in the source array from RGB to XYZ. Limit the
  // TODO: Limit the brightness to the set of 4 different values 0, 85, 170, 255.
  // TODO: Set the RGBA values in the target array to this brightness.
}
