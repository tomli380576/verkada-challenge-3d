import React, { useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FlyControls } from "@react-three/drei";
import './App.css';
import { Wall } from './wall';
import { FloorPlanData } from './models/floorPlanData';
import { FloorplanService } from './floorPlan.service';
import THREE from 'three';

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

  return (
    <div
      className="App"
      style={{ width: window.innerWidth, height: window.innerHeight }}
    >
      <Canvas
        shadows
        camera={{ position: [5, 5, -5] }}>

        <CameraController />
        <FlyControls movementSpeed={10} dragToLook={true} />

        <ambientLight intensity={0.2} />
        <pointLight color="white" intensity={0.8} position={[10, 10, 10]} />
        <axesHelper position={[0, 0, 0]} args={[50]} />

        <group position={[-floorPlanData.width/2, 0, -floorPlanData.height/2]}>
          {renderFloorPlan(floorPlanData)}
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
