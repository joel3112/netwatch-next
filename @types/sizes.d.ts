export type Size = string | number;

export interface Rectangle {
  width?: Size;
  height?: Size;
}

export type RectangleRatio = Rectangle & { ratio?: number };
