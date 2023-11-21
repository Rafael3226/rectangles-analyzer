import Point from "./Point";

export default class Segment {
  constructor(public readonly P: Point, public readonly Q: Point) {}

  calculateIntersectionPoint(segment: Segment): Point | null {
    return Segment.calculateIntersectionPoint(this, segment);
  }
  static calculateIntersectionPoint(
    segment1: Segment,
    segment2: Segment
  ): Point | null {
    const p1 = segment1.P;
    const q1 = segment1.Q;
    const p2 = segment2.P;
    const q2 = segment2.Q;

    const [x1, y1] = [p1.x, p1.y];
    const [x2, y2] = [q1.x, q1.y];
    const [x3, y3] = [p2.x, p2.y];
    const [x4, y4] = [q2.x, q2.y];

    const det = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (det === 0) {
      // Segments are parallel or collinear
      return null;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / det;
    const s = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / det;

    // Check if the intersection point is within the parameter ranges
    if (0 <= t && t <= 1 && 0 <= s && s <= 1) {
      const intersectionX = x1 + t * (x2 - x1);
      const intersectionY = y1 + t * (y2 - y1);

      return new Point(intersectionX, intersectionY);
    }

    return null; // Return null if intersection point is outside parameter ranges
  }
}
