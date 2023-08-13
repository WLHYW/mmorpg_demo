import { _decorator, Component, Label, Vec3, Tween, tween } from "cc";
import { EntityManager } from "../../base/EntityManager";
import StateMachine from "../../base/StateMachine";
import { IActor } from "../../common";
import { EntityStateEnum, EventEnum } from "../../enum";
import DataManager from "../../global/DataManager";
import EventManager from "../../global/EventManager";
import { ActorStateMachine } from "./ActorStateMachine";
const { ccclass, property } = _decorator;

@ccclass("ActorManager")
export class ActorManager extends EntityManager implements IActor {
  posX: number;
  posY: number;
  account: string;
  id: number;
  nickname: string;
  sceneId: number;

  label: Label;

  private tw: Tween<unknown>;
  private targetPos: Vec3;

  fsm: StateMachine;

  async init(data: IActor) {
    this.id = data.id;
    this.nickname = data.nickname;
    this.account = data.account;
    this.posX = data.posX;
    this.posY = data.posY;
    this.node.setPosition(this.posX, this.posY);

    this.label = this.node.getComponentInChildren(Label);
    this.label.string = this.nickname;

    this.targetPos = undefined;

    this.fsm = this.addComponent(ActorStateMachine);
    this.fsm.init();
    this.state = EntityStateEnum.Idle;
  }

  async tick(dt: number) {
    // TODO
  }

  render(data: IActor) {
    this.renderPosition(data);
  }

  renderPosition(data: IActor) {
    const newPos = new Vec3(data.posX, data.posY);
    if (!this.targetPos) {
      this.node.active = true;
      this.node.setPosition(newPos);
      this.targetPos = new Vec3(newPos);
    } else if (!this.targetPos.equals(newPos)) {
      this.tw?.stop();
      this.node.setPosition(this.targetPos);
      this.targetPos.set(newPos);
      this.state = EntityStateEnum.Run;
      this.tw = tween(this.node)
        .to(0.07, {
          position: this.targetPos,
        })
        .call(() => {
          this.state = EntityStateEnum.Idle;
        })
        .start();
    }
    // this.node.setPosition(data.posX, data.posY);
  }
}
