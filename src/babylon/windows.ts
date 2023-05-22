import { Vector3, Scene, AssetsManager, AbstractMesh, PointerDragBehavior } from 'babylonjs'
import  'babylonjs-loaders';
export class RoomWindow {
  public windowMesh: AbstractMesh | undefined = undefined
  constructor(position: Vector3, scene: Scene, name: string, rootUrl = "3dObjects/windows/") {
    const assetsManager = new AssetsManager(scene);

    const meshTask = assetsManager.addMeshTask("windowTask", "", rootUrl, name);

    meshTask.onSuccess = (task) => {
        // GLB文件加载成功后的处理逻辑
        const windowMesh = task.loadedMeshes[0];
        windowMesh.scaling = new Vector3(10, 10, 10);
        
        const dragBehavior = new PointerDragBehavior({dragPlaneNormal: new Vector3(0,0,1)});
        dragBehavior.useObjectOrientationForDragging = false;

        dragBehavior.onDragStartObservable.add((event)=>{})
        dragBehavior.onDragObservable.add(function (eventData, eventState) {});
        dragBehavior.onDragEndObservable.add((event)=>{})
        windowMesh.addBehavior(dragBehavior)
        windowMesh.position = new Vector3(0, 10, 25)
        windowMesh.metadata = {
          pickedable: true
        }
        this.windowMesh = windowMesh
        // this.windowMesh.scaling = new Vector3(10, 10, 10);
        
        // this.windowMesh.onPointerDownObservable.add(function (eventData, eventState) {
        //   startingPointerPosition = eventData.event.pointerId === -1 ? eventData.event.clientY : eventData.event.touches[0].clientY;
        //   startingWindowPosition = windowMesh.position.y;
        // });
        // 在场景中使用加载的网格
        scene.addMesh(this.windowMesh);
    };
    meshTask.onError = function(task, msg, err) {
      console.error("window加载失败",task, msg, err);
    }
    assetsManager.load()
    // const assetsManager = new AssetsManager(scene);
    // SceneLoader.Append(rootUrl, name, scene, function (res) {
    //   console.log(1231, res);
      
    //   // GLB文件加载成功后的处理逻辑
    // });
  }

}