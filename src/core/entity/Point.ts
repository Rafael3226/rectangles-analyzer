export default class Point {
  constructor(public readonly x: number, public readonly y: number) {}

  static calculateDistance(point1: Point, point2: Point): number {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    );
  }

  calculateDistance(point: Point) {
    return Point.calculateDistance(this, point);
  }

  static equals(pointA: Point, pointB: Point): boolean {
    return pointA.x === pointB.x && pointA.y === pointB.y;
  }

  equals(point: Point): boolean {
    return Point.equals(this, point);
  }
}
