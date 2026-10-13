// src/types/skills.ts
// Strongly-typed definitions for jigsaw puzzle skills and categorized capabilities

export type JigsawEdgeType = 'flat' | 'tab' | 'hole';

export interface JigsawEdges {
  top: JigsawEdgeType;
  right: JigsawEdgeType;
  bottom: JigsawEdgeType;
  left: JigsawEdgeType;
}

export interface PuzzleSkillPiece {
  id: string;
  name: string;
  category: 'Languages' | 'Frontend' | 'Backend' | 'Databases' | 'AI & Security' | 'DevOps & Tools';
  row: number; // 0 to rows-1
  col: number; // 0 to cols-1
  iconClass: string;
  accentColor: string;
  glowColor: string;
  level: string;
  experience: string;
  architectureRole: string;
  usedInProjects: string[];
  scatterX: number;
  scatterY: number;
  scatterZ?: number;
  scatterRot: number;
  scatterRotX?: number;
  scatterRotY?: number;
  scatterScale: number;
}

export interface PuzzleGridConfig {
  rows: number;
  cols: number;
  pieceSize: number;
  hSeams: JigsawEdgeType[][]; // [row][col] for seam between (r, c) and (r, c+1)
  vSeams: JigsawEdgeType[][]; // [row][col] for seam between (r, c) and (r+1, c)
}
