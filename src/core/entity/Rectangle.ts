import Point from "./Point";
import Segment from "./Segment";
import Vector from "./Vector";

export default class Rectangle {
  private readonly points: Point[];

  constructor(points: Point[]) {
    this.points = points;
  }

  getPoints(): Point[] {
    return this.points;
  }

  getSegments(): Segment[] {
    return Segment.parsePointsList(this.points);
  }

  getVectors(): Vector[] {
    return this.getSegments().map((s) => Vector.createFromSegment(s));
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
}
