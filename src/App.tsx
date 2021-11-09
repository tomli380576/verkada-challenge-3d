import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber'
import { FlyControls, OrbitControls } from "@react-three/drei";
import './App.css';
import { TransparentWall, Wall, CameraObj } from './wall';
import { FloorPlanData } from './models/floorPlanData';
import { FloorplanService } from './floorPlan.service';
import { Button } from '@mui/material';

function App() {
  const wallHeight = 5;

  //let floorPlanData: FloorPlanData = FloorplanService.hardcodedData();
  const [floorPlanData, setFloorPlanData] = useState(FloorplanService.hardcodedData());

  function Floor(props: { x_size: number, z_size: number }) {
    return (
      <mesh position={[(props.x_size * 0.9 + 0.9) / 2 - 0.45, -wallHeight / 2 - 0.05, (props.z_size * 0.9 + 0.9) / 2 - 0.45]}>
        <boxBufferGeometry args={[(props.x_size * 0.9 + 0.9), 0.1, (props.z_size * 0.9 + 0.9)]} />
        <meshPhongMaterial color="#bbbbbb" />
      </mesh>
    )
  }

  function renderFloorPlan(floorPlanData: FloorPlanData) {
    let group = [];

    for (let z = 0; z < floorPlanData.floorPlan.length; z++) {
      for (let x = 0; x < floorPlanData.floorPlan[z].length; x++) {
        switch (floorPlanData.floorPlan[z][x]) {
          case 0: group.push(<TransparentWall position={[x, 0, z]} y_size={5} data_x={z} data_y={x} onClick={getClickedLocation} />); break;
          case 1: group.push(<Wall position={[x, 0, z]} y_size={5} data_x={z} data_y={x} />); break;
          case 2: group.push(<CameraObj position={[x, 0, z]} y_size={5} data_x={z} data_y={x} />); break;
        }
      }
    }
    console.log(floorPlanData);
    return group;
  }

  function getClickedLocation(x: number, y: number) {
    console.log(x, y);
    let temp = floorPlanData;
    temp.floorPlan[y][x] = 2;
    setFloorPlanData(temp);
    //floorPlanData.floorPlan[y][x] = 2;
  }

  return (
    <div
      className="App"
    >
      <div style={{ position: "absolute", zIndex: 10 }}>
        <Button variant="contained" className="UI-buttons" onClick={() => { console.log('sdasda') }}>Edit Camera</Button>
        <Button variant="contained" className="UI-buttons" onClick={() => { console.log('sdasda') }}>Finish Edit</Button>
        <Button variant="contained" className="UI-buttons" onClick={() => { FloorplanService.exportFloorPlan(floorPlanData) }}>Save</Button>
      </div>
      <Canvas
        shadows
        camera={{ position: [5, 5, -5] }} style={{ width: window.innerWidth, height: window.innerHeight }}>

        <OrbitControls />
        <FlyControls movementSpeed={10} dragToLook={true} />

        <ambientLight intensity={0.2} />
        <pointLight color="white" intensity={0.8} position={[10, 10, 10]} />
        <axesHelper position={[0, 0, 0]} args={[50]} />

        <group>
          {renderFloorPlan(floorPlanData)}
          <Floor x_size={floorPlanData.width} z_size={floorPlanData.height} />
        </group>
      </Canvas>
    </div>
  );
}





export default App;
