import Point from "./Point";
import Segment from "./Segment";

export default class Vector {
  constructor(public readonly x: number, public readonly y: number) {}

  static createFromPoints(point1: Point, point2: Point): Vector {
    return new Vector(point2.x - point1.x, point2.y - point1.y);
  }

  static createFromSegment(segment: Segment): Vector {
    return Vector.createFromPoints(segment.P, segment.Q);
  }

  static parseSegmentList(segments: Segment[]): Vector[] {
    return segments.map((s) => Vector.createFromSegment(s));
  }

  static dotProduct(vector1: Vector, vector2: Vector): number {
    return vector1.x * vector2.x + vector1.y * vector2.y;
  }

  static crossProduct(vector1: Vector, vector2: Vector): number {
    return vector1.x * vector2.y - vector1.y * vector2.x;
  }

  static areVectorsParallel(vectorA: Vector, vectorB: Vector): boolean {
    return Vector.crossProduct(vectorA, vectorB) === 0;
  }
}
