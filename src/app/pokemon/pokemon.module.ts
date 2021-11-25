import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PokemonRoutingModule} from './pokemon-routing.module';
import {EditPokemonComponent} from "./modals/edit-pokemon/edit-pokemon.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {ListadoComponent} from './listado/listado.component';
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    EditPokemonComponent,
    ListadoComponent
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbTooltipModule,
  ],
  exports: [
    ListadoComponent
  ],
  entryComponents: [EditPokemonComponent]
})
export class PokemonModule {
}
