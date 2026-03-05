"use client";
import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 600;

function Particles() {
  const mesh   = useRef<THREE.InstancedMesh>(null);
  const mouse  = useRef(new THREE.Vector2(99, 99));
  const dummy  = useMemo(() => new THREE.Object3D(), []);
  const { size } = useThree();

  // Initial positions
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 24;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  // Velocities for drift
  const velocities = useMemo(() => {
    const arr = new Float32Array(COUNT * 2);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 2]     = (Math.random() - 0.5) * 0.002;
      arr[i * 2 + 1] = (Math.random() - 0.5) * 0.002;
    }
    return arr;
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth)  * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  if (typeof window !== "undefined") {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
  }

  useFrame((_, delta) => {
    if (!mesh.current) return;

    for (let i = 0; i < COUNT; i++) {
      let px = positions[i * 3];
      let py = positions[i * 3 + 1];

      // Drift
      px += velocities[i * 2]     * delta * 60;
      py += velocities[i * 2 + 1] * delta * 60;

      // Wrap around edges
      if (px >  12) px = -12;
      if (px < -12) px =  12;
      if (py >   7) py =  -7;
      if (py <  -7) py =   7;

      // Mouse repulsion
      const mx = mouse.current.x * 12;
      const my = mouse.current.y * 7;
      const dx = px - mx;
      const dy = py - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 3) {
        const force = (3 - dist) / 3 * 0.04;
        px += (dx / dist) * force * 60 * delta;
        py += (dy / dist) * force * 60 * delta;
      }

      positions[i * 3]     = px;
      positions[i * 3 + 1] = py;

      dummy.position.set(px, py, positions[i * 3 + 2]);
      const scale = 0.004 + Math.random() * 0.006;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial
        color="#D4C8B0"
        transparent
        opacity={0.35}
      />
    </instancedMesh>
  );
}

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Particles />
    </Canvas>
  );
}
