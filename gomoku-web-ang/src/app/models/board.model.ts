export class BoardModel {
  uuid: string;
  grid: number[][];

  constructor(uuid:string,
              grid: number[][]) {
    this.uuid = uuid;
    this.grid = grid;
  }
}
