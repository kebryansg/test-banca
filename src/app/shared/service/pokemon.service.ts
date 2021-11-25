import {Injectable} from '@angular/core';
import {CrudService} from "./crud.service";
import {Observable} from "rxjs";
import {Pokemon} from "../interfaces/global";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private crudService: CrudService) {
  }

  getPokemonsByName(filterTerm: string): Observable<Pokemon[]> {
    return this.crudService.get('')
  }

  ObtenerPokemons(): Observable<Pokemon[]> {
    return this.crudService.get('', {idAuthor: 1})
  }

  getTypePokemon(): string[] {
    return [
      'water',
      'fire',
      'normal',
      'bug',
      'poison',
    ]
  }
}
