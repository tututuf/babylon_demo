import { Mesh, ExecuteCodeAction, ActionManager, Scene,  Color3 } from 'babylonjs'

export function pickMesh(mesh: Mesh, scene: Scene) {
  mesh.isPickable = true; 
  mesh.actionManager = new ActionManager(scene);
 
  // 创建点击事件
  mesh.actionManager.registerAction(new ExecuteCodeAction(
    ActionManager.OnPickTrigger,
    function (evt) {
      console.log(mesh);
      
      scene.meshes.forEach(function (mesh) {
        mesh.renderOutline = false;
      });
      mesh.outlineColor = Color3.Red();
      mesh.outlineWidth = 0.2;
      mesh.renderOutline = true
      // 在这里编写网格被点击时执行的操作
      console.log("网格被点击了");
    }
  ));
}