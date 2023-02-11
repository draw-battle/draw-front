import { OFFSET_X, OFFSET_Y } from "./../../config/constants";
import { Tool } from "./tool";

export class Rect extends Tool {
  startX?: number;
  startY?: number;
  snapshot?: string;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.listen();
  }

  mouseUp() {
    this.mouseActive = false;
  }

  mouseDown(e: MouseEvent) {
    this.mouseActive = true;
    this.startX = e.x - OFFSET_X;
    this.startY = e.y - OFFSET_Y;

    this.snapshot = this.canvas.toDataURL();
  }

  mouseOut() {
    this.mouseActive = false;
  }

  mouseMove(e: MouseEvent) {
    if (!this.mouseActive) {
      return;
    }

    const mouseX = e.x - OFFSET_X;
    const mouseY = e.y - OFFSET_Y;

    if (
      typeof this.startX !== "undefined" &&
      typeof this.startY !== "undefined"
    ) {
      const width = mouseX - this.startX;
      const height = mouseY - this.startY;

      this.draw(this.startX, this.startY, width, height);
    }
  }

  draw(x: number, y: number, w: number, h: number) {
    if (this.snapshot) {
      const img = new Image();
      img.src = this.snapshot;

      img.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeRect(x, y, w, h);
      };
    }
  }

  listen() {
    this.canvas.onmousedown = this.mouseDown.bind(this);
    this.canvas.onmouseup = this.mouseUp.bind(this);
    this.canvas.onmouseout = this.mouseOut.bind(this);
    this.canvas.onmousemove = this.mouseMove.bind(this);
  }
}
