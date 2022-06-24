import { Component } from '@angular/core';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent {
  public lat = -25.441105;
  public lng = -49.276855;
  public zoom = 12;
}
