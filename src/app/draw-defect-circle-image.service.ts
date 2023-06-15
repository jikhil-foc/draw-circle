import { Injectable } from '@angular/core';

interface SezioneLongitudinale {
  PS: boolean;
  RS: boolean;
  RS1: boolean;
  CH: boolean;
  RD1: boolean;
  RD: boolean;
  PD: boolean;
}

enum SezioneLongitudinaleColor {
  PS = '#2f75b5',
  RS = '#26944a',
  RS1 = '#fee500',
  CH = '#d93628',
  RD1 = '#fee500',
  RD = '#26944a',
  PD = '#2f75b5',
}

@Injectable({
  providedIn: 'root',
})
export class DrawDefectCircleImageService {
  constructor() {}

  generateCircleImage(sezioneLongitudinale: SezioneLongitudinale) {
    const canvas = document.createElement('canvas');
    canvas.width = 900; // Adjust the dimensions as per your requirements
    canvas.height = 600;
    let imageHeight: number = 400;
    let centerX = canvas.width / 2;
    let centerY = canvas.height - 30;

    // Get the 2D rendering context
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
    this.drawHalfCircle(ctx, imageHeight, centerX, centerY);

    // PD
    this.drawFillColorInsideCircle(
      ctx,
      90,
      100,
      centerX,
      centerY,
      imageHeight,
      sezioneLongitudinale.PD ? SezioneLongitudinaleColor.PD : undefined
    );

    // RD
    this.drawFillColorInsideCircle(
      ctx,
      100,
      130,
      centerX,
      centerY,
      imageHeight,
      sezioneLongitudinale.RD ? SezioneLongitudinaleColor.RD : undefined
    );

    // RD1
    this.drawFillColorInsideCircle(
      ctx,
      130,
      150,
      centerX,
      centerY,
      imageHeight,
      sezioneLongitudinale.RD1 ? SezioneLongitudinaleColor.RD1 : undefined
    );

    // CH
    this.drawFillColorInsideCircle(
      ctx,
      150,
      210,
      centerX,
      centerY,
      imageHeight,
      sezioneLongitudinale.CH ? SezioneLongitudinaleColor.CH : undefined
    );

    // RS1
    this.drawFillColorInsideCircle(
      ctx,
      210,
      230,
      centerX,
      centerY,
      imageHeight,
      sezioneLongitudinale.RS1 ? SezioneLongitudinaleColor.RS1 : undefined
    );

    // RS
    this.drawFillColorInsideCircle(
      ctx,
      230,
      260,
      centerX,
      centerY,
      imageHeight,
      sezioneLongitudinale.RS ? SezioneLongitudinaleColor.RS : undefined
    );

    // PS
    this.drawFillColorInsideCircle(
      ctx,
      260,
      270,
      centerX,
      centerY,
      imageHeight,
      sezioneLongitudinale.PS ? SezioneLongitudinaleColor.PS : undefined
    );

    this.drawHalfCircle(ctx, imageHeight - 75, centerX, centerY);

    this.drawLineInsideCircle(ctx, 100, centerX, centerY, imageHeight);
    this.drawLineInsideCircle(ctx, 130, centerX, centerY, imageHeight);
    this.drawLineInsideCircle(ctx, 150, centerX, centerY, imageHeight);
    this.drawLineInsideCircle(ctx, 210, centerX, centerY, imageHeight);
    this.drawLineInsideCircle(ctx, 230, centerX, centerY, imageHeight);
    this.drawLineInsideCircle(ctx, 260, centerX, centerY, imageHeight);

    this.drawText(ctx, 'Posizione Trasversale', centerX, 75, 25);
    this.drawText(ctx, 'CH', centerX, 160, 20);
    this.drawText(ctx, 'RS1', centerX * 0.36, 260, 20);
    this.drawText(ctx, 'RD1', centerX * 1.65, 260, 20);
    this.drawText(ctx, 'RS', centerX * 0.13, 400, 20);
    this.drawText(ctx, 'RD', centerX * 1.86, 400, 20);
    this.drawText(ctx, 'PS', centerX * 0.06, 550, 20);

    this.drawText(ctx, 'PD', centerX * 1.95, 550, 20);

    const dataURL = canvas.toDataURL();

    return dataURL;
  }

  generateRectangleImage(sezioneLongitudinaleList: SezioneLongitudinale[]) {
    const canvas = document.createElement('canvas');
    canvas.width = 900; // Adjust the dimensions as per your requirements
    canvas.height = 700;

    // Calculate the center coordinates
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    // Get the 2D rendering context
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

    this.drawRectangular(ctx, centerX, centerY, sezioneLongitudinaleList);

    const cellWidth = centerX / 4;
    const cellHeight = centerY / 7;
    this.drawText(ctx, 'Posizione Longitudinale', centerX, 75, 25);
    this.drawText(ctx, '0-5', centerX - 1.5 * cellWidth, 150, 18);
    this.drawText(ctx, '5-10', centerX - 0.5 * cellWidth, 150, 18);
    this.drawText(ctx, '10-15', centerX + 0.5 * cellWidth, 150, 18);
    this.drawText(ctx, '15-20', centerX + 1.5 * cellWidth, 150, 18);

    this.drawText(ctx, 'PS', 180, centerY - 2.9 * cellHeight, 18, 'left');
    this.drawText(ctx, 'RS', 180, centerY - 1.9 * cellHeight, 18, 'left');
    this.drawText(ctx, 'RS1', 180, centerY - 0.9 * cellHeight, 18, 'left');
    this.drawText(ctx, 'CH', 180, centerY + 0.2 * cellHeight, 18, 'left');
    this.drawText(ctx, 'RD1', 180, centerY + 1.1 * cellHeight, 18, 'left');
    this.drawText(ctx, 'RD', 180, centerY + 2.1 * cellHeight, 18, 'left');
    this.drawText(ctx, 'PD', 180, centerY + 3.1 * cellHeight, 18, 'left');

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

  private drawFillColorInsideCircle(
    ctx: CanvasRenderingContext2D,
    startAngle: number,
    endAngle: number,
    centerX: number,
    centerY: number,
    height: number,
    color: string = 'white',
    strokeStyle: string = 'black'
  ): void {
    // Set the fill color to red
    ctx.fillStyle = color;
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = 2;
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

  private drawLineInsideCircle(
    ctx: CanvasRenderingContext2D,
    angle: number,
    centerX: number,
    centerY: number,
    height: number,
    addDottedLine: boolean = false,
    strokeStyleColor: string = 'black'
  ) {
    // Calculate the angle for the radius line (30 degrees)
    const radiusAngle = (angle * Math.PI) / 180;

    // Calculate the coordinates for the endpoint of the radius line
    const endPointX = centerX + Math.sin(radiusAngle) * height;
    const endPointY = centerY + Math.cos(radiusAngle) * height;

    if (addDottedLine) {
      ctx.setLineDash([10, 10]); // Set the dash pattern (5 pixels on, 5 pixels off)
    }

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
    fontSize: number = 30,
    textAlign: CanvasTextAlign = 'center'
  ): void {
    ctx.fillStyle = 'black';
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = textAlign;
    ctx.fillText(text, startX, startY);
  }

  private drawRectangular(
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    sezioneLongitudinaleList: SezioneLongitudinale[]
  ) {
    // Calculate the width and height of each cell
    const cellWidth = centerX / 4;
    const cellHeight = centerY / 7;

    // Calculate the starting point of the rectangle
    const startX = centerX - (cellWidth * 4) / 2;
    const startY = centerY - (cellHeight * 7) / 2;

    // Draw the rectangle using a loop

    Object.keys(sezioneLongitudinaleList[0]).forEach(
      (item: any, row: number) => {
        for (let col = 0; col < 4; col++) {
          // Calculate the coordinates of the current cell
          const x = startX + col * cellWidth;
          const y = startY + row * cellHeight;

          const selectedItem: any = sezioneLongitudinaleList[col];

          if (selectedItem[item]) {
            ctx.fillStyle =
              SezioneLongitudinaleColor[
                item as keyof typeof SezioneLongitudinaleColor
              ] ?? 'white';
          } else {
            ctx.fillStyle = 'white';
          }

          ctx.fillRect(x, y, cellWidth, cellHeight);

          // Set the stroke color and draw the rectangle outline
          ctx.strokeStyle = 'black';
          ctx.strokeRect(x, y, cellWidth, cellHeight);
        }
      }
    );
  }
}
