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
    return this.crudService.get('pokemons')
  }

  ObtenerPokemons(): Observable<Pokemon[]> {
    return this.crudService.get('pokemons', {})
  }

  ObtenerPokemonById(idPokemon: number): Observable<Pokemon> {
    return this.crudService.get(`pokemons/${idPokemon}`)
  }

  ObtenerPokemonByType(type: TypePokemon): Observable<Pokemon[]> {
    return this.crudService.get(`pokemons`, {type})
  }

  CrearPokemon(data: Pokemon) {
    return this.crudService.post(`pokemons`, data)
  }

  ActualizarPokemon(idPokemon: number, data: Pokemon) {
    return this.crudService.put(`pokemons/${idPokemon}`, data)
  }

  EliminarPokemon(idPokemon: number) {
    return this.crudService.delete(`pokemons/${idPokemon}`)
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

export type TypePokemon = 'water' | 'fire' | 'normal' | 'bug' | 'poison'
