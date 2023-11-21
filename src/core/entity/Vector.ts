import Point from "./Point";
import Segment from "./Segment";

export default class Vector {
  constructor(public readonly x: number, public readonly y: number) {}

  static createFromPoints(point1: Point, point2: Point): Vector {
    return new Vector(point2.x - point1.x, point2.y - point1.y);
  }

  static createFromSegment(segment: Segment) {
    return Vector.createFromPoints(segment.P, segment.Q);
  }

  static dotProduct(vector1: Vector, vector2: Vector): number {
    return vector1.x * vector2.x + vector1.y * vector2.y;
  }
}
