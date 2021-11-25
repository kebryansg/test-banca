import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {PokemonModule} from "./pokemon/pokemon.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgxSliderModule} from "@angular-slider/ngx-slider";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    PokemonModule,
    NgSelectModule,
    NgxSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
