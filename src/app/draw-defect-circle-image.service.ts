import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DrawDefectCircleImageService {
  private width: number = 600;
  private height: number = 400;
  private centerX!: number;
  private centerY!: number;

  constructor() {}

  generateImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 900; // Adjust the dimensions as per your requirements
    canvas.height = 600;

    this.centerX = canvas.width / 2;
    this.centerY = canvas.height - 30;

    // Get the 2D rendering context
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
    this.drawCircle(ctx, canvas, this.height);
    this.drawFillColor(ctx, canvas, 90, 100, 'red');
    this.drawFillColor(ctx, canvas, 100, 130, 'green');
    this.drawFillColor(ctx, canvas, 130, 150, 'yellow');
    this.drawFillColor(ctx, canvas, 150, 210, 'blue');
    this.drawFillColor(ctx, canvas, 210, 230, 'yellow');
    this.drawFillColor(ctx, canvas, 230, 260, 'orange');
    this.drawFillColor(ctx, canvas, 260, 270, 'cyan');

    this.drawCircle(ctx, canvas, this.height - 75);

    this.drawLine(ctx, canvas, 100);
    this.drawLine(ctx, canvas, 130);
    this.drawLine(ctx, canvas, 150);
    this.drawLine(ctx, canvas, 210);
    this.drawLine(ctx, canvas, 230);
    this.drawLine(ctx, canvas, 260);

    this.drawText(ctx, 'Posizione Trasversale', this.centerX, 75, 25);
    this.drawText(ctx, 'CH', this.centerX, 160, 20);
    this.drawText(ctx, 'RS1', this.centerX * 0.36, 260, 20);
    this.drawText(ctx, 'RD1', this.centerX * 1.65, 260, 20);
    this.drawText(ctx, 'RS', this.centerX * 0.13, 400, 20);
    this.drawText(ctx, 'RD', this.centerX * 1.86, 400, 20);
    this.drawText(ctx, 'PS', this.centerX * 0.06, 550, 20);
    this.drawText(ctx, 'RS', this.centerX * 1.95, 550, 20);

    const dataURL = canvas.toDataURL();

    return dataURL;
  }

  private drawCircle(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    radius: number,
    strokeStyleColor: string = 'black'
  ): void {
    // Set the border color
    ctx.strokeStyle = strokeStyleColor;
    // Set the fill color
    ctx.fillStyle = 'white';
    // Draw the half circle
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, radius, 0, Math.PI, true);

    ctx.closePath();
    // Fill the half circle with white
    ctx.fill();
    // Draw the border
    ctx.stroke();
  }

  private drawFillColor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    startAngle: number,
    endAngle: number,
    color: string = 'white'
  ): void {
    // Set the fill color to red
    ctx.fillStyle = color;

    // Draw the filled area between start angle  and end angle
    ctx.beginPath();
    ctx.moveTo(this.centerX, this.centerY);
    ctx.arc(
      this.centerX,
      this.centerY,
      this.height,
      ((360 - (startAngle - 90)) * Math.PI) / 180,
      ((360 - (endAngle - 90)) * Math.PI) / 180,
      true
    );
    ctx.closePath();

    // Fill the area with color
    ctx.fill();

    // Draw the border
    ctx.stroke();
  }

  private drawLine(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    angle: number,
    strokeStyleColor: string = 'black'
  ) {
    // Calculate the angle for the radius line (30 degrees)
    const radiusAngle1 = (angle * Math.PI) / 180;

    // Calculate the coordinates for the endpoint of the radius line
    const endPointX1 = this.centerX + Math.sin(radiusAngle1) * this.height;
    const endPointY1 = this.centerY + Math.cos(radiusAngle1) * this.height;

    // Draw the radius line
    ctx.beginPath();
    ctx.moveTo(this.centerX, this.centerY);
    ctx.lineTo(endPointX1, endPointY1);
    ctx.closePath();

    // Set the color for the radius line
    ctx.strokeStyle = strokeStyleColor; // Adjust the color as desired

    // Draw the border for the radius line
    ctx.stroke();
  }

  private drawText(
    ctx: CanvasRenderingContext2D,
    text: string,
    startX: number,
    startY: number,
    fontSize: number = 30
  ): void {
    ctx.fillStyle = 'black';
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText(text, startX, startY);
  }
}
