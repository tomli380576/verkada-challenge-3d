import { Vector3 } from '@react-three/fiber';

export interface BoxProps {
  position: Vector3;
  y_size: number;
  data_x: number;
  data_y: number;
  onClick?: (x: number, y: number) => void;
}