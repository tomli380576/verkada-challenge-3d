import React, { useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FlyControls } from "@react-three/drei";
import './App.css';
import { Wall } from './wall';
import { FloorPlanData } from './models/floorPlanData';
import { FloorplanService } from './floorPlan.service';
import THREE from 'three';
import { Button } from '@mui/material';

function App() {
  const wallHeight = 5;

  let floorPlanData = FloorplanService.hardcodedData();
  console.log(floorPlanData);

  function CameraController() {
    const { camera, gl } = useThree();

    useEffect(
      () => {
        const controls = new OrbitControls(camera, gl.domElement);
        controls.screenSpacePanning = true;
      },
      [camera, gl.domElement]
    );
    return <FlyControls movementSpeed={10} dragToLook={true} />
  };

  function Floor(props: { x_size: number, z_size: number }) {
    return (
      <mesh position={[props.x_size / 2 - 0.45, -wallHeight / 2 - 0.05, props.z_size / 2 - 0.45]}>
        <boxBufferGeometry args={[props.x_size - 0.1, 0.1, props.z_size - 0.1]} />
        <meshPhongMaterial color="#bbbbbb" />
      </mesh>
    )
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

        <CameraController />
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

function renderFloorPlan(floorPlanData: FloorPlanData) {
  let group = [];

  for (let z = 0; z < floorPlanData.floorPlan.length; z++) {
    for (let x = 0; x < floorPlanData.floorPlan[z].length; x++) {
      if (floorPlanData.floorPlan[z][x] === 1) {
        //return (<Wall position={[x, y, 0]} y_size={5} />);
        group.push(<Wall position={[x, 0, z]} y_size={5} />);
      }
    }
  }
  return group;
}



export default App;
