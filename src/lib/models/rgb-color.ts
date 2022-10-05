import Color from 'color';

type IRGBColor = {
  red: number;
  green: number;
  blue: number;
};

export class RGBColor implements IRGBColor {
  red: number;
  green: number;
  blue: number;

  constructor({ blue, green, red }: IRGBColor) {
    this.red = red;
    this.blue = blue;
    this.green = green;
  }

  rgb(): Color {
    return Color.rgb(this.red, this.green, this.blue);
  }
}
