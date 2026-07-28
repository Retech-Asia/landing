/**
 * Lattice geometry + 3D projection math for the LatticeField hero.
 *
 * Generates a 4×4×4 octahedral lattice (vertices on integer coords,
 * edges along cardinal axes only). Pure functions for rotation and
 * perspective projection — no state, no side effects, deterministic
 * across SSR and client.
 *
 * Why octahedral cardinal-only:
 *   - Reads as "engineered" / "crystallographic" (precise, structural)
 *   - Risk: at face-on angles can read as plain cube. Mitigation: render
 *     at 3/4 view angles by default, never straight-on. This debug page
 *     tests multiple angles to confirm the lattice reads correctly.
 */

export type Vec3 = [number, number, number];
export type Edge = { from: Vec3; to: Vec3 };

/* ── Lattice generation ── */

function generateLattice(size: number): { vertices: Vec3[]; edges: Edge[] } {
  const vertices: Vec3[] = [];
  const edges: Edge[] = [];

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      for (let z = 0; z < size; z++) {
        vertices.push([x, y, z]);
        // Cardinal-axis edges to +1 neighbors (avoid duplicates)
        if (x < size - 1) edges.push({ from: [x, y, z], to: [x + 1, y, z] });
        if (y < size - 1) edges.push({ from: [x, y, z], to: [x, y + 1, z] });
        if (z < size - 1) edges.push({ from: [x, y, z], to: [x, y, z + 1] });
      }
    }
  }

  // Center around origin
  const offset = (size - 1) / 2;
  const centeredVertices = vertices.map(
    ([x, y, z]) => [x - offset, y - offset, z - offset] as Vec3,
  );
  const centeredEdges = edges.map((e) => ({
    from: [e.from[0] - offset, e.from[1] - offset, e.from[2] - offset] as Vec3,
    to: [e.to[0] - offset, e.to[1] - offset, e.to[2] - offset] as Vec3,
  }));

  return { vertices: centeredVertices, edges: centeredEdges };
}

export const LATTICE_SIZE = 5;
const generated = generateLattice(LATTICE_SIZE);
export const LATTICE_VERTICES: Vec3[] = generated.vertices;
export const LATTICE_EDGES: Edge[] = generated.edges;

/* ── Rotation + projection (pure functions) ── */

export function rotateY(v: Vec3, angle: number): Vec3 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c];
}

export function rotateX(v: Vec3, angle: number): Vec3 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c];
}

export type Projected = { x: number; y: number; depth: number };

export function project(
  v: Vec3,
  cameraDistance: number,
  focalLength: number,
  centerX: number,
  centerY: number,
): Projected {
  const z = v[2] + cameraDistance;
  // Guard against divide-by-zero / negative z (vertex behind camera)
  const safeZ = Math.max(z, 0.1);
  return {
    x: (v[0] / safeZ) * focalLength + centerX,
    y: (v[1] / safeZ) * focalLength + centerY,
    depth: z,
  };
}

/* ── Convenience: rotate + project an entire edge list ── */

export type ProjectedEdge = {
  from: Projected;
  to: Projected;
  avgDepth: number;
};

export function rotateAndProjectEdges(
  edges: Edge[],
  angleY: number,
  angleX: number,
  cameraDistance: number,
  focalLength: number,
  centerX: number,
  centerY: number,
): ProjectedEdge[] {
  return edges.map((edge) => {
    const fromR = rotateX(rotateY(edge.from, angleY), angleX);
    const toR = rotateX(rotateY(edge.to, angleY), angleX);
    const fromP = project(fromR, cameraDistance, focalLength, centerX, centerY);
    const toP = project(toR, cameraDistance, focalLength, centerX, centerY);
    return {
      from: fromP,
      to: toP,
      avgDepth: (fromP.depth + toP.depth) / 2,
    };
  });
}
