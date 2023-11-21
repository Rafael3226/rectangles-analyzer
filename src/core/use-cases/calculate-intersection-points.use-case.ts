import Point from "../entity/Point";
import Rectangle from "../entity/Rectangle";
import Segment from "../entity/Segment";

export default class calculateIntersectionPointsUseCase {
  static execute(rectangleA: Rectangle, rectangleB: Rectangle): Point[] {
    const segmentsA = rectangleA.getSegments();
    const segmentsB = rectangleB.getSegments();

    const intersectionList: Point[] = [];

    for (const segmentA of segmentsA) {
      for (const segmentB of segmentsB) {
        const intersection = Segment.calculateIntersectionPoint(
          segmentA,
          segmentB
        );
        if (intersection) {
          intersectionList.push(intersection);
        }
      }
    }
    return intersectionList;
  }
}
