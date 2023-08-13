export const PrefabPathEnum = {
  Actor: "prefab/Actor",
  JoyStick: "prefab/JoyStick",
};

export enum TexturePathEnum {
  ActorIdle = "texture/actor/idle",
  ActorRun = "texture/actor/run",
}

export enum EventEnum {
  ClientSync = "ClientSync",
  ActorSelect = "ActorSelect",
  ChangeScene = "ChangeScene",
  CreateReplication = "CreateReplication",
  LeaveReplication = "LeaveReplication",
}

export enum FsmParamTypeEnum {
  Number = "Number",
  Trigger = "Trigger",
}

export enum ParamsNameEnum {
  Idle = "Idle",
  Run = "Run",
}

export enum EntityStateEnum {
  Idle = "Idle",
  Run = "Run",
}
