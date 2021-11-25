import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pokemon} from "../../shared/interfaces/global";
import {Subject} from "rxjs";
import {PokemonService} from "../../shared/service/pokemon.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {debounceTime, startWith, switchMap, takeUntil} from "rxjs/operators";
import {EditPokemonComponent} from "../modals/edit-pokemon/edit-pokemon.component";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: []
})
export class ListadoComponent implements OnInit, OnDestroy {
  title = 'prueba-bpichincha';

  items: Pokemon[] = []

  listItems$: Subject<string> = new Subject<string>()
  destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(private pokemonService: PokemonService,
              private ngModal: NgbModal) {
  }

  ngOnInit(): void {
    this.listItems$
      .pipe(
        startWith(''),
        debounceTime(500),
        switchMap(search => this.pokemonService.getPokemonsByName(search)),
        takeUntil(this.destroy$),
      ).subscribe(listado => this.items = listado)

    // setTimeout(() => this.listItems$.next(), 300)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }

  editar(id?: Pokemon) {
    console.log('editar: ' + id)
    const modal = this.ngModal.open(EditPokemonComponent, {centered: true, size: 'lg'})
    modal.componentInstance.titleModal = id ? 'Editar Pokemon' : 'Nuevo Pokemon'
    modal.componentInstance.data = {}

    modal.result
      .then()

  }

  eliminar(id: number) {
    console.log('eliminar: ' + id)
  }
}
