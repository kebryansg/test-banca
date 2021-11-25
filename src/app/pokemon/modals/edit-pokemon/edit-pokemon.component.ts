import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PokemonService} from "../../../shared/service/pokemon.service";
import {Observable, of} from "rxjs";
import {isEmpty} from 'src/app/shared/constants/util';
import {Options} from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
  styles: [`
    .back-range {
      background-color: #e9ecef;
      padding: 10px 10px;
      border-radius: 10px;
    }
  `]
})
export class EditPokemonComponent implements OnInit {
  @Input() data: any;
  @Input() titleModal: string = '';
  itemForm: FormGroup
  listType$: Observable<string[]>
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 1
  };

  constructor(public activeModal: NgbActiveModal,
              private pokemonService: PokemonService,
              private fb: FormBuilder,) {
  }

  ngOnInit(): void {
    this.listType$ = of(this.pokemonService.getTypePokemon())
    this.itemForm = this.fb.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      image: ['', Validators.required],
      hp: [0, [Validators.required, Validators.min(1)]],
      attack: [0, [Validators.required, Validators.min(1)]],
      defense: [0, [Validators.required, Validators.min(1)]],
      idAuthor: [1, Validators.required],
      type: ['', Validators.required],
    })
    this.setearDatos()
  }

  setearDatos() {
    if (isEmpty(this.data)) return

    this.pokemonService.ObtenerPokemonById(this.data.id)
      .subscribe(pokemon =>
        this.itemForm.patchValue({
          id: pokemon.id,
          hp: pokemon.hp,
          name: pokemon.name,
          image: pokemon.image,
          attack: pokemon.attack,
          defense: pokemon.defense,
          type: pokemon.type,
        })
      )
  }

  submitForm() {
    this.activeModal.close(this.itemForm.getRawValue())
  }

}
