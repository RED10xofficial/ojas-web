"use client";

import { useEffect, useRef } from "react";

/** Canvas double helix that drifts diagonally behind the hospitals hero. */
export default function DnaHelixBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let phase = 0; // Spiral rotation phase
    let drift = 0; // Continuous diagonal displacement

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Trajectory angle: bottom-right to top-left
      const dx = -width;
      const dy = -height;
      const length = Math.sqrt(dx * dx + dy * dy);
      const dirX = dx / length;
      const dirY = dy / length;

      // Perpendicular vector for helix width
      const perpX = -dirY;
      const perpY = dirX;

      const rungSpacing = 36; // Distance between base pairs along main axis
      const helixRadius = 65; // Amplitude/width of double helix

      // Advance rotation phase and diagonal drift continuously
      phase += 0.014;
      drift += 0.75;

      // Anchor starting point (bottom-right overflow area)
      const startX = width + 220;
      const startY = height + 220;

      // Continuous infinite indexing without jumps
      const baseIndex = Math.floor(drift / rungSpacing);
      const totalRungs = Math.ceil(length / rungSpacing) + 20;

      const strandA: { x: number; y: number; z: number; i: number }[] = [];
      const strandB: { x: number; y: number; z: number; i: number }[] = [];

      for (let offset = -5; offset < totalRungs; offset++) {
        const i = baseIndex + offset;
        // Distance along diagonal trajectory (continuous in time)
        const distAxis = i * rungSpacing - drift;

        const centerX = startX + dirX * distAxis;
        const centerY = startY + dirY * distAxis;

        // Spiral angle calculation
        const nodePhase = i * 0.26 + phase;
        const sinVal = Math.sin(nodePhase);
        const cosVal = Math.cos(nodePhase); // Z depth (-1 to +1)

        // Offset perpendicular to trajectory for helix width
        const offsetX = perpX * (sinVal * helixRadius);
        const offsetY = perpY * (sinVal * helixRadius);

        strandA.push({
          x: centerX + offsetX,
          y: centerY + offsetY,
          z: cosVal * helixRadius,
          i,
        });

        strandB.push({
          x: centerX - offsetX,
          y: centerY - offsetY,
          z: -cosVal * helixRadius,
          i,
        });
      }

      // 1. Base pair rungs and their connection dots
      for (let k = 0; k < strandA.length; k++) {
        const pA = strandA[k];
        const pB = strandB[k];

        if (
          pA.x < -120 ||
          pA.x > width + 120 ||
          pA.y < -120 ||
          pA.y > height + 120
        )
          continue;

        const depthScale = (pA.z / helixRadius + 1) / 2; // 0 to 1
        const alpha = 0.25 + depthScale * 0.55;

        // Connecting line between base pairs (thicker black)
        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.strokeStyle = `rgba(26, 22, 20, ${alpha * 0.55})`;
        ctx.lineWidth = 2.4;
        ctx.stroke();

        // Warm terracotta connection dot in middle of rung
        const midX = (pA.x + pB.x) / 2;
        const midY = (pA.y + pB.y) / 2;
        ctx.beginPath();
        ctx.arc(midX, midY, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184, 104, 81, ${alpha * 0.95})`;
        ctx.fill();
      }

      // Thick glowing strand backbone line
      const drawStrandLine = (strand: { x: number; y: number }[]) => {
        ctx.save();
        ctx.beginPath();
        let started = false;
        for (let k = 0; k < strand.length; k++) {
          const p = strand[k];
          if (
            p.x < -140 ||
            p.x > width + 140 ||
            p.y < -140 ||
            p.y > height + 140
          )
            continue;
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.shadowColor = "#1A1614";
        ctx.shadowBlur = 8;
        ctx.strokeStyle = "rgba(26, 22, 20, 0.85)";
        ctx.lineWidth = 4.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
        ctx.restore();
      };

      // 2. Strand A and Strand B backbone lines
      drawStrandLine(strandA);
      drawStrandLine(strandB);

      // 3. Terracotta accent dots at base-pair connections
      for (let k = 0; k < strandA.length; k++) {
        const pA = strandA[k];
        const pB = strandB[k];

        if (
          pA.x >= -80 &&
          pA.x <= width + 80 &&
          pA.y >= -80 &&
          pA.y <= height + 80
        ) {
          const depthScaleA = (pA.z + helixRadius) / (2 * helixRadius);
          const rA = 3.2 + depthScaleA * 2.8;

          ctx.beginPath();
          ctx.arc(pA.x, pA.y, rA, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(184, 104, 81, ${0.4 + depthScaleA * 0.6})`;
          ctx.fill();
        }

        if (
          pB.x >= -80 &&
          pB.x <= width + 80 &&
          pB.y >= -80 &&
          pB.y <= height + 80
        ) {
          const depthScaleB = (pB.z + helixRadius) / (2 * helixRadius);
          const rB = 3.2 + depthScaleB * 2.8;

          ctx.beginPath();
          ctx.arc(pB.x, pB.y, rB, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(184, 104, 81, ${0.4 + depthScaleB * 0.6})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-15 z-0"
    />
  );
}
