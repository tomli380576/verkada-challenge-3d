import { useState } from "react";
import { BoxProps } from "./BoxProps"

export function Wall(props: BoxProps) {
  return (
    <mesh position={props.position} castShadow
      receiveShadow>
      <boxBufferGeometry args={[0.9, props.y_size, 0.9]} />
      <meshPhongMaterial color="#10b2e3" />
    </mesh>
  );
}

export function CameraObj(props: BoxProps) {
  return (
    <mesh position={props.position} castShadow
      receiveShadow>
      <boxBufferGeometry args={[0.9, props.y_size, 0.9]} />
      <meshPhongMaterial color="yellow" />
    </mesh>
  );
}


export function TransparentWall(props: BoxProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <mesh position={props.position} castShadow
      receiveShadow
      onPointerEnter={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerLeave={(e) => { e.stopPropagation(); setHovered(false); }}
      onPointerDown={(e) => { e.stopPropagation(); props.onClick!(props.data_x, props.data_y) }}
    >
      <boxBufferGeometry args={[0.9, props.y_size, 0.9]} />
      <meshPhongMaterial color="#ffffff" opacity={hovered ? 0.4 : 0.0} transparent />
    </mesh>
  );
}