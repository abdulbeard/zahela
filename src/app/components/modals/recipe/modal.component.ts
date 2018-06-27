import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ModalService, ModalConfigBase } from '../../../services/ModalService';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: []
})
export class ModalComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }

  @Input()
  data: any;

  @Input()
  onDismiss: (success: boolean) => boolean;
  
  constructor() {
    
  }

  dismissModal(success: boolean) {
    if (this.onDismiss && this.onDismiss(success)) {
      return ModalService.hideModal(new ModalConfigBase({}, ModalComponent, this.onDismiss));
    }
    else if (!success) {
      return ModalService.hideModal(new ModalConfigBase({}, ModalComponent, this.onDismiss));
    }
  }  
}
