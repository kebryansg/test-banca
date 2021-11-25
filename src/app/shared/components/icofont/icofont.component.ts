import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'icofont',
  template: '<i class="icofont" [ngClass]="ico"></i>',
  styleUrls: ['../../../../assets/icon/icofont/css/icofont.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IcofontComponent implements OnInit {

  @Input() ico: string = '';

  constructor() {
  }

  ngOnInit() {
  }

}
