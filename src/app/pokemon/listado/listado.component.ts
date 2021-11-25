import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pokemon} from "../../shared/interfaces/global";
import {from, Observable, of, Subject} from "rxjs";
import {PokemonService} from "../../shared/service/pokemon.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {debounceTime, startWith, switchMap, takeUntil, tap} from "rxjs/operators";
import {EditPokemonComponent} from "../modals/edit-pokemon/edit-pokemon.component";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [`
    tr.loading {
      height: 60px;
    }
  `]
})
export class ListadoComponent implements OnInit, OnDestroy {
  title = 'prueba-bpichincha';

  items: Pokemon[] = []
  listType$: Observable<string[]>
  listItems$: Subject<string> = new Subject<string>()
  destroy$: Subject<boolean> = new Subject<boolean>()
  showLoading: boolean = false

  constructor(private pokemonService: PokemonService,
              private ngModal: NgbModal) {
  }

  ngOnInit(): void {
    this.listType$ = of(this.pokemonService.getTypePokemon())
    this.listItems$
      .pipe(
        startWith(''),
        tap(() => this.showLoading = true),
        debounceTime(500),
        switchMap(search => this.pokemonService.getPokemonsByName(search)),
        takeUntil(this.destroy$),
      ).subscribe(listado => {
      this.items = listado
      this.showLoading = false
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }

  setDefaultPic(row: Pokemon) {
    row.image = 'assets/img/default-pokemon.jpg'
  }

  editar(row?: Pokemon) {
    const modal = this.ngModal.open(EditPokemonComponent, {centered: true, size: 'lg'})
    modal.componentInstance.titleModal = row ? 'Editar Pokemon' : 'Nuevo Pokemon'
    modal.componentInstance.data = row || {}

    modal.result
      .then(dataModal => {
        if (!dataModal) return

        from(row ?
          this.pokemonService.ActualizarPokemon(row.id, dataModal)
          : this.pokemonService.CrearPokemon(dataModal))
          .subscribe(dataOperacion => {
            this.listItems$.next()
          })
      })
  }

  eliminar(id: number) {
    console.log('eliminar: ' + id)
  }
}
