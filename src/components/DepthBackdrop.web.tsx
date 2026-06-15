import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import type { Mesh } from "three";

function FloatingShapes() {
  const primary = useRef<Mesh>(null);
  const secondary = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (primary.current) {
      primary.current.rotation.x = time * 0.35;
      primary.current.rotation.y = time * 0.25;
      primary.current.position.y = Math.sin(time * 0.8) * 0.12;
    }
    if (secondary.current) {
      secondary.current.rotation.y = time * -0.3;
      secondary.current.position.y = Math.cos(time * 0.7) * 0.1 - 0.25;
    }
  });

  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <mesh ref={primary} position={[1.35, 0.5, -0.15]}>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshStandardMaterial color="#DDE1FF" roughness={0.35} metalness={0.05} />
      </mesh>
      <mesh ref={secondary} position={[1.95, -0.3, -0.25]}>
        <torusGeometry args={[0.36, 0.12, 24, 48]} />
        <meshStandardMaterial color="#FFD23F" roughness={0.4} metalness={0.02} />
      </mesh>
      <mesh position={[1.45, 0.05, -0.35]} rotation={[0.4, 0.3, 0.2]}>
        <boxGeometry args={[0.36, 0.36, 0.36]} />
        <meshStandardMaterial color="#FF9F89" roughness={0.45} />
      </mesh>
    </>
  );
}

export function DepthBackdrop() {
  return (
    <View pointerEvents="none" style={styles.wrap}>
      <Canvas camera={{ position: [0, 0, 4], fov: 46 }}>
        <FloatingShapes />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2
  }
});
