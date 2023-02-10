import { OFFSET_X, OFFSET_Y } from "./../../config/constants";
export class Tool {
  mouseActive: boolean = false;
  ctx: CanvasRenderingContext2D;

  constructor(private canvas: HTMLCanvasElement) {
    // this.destroyEvents();
    this.ctx = canvas.getContext("2d")!;
    this.ctx.strokeStyle = "white";
    this.listen();
  }

  destroyEvents() {
    this.canvas.onmousedown = null;
    this.canvas.onmousemove = null;
    this.canvas.onmouseup = null;
  }

  mouseUp() {
    this.mouseActive = false;
  }

  mouseDown(e: MouseEvent) {
    this.mouseActive = true;
    this.ctx.beginPath();

    this.ctx.moveTo(e.x - OFFSET_X, e.y - OFFSET_Y);
  }

  mouseMove(e: MouseEvent) {
    if (this.mouseActive) {
      this.draw(e.x - OFFSET_X, e.y - OFFSET_Y);
    }
  }

  listen() {
    this.canvas.onmousedown = this.mouseDown.bind(this);
    this.canvas.onmouseup = this.mouseUp.bind(this);
    this.canvas.onmousemove = this.mouseMove.bind(this);
  }

  draw(x: number, y: number) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
