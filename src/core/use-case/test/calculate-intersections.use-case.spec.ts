import Point from "../../entity/Point";
import CalculateIntersectionsUseCase from "../calculate-intersections.use-case";
import RectangleFactory from "../../entity/RectangleFactory";

describe("Calculate Intersections Use Case class", () => {
  const pointA = new Point(0, 0);
  const pointB = new Point(6, 0);
  const pointC = new Point(6, 6);
  const pointD = new Point(0, 6);

  const pointsRectangle1 = [pointA, pointB, pointC, pointD];

  const pointsRectangle2 = [
    new Point(4, 4),
    new Point(8, 4),
    new Point(8, 8),
    new Point(4, 8),
  ];

  const pointsRectangle3 = [
    new Point(2, 2),
    new Point(4, 2),
    new Point(4, 4),
    new Point(2, 4),
  ];

  const pointsRectangle4 = [
    new Point(-4, 2),
    new Point(0, 2),
    new Point(0, 4),
    new Point(-4, 4),
  ];

  const rectangle1 = RectangleFactory.create(pointsRectangle1);
  const rectangle2 = RectangleFactory.create(pointsRectangle2);
  const rectangle3 = RectangleFactory.create(pointsRectangle3);
  const rectangle4 = RectangleFactory.create(pointsRectangle4);

  describe("Execute method", () => {
    it("should calculate intersection points correctly", () => {
      const intersectionPoints = CalculateIntersectionsUseCase.execute(
        rectangle1,
        rectangle2
      );

      // In this specific case, the rectangles intersect along a segment, so we expect two intersection points
      expect(intersectionPoints).toHaveLength(2);
      expect(intersectionPoints).toContainEqual(new Point(6, 4));
      expect(intersectionPoints).toContainEqual(new Point(4, 6));
    });

    it("should handle rectangles with no intersection", () => {
      const intersectionPoints = CalculateIntersectionsUseCase.execute(
        rectangle1,
        rectangle3
      );
      // In this case, the rectangles do not intersect, so we expect an empty array
      expect(intersectionPoints).toHaveLength(0);
    });

    it("should handle adjacent rectangles as intersection", () => {
      const intersectionPoints = CalculateIntersectionsUseCase.execute(
        rectangle1,
        rectangle4
      );
      // In this case 2 intersections are funded
      expect(intersectionPoints).toHaveLength(2);
      expect(intersectionPoints).toContainEqual(new Point(0, 2));
      expect(intersectionPoints).toContainEqual(new Point(0, 4));
    });
  });
});
