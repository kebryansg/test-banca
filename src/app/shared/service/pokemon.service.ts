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

  /***
   * Obtener Pokemons
   */
  ObtenerPokemons(): Observable<Pokemon[]> {
    return this.crudService.get('pokemons', {})
  }

  /***
   * Obtener Pokemon - Por Identificador
   * @param idPokemon Identificador Pokemon
   * @constructor
   */
  ObtenerPokemonById(idPokemon: number): Observable<Pokemon> {
    return this.crudService.get(`pokemons/${idPokemon}`)
  }

  /***
   * Obtener Pokemons - Filtro por Tipo Pokemon
   * @param type Tipo de Pokemon
   * @constructor
   */
  ObtenerPokemonByType(type: TypePokemon): Observable<Pokemon[]> {
    return this.crudService.get(`pokemons`, {type})
  }

  /***
   * Crear Pokemon
   * @param data Datos Pokemon
   * @constructor
   */
  CrearPokemon(data: Pokemon) {
    return this.crudService.post(`pokemons`, data)
  }

  /***
   * Actualizar Pokemon
   * @param idPokemon Identificador Pokemon
   * @param data Datos Pokemon
   * @constructor
   */
  ActualizarPokemon(idPokemon: number, data: Pokemon) {
    return this.crudService.put(`pokemons/${idPokemon}`, data)
  }

  /***
   * Eliminar Pokemon
   * @param idPokemon Identificador Pokemon
   * @constructor
   */
  EliminarPokemon(idPokemon: number) {
    return this.crudService.delete(`pokemons/${idPokemon}`)
  }

  /***
   * Obtener Tipos Pokemon
   */
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
