import { _decorator, Animation, AnimationClip } from "cc";
import State from "../../base/State";
import StateMachine, { getInitParamsTrigger } from "../../base/StateMachine";
import { ParamsNameEnum, TexturePathEnum } from "../../enum";
const { ccclass } = _decorator;

@ccclass("ActorStateMachine")
export class ActorStateMachine extends StateMachine {
  init() {
    this.animationComponent = this.node.addComponent(Animation);
    this.initParams();
    this.initStateMachines();
    this.initAnimationEvent();
  }

  initParams() {
    this.params.set(ParamsNameEnum.Idle, getInitParamsTrigger());
    this.params.set(ParamsNameEnum.Run, getInitParamsTrigger());
  }

  initStateMachines() {
    this.stateMachines.set(ParamsNameEnum.Idle, new State(this, "ActorIdle", AnimationClip.WrapMode.Loop));
    this.stateMachines.set(ParamsNameEnum.Run, new State(this, "ActorRun", AnimationClip.WrapMode.Loop));
  }

  initAnimationEvent() {}

  run() {
    switch (this.currentState) {
      case this.stateMachines.get(ParamsNameEnum.Idle):
      case this.stateMachines.get(ParamsNameEnum.Run):
        if (this.params.get(ParamsNameEnum.Run).value) {
          this.currentState = this.stateMachines.get(ParamsNameEnum.Run);
        } else if (this.params.get(ParamsNameEnum.Idle).value) {
          this.currentState = this.stateMachines.get(ParamsNameEnum.Idle);
        } else {
          this.currentState = this.currentState;
        }
        break;
      default:
        this.currentState = this.stateMachines.get(ParamsNameEnum.Idle);
        break;
    }
  }
}
