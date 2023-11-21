import { InvalidRectangleException } from "../exceptions/invalid-rectangle.exception";
import mapWithNext from "../util/map-with-next";
import Point from "./Point";
import Segment from "./Segment";
import Vector from "./Vector";

export default class Rectangle {
  private readonly points: Point[];
  constructor(points: Point[]) {
    if (points.length !== 4) {
      throw new InvalidRectangleException(
        "Rectangle needs 4 different points."
      );
    }
    this.points = Rectangle.sortPoints(points);
    this.isRectangle();
  }

  static calculateCentroid(points: Point[]): Point {
    // Calculate the centroid of the points
    return new Point(
      (points[0].x + points[1].x + points[2].x + points[3].x) / 4,
      (points[0].y + points[1].y + points[2].y + points[3].y) / 4
    );
  }

  static sortPoints(points: Point[]): Point[] {
    const centroid = Rectangle.calculateCentroid(points);
    // Sort the points based on their angle relative to the centroid
    return points.sort(
      (a, b) =>
        Math.atan2(a.y - centroid.y, a.x - centroid.x) -
        Math.atan2(b.y - centroid.y, b.x - centroid.x)
    );
  }

  static isRectangle(points: Point[]) {
    if (!Rectangle.checkSides(points))
      throw new InvalidRectangleException("The sides do not form a rectangle.");
    if (!Rectangle.checkAngles(Rectangle.sortPoints(points)))
      throw new InvalidRectangleException(
        "The angles do not form a rectangle."
      );
  }

  isRectangle() {
    return Rectangle.isRectangle(this.points);
  }

  private static checkSides(points: Point[]): boolean {
    const [p1, p2, p3, p4] = points;
    // Calculate distances between points
    const distances = [
      p1.calculateDistance(p2),
      p1.calculateDistance(p3),
      p1.calculateDistance(p4),
      p2.calculateDistance(p3),
      p2.calculateDistance(p4),
      p3.calculateDistance(p4),
    ];

    // Sort distances in ascending order
    distances.sort((a, b) => a - b);

    // Check if distances form a rectangle
    return (
      distances[0] === distances[1] &&
      distances[2] === distances[3] &&
      distances[4] === distances[5]
    );
  }

  private static checkAngles(points: Point[]): boolean {
    const dotProducts = mapWithNext(
      Rectangle.getVectors(points),
      Vector.dotProduct
    );
    // All values for dps has to be 0 in order to validate a rectangle
    return dotProducts.every((dp) => dp === 0);
  }

  static getSegments(points: Point[]) {
    return mapWithNext(points, (p1, p2) => new Segment(p1, p2));
  }

  static getVectors(points: Point[]) {
    return Rectangle.getSegments(points).map((s) =>
      Vector.createFromSegment(s)
    );
  }

  getPoints() {
    return this.points;
  }

  getSegments() {
    return Rectangle.getSegments(this.points);
  }

  getVectors() {
    return Rectangle.getVectors(this.points);
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

  calculateIntersections(rectangle: Rectangle): Point[] {
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
      if (crossProduct <= 0) {
        return false;
      }
    }

    return true;
  }

  isRectangleInside(rectangle: Rectangle): boolean {
    const rectanglePoints = rectangle.getPoints();
    // Check if all vertices of rectangle1 are inside rectangle2
    for (const point of rectanglePoints) {
      if (!this.isPointInside(point)) {
        return false;
      }
    }
    return true;
  }
}
