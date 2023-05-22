import { AssetsManager, Scene, Vector3, PointerDragBehavior, Camera, Mesh, StandardMaterial, Color3, MeshBuilder} from "babylonjs";
import  'babylonjs-loaders';
import { pickMesh } from './commonfunc'

export class Bed{
  // public bedMesh: AbstractMesh
  constructor(scene: Scene, name: string, camera: Camera, rootUrl = "3dObjects/beds/") {
    const assetsManager = new AssetsManager(scene)
    const meshTask = assetsManager.addMeshTask("bedTask", "", rootUrl, name)
    meshTask.onSuccess = (task) => {
      const bedMesh = task.loadedMeshes[0] as Mesh;
      
      // bedMesh.scaling = new Vector3(10, 10, 10);
      bedMesh.metadata = {
        pickedable: true
      }
      const dragBehavior = new PointerDragBehavior({dragPlaneNormal: new Vector3(0,1,0)});
      dragBehavior.useObjectOrientationForDragging = false;
      const parentMesh  = new Mesh("bedMesh", scene)
      var outlineMesh = MeshBuilder.CreateBox("OutlineMesh", { size: 1 }, scene);
      // outlineMesh.isVisible = false; // 初始状态下隐藏外边框网格
      outlineMesh.isPickable = true; // 外边框网格不可被选中
      var outlineMaterial = new StandardMaterial("OutlineMaterial");
      outlineMaterial.wireframe = true; // 设置为线框模式
      outlineMaterial.emissiveColor = new BABYLON.Color3(1, 0, 0); // 设置外边框颜色
      outlineMesh.material = outlineMaterial;
      // parentMesh.scaling =  new Vector3(10, 10, 10)
      // parentMesh.isPickable = true
      // parentMesh.outlineColor = Color3.Black()
      // parentMesh.outlineWidth = 0.5
      // parentMesh.renderOutline = true
      bedMesh.parent = outlineMesh
      pickMesh(parentMesh, scene)
      // bedMesh.parent.getChildren().forEach(function (childMesh) {
      //   console.log(childMesh);
      //   pickMesh(childMesh as Mesh, scene)
      //   // childMesh.isPickable = true; // 确保子网格可被点击
      // });
      
      // pickMesh(bedMesh as Mesh, scene)
      
      // window.addEventListener("mouseenter", function() {
      //   const ray = new Ray(camera.position, new Vector3(1,2,3))
      //   const v = ray.intersectsMesh(bedMesh, true)
      //   console.log(v);
        
      // }, true)
      // window.onmouseenter
      // dragBehavior.onDragStartObservable.add((event)=>{
      //   var pickResult = scene.pick(scene.pointerX, scene.pointerY);
      //   // console.log(event);
        
      //   // // 检查射线是否与目标物体相交
      //   // if (pickResult && pickResult.pickedMesh === bedMesh) {
      //   //     // 如果与目标物体相交，则允许拖拽
      //   //     dragBehavior.enabled = true;
      //   // } else {
      //   //     // 如果没有相交目标物体，则禁用拖拽
      //   //     dragBehavior.enabled = false;
      //   // }
      // })
      // dragBehavior.onDragObservable.add(function (eventData, eventState) {});
      // dragBehavior.onDragEndObservable.add((event)=>{})
      bedMesh.addBehavior(dragBehavior)
      // bedMesh.position.y = 10
      // this.bedMesh = bedMesh
      scene.addMesh(bedMesh);
    }
    meshTask.onError = function(task, msg, err) {
      console.error("bed加载失败", task, msg, err);
    }
    assetsManager.load()
  }
}