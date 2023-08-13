import { Prefab, SpriteFrame, Node } from "cc";
import { Singleton } from "../common/base";
import { IState } from "../common/state";
import { ActorManager } from "../entity/actor/ActorManager";
import { JoyStickManager } from "../ui/JoyStickManager";

export default class DataManager extends Singleton {
  static get Instance() {
    return super.GetInstance<DataManager>();
  }
  prefabMap: Map<string, Prefab> = new Map();
  textureMap: Map<string, SpriteFrame[]> = new Map();

  actorMap: Map<number, ActorManager> = new Map();
  state: IState = {
    actors: [],
  };

  stage: Node;
  jm: JoyStickManager;

  applyInput(...args: any[]) {
    // TODO
  }
  applyState(...args: any[]) {
    // TODO
  }
  reset(...args: any[]) {
    // TODO
  }
}
