import Vec2d, { Point2d } from "./Vec2d.js";

export type Color = string | CanvasGradient | CanvasPattern;
export type CSSColor = string;

/**
 * Represents a canvas element and provides methods for drawing shapes and images on it.
 */
export default class Kanvas {
  /**
   * The ID of the canvas element.
   */
  #id: string;

  /**
   * The HTML canvas element.
   */
  #canvas: HTMLCanvasElement;

  /**
   * The 2D rendering context of the canvas.
   */
  #context: CanvasRenderingContext2D | null;

  /**
   * The center point of the canvas.
   */
  #center: Vec2d = new Vec2d(0, 0);

  /**
   * The fill style used for drawing shapes.
   */
  #fillStyle: Color = "#fff";

  /**
   * The stroke style used for drawing shapes.
   */
  #strokeStyle: Color = "#fff";

  /**
   * The line width used for drawing lines and borders.
   */
  #lineWidth: number = 1;

  /**
   * The line dash pattern used for drawing dashed lines.
   */
  #lineDash: Iterable<number> = [];

  /**
   * The line dash offset used for drawing dashed lines.
   */
  #lineDashOffset: number = 0;

  /**
   * The text alignment used for drawing text.
   */
  #textAlign: CanvasTextAlign = "start";

  /**
   * The text baseline used for drawing text.
   */
  #textBaseline: CanvasTextBaseline = "alphabetic";

  /**
   * The font used for drawing text.
   */
  #font: string = "10px sans-serif";

  /**
   * The global alpha value used for drawing shapes and images.
   */
  #globalAlpha: number = 1;

  /**
   * The aspect ratio of the canvas.
   */
  #aspectRatio: number = 1;

  /**
   * Creates a new instance of the Kanvas class.
   * @param {string} id - The ID of the canvas element.
   * @param {number} width - The width of the canvas.
   * @param {number} height - The height of the canvas.
   */
  constructor(id: string, width: number, height: number) {
    this.#id = id;
    this.#canvas = document.getElementById(id) as HTMLCanvasElement;
    this.#context = this.#canvas.getContext("2d");
    this.fillStyle = "#fff";
    this.strokeStyle = "#fff";
    this.lineWidth = 1;
    this.lineDash = [];
    this.lineDashOffset = 0;
    this.textAlign = "start";
    this.textBaseline = "alphabetic";
    this.font = "10px sans-serif";
    this.globalAlpha = 1;

    this.resize(width, height);
  }

  /**
   * Resizes the canvas element.
   * @param {number} width - The new width of the canvas.
   * @param {number} height - The new height of the canvas.
   * @returns {Kanvas} The updated Kanvas object.
   */
  resize(width: number, height: number): Kanvas {
    this.#canvas.width = width;
    this.#canvas.height = height;
    this.#aspectRatio = width / height;

    this.#center = new Vec2d(+(width / 2).toFixed(4), +(height / 2).toFixed(4));

    return this;
  }

  /**
   * Draws an image on the canvas
   * @param {CanvasImageSource} image - image to draw
   * @param {Point2d} point - a Vec2d instance or an Object that contains x and y properties
   * @param {number} width - the width of the image
   * @param {number} height - the height of the image
   *
   * @return {Kanvas} this
   */
  drawImage(
    image: CanvasImageSource,
    point: Point2d,
    width: number,
    height: number
  ): Kanvas {
    this.context.drawImage(image, point.x, point.y, width, height);

    return this;
  }

  /**
   * Rotates and draws an image on the canvas
   * @param {CanvasImageSource} image - image to draw
   * @param {Point2d} point - a Vec2d instance or an Object that contains x and y properties
   * @param {number} width - the width of the image
   * @param {number} height - the height of the image
   * @param {number} angle - the angle in radian
   *
   * @return {Kanvas} this
   */
  rotateAndDrawImage(
    image: CanvasImageSource,
    point: Point2d,
    width: number,
    height: number,
    angle: number
  ): Kanvas {
    this.save()
      .translate(point)
      .rotate(-angle)
      .drawImage(
        image,
        {
          x: -width / 2,
          y: -height / 2,
        },
        width,
        height
      )
      .restore();

    return this;
  }

  /**
   * Draws a circle on the canvas
   * @param {Point2d} point - a Vec2d instance or an Object that contains x and y properties
   * @param {number} radius - the radius of the circle
   *
   * @return {Kanvas} this Kanvas object
   */
  circle(point: Point2d, radius: number): Kanvas {
    this.context.arc(point.x, point.y, radius, 0, 2 * Math.PI);

    return this;
  }

  /**
   * Draws a rectangle on the canvas
   * @param {Point2d} point - a Vec2d instance or an Object that contains x and y properties
   * @param {number} width - the width of the rectangle
   * @param {number} height - the height of the rectangle
   *
   * @return {Kanvas} this Kanvas object
   */
  rect(point: Point2d, width: number, height: number): Kanvas {
    this.context.rect(point.x, point.y, width, height);

    return this;
  }

  /**
   * Draws a line on the canvas
   * @param {Point2d} begin - a Vec2d instance or an Object that contains x and y properties
   * @param {Point2d} end - a Vec2d instance or an Object that contains x and y properties
   *
   * @return {Kanvas} this Kanvas object
   */
  line(begin: Point2d, end: Point2d): Kanvas {
    this.context.moveTo(begin.x, begin.y);
    this.context.lineTo(end.x, end.y);

    return this;
  }

  /**
   * Moves the current drawing position to a specified point
   * @param {Point2d} point - a Vec2d instance or an Object that contains x and y properties
   *
   * @return {Kanvas} this Kanvas object
   */
  moveTo(point: Point2d): Kanvas {
    this.context.moveTo(point.x, point.y);

    return this;
  }

  /**
   * Draws a line from the current drawing position to a specified point
   * @param {Point2d} point - a Vec2d instance or an Object that contains x and y properties
   *
   * @return {Kanvas} this Kanvas object
   */
  lineTo(point: Point2d): Kanvas {
    this.context.lineTo(point.x, point.y);

    return this;
  }

  /**
   * Draws a line from the current drawing position to a specified point
   * @param {Object} param0
   * @param {string} param0.text
   * @param {Point2d} param0.at
   * @param {string} [param0.fillStyle=this.#fillStyle]
   * @param {string} [param0.strokeStyle=this.#strokeStyle]
   * @param {number} [param0.size=16]
   *
   * @return {Kanvas} this Kanvas object
   */
  text({
    text,
    at,
    textAlign = "center",
    textBaseline = "middle",
    fillStyle = this.#fillStyle,
    strokeStyle = this.#strokeStyle,
    size = 16,
    font = "Arial",
  }: {
    text: string;
    at: Point2d;
    textAlign?: CanvasTextAlign;
    textBaseline?: CanvasTextBaseline;
    fillStyle?: Color;
    strokeStyle?: Color;
    size?: number;
    font?: string;
  }): Kanvas {
    this.save();
    this.context.textAlign = textAlign;
    this.context.textBaseline = textBaseline;
    this.context.fillStyle = fillStyle;
    this.context.strokeStyle = strokeStyle;
    this.context.font = `${size}px ${font}`;
    this.context.fillText(text, at.x, at.y);
    this.context.strokeText(text, at.x, at.y);
    this.restore();

    return this;
  }

  /**
   * Begins a new path
   *
   * @return {Kanvas} this Kanvas object
   */
  beginPath(): Kanvas {
    this.context.beginPath();

    return this;
  }

  /**
   * Closes the current path
   *
   * @return {Kanvas} this Kanvas object
   */
  closePath(): Kanvas {
    this.context.closePath();

    return this;
  }

  /**
   * Strokes the current path
   * @param {Object} [param0={}]
   * @param {Color} [param0.color=this.#strokeStyle]
   * @param {number} [param0.width=this.#lineWidth]
   * @param {Iterable<number>} [param0.dash=this.#lineDash]
   *
   * @return {Kanvas} this Kanvas object
   */
  stroke({
    color = this.#strokeStyle,
    width = this.#lineWidth,
    dash = this.#lineDash,
  }: {
    color?: Color;
    width?: number;
    dash?: Iterable<number>;
  } = {}): Kanvas {
    this.save();
    this.context.strokeStyle = color;
    this.context.lineWidth = width;
    this.context.setLineDash(Array.from(dash));
    this.context.stroke();
    this.restore();

    return this;
  }

  /**
   * Fills the current path
   * @param {Color} [color=this.#fillStyle] - color of the fill
   *
   * @return {Kanvas} this Kanvas object
   */
  fill(color: Color = this.#fillStyle): Kanvas {
    this.save();
    this.context.fillStyle = color;
    this.context.fill();
    this.restore();

    return this;
  }

  /** Fills the canvas with a specified color
   * @param {CSSColor} [color="#000"] - color to fill the canvas with
   * @return {Kanvas} this Kanvas object
   */
  background(color: CSSColor = "#000"): Kanvas {
    this.#canvas.style.backgroundColor = color;

    return this;
  }

  /**
   * Clears the canvas
   *
   * @return {Kanvas} this Kanvas object
   */
  clear(): Kanvas {
    this.#canvas.width = this.width;
    this.#canvas.height = this.height;

    return this;
  }

  /**
   * Translate the canvas context
   * @param {Point2d} point - a Vec2d instance or an Object that contains x and y properties
   *
   * @return {Kanvas} this Kanvas object
   */
  translate(point: Point2d): Kanvas {
    this.context.translate(point.x, point.y);

    return this;
  }

  /**
   * Rotates the canvas context
   * @param {number} angle - angle in radian
   *
   * @return {Kanvas} this Kanvas object
   */
  rotate(angle: number): Kanvas {
    this.context.rotate(angle);

    return this;
  }

  /**
   * Saves the current canvas state
   *
   * @returns {Kanvas} this Kanvas object
   */
  save(): Kanvas {
    this.context.save();

    return this;
  }

  /**
   * Restores the canvas state to the last saved state
   *
   * @returns {Kanvas} this Kanvas object
   */
  restore(): Kanvas {
    this.context.restore();

    return this;
  }

  /**
   * Requests the pointer lock for the canvas element.
   *
   * @returns {Kanvas}
   */
  requestPointerLock(): Kanvas {
    this.#canvas.requestPointerLock();

    return this;
  }

  set fillStyle(color) {
    this.#fillStyle = color;
    this.context.fillStyle = color;
  }

  /**
   * Sets the stroke style used for drawing shapes.
   * @param {Color} value - The new stroke style.
   */
  set strokeStyle(value: Color) {
    this.#strokeStyle = value;
    this.context.strokeStyle = value;
  }

  /**
   * Sets the line width used for drawing lines and borders.
   * @param {number} value - The new line width.
   */
  set lineWidth(value: number) {
    this.#lineWidth = value;
    this.context.lineWidth = value;
  }

  /**
   * Sets the line dash pattern used for drawing dashed lines.
   * @param {Iterable<number>} value - The new line dash pattern.
   */
  set lineDash(value: Iterable<number>) {
    this.#lineDash = value;
    this.context.setLineDash(Array.from(value));
  }

  /**
   * Sets the line dash offset used for drawing dashed lines.
   * @param {number} value - The new line dash offset.
   */
  set lineDashOffset(value: number) {
    this.#lineDashOffset = value;
    this.context.lineDashOffset = value;
  }

  /**
   * Sets the text alignment used for drawing text.
   * @param {CanvasTextAlign} value - The new text alignment.
   */
  set textAlign(value: CanvasTextAlign) {
    this.#textAlign = value;
    this.context.textAlign = value;
  }

  /**
   * Sets the text baseline used for drawing text.
   * @param {CanvasTextBaseline} value - The new text baseline.
   */
  set textBaseline(value: CanvasTextBaseline) {
    this.#textBaseline = value;
    this.context.textBaseline = value;
  }

  /**
   * Sets the font used for drawing text.
   * @param {string} value - The new font.
   */
  set font(value: string) {
    this.#font = value;
    this.context.font = value;
  }

  /**
   * Sets the global alpha value used for drawing shapes and images.
   * @param {number} value - The new global alpha value.
   */
  set globalAlpha(value: number) {
    this.#globalAlpha = value;
    this.context.globalAlpha = value;
  }

  /**
   * Gets the ID of the canvas element.
   * @returns {string} The ID of the canvas element.
   */
  get id(): string {
    return this.#id;
  }

  /**
   * Gets the HTML canvas element.
   * @returns {HTMLCanvasElement} The HTML canvas element.
   */
  get canvas(): HTMLCanvasElement {
    return this.#canvas;
  }

  /**
   * Gets the 2D rendering context of the canvas.
   * @returns {CanvasRenderingContext2D} The 2D rendering context of the canvas.
   */
  get context(): CanvasRenderingContext2D {
    if (!this.#context) {
      throw new Error("CanvasRenderingContext2D is null");
    }

    return this.#context;
  }

  /**
   * Gets the center point of the canvas.
   * @returns {Vec2d} The center point of the canvas.
   */
  get center(): Vec2d {
    return this.#center;
  }

  /**
   * Gets the width of the canvas.
   * @returns {number} The width of the canvas.
   */
  get width(): number {
    return this.#canvas.width;
  }

  /**
   * Gets the height of the canvas.
   * @returns {number} The height of the canvas.
   */
  get height(): number {
    return this.#canvas.height;
  }

  /**
   * Gets the aspect ratio of the canvas.
   * @returns {number} The aspect ratio of the canvas.
   */
  get aspectRatio(): number {
    return this.#aspectRatio;
  }

  /**
   * Gets the fill style used for drawing shapes.
   * @returns {Color} The fill style used for drawing shapes.
   */
  get fillStyle(): Color {
    return this.#fillStyle;
  }

  /**
   * Gets the stroke style used for drawing shapes.
   * @returns {Color} The stroke style used for drawing shapes.
   */
  get strokeStyle(): Color {
    return this.#strokeStyle;
  }

  /**
   * Gets the line width used for drawing lines and borders.
   * @returns {number} The line width used for drawing lines and borders.
   */
  get lineWidth(): number {
    return this.#lineWidth;
  }

  /**
   * Gets the line dash pattern used for drawing dashed lines.
   * @returns {Iterable<number>} The line dash pattern used for drawing dashed lines.
   */
  get lineDash(): Iterable<number> {
    return this.#lineDash;
  }

  /**
   * Gets the line dash offset used for drawing dashed lines.
   * @returns {number} The line dash offset used for drawing dashed lines.
   */
  get lineDashOffset(): number {
    return this.#lineDashOffset;
  }

  /**
   * Gets the text alignment used for drawing text.
   * @returns {CanvasTextAlign} The text alignment used for drawing text.
   */
  get textAlign(): CanvasTextAlign {
    return this.#textAlign;
  }

  /**
   * Gets the text baseline used for drawing text.
   * @returns {CanvasTextBaseline} The text baseline used for drawing text.
   */
  get textBaseline(): CanvasTextBaseline {
    return this.#textBaseline;
  }

  /**
   * Gets the font used for drawing text.
   * @returns {string} The font used for drawing text.
   */
  get font(): string {
    return this.#font;
  }

  /**
   * Gets the global alpha value used for drawing shapes and images.
   * @returns {number} The global alpha value used for drawing shapes and images.
   */
  get globalAlpha(): number {
    return this.#globalAlpha;
  }
}
