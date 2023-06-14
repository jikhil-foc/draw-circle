import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DrawDefectCircleImageService {
  constructor() {}

  generateCircleImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 900; // Adjust the dimensions as per your requirements
    canvas.height = 600;
    let imageHeight: number = 400;

    let centerX = canvas.width / 2;
    let centerY = canvas.height - 30;

    // Get the 2D rendering context
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
    this.drawHalfCircle(ctx, imageHeight, centerX, centerY);
    this.drawFillColor(ctx, 90, 100, centerX, centerY, imageHeight, 'red');
    this.drawFillColor(ctx, 100, 130, centerX, centerY, imageHeight, 'green');
    this.drawFillColor(ctx, 130, 150, centerX, centerY, imageHeight, 'yellow');
    this.drawFillColor(ctx, 150, 210, centerX, centerY, imageHeight, 'blue');
    this.drawFillColor(ctx, 210, 230, centerX, centerY, imageHeight, 'yellow');
    this.drawFillColor(ctx, 230, 260, centerX, centerY, imageHeight, 'orange');
    this.drawFillColor(ctx, 260, 270, centerX, centerY, imageHeight, 'cyan');

    this.drawHalfCircle(ctx, imageHeight - 75, centerX, centerY);

    this.drawLine(ctx, 100, centerX, centerY, imageHeight);
    this.drawLine(ctx, 130, centerX, centerY, imageHeight);
    this.drawLine(ctx, 150, centerX, centerY, imageHeight);
    this.drawLine(ctx, 210, centerX, centerY, imageHeight);
    this.drawLine(ctx, 230, centerX, centerY, imageHeight);
    this.drawLine(ctx, 260, centerX, centerY, imageHeight);

    this.drawText(ctx, 'Posizione Trasversale', centerX, 75, 25);
    this.drawText(ctx, 'CH', centerX, 160, 20);
    this.drawText(ctx, 'RS1', centerX * 0.36, 260, 20);
    this.drawText(ctx, 'RD1', centerX * 1.65, 260, 20);
    this.drawText(ctx, 'RS', centerX * 0.13, 400, 20);
    this.drawText(ctx, 'RD', centerX * 1.86, 400, 20);
    this.drawText(ctx, 'PS', centerX * 0.06, 550, 20);
    this.drawText(ctx, 'RS', centerX * 1.95, 550, 20);

    const dataURL = canvas.toDataURL();

    return dataURL;
  }

  private drawHalfCircle(
    ctx: CanvasRenderingContext2D,
    radius: number,
    centerX: number,
    centerY: number,
    strokeStyleColor: string = 'black'
  ): void {
    // Set the border color
    ctx.strokeStyle = strokeStyleColor;
    // Set the fill color
    ctx.fillStyle = 'white';
    // Draw the half circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI, true);

    ctx.closePath();
    // Fill the half circle with white
    ctx.fill();
    // Draw the border
    ctx.stroke();
  }

  private drawFillColor(
    ctx: CanvasRenderingContext2D,
    startAngle: number,
    endAngle: number,
    centerX: number,
    centerY: number,
    height: number,
    color: string = 'white'
  ): void {
    // Set the fill color to red
    ctx.fillStyle = color;

    // Draw the filled area between start angle  and end angle
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(
      centerX,
      centerY,
      height,
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
    angle: number,
    centerX: number,
    centerY: number,
    height: number,
    strokeStyleColor: string = 'black'
  ) {
    // Calculate the angle for the radius line (30 degrees)
    const radiusAngle = (angle * Math.PI) / 180;

    // Calculate the coordinates for the endpoint of the radius line
    const endPointX = centerX + Math.sin(radiusAngle) * height;
    const endPointY = centerY + Math.cos(radiusAngle) * height;

    // Draw the radius line
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(endPointX, endPointY);
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
