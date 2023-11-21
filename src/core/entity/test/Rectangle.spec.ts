import { expect, test, describe, jest } from "@jest/globals";

import Rectangle from "../Rectangle";
import Point from "../Point";
import Segment from "../Segment";
import Vector from "../Vector";
import { InvalidRectangleException } from "../../exceptions/invalid-rectangle.exception";

describe("Rectangle class", () => {
  const pointA = new Point(0, 0);
  const pointB = new Point(2, 0);
  const pointC = new Point(2, 1);
  const pointD = new Point(0, 1);

  const validPoints = [pointA, pointB, pointC, pointD];

  describe("Constructor", () => {
    test("throws exception for invalid number of points", () => {
      const invalidPoints = [pointA, pointB, pointC];
      expect(() => new Rectangle(invalidPoints)).toThrow(
        InvalidRectangleException
      );
    });

    test("throws exception for non-rectangular points", () => {
      const nonRectangularPoints = [pointA, pointB, pointC, new Point(3, 3)];
      expect(() => new Rectangle(nonRectangularPoints)).toThrow(
        InvalidRectangleException
      );
    });

    test("creates a rectangle with valid points", () => {
      const rectangle = new Rectangle(validPoints);
      expect(rectangle).toBeInstanceOf(Rectangle);
    });
  });

  describe("check90Degrees method", () => {
    test("throws exception for non-rectangular vectors", () => {
      const rectangle = new Rectangle(validPoints);

      // Modifying the vectors to be non-rectangular
      jest
        .spyOn(rectangle, "getVectors")
        .mockReturnValue([
          new Vector(1, 1),
          new Vector(1, 1),
          new Vector(1, 1),
          new Vector(1, 1),
        ]);

      expect(() => rectangle.isRectangle()).toThrow(InvalidRectangleException);
    });

    test("does not throw exception for rectangular vectors", () => {
      const rectangle = new Rectangle(validPoints);
      expect(() => rectangle.isRectangle()).not.toThrow();
    });
  });

  describe("getSegments method", () => {
    test("returns an array of segments", () => {
      const rectangle = new Rectangle(validPoints);
      const segments = rectangle.getSegments();
      expect(segments).toHaveLength(4);
      segments.forEach((segment) => {
        expect(segment).toBeInstanceOf(Segment);
      });
    });
  });

  describe("getVectors method", () => {
    test("returns an array of vectors", () => {
      const rectangle = new Rectangle(validPoints);
      const vectors = rectangle.getVectors();
      expect(vectors).toHaveLength(4);
      vectors.forEach((vector) => {
        expect(vector).toBeInstanceOf(Vector);
      });
    });
  });

  describe("getPoints method", () => {
    test("returns an array of points", () => {
      const rectangle = new Rectangle(validPoints);
      const points = rectangle.getPoints();
      expect(points).toHaveLength(4);
      points.forEach((point) => {
        expect(point).toBeInstanceOf(Point);
      });
    });
  });

  describe("isPointInside method", () => {
    it("should return true for a point inside the rectangle", () => {
      const rectangle = new Rectangle(validPoints);
      const insidePoint = new Point(1, 1);
      expect(rectangle.isPointInside(insidePoint)).toBe(true);
    });

    it("should return false for a point outside the rectangle", () => {
      const rectangle = new Rectangle(validPoints);
      const outsidePoint = new Point(3, 3);
      expect(rectangle.isPointInside(outsidePoint)).toBe(false);
    });

    it("should return false for a point on the border of the rectangle", () => {
      const rectangle = new Rectangle(validPoints);
      const borderPoint = new Point(1, 2);
      expect(rectangle.isPointInside(borderPoint)).toBe(false);
    });
  });

  describe("calculateIntersections method", () => {
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

    const pointsRectangle4 = [
      new Point(0, 2),
      new Point(2, 2),
      new Point(2, 4),
      new Point(0, 4),
    ];
    it("should calculate intersection points correctly", () => {
      // Create rectangles and segments for testing
      const rectangleA = new Rectangle(pointsRectangle1);
      const rectangleB = new Rectangle(pointsRectangle2);

      const intersectionPoints = Rectangle.calculateIntersections(
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

      const intersectionPoints = Rectangle.calculateIntersections(
        rectangleA,
        rectangleB
      );

      // In this case, the rectangles do not intersect, so we expect an empty array
      expect(intersectionPoints).toHaveLength(0);
    });

    it("should handle adjacent rectangles as intersection", () => {
      // Create rectangles and segments for testing
      const rectangleA = new Rectangle(pointsRectangle1);
      const rectangleB = new Rectangle(pointsRectangle4);

      const intersectionPoints = Rectangle.calculateIntersections(
        rectangleA,
        rectangleB
      );

      // In this case 2 intersections are funded
      expect(intersectionPoints).toHaveLength(2);
    });
  });
});
