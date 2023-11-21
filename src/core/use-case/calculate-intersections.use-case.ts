import Point from "../entity/Point";
import Rectangle from "../entity/Rectangle";
import Segment from "../entity/Segment";

export default class CalculateIntersectionsUseCase {
  static execute(rectangleA: Rectangle, rectangleB: Rectangle): Point[] {
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
}
