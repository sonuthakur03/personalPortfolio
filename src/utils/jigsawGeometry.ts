// src/utils/jigsawGeometry.ts
// Precision mathematical jigsaw puzzle path generator with 0-gap edge congruence

import type { JigsawEdgeType, JigsawEdges } from '../types/skills';

interface Point2D {
  x: number;
  y: number;
}

/**
 * Creates an edge segment for a jigsaw puzzle piece.
 * Flat: straight line to target
 * Tab: convex interlocking bulb extending outwards
 * Hole: concave interlocking indent extending inwards
 */
export function createJigsawEdge(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  type: JigsawEdgeType
): string {
  if (type === 'flat') {
    return `L ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  }

  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len === 0) return `L ${x2.toFixed(2)} ${y2.toFixed(2)}`;

  // Outward normal in clockwise orientation
  // Outward normal for vector (dx, dy) is (dy / len, -dx / len)
  const sign = type === 'tab' ? 1 : -1;
  const nx = (dy / len) * sign;
  const ny = (-dx / len) * sign;

  // Normalized coordinate helper
  const pt = (u: number, n: number): Point2D => ({
    x: x1 + u * dx + n * len * nx,
    y: y1 + u * dy + n * len * ny,
  });

  const f = (p: Point2D) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`;

  // Symmetric cubic bezier contour forming neck & bulb
  return [
    `L ${f(pt(0.36, 0))}`,
    `C ${f(pt(0.37, -0.025))} ${f(pt(0.35, 0.03))} ${f(pt(0.33, 0.09))}`,
    `C ${f(pt(0.30, 0.17))} ${f(pt(0.40, 0.20))} ${f(pt(0.50, 0.20))}`,
    `C ${f(pt(0.60, 0.20))} ${f(pt(0.70, 0.17))} ${f(pt(0.67, 0.09))}`,
    `C ${f(pt(0.65, 0.03))} ${f(pt(0.63, -0.025))} ${f(pt(0.64, 0))}`,
    `L ${f(pt(1.0, 0))}`,
  ].join(' ');
}

/**
 * Generates the full closed SVG path (M ... Z) for a single jigsaw piece at (r, c)
 * with coordinates relative to the piece's local origin (0, 0)
 */
export function generateLocalPiecePath(
  size: number,
  edges: JigsawEdges
): string {
  const x0 = 0;
  const y0 = 0;
  const x1 = size;
  const y1 = size;

  // 1. Top edge: (0, 0) -> (size, 0)
  const topPath = createJigsawEdge(x0, y0, x1, y0, edges.top);
  // 2. Right edge: (size, 0) -> (size, size)
  const rightPath = createJigsawEdge(x1, y0, x1, y1, edges.right);
  // 3. Bottom edge: (size, size) -> (0, size)
  const bottomPath = createJigsawEdge(x1, y1, x0, y1, edges.bottom);
  // 4. Left edge: (0, size) -> (0, 0)
  const leftPath = createJigsawEdge(x0, y1, x0, y0, edges.left);

  return `M ${x0} ${y0} ${topPath} ${rightPath} ${bottomPath} ${leftPath} Z`;
}

/**
 * Generates the closed SVG path for a jigsaw piece in global grid coordinates
 */
export function generateGlobalPiecePath(
  r: number,
  c: number,
  size: number,
  edges: JigsawEdges
): string {
  const x0 = c * size;
  const y0 = r * size;
  const x1 = (c + 1) * size;
  const y1 = (r + 1) * size;

  const topPath = createJigsawEdge(x0, y0, x1, y0, edges.top);
  const rightPath = createJigsawEdge(x1, y0, x1, y1, edges.right);
  const bottomPath = createJigsawEdge(x1, y1, x0, y1, edges.bottom);
  const leftPath = createJigsawEdge(x0, y1, x0, y0, edges.left);

  return `M ${x0} ${y0} ${topPath} ${rightPath} ${bottomPath} ${leftPath} Z`;
}
