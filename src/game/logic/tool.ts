export class Tool {
  mouseActive: boolean = false;
  ctx: CanvasRenderingContext2D;

  constructor(public canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d")!;
    this.ctx.strokeStyle = "white";
  }
}
