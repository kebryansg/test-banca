import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pokemon} from "../../shared/interfaces/global";
import {from, iif, Observable, of, Subject} from "rxjs";
import {PokemonService, TypePokemon} from "../../shared/service/pokemon.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {concatMap, debounceTime, startWith, switchMap, takeUntil, tap} from "rxjs/operators";
import {EditPokemonComponent} from "../modals/edit-pokemon/edit-pokemon.component";
import {NotificacionService} from "../../shared/service/notificacion.service";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [`
    tr.loading {
      //height: 60px;
    }

    .img-loading {
      height: 250px;
    }
  `]
})
export class ListadoComponent implements OnInit, OnDestroy {

  items: Pokemon[] = []
  selectTypePokemon: TypePokemon
  listType$: Observable<string[]>
  listItems$: Subject<string> = new Subject<string>()
  destroy$: Subject<boolean> = new Subject<boolean>()
  showLoading: boolean = false

  constructor(private pokemonService: PokemonService,
              private notificacionService: NotificacionService,
              private ngModal: NgbModal) {
  }

  ngOnInit(): void {
    this.listType$ = of(this.pokemonService.getTypePokemon())

    this.listItems$
      .pipe(
        startWith(undefined),
        tap(() => this.showLoading = true),
        debounceTime(500),
        // switchMap(search => this.pokemonService.getPokemonsByName(search)),
        switchMap(search => this.getTypeSearch(search)),
        takeUntil(this.destroy$),
      )
      .subscribe((listado: Pokemon[]) => {
        this.items = listado
        this.showLoading = false
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }

  keyUpEnter(evt: any) {
    const {value}: { value: string } = evt.target
    console.log(value)
    this.listItems$.next(value)
  }

  getTypeSearch(search?: string) {
    return from(this.selectTypePokemon ?
      this.pokemonService.ObtenerPokemonByType(this.selectTypePokemon) :
      this.pokemonService.ObtenerPokemons()
    ).pipe(
      concatMap((listadoPokemons) =>
        iif(() => search != undefined || search !== '',
          of(listadoPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search?.toLowerCase() || '')))
        )
      ),
    )
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

            this.notificacionService.showSwalMessage({
              title: 'Operación Exitosa',
              timer: 3000,
              onAfterClose: () => this.listItems$.next()
            })

          })
      })
  }

  eliminar(row: Pokemon) {
    this.notificacionService.showSwalConfirm({
      title: 'Eliminar Registro',
      text: `Eliminar Pokemon: ${row.name}`,
      confirmButtonText: 'Si, eliminar registro.'
    }).then(resolve => {
      if (!resolve) return

      this.pokemonService.EliminarPokemon(row.id)
        .subscribe(() => {
          this.notificacionService.showSwalMessage({
            title: 'Operación Exitosa',
            timer: 3000,
            onAfterClose: () => this.listItems$.next()
          })
        })

    })
  }
}
