import { OFFSET_X, OFFSET_Y } from "./../../config/constants";
import { Tool } from "./tool";

export class Brush extends Tool {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    console.log("constructed");
    this.listen();
  }

  mouseUp() {
    this.mouseActive = false;
  }

  mouseDown(e: MouseEvent) {
    this.mouseActive = true;
    this.ctx.beginPath();
    console.log("down");

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
