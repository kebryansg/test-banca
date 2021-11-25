import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgModalTemplate} from "../../../shared/components/modal-util";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
  styles: []
})
export class EditPokemonComponent implements OnInit {
  @Input() data: any;
  @Input() titleModal: string = '';
  itemForm: FormGroup

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,) {
  }

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      atack: ['', Validators.required],
      defense: ['', Validators.required],
      type: ['', Validators.required],
    })
  }

  submitForm() {
    this.activeModal.close(this.itemForm.getRawValue())
  }

}
