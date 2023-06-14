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
      const data = this.drawDefectService.generateCircleImage();
      const imageDiv = document.createElement('img');
      imageDiv.src = data;
      document.body.appendChild(imageDiv);
    });

    document.body.appendChild(parentDiv);
  }
}
