import {Component} from '@angular/core';
import {NgSelectConfig} from "@ng-select/ng-select";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Prueba Banca Pichincha';

  constructor(private config: NgSelectConfig) {
    this.config.notFoundText = 'No hay items.';
    this.config.appendTo = 'body';
  }
}
