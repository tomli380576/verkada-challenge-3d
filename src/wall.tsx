import { BoxProps } from "./BoxProps"

export function Wall(props: BoxProps) {
  return (
    <mesh position={props.position}>
      <boxBufferGeometry args={[0.9, props.y_size, 0.9]} />
      <meshPhongMaterial color="#10b2e3" />
    </mesh>
  )
}