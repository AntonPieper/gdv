export function getYChannel(source: Uint8ClampedArray, index: number) {
  return (
    0.2126729 * source[index] +
    0.715151522 * source[index + 1] +
    0.072175 * source[index + 2]
  );
}

/**
 * Convert the color information of the pixel at (x, y) to grayscale by using the
 * Y coordinate of the XYZ color space.
 *
 * @param x The x coordinate of the pixel to convert
 * @param y The y coordinate of the pixel to convert
 * @param source The source image data
 * @param target The image data to save the converted color information to
 * @param width The width of the canvas
 * @param height The height of the canvas
 */
export function grayscale(
  x: number,
  y: number,
  source: Uint8ClampedArray,
  target: Uint8ClampedArray,
  width: number,
  height: number
) {
  const index = (x + y * width) * 4;
  const yChannel = getYChannel(source, index);
  for (let i = 0; i < 3; ++i) {
    target[index + i] = yChannel;
  }
  target[index + 3] = 0xff;
  // TODO: Convert the pixel at position (x, y) in the source array from RGB to XYZ.
  // TODO: Set the RGBA values in the target array according to the Y component of the source pixel in XYZ space.
}
