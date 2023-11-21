import { InvalidRectangleException } from "../exceptions/invalid-rectangle.exception";
import Point from "./Point";
import Segment from "./Segment";
import Vector from "./Vector";

export default class Rectangle {
  private readonly points: Point[];
  private readonly segments: Segment[];
  constructor(points: Point[]) {
    if (points.length !== 4) {
      throw new InvalidRectangleException(
        "Rectangle needs 4 different points."
      );
    }
    const [pA, pB, pC, pD] = points;

    this.segments = [
      new Segment(pA, pB),
      new Segment(pB, pC),
      new Segment(pC, pD),
      new Segment(pD, pA),
    ];

    this.isRectangle();
    this.points = points;
  }

  isRectangle() {
    const [vAB, vBC, vCD, vDA] = this.getVectors();
    const dotProducts = [
      Vector.dotProduct(vAB, vBC),
      Vector.dotProduct(vBC, vCD),
      Vector.dotProduct(vCD, vDA),
    ];

    // All values for dps has to be 0 in order to validate a rectangle
    if (!dotProducts.every((dp) => dp === 0)) {
      throw new InvalidRectangleException(
        "The points provided do not form a rectangle (Maybe they are not sorted.)"
      );
    }
  }

  getSegments() {
    return this.segments;
  }

  getVectors() {
    return this.segments.map((s) => Vector.createFromSegment(s));
  }

  getPoints() {
    return this.points;
  }

  static calculateIntersections(
    rectangleA: Rectangle,
    rectangleB: Rectangle
  ): Point[] {
    const segmentsA = rectangleA.getSegments();
    const segmentsB = rectangleB.getSegments();

    const intersectionMap = new Map<string, Point>();

    for (const segmentA of segmentsA) {
      for (const segmentB of segmentsB) {
        const intersection = Segment.calculateIntersectionPoint(
          segmentA,
          segmentB
        );
        if (!intersection) continue;
        const intersectionCode = `${intersection.x},${intersection.y}`;
        if (!intersectionMap.has(intersectionCode)) {
          intersectionMap.set(intersectionCode, intersection);
        }
      }
    }
    return [...intersectionMap.values()];
  }

  calculateIntersection(rectangle: Rectangle): Point[] {
    return Rectangle.calculateIntersections(this, rectangle);
  }

  isPointInside(point: Point): boolean {
    const vectors: Vector[] = this.getPoints().map((p) =>
      Vector.createFromPoints(p, point)
    );

    // Check if the point is on the same side of each side of the rectangle
    for (let i = 0; i < vectors.length; i++) {
      const crossProduct = Vector.crossProduct(
        vectors[i],
        vectors[(i + 1) % vectors.length]
      );
      if (crossProduct < 0) {
        return false;
      }
    }

    return true;
  }

  // isRectangleInside(rectangle: Rectangle) {}
}
