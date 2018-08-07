import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  isCameraOpen: boolean = false;
  code: string = '';

  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent;

  ngOnInit() {

  }
  scan() {
    if (this.isCameraOpen) {
      let parent = document.getElementById('cameraArea');
      let child = document.getElementById('camera');
      parent.style.display = 'block';
      this.qrScannerComponent.getMediaDevices().then(devices => {
        console.log(devices);
        const videoDevices: MediaDeviceInfo[] = [];
        for (const device of devices) {
          if (device.kind.toString() === 'videoinput') {
            videoDevices.push(device);
          }
        }
        if (videoDevices.length > 0) {
          let choosenDev;
          for (const dev of videoDevices) {
            if (dev.label.includes('front')) {
              choosenDev = dev;
              break;
            }
          }
          if (choosenDev) {
            this.qrScannerComponent.chooseCamera.next(choosenDev);
          } else {
            this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
          }
        }
      });

      this.qrScannerComponent.capturedQr.subscribe(result => {
        console.log(result);
        this.code = result;
        this.isCameraOpen = false;
      });
    } else {
      let parent = document.getElementById('cameraArea');
      let child = document.getElementById('camera');
      parent.style.display = 'none';
    }
  }
}
