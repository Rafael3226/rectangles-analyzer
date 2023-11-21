import Point from "../../entity/Point";
import Rectangle from "../../entity/Rectangle";
import calculateIntersectionPointsUseCase from "../calculate-intersection-points.use-case";

describe("calculateIntersectionPointsUseCase", () => {
  const pointsRectangle1 = [
    new Point(0, 0),
    new Point(3, 0),
    new Point(3, 2),
    new Point(0, 2),
  ];

  const pointsRectangle2 = [
    new Point(2, 1),
    new Point(4, 1),
    new Point(4, 4),
    new Point(2, 4),
  ];

  const pointsRectangle3 = [
    new Point(-1, 1),
    new Point(-1, 3),
    new Point(-3, 3),
    new Point(-3, 1),
  ];
  it("should calculate intersection points correctly", () => {
    // Create rectangles and segments for testing
    const rectangleA = new Rectangle(pointsRectangle1);
    const rectangleB = new Rectangle(pointsRectangle2);

    const intersectionPoints = calculateIntersectionPointsUseCase.execute(
      rectangleA,
      rectangleB
    );

    // In this specific case, the rectangles intersect along a segment, so we expect two intersection points
    expect(intersectionPoints).toHaveLength(2);
    expect(intersectionPoints).toContainEqual(new Point(3, 1));
    expect(intersectionPoints).toContainEqual(new Point(2, 2));
  });

  it("should handle rectangles with no intersection", () => {
    // Create rectangles and segments for testing
    const rectangleA = new Rectangle(pointsRectangle1);
    const rectangleB = new Rectangle(pointsRectangle3);

    const intersectionPoints = calculateIntersectionPointsUseCase.execute(
      rectangleA,
      rectangleB
    );

    // In this case, the rectangles do not intersect, so we expect an empty array
    expect(intersectionPoints).toHaveLength(0);
  });

  // Add more test cases as needed
});
