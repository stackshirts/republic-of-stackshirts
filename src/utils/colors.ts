type RGBType = {
  r: number,
  g: number,
  b: number,
}

function componentToHex(c: number): string {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export function rgbToHex({r, g, b}: RGBType): string {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


export function hexToRgb(hex: string): RGBType | null {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 *
 * @param hex
 * @param a: between 0 and 1
 */
export function hexAndA(hex:string, a: number): string | undefined {
  const rgb = hexToRgb(hex)
  if (rgb) {
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a})`
  }
}
