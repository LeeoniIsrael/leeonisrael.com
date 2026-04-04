"use client";
import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ── Mouse tracker ───────────────────────────────────────────── */
function useMouseNormalized() {
  const mouse = useRef(new THREE.Vector2(0, 0));
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return mouse;
}

/* ── Orbiting accent ring ────────────────────────────────────── */
function Ring() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.18;
    ref.current.rotation.y = state.clock.elapsedTime * 0.09;
  });
  return (
    <mesh ref={ref} position={[2.6, 0, 0]}>
      <torusGeometry args={[3.0, 0.022, 16, 120]} />
      <meshStandardMaterial
        color="#D4A882"
        roughness={0.2}
        metalness={0.9}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

/* ── Second thin ring (tilted) ───────────────────────────────── */
function Ring2() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * -0.14;
    ref.current.rotation.z = state.clock.elapsedTime * 0.07;
  });
  return (
    <mesh ref={ref} position={[2.6, 0, 0]} rotation={[Math.PI / 3, 0, 0]}>
      <torusGeometry args={[3.4, 0.012, 16, 120]} />
      <meshStandardMaterial
        color="#C8956C"
        roughness={0.3}
        metalness={0.8}
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

/* ── Tiny orbiting satellites ────────────────────────────────── */
function Satellite({
  startAngle,
  orbitRadius,
  orbitSpeed,
  size,
  yBias,
}: {
  startAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
  size: number;
  yBias: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * orbitSpeed + startAngle;
    ref.current.position.set(
      2.6 + Math.cos(t) * orbitRadius,
      yBias + Math.sin(t * 0.6) * 0.4,
      Math.sin(t) * orbitRadius
    );
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshStandardMaterial color="#D4A882" roughness={0.15} metalness={0.9} />
    </mesh>
  );
}

/* ── Main morphing orb ───────────────────────────────────────── */
function OrbScene({ mouse }: { mouse: React.MutableRefObject<THREE.Vector2> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.current.x * 0.4,
      delta * 1.8
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouse.current.y * 0.18,
      delta * 1.8
    );
  });

  return (
    <group ref={groupRef}>
      {/* Main orb */}
      <Float speed={1.3} rotationIntensity={0.18} floatIntensity={0.55} floatingRange={[-0.22, 0.22]}>
        <mesh position={[2.6, 0, 0]}>
          <icosahedronGeometry args={[2.1, 5]} />
          <MeshDistortMaterial
            color="#C8956C"
            roughness={0.06}
            metalness={0.88}
            speed={2.2}
            distort={0.30}
            envMapIntensity={2.2}
          />
        </mesh>
      </Float>

      {/* Rings */}
      <Ring />
      <Ring2 />

      {/* Satellites */}
      <Satellite startAngle={0}              orbitRadius={3.6} orbitSpeed={0.38} size={0.10} yBias={0.2}  />
      <Satellite startAngle={Math.PI * 0.7}  orbitRadius={4.0} orbitSpeed={0.27} size={0.07} yBias={-0.4} />
      <Satellite startAngle={Math.PI * 1.4}  orbitRadius={3.3} orbitSpeed={0.48} size={0.13} yBias={0.6}  />

      {/* Ambient sparkles */}
      <Sparkles
        count={80}
        scale={[16, 11, 9]}
        size={1.1}
        speed={0.32}
        color="#D4A882"
        opacity={0.5}
      />
    </group>
  );
}

/* ── Canvas export ───────────────────────────────────────────── */
export default function HeroScene() {
  const mouse = useMouseNormalized();

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <Environment preset="sunset" />
      <ambientLight intensity={0.28} />
      <directionalLight position={[8, 8, 5]}  intensity={1.6} color="#FFD4A0" />
      <pointLight      position={[-6, -4, 4]} intensity={0.9} color="#C8956C" />
      <OrbScene mouse={mouse} />
    </Canvas>
  );
}
