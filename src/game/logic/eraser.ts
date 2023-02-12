import { BG_COLOR, OFFSET_X, OFFSET_Y } from "./../../config/constants";
import { Tool } from "./tool";

export class Eraser extends Tool {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.listen();
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
    this.fillColor = BG_COLOR;
    this.ctx.lineTo(x, y);
    this.ctx.fill();
  }
}
