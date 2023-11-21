import { expect, test, describe } from "@jest/globals";

import Rectangle from "../Rectangle";
import Point from "../Point";
import Segment from "../Segment";
import Vector from "../Vector";
import { InvalidRectangleException } from "../../exceptions/invalid-rectangle.exception";

describe("Rectangle class", () => {
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

  const pointsRectangle5 = [
    new Point(10, 10),
    new Point(12, 10),
    new Point(12, 12),
    new Point(10, 12),
  ];

  const rectangle1 = new Rectangle(pointsRectangle1);
  const rectangle2 = new Rectangle(pointsRectangle2);
  const rectangle3 = new Rectangle(pointsRectangle3);
  const rectangle4 = new Rectangle(pointsRectangle4);
  const rectangle5 = new Rectangle(pointsRectangle5);

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
      const rectangle = new Rectangle(pointsRectangle1);
      expect(rectangle).toBeInstanceOf(Rectangle);
    });
  });

  describe("getSegments method", () => {
    test("returns an array of segments", () => {
      const segments = rectangle1.getSegments();
      expect(segments).toHaveLength(4);
      segments.forEach((segment) => {
        expect(segment).toBeInstanceOf(Segment);
      });
    });
  });

  describe("getVectors method", () => {
    test("returns an array of vectors", () => {
      const vectors = rectangle1.getVectors();
      expect(vectors).toHaveLength(4);
      vectors.forEach((vector) => {
        expect(vector).toBeInstanceOf(Vector);
      });
    });
  });

  describe("getPoints method", () => {
    test("returns an array of points", () => {
      const points = rectangle1.getPoints();
      expect(points).toHaveLength(4);
      points.forEach((point) => {
        expect(point).toBeInstanceOf(Point);
      });
    });
  });

  describe("calculateIntersections method", () => {
    it("should calculate intersection points correctly", () => {
      const intersectionPoints = Rectangle.calculateIntersections(
        rectangle1,
        rectangle2
      );

      // In this specific case, the rectangles intersect along a segment, so we expect two intersection points
      expect(intersectionPoints).toHaveLength(2);
      expect(intersectionPoints).toContainEqual(new Point(6, 4));
      expect(intersectionPoints).toContainEqual(new Point(4, 6));
    });

    it("should handle rectangles with no intersection", () => {
      const intersectionPoints = Rectangle.calculateIntersections(
        rectangle1,
        rectangle3
      );
      // In this case, the rectangles do not intersect, so we expect an empty array
      expect(intersectionPoints).toHaveLength(0);
    });

    it("should handle adjacent rectangles as intersection", () => {
      const intersectionPoints = Rectangle.calculateIntersections(
        rectangle1,
        rectangle4
      );
      // In this case 2 intersections are funded
      expect(intersectionPoints).toHaveLength(2);
      expect(intersectionPoints).toContainEqual(new Point(0, 2));
      expect(intersectionPoints).toContainEqual(new Point(0, 4));
    });
  });

  describe("isPointInside method", () => {
    it("should return true for a point inside the rectangle", () => {
      const insidePoint = new Point(1, 1);
      expect(rectangle1.isPointInside(insidePoint)).toBe(true);
    });

    it("should return false for a point outside the rectangle", () => {
      const outsidePoint = new Point(-3, -3);
      expect(rectangle1.isPointInside(outsidePoint)).toBe(false);
    });

    it("should return false for a point on the border of the rectangle", () => {
      const borderPoint = new Point(0, 2);
      expect(rectangle1.isPointInside(borderPoint)).toBe(false);
    });
  });

  describe("isRectangleInside method", () => {
    it("should return true for a rectangle fully inside", () => {
      expect(rectangle1.isRectangleInside(rectangle3)).toBe(true);
    });

    it("should return false for a rectangle partially outside", () => {
      expect(rectangle1.isRectangleInside(rectangle2)).toBe(false);
    });

    it("should return false for a rectangle adjacent", () => {
      expect(rectangle1.isRectangleInside(rectangle4)).toBe(false);
    });

    it("should return false for a rectangle fully outside", () => {
      expect(rectangle1.isRectangleInside(rectangle5)).toBe(false);
    });
  });
});
