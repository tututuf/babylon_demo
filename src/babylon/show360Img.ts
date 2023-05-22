import { Engine, Scene, Vector3, ArcRotateCamera, PhotoDome } from 'babylonjs'
// import {ArcRotateCamera} from '@babylonjs/core'

export function create360Image(engine: Engine, canvas: HTMLCanvasElement) {
  var scene = new Scene(engine);
  const pos = new Vector3(0,0,0)
  var camera = new ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 2, 50, pos, scene);
  camera.attachControl(canvas, true);
  camera.inputs.attached.mousewheel.detachControl();

  var tickCount = -240, zoomLevel = 1;

  var dome = new PhotoDome(
      "360Img",
      "imgs/360photo.jpg",
      {
          resolution: 32,
          size: 1000,
          useDirectMapping: false
      },
      scene
  );

  scene.registerAfterRender(function() {
      // tickCount++;
      if(zoomLevel == 1) {
        if(tickCount >= 0) {
          dome.fovMultiplier = (Math.sin(tickCount / 100) * 0.5) + 1.0;
        }
      } else {
        dome.fovMultiplier = zoomLevel;
      }
  });

  scene.onPointerObservable.add(function(e) {
      if(dome === undefined) { return; }      
      zoomLevel += (e.event as any).wheelDelta * -0.0005;
      if(zoomLevel < 0){ zoomLevel = 0; }
      if(zoomLevel > 2){ zoomLevel = 2; }
      if(zoomLevel == 1) {
          tickCount = -60;
      }
  }, BABYLON.PointerEventTypes.POINTERWHEEL);

  engine.runRenderLoop(function () {
    scene.render();
  });

  return scene;
};