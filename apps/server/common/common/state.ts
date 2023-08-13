export interface IActor {
  id: number;
  account: string;
  nickname: string;
  posX: number;
  posY: number;
}

export interface IState {
  actors: IActor[];
}
