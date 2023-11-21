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
}
