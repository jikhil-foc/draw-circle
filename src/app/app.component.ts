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

    [1].forEach(() => {
      const s1 = {
        PS: true,
        RS: false,
        RS1: true,
        CH: false,
        RD1: false,
        RD: false,
        PD: true,
      };

      const s2 = {
        PS: false,
        RS: true,
        RS1: false,
        CH: false,
        RD1: true,
        RD: false,
        PD: false,
      };

      const s3 = {
        PS: true,
        RS: false,
        RS1: false,
        CH: true,
        RD1: false,
        RD: true,
        PD: false,
      };

      const s4 = {
        PS: false,
        RS: true,
        RS1: false,
        CH: true,
        RD1: false,
        RD: true,
        PD: true,
      };
      const arr = [s1, s2, s3, s4];

      const data = this.drawDefectService.generateRectangleImage(arr);
      const imageDiv = document.createElement('img');
      imageDiv.src = data;
      document.body.appendChild(imageDiv);
    });

    [1].forEach(() => {
      const ss = {
        PS: true,
        RS: true,
        RS1: true,
        CH: true,
        RD1: true,
        RD: true,
        PD: true,
      };
      const data = this.drawDefectService.generateCircleImage(ss);
      const imageDiv = document.createElement('img');
      imageDiv.src = data;
      document.body.appendChild(imageDiv);
    });

    document.body.appendChild(parentDiv);
  }
}
