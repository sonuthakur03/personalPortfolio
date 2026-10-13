// src/components/skills/PuzzleSkillsBoard.tsx
// Cinematic, large-scale scroll-driven jigsaw puzzle of core CV technologies
// Features: Expanded 160px puzzle dimensions, clean uncluttered card text (zero badge overlap),
// and a floating cursor tooltip HUD that smoothly follows the mouse pointer on hover.

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  puzzleSkillsData,
  PUZZLE_ROWS,
  PUZZLE_COLS,
  PUZZLE_PIECE_SIZE,
  getPieceEdges,
} from '../../data/puzzleSkillsData';
import { generateGlobalPiecePath } from '../../utils/jigsawGeometry';
import type { PuzzleSkillPiece } from '../../types/skills';
import { sounds } from '../../utils/soundEffects';

gsap.registerPlugin(ScrollTrigger);

export const PuzzleSkillsBoard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const boardWrapperRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const piecesRef = useRef<Map<string, SVGGElement>>(new Map());
  const [hoveredPiece, setHoveredPiece] = useState<PuzzleSkillPiece | null>(null);
  const hoveredPieceRef = useRef<PuzzleSkillPiece | null>(null);
  const [assemblyProgress, setAssemblyProgress] = useState<number>(0);
  const hasPlayedSnapSound = useRef<boolean>(false);

  // Sync ref with state for event listeners without stale closures
  useEffect(() => {
    hoveredPieceRef.current = hoveredPiece;
  }, [hoveredPiece]);

  // High-performance GSAP quickTo functions for smooth cursor tracking
  const xTo = useRef<((value: number) => void) | null>(null);
  const yTo = useRef<((value: number) => void) | null>(null);

  useEffect(() => {
    if (tooltipRef.current) {
      xTo.current = gsap.quickTo(tooltipRef.current, 'x', { duration: 0.16, ease: 'power2.out' });
      yTo.current = gsap.quickTo(tooltipRef.current, 'y', { duration: 0.16, ease: 'power2.out' });
    }
  }, []);

  // Compute smart viewport-bounded cursor follower coordinates
  const getBoundedCursorPos = useCallback((clientX: number, clientY: number) => {
    const tooltipWidth = 330;
    const tooltipHeight = 180;
    const offset = 20;

    let x = clientX + offset;
    let y = clientY + offset;

    // Flip to left if overflowing the right viewport edge
    if (clientX + tooltipWidth + offset > window.innerWidth) {
      x = clientX - tooltipWidth - offset;
    }

    // Flip above if overflowing the bottom viewport edge
    if (clientY + tooltipHeight + offset > window.innerHeight) {
      y = clientY - tooltipHeight - offset;
    }

    return {
      x: Math.max(12, x),
      y: Math.max(12, y),
    };
  }, []);

  // Track cursor position globally with smooth follow lag
  const handleGlobalMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!hoveredPieceRef.current) return;
      const { x, y } = getBoundedCursorPos(e.clientX, e.clientY);
      xTo.current?.(x);
      yTo.current?.(y);
    },
    [getBoundedCursorPos]
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [handleGlobalMouseMove]);

  // Precompute global SVG paths for all 16 pieces
  const piecePaths = useMemo(() => {
    const paths = new Map<string, string>();
    puzzleSkillsData.forEach((piece) => {
      const edges = getPieceEdges(piece.row, piece.col);
      const pathStr = generateGlobalPiecePath(piece.row, piece.col, PUZZLE_PIECE_SIZE, edges);
      paths.set(piece.id, pathStr);
    });
    return paths;
  }, []);

  // Set the 3D transform of a single piece according to scroll progress (0 = scattered, 1 = connected)
  const applyPieceTransform = useCallback((piece: PuzzleSkillPiece, el: SVGGElement, p: number) => {
    const factor = Math.max(0, 1 - p);
    const curX = piece.scatterX * factor;
    const curY = piece.scatterY * factor;
    const curZ = (piece.scatterZ ?? 0) * factor;
    const curRot = piece.scatterRot * factor;
    const curRotX = (piece.scatterRotX ?? 0) * factor;
    const curRotY = (piece.scatterRotY ?? 0) * factor;
    const curScale = 1 + (piece.scatterScale - 1) * factor;

    const cx = piece.col * PUZZLE_PIECE_SIZE + PUZZLE_PIECE_SIZE / 2;
    const cy = piece.row * PUZZLE_PIECE_SIZE + PUZZLE_PIECE_SIZE / 2;

    gsap.set(el, {
      x: curX,
      y: curY,
      z: curZ,
      rotation: curRot,
      rotationX: curRotX,
      rotationY: curRotY,
      scale: curScale,
      transformOrigin: `${cx}px ${cy}px`,
      force3D: true,
    });
  }, []);

  // Update all pieces for a given progress ratio (0 to 1)
  const updateAllPieces = useCallback((progress: number) => {
    puzzleSkillsData.forEach((piece) => {
      const el = piecesRef.current.get(piece.id);
      if (el) {
        applyPieceTransform(piece, el, progress);
      }
    });

    setAssemblyProgress(progress);

    // Audio snap trigger when reaching full connection
    if (progress >= 0.95 && !hasPlayedSnapSound.current) {
      sounds.playSuccess();
      hasPlayedSnapSound.current = true;
    } else if (progress < 0.85) {
      hasPlayedSnapSound.current = false;
    }
  }, [applyPieceTransform]);

  // GSAP ScrollTrigger setup — high sensitivity (scrub: 0.35) for instant response
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize in scattered state
    updateAllPieces(0);

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top 85%',
      end: 'center 45%',
      scrub: 0.35, // High sensitivity: reacts immediately to even subtle scroll notches!
      onUpdate: (self) => {
        updateAllPieces(self.progress);
      },
    });

    return () => {
      st.kill();
    };
  }, [updateAllPieces]);

  // Interactive 3D mouse parallax on the puzzle board
  const handleBoardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const wrapper = boardWrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(wrapper, {
      rotateY: x * 8,
      rotateX: -y * 8,
      duration: 0.35,
      ease: 'power1.out',
      transformPerspective: 1200,
    });
  };

  const handleBoardMouseLeave = () => {
    setHoveredPiece(null);
    hoveredPieceRef.current = null;
    const wrapper = boardWrapperRef.current;
    if (!wrapper) return;
    gsap.to(wrapper, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  // Elevate hovered piece to top of SVG stacking order & update floating tooltip
  const handlePieceMouseEnter = (piece: PuzzleSkillPiece, e: React.MouseEvent<SVGGElement>) => {
    sounds.playHover(850);
    setHoveredPiece(piece);
    hoveredPieceRef.current = piece;

    const { x, y } = getBoundedCursorPos(e.clientX, e.clientY);
    if (tooltipRef.current) {
      gsap.set(tooltipRef.current, { x, y });
    }

    // Bring to front in SVG so tabs overlap neighbors cleanly
    const target = e.currentTarget;
    if (target.parentNode) {
      target.parentNode.appendChild(target);
    }
  };

  const handlePieceMouseLeave = () => {
    setHoveredPiece(null);
    hoveredPieceRef.current = null;
  };

  const isConnected = assemblyProgress >= 0.95;

  return (
    <div
      ref={containerRef}
      className="relative w-full py-8 sm:py-14 select-none flex flex-col items-center"
      style={{ perspective: '1200px' }}
    >
      {/* Floating Cursor Tooltip (Follows mouse cursor when hovered over any technology piece) */}
      <div
        ref={tooltipRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-150 will-change-transform ${
          hoveredPiece ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {hoveredPiece && (
          <div
            className="w-[290px] sm:w-[330px] p-4 rounded-2xl bg-[#090c15]/95 backdrop-blur-2xl border shadow-2xl transition-all"
            style={{
              borderColor: `${hoveredPiece.accentColor}85`,
              boxShadow: `0 0 35px ${hoveredPiece.glowColor}, 0 20px 50px rgba(0,0,0,0.92)`,
            }}
          >
            {/* Top Laser Accent Light Line */}
            <div
              className="w-full h-0.5 rounded-full mb-3 -mt-1 opacity-90"
              style={{
                background: `linear-gradient(90deg, transparent, ${hoveredPiece.accentColor}, transparent)`,
              }}
            />

            {/* Header: Glowing Icon + Technology Name + Level Badge */}
            <div className="flex items-center gap-3 mb-2.5">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl sm:text-3xl bg-black/70 border shrink-0"
                style={{
                  borderColor: `${hoveredPiece.accentColor}70`,
                  boxShadow: `0 0 15px ${hoveredPiece.glowColor}`,
                }}
              >
                <i className={hoveredPiece.iconClass} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-base font-display font-bold text-white tracking-wide truncate">
                    {hoveredPiece.name}
                  </span>
                  <span
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-full font-semibold shrink-0"
                    style={{
                      color: hoveredPiece.accentColor,
                      backgroundColor: `${hoveredPiece.accentColor}18`,
                      borderColor: `${hoveredPiece.accentColor}60`,
                      borderWidth: 1,
                    }}
                  >
                    {hoveredPiece.level}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-gray-400 truncate mt-0.5">
                  {hoveredPiece.category} · {hoveredPiece.experience.split('·')[0]}
                </div>
              </div>
            </div>

            {/* Architectural Role from CV */}
            <p className="text-xs text-gray-300 leading-relaxed font-sans mb-3">
              {hoveredPiece.architectureRole}
            </p>

            {/* Applied In Projects tags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/10">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider font-semibold">
                Used In:
              </span>
              {hoveredPiece.usedInProjects.map((proj) => (
                <span
                  key={proj}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.08] text-gray-200 border border-white/10"
                >
                  {proj}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Subtle Hint Pill above Puzzle Board */}
      <div className="mb-6 z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 text-xs font-mono text-gray-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Scroll down to assemble stack · Hover technology for architecture details</span>
        </div>
      </div>

      {/* Extra Large Centered Jigsaw Puzzle Showcase Board with 3D Mouse Parallax */}
      <div
        ref={boardWrapperRef}
        onMouseMove={handleBoardMouseMove}
        onMouseLeave={handleBoardMouseLeave}
        className="relative w-full max-w-[920px] sm:max-w-[1020px] md:max-w-[1140px] lg:max-w-[1240px] px-2 sm:px-4 flex items-center justify-center transition-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Dynamic Ambient Radial Spotlight behind Puzzle */}
        <div
          className="absolute inset-0 w-full h-full rounded-full pointer-events-none transition-all duration-500"
          style={{
            transform: `scale(${0.9 + assemblyProgress * 0.28})`,
            opacity: 0.6 + assemblyProgress * 0.4,
            filter: `blur(${160 - assemblyProgress * 40}px)`,
            background: isConnected
              ? 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, rgba(168,85,247,0.3) 50%, rgba(16,185,129,0.15) 100%)'
              : 'radial-gradient(circle, rgba(168,85,247,0.25) 0%, rgba(99,102,241,0.15) 100%)',
          }}
        />

        {/* Outer Bounding Box Guide with Laser Perimeter Glow */}
        <div
          className={`relative w-full p-2 sm:p-6 md:p-8 rounded-3xl transition-all duration-500 ${
            isConnected
              ? 'shadow-[0_0_70px_rgba(168,85,247,0.3),inset_0_0_45px_rgba(34,211,238,0.2)] border border-purple-500/50 bg-black/40'
              : 'border border-dashed border-white/10 bg-black/15'
          }`}
        >
          {/* Large-Scale SVG Jigsaw Grid */}
          <svg
            ref={svgRef}
            viewBox="-100 -100 840 840"
            className="w-full aspect-square overflow-visible select-none transition-all duration-300"
            style={{
              filter: 'drop-shadow(0 25px 45px rgba(0,0,0,0.85))',
            }}
          >
            <defs>
              {/* Custom dark glass radial gradients for each piece */}
              {puzzleSkillsData.map((piece) => (
                <radialGradient
                  key={`grad-${piece.id}`}
                  id={`grad-${piece.id}`}
                  cx="50%"
                  cy="50%"
                  r="75%"
                >
                  <stop offset="0%" stopColor="#1e2436" stopOpacity="0.97" />
                  <stop offset="75%" stopColor="#0b0e18" stopOpacity="0.98" />
                  <stop offset="100%" stopColor="#05070d" stopOpacity="1" />
                </radialGradient>
              ))}
            </defs>

            {/* Target square outline when pieces are scattered */}
            {!isConnected && (
              <rect
                x="0"
                y="0"
                width={PUZZLE_COLS * PUZZLE_PIECE_SIZE}
                height={PUZZLE_ROWS * PUZZLE_PIECE_SIZE}
                rx="20"
                fill="none"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="2.5"
                strokeDasharray="10 10"
                className="transition-opacity duration-300 pointer-events-none"
              />
            )}

            {/* The 16 Interlocking Jigsaw Pieces */}
            {puzzleSkillsData.map((piece) => {
              const isHovered = hoveredPiece?.id === piece.id;
              const pathD = piecePaths.get(piece.id) || '';

              // Coordinates of piece in SVG grid
              const cx = piece.col * PUZZLE_PIECE_SIZE;
              const cy = piece.row * PUZZLE_PIECE_SIZE;

              return (
                <g
                  key={piece.id}
                  ref={(el) => {
                    if (el) piecesRef.current.set(piece.id, el);
                    else piecesRef.current.delete(piece.id);
                  }}
                  id={`piece-${piece.id}`}
                  onMouseEnter={(e) => handlePieceMouseEnter(piece, e)}
                  onMouseLeave={handlePieceMouseLeave}
                  onClick={(e) => handlePieceMouseEnter(piece, e)}
                  className="cursor-pointer transition-all duration-300 group"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Jigsaw SVG Path */}
                  <path
                    d={pathD}
                    fill={`url(#grad-${piece.id})`}
                    stroke={
                      isHovered
                        ? piece.accentColor
                        : isConnected
                        ? 'rgba(255, 255, 255, 0.28)'
                        : piece.accentColor
                    }
                    strokeWidth={isHovered ? '4' : '2'}
                    strokeOpacity={
                      isHovered
                        ? 1
                        : isConnected
                        ? 0.5
                        : 0.55 + assemblyProgress * 0.35
                    }
                    className="transition-all duration-200"
                    style={{
                      filter: isHovered
                        ? `drop-shadow(0 0 25px ${piece.glowColor}) drop-shadow(0 0 50px ${piece.glowColor})`
                        : `drop-shadow(0 6px 14px rgba(0,0,0,0.75)) drop-shadow(0 0 ${assemblyProgress * 12}px ${piece.glowColor})`,
                    }}
                  />

                  {/* Centered Technology Brand Icon & Clean Name (Zero cramped badge overlap) */}
                  <foreignObject
                    x={cx + 10}
                    y={cy + 10}
                    width={PUZZLE_PIECE_SIZE - 20}
                    height={PUZZLE_PIECE_SIZE - 20}
                    className="pointer-events-none overflow-visible"
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center select-none">
                      {/* Big Prominent Devicon Brand Icon */}
                      <div
                        className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-2.5 transition-transform duration-300 flex items-center justify-center"
                        style={{
                          color: piece.accentColor,
                          transform: isHovered ? 'scale(1.22)' : 'scale(1)',
                          filter: `drop-shadow(0 4px 14px ${piece.glowColor})`,
                        }}
                      >
                        <i className={piece.iconClass} />
                      </div>

                      {/* Technology Name — Bold, crisp, highly legible, zero badge overlap */}
                      <span
                        className={`text-sm sm:text-base md:text-lg font-sans font-extrabold tracking-tight leading-snug px-1 max-w-full transition-all duration-200 ${
                          isHovered
                            ? 'text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.95)] scale-105'
                            : 'text-gray-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]'
                        }`}
                      >
                        {piece.name}
                      </span>
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};
