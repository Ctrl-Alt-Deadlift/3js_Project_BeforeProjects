import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function WireSphere(props) {
  const meshRef = useRef();

  // geometry (more symmetric)
  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(1.8, 2);
  }, []);

  // shiny violet wireframe material
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0x9d00ff,          // violet
      wireframe: true,
      emissive: 0x6a00ff,       // glow effect
      emissiveIntensity: 1.5,
      metalness: 0.9,
      roughness: 0.2
    });
  }, []);

useFrame((state) => {
  if (meshRef.current) {
    const t = state.clock.getElapsedTime();

    meshRef.current.rotation.y += 0.003;
    meshRef.current.rotation.x += 0.0015;

    // preserve base position
    const baseY = props.position?.[1] || 0;

    meshRef.current.position.y = baseY + Math.sin(t) * 0.25;
  }
});

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      {...props}
    />
  );
}