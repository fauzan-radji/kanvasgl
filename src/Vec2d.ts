import Mat3 from "./Mat3.js";

/**
 * Represents a 2D vector.
 */
export default class Vec2d {
  /**
   * The x-coordinate of the vector.
   */
  private _x: number;
  /**
   * The y-coordinate of the vector.
   */
  private _y: number;
  /**
   * The angle (in radians) between the vector and the positive x-axis.
   */
  private _theta: number;
  /**
   * The magnitude (length) of the vector.
   */
  private _magnitude: number;

  /**
   * Creates a new Vec2d instance.
   * @param {number} x - The x-coordinate of the vector.
   * @param {number} y - The y-coordinate of the vector.
   */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Sets the values of this vector to the values of another vector.
   * @param {Vec2d} v - The vector to copy from.
   * @returns {Vec2d} The modified Vec2d instance.
   */
  set(v: Vec2d): Vec2d {
    this.x = v.x;
    this.y = v.y;

    return this;
  }

  /**
   * Creates a copy of this vector.
   * @param {Object} [options={}] - The options for copying the Vec2d instance.
   * @param {number} [options.x=this.x] - The x-coordinate of the copied Vec2d instance.
   * @param {number} [options.y=this.y] - The y-coordinate of the copied Vec2d instance.
   * @returns {Vec2d} The copied Vec2d instance.
   */
  copy({ x = this.x, y = this.y }: { x?: number; y?: number } = {}): Vec2d {
    return new Vec2d(x, y);
  }

  /**
   * Adds the given vector to this vector.
   *
   * @param {Vec2d} v - The vector to be added.
   * @returns {Vec2d} The resulting vector after addition.
   */
  add(v: Vec2d): Vec2d {
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  /**
   * Subtracts the given vector from this vector.
   *
   * @param {Vec2d} v - The vector to be subtracted.
   * @returns {Vec2d} The resulting vector after subtraction.
   */
  subtract(v: Vec2d): Vec2d {
    this.x -= v.x;
    this.y -= v.y;

    return this;
  }

  /**
   * Multiplies this vector by a scalar value.
   *
   * @param {number} scalar - The scalar value to multiply by.
   * @returns {Vec2d} The resulting vector after multiplication.
   */
  multiply(scalar: number): Vec2d {
    this.x *= scalar;
    this.y *= scalar;

    return this;
  }

  /**
   * Divides this vector by a scalar value.
   *
   * @param {number} scalar - The scalar value to divide by.
   * @returns {Vec2d} The resulting vector after division.
   */
  divide(scalar: number): Vec2d {
    this.x /= scalar;
    this.y /= scalar;

    return this;
  }

  /**
   * Calculates the dot product of this vector and another vector.
   *
   * @param {Vec2d} v - The other vector.
   * @returns {number} The dot product of the two vectors.
   */
  dot(v: Vec2d): number {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * Calculates the cross product of this vector and another vector.
   *
   * @param {Vec2d} v - The other vector.
   * @returns {number} The cross product of the two vectors.
   */
  cross(v: Vec2d): number {
    return this.x * v.y - this.y * v.x;
  }

  /**
   * Transforms this vector by a 3x3 matrix.
   *
   * @param {Mat3} m - The transformation matrix.
   * @returns {Vec2d} The resulting transformed vector.
   */
  transform(m: Mat3): Vec2d {
    const { x, y } = this;
    const z = 1;
    const data = m.data;

    this.x = x * data[0] + y * data[1] + z * data[2];
    this.y = x * data[3] + y * data[4] + z * data[5];

    return this;
  }

  /**
   * Translates this vector by another vector.
   *
   * @param {Vec2d} v - The translation vector.
   * @returns {Vec2d} The resulting translated vector.
   */
  translate(v: Vec2d): Vec2d {
    return this.transform(Mat3.translation(v.x, v.y));
  }

  /**
   * Rotates this vector by an angle (in radians).
   *
   * @param {number} theta - The rotation angle (in radians).
   * @returns {Vec2d} The resulting rotated vector.
   */
  rotate(theta: number): Vec2d {
    return this.transform(Mat3.rotation(theta));
  }

  /**
   * Scales this vector by another vector.
   *
   * @param {Vec2d} v - The scaling vector.
   * @returns {Vec2d} The resulting scaled vector.
   */
  scale(v: Vec2d): Vec2d {
    return this.transform(Mat3.scale(v.x, v.y));
  }

  /**
   * Normalizes this vector to have a magnitude of 1.
   *
   * @returns {Vec2d} The normalized vector.
   */
  normalize(): Vec2d {
    const magnitude = this.magnitude;

    if (magnitude !== 0) {
      this.divide(magnitude);
    }

    return this;
  }

  /**
   * Sets the x-coordinate of the vector.
   * @param {number} x - The x-coordinate of the vector.
   */
  set x(x: number) {
    this._x = x;
    this._theta = Math.atan2(this._y, x);
    this._magnitude = Math.sqrt(x ** 2 + this._y ** 2);
  }

  /**
   * Gets the x-coordinate of the vector.
   * @returns {number} The x-coordinate of the vector.
   */
  get x(): number {
    return this._x;
  }

  /**
   * Sets the y-coordinate of the vector.
   * @param {number} y - The y-coordinate of the vector.
   */
  set y(y: number) {
    this._y = y;
    this._theta = Math.atan2(y, this._x);
    this._magnitude = Math.sqrt(this._x ** 2 + y ** 2);
  }

  /**
   * Gets the y-coordinate of the vector.
   * @returns {number} The y-coordinate of the vector.
   */
  get y(): number {
    return this._y;
  }

  /**
   * Sets the angle (in radians) between the vector and the positive x-axis.
   * @param {number} theta - The angle (in radians) between the vector and the positive x-axis.
   */
  set theta(theta: number) {
    this._theta = theta;
    this._x = this._magnitude * Math.cos(theta);
    this._y = this._magnitude * Math.sin(theta);
  }

  /**
   * Gets the angle (in radians) between the vector and the positive x-axis.
   * @returns {number} The angle (in radians) between the vector and the positive x-axis.
   */
  get theta(): number {
    return this._theta;
  }

  /**
   * Sets the magnitude (length) of the vector.
   * @param {number} magnitude - The magnitude (length) of the vector.
   */
  set magnitude(magnitude: number) {
    this._magnitude = magnitude;
    this._x = magnitude * Math.cos(this._theta);
    this._y = magnitude * Math.sin(this._theta);
  }

  /**
   * Gets the magnitude (length) of the vector.
   * @returns {number} The magnitude (length) of the vector.
   */
  get magnitude(): number {
    return this._magnitude;
  }

  /**
   * Sets the magnitude (length) of the vector (alias for `magnitude`).
   * @param {number} r - The magnitude (length) of the vector.
   */
  set r(r: number) {
    this.magnitude = r;
  }

  /**
   * Gets the magnitude (length) of the vector (alias for `magnitude`).
   * @returns {number} The magnitude (length) of the vector.
   */
  get r(): number {
    return this.magnitude;
  }

  /**
   * Adds two vectors together without modifying the original vectors.
   *
   * @param {Vec2d} v1 - The first vector.
   * @param {Vec2d} v2 - The second vector.
   * @returns {Vec2d} The resulting vector after addition.
   */
  static add(v1: Vec2d, v2: Vec2d): Vec2d {
    return v1.copy().add(v2);
  }

  /**
   * Subtracts one vector from another without modifying the original vectors.
   *
   * @param {Vec2d} v1 - The first vector.
   * @param {Vec2d} v2 - The second vector.
   * @returns {Vec2d} The resulting vector after subtraction.
   */
  static subtract(v1: Vec2d, v2: Vec2d): Vec2d {
    return v1.copy().subtract(v2);
  }

  /**
   * Multiplies a vector by a scalar value without modifying the original vector.
   *
   * @param {Vec2d} v - The vector.
   * @param {number} scalar - The scalar value.
   * @returns {Vec2d} The resulting vector after multiplication.
   */
  static multiply(v: Vec2d, scalar: number): Vec2d {
    return v.copy().multiply(scalar);
  }

  /**
   * Divides a vector by a scalar value without modifying the original vector.
   *
   * @param {Vec2d} v - The vector.
   * @param {number} scalar - The scalar value.
   * @returns {Vec2d} The resulting vector after division.
   */
  static divide(v: Vec2d, scalar: number): Vec2d {
    return v.copy().divide(scalar);
  }

  /**
   * Calculates the dot product of two vectors.
   *
   * @param {Vec2d} v1 - The first vector.
   * @param {Vec2d} v2 - The second vector.
   * @returns {number} The dot product of the two vectors.
   */
  static dot(v1: Vec2d, v2: Vec2d): number {
    return v1.dot(v2);
  }

  /**
   * Calculates the cross product of two vectors.
   *
   * @param {Vec2d} v1 - The first vector.
   * @param {Vec2d} v2 - The second vector.
   * @returns {number} The cross product of the two vectors.
   */
  static cross(v1: Vec2d, v2: Vec2d): number {
    return v1.cross(v2);
  }

  /**
   * Transforms a vector by a 3x3 matrix without modifying the original vector.
   *
   * @param {Vec2d} v - The vector.
   * @param {Mat3} m - The transformation matrix.
   * @returns {Vec2d} The resulting transformed vector.
   */
  static transform(v: Vec2d, m: Mat3): Vec2d {
    return v.copy().transform(m);
  }

  /**
   * Translates a vector by another vector without modifying the original vector.
   *
   * @param {Vec2d} v - The vector.
   * @param {Vec2d} translation - The translation vector.
   * @returns {Vec2d} The resulting translated vector.
   */
  static translate(v: Vec2d, translation: Vec2d): Vec2d {
    return v.copy().translate(translation);
  }

  /**
   * Rotates a vector by an angle (in radians) without modifying the original vector.
   *
   * @param {Vec2d} v - The vector.
   * @param {number} theta - The rotation angle (in radians).
   * @returns {Vec2d} The resulting rotated vector.
   */
  static rotate(v: Vec2d, theta: number): Vec2d {
    return v.copy().rotate(theta);
  }

  /**
   * Scales a vector by another vector without modifying the original vector.
   *
   * @param {Vec2d} v - The vector.
   * @param {Vec2d} scale - The scaling vector.
   * @returns {Vec2d} The resulting scaled vector.
   */
  static scale(v: Vec2d, scale: Vec2d): Vec2d {
    return v.copy().scale(scale);
  }

  /**
   * Normalizes a vector to have a magnitude of 1 without modifying the original vector.
   *
   * @param {Vec2d} v - The vector.
   * @returns {Vec2d} The normalized vector.
   */
  static normalize(v: Vec2d): Vec2d {
    return v.copy().normalize();
  }

  /**
   * Creates a vector from polar coordinates.
   *
   * @param {number} theta - The angle (in radians) between the vector and the positive x-axis.
   * @param {number} magnitude - The magnitude (length) of the vector.
   * @returns {Vec2d} The created vector.
   */
  static fromPolar(theta: number, magnitude: number): Vec2d {
    return new Vec2d(magnitude * Math.cos(theta), magnitude * Math.sin(theta));
  }
}
