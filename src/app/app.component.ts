import { Component } from '@angular/core';
import { DrawDefectCircleImageService } from './draw-defect-circle-image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private drawDefectService: DrawDefectCircleImageService) {}
  ngAfterViewInit(): void {
    const parentDiv = document.createElement('div');

    [1, 2, 3, 4].forEach(() => {
      const data = this.drawDefectService.generateImage();
      const imageDiv = document.createElement('img');
      imageDiv.src = data;
      document.body.appendChild(imageDiv);
    });

    document.body.appendChild(parentDiv);
  }

  generateImage(): void {
    const canvas = document.createElement('canvas');
    canvas.width = 900; // Adjust the dimensions as per your requirements
    canvas.height = 450;

    // Get the 2D rendering context
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
    this.drawCircle(ctx, canvas, canvas.height);

    this.drawFillColor(ctx, canvas, 90, 100, 'red');
    this.drawFillColor(ctx, canvas, 100, 130, 'green');
    this.drawFillColor(ctx, canvas, 130, 150, 'yellow');
    this.drawFillColor(ctx, canvas, 150, 210, 'blue');
    this.drawFillColor(ctx, canvas, 210, 230);
    this.drawFillColor(ctx, canvas, 230, 260, 'orange');
    this.drawFillColor(ctx, canvas, 260, 270, 'cyan');
    this.drawCircle(ctx, canvas, canvas.height - 100);

    this.drawLine(ctx, canvas, 100);
    this.drawLine(ctx, canvas, 130);
    this.drawLine(ctx, canvas, 150);
    this.drawLine(ctx, canvas, 210);
    this.drawLine(ctx, canvas, 230);
    this.drawLine(ctx, canvas, 260);

    const dataURL = canvas.toDataURL();

    const imageDiv = document.createElement('img');
    imageDiv.src = dataURL;

    document.body.appendChild(imageDiv);
  }

  drawCircle(
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
    ctx.arc(canvas.width / 2, canvas.height, radius, 0, Math.PI, true);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    // Fill the half circle with white
    ctx.fill();
    // Draw the border
    ctx.stroke();
  }

  drawFillColor(
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
    ctx.moveTo(canvas.width / 2, canvas.height);
    ctx.arc(
      canvas.width / 2,
      canvas.height,
      canvas.height,
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

  drawLine(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    angle: number,
    strokeStyleColor: string = 'black'
  ) {
    // Calculate the angle for the radius line (30 degrees)
    const radiusAngle1 = (angle * Math.PI) / 180;

    // Calculate the coordinates for the endpoint of the radius line
    const endPointX1 =
      canvas.width / 2 + Math.sin(radiusAngle1) * canvas.height;
    const endPointY1 = canvas.height + Math.cos(radiusAngle1) * canvas.height;

    // Draw the radius line
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height);
    ctx.lineTo(endPointX1, endPointY1);
    ctx.closePath();

    // Set the color for the radius line
    ctx.strokeStyle = strokeStyleColor; // Adjust the color as desired

    // Draw the border for the radius line
    ctx.stroke();
  }
}
