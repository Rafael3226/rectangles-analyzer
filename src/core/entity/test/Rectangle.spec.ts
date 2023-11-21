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

      expect(() => rectangle.check90Degrees()).toThrow(
        InvalidRectangleException
      );
    });

    test("does not throw exception for rectangular vectors", () => {
      const rectangle = new Rectangle(validPoints);
      expect(() => rectangle.check90Degrees()).not.toThrow();
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
});
