interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

export default abstract class Util {
  /**
   * Convert a hexadecimal color value into a ColorRGB colour representation
   *
   * @param hex The six digit hex value for an HTML color. Can include/exclude the '#' symbol
   */
  static convertHexColorToRgb(hex: string): ColorRGB | null {
    hex = hex.toUpperCase();

    // remove the leading #
    hex = hex.replace("#", "");

    if (hex.length === 3) {
      hex += hex;
    }

    if (hex.length !== 6) {
      return null;
    }

    // each two digits represent R, G, B, convert each from hex to dec
    const color = {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16)
    };
    return color;
  }

  /**
   * Converts ColorRGB back to hexadecimal color (includes the "#" symbol when returning)
   * @param color
   */
  static convertRgbToHexColor(color: ColorRGB): string {
    // Each color component needs to be padded with 0's if it's only one digit
    return (
      "#" +
      color.r.toString(16).padStart(2, "0") +
      color.g.toString(16).padStart(2, "0") +
      color.b.toString(16).padStart(2, "0")
    );
  }

  /**
   * Formula provided by
   * https://stackoverflow.com/questions/1855884/determine-font-color-based-on-background-color
   *
   * @param hex
   */
  static autoColorFromColor(hex: string): string {
    const color = Util.convertHexColorToRgb(hex);
    if (!color) {
      return "#FFFFFF";
    }

    let luminance: number =
      (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255;

    if (luminance > 0.5) {
      // if colors are bright, use black font
      return "#000000";
    }
    // if colors are dark, use white font
    return "#FFFFFF";
  }
}
