import { Vector3, Mesh, StandardMaterial, Scene, MeshBuilder, Color3, Texture, PBRMaterial } from 'babylonjs'
import { pickMesh } from './commonfunc'
export interface WallOptions{
  height: number,
  width: number,
  position?: Vector3,
  rotation?: Vector3,
  color: Color3
}

export class Wall{
  public wallPlane: Mesh
  public material: PBRMaterial
  private _opts: WallOptions
  constructor(name: string = "", options: WallOptions, scene: Scene){
    this._opts = options
    this.wallPlane = MeshBuilder.CreatePlane(
      name,
      {
        width: options.width,
        height: options.height
      },
      scene
    );
    pickMesh(this.wallPlane, scene)
    this.wallPlane.metadata = {
      pickedable: true
    }
    this.wallPlane.position = options.position ? options.position : new Vector3(0, 0, 0);
    this.wallPlane.rotation = options.rotation ? options.rotation : new Vector3(0, 0, 0);
    this.material = new PBRMaterial("wallMaterial", scene);
    const texture = new Texture("imgs/wall_normal.jpg", scene)
    texture.uScale = 20
    texture.vScale = 20
    this.material.bumpTexture = texture
    this.material.roughness = 0.7;
    this.material.emissiveColor = options.color
    this.material.emissiveIntensity = 0.7;
    this.wallPlane.material = this.material;
  }

  setColor(color: Color3) {
    this.material.ambientColor = color
  }
}