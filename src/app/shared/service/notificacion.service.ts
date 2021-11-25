import {Injectable} from '@angular/core';
import {SweetAlertOptions} from 'sweetalert2';

const swal2 = require('sweetalert2');

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor() {
  }

  //#region Swal Notificacion

  /* Swal Confirmar Acción */
  showSwalConfirm(options: Partial<SweetAlertOptions>): Promise<boolean> {
    return new Promise(resolve => {
      swal2.fire({
        //title: 'Esta seguro de guardar?',
        //text: 'Se enviaran los datos',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Guardar Información',
        cancelButtonText: 'Cancelar',
        ...options
      }).then((response: any) => {
        if (response.value) {
          resolve(true);
        }
        resolve(false);
      });
    });
  }

  /* Swal Mensaje */
  showSwalMessage(options?: Partial<SweetAlertOptions>) {
    return swal2.fire({
      title: 'Operación Exitosa',
      icon: 'success',
      showCancelButton: false,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok',
      ...options
    });
  }

  //#endregion
}
