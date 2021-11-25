import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IcofontComponent} from "./components/icofont/icofont.component";
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    IcofontComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    IcofontComponent
  ]
})
export class SharedModule {
}
