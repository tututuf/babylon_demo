import { Scene, Vector3, Color3, Matrix, Engine, StandardMaterial, Texture,  MeshBuilder, Color4, ArcRotateCamera, HemisphericLight, PointLight } from "babylonjs";
import { Wall, WallOptions } from "./wall";
import { create360Image } from './show360Img'
import { RoomWindow } from './windows'
import { Bed } from "./bed";
const cameraPosition = new Vector3(5, 100, 5);
const floor = {
  size: 50,
  width: 50,
  height: 50,
};
const defaultWallOpt:WallOptions = {
  height: 25,
  width: floor.size,
  color: new Color3(0.7, 0.78, 0.78)
};

export class Environment{
  public canvas: HTMLCanvasElement
  public antialias: boolean
  public engine: Engine
  constructor(canvas: HTMLCanvasElement, antialias: boolean) {
    this.canvas = canvas
    this.antialias = antialias
    this.engine = new Engine(canvas, antialias)
  }
  create360Img() {
    create360Image(this.engine, this.canvas)
  }
  createRoom() {
    const scene = new Scene(this.engine);
    scene.clearColor = new Color4(1 - 0.214, 1 - 0.214, 1 - 0.214, 1);
    createGround(scene);
    createWall(scene)
    const camera = new ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2.5,
      25,
      new Vector3(0, 0, 0)
    );
    camera.attachControl(this.canvas, true);
    camera.position = cameraPosition;
    
    new Bed(scene, "bed.glb", camera)
    new RoomWindow(new Vector3(0, 0, 5), scene, 'window.glb')
    const roomlight:HemisphericLight = new HemisphericLight(
      "light",
      new Vector3(20, 30, 20),
      scene
    );
    const roomlight2:HemisphericLight = new HemisphericLight(
      "light",
      new Vector3(-20, 30, -20),
      scene
    );
    roomlight2.intensity = 0.5;
    roomlight.intensity = 0.8;
    const light:PointLight = new PointLight(
      "light",
      new Vector3(0, 0, 0),
      scene
    );
    light.intensity = 1;
    this.engine.runRenderLoop(function () {
      scene.render();
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  //   scene.onPointerDown = function castRay(){
  //     var ray = scene.createPickingRay(scene.pointerX, scene.pointerY, Matrix.Identity(), camera, false);	

  //     var hit = scene.pickWithRay(ray);

  //     console.log("debug", hit?.pickedMesh.parent);

  //     if (hit?.pickedMesh && hit?.pickedMesh?.metadata?.pickedable){
  //       // console.log(hit.pickedMesh.parent);
  //       console.log('pick!pick!pick!pick!');
  //     }
  // } 
    return scene;
  }
}

// export function setMainScene(canvas: HTMLCanvasElement | OffscreenCanvas | WebGLRenderingContext | WebGL2RenderingContext, antialias: boolean) {
  // const engine = new Engine(canvas, antialias);
  // const scene = new Scene(engine);
  // createScene(engine, canvas)
  // scene.clearColor = new Color4(1 - 0.214, 1 - 0.214, 1 - 0.214, 1);
  // createGround(scene);
  // createWall(scene)
  // const camera = new ArcRotateCamera(
  //   "camera",
  //   -Math.PI / 2,
  //   Math.PI / 2.5,
  //   25,
  //   new Vector3(0, 0, 0)
  // );
  // camera.attachControl(canvas, true);
  // camera.position = cameraPosition;
  
  // new Bed(scene, "bed.glb", camera)
  // const roomlight:HemisphericLight = new HemisphericLight(
  //   "light",
  //   new Vector3(25, 40, 25),
  //   scene
  // );
  // roomlight.intensity = 0.8;
  // const light:HemisphericLight = new HemisphericLight(
  //   "light",
  //   new Vector3(-25, 40, -25),
  //   scene
  // );
  // light.intensity = 0.8;
  // engine.runRenderLoop(function () {
  //   scene.render();
  // });

  // // Watch for browser/canvas resize events
  // window.addEventListener("resize", function () {
  //   engine.resize();
  // });
  // return scene;
// }

/**
 * 创建地面
 * @param {Scene} scene 场景
 * @returns plane
 */
function createGround(scene: Scene) {
  // 加载凹凸贴图
  var groundMaterial = new StandardMaterial("groundMaterial", scene);
  const bumpTexture = new Texture(
    "imgs/floor_height.jpg",
    scene
  );
  const textureScale:number = 2

  bumpTexture.uScale = textureScale;
  bumpTexture.vScale = textureScale;
  groundMaterial.bumpTexture = bumpTexture
  groundMaterial.bumpTexture.level = 1;
  groundMaterial.roughness = 0.5;
  const diffuseTexture = new Texture("imgs/floor.jpg", scene);
  diffuseTexture.uScale = textureScale;
  diffuseTexture.vScale = textureScale;
  groundMaterial.diffuseTexture = diffuseTexture;
  var ground = MeshBuilder.CreatePlane(
    "plane",
    {
      width: floor.width,
      height: floor.height
    },
    scene
  );
  // 应用材质到平面
  ground.rotation = new Vector3(Math.PI / 2, 0, 0);
  ground.material = groundMaterial;
  return ground;
}

/**
 * 创建墙壁
 */
function createWall(scene:Scene) {
  new Wall("wall", {
    ...defaultWallOpt,
    position: new Vector3(0, defaultWallOpt.height / 2, -(floor.size / 2)),
    rotation: new Vector3(0, Math.PI, 0)
  }, scene)

  new Wall("wall", {
    ...defaultWallOpt,
    position: new Vector3(-(floor.size / 2), defaultWallOpt.height / 2, 0),
    rotation: new Vector3(0, -Math.PI / 2, 0)
  }, scene)

  new Wall("wall", {
    ...defaultWallOpt,
    position: new Vector3(floor.size / 2, defaultWallOpt.height / 2, 0),
    rotation: new Vector3(0, Math.PI / 2, 0)
  }, scene)
  
  new Wall("wall", {
    ...defaultWallOpt,
    position: new Vector3(0, defaultWallOpt.height / 2, floor.size / 2)
  }, scene)
}
