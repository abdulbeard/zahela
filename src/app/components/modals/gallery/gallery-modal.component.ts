import { Component, OnInit, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { ModalService, ModalConfigBase } from '../../../services/ModalService';
import { GalleryImage } from '../../../models/GalleryImage';
import { Subscription, Observable } from 'rxjs';
import { MobileUtils } from '../../../utils/MobileUtils';


@Component({
  selector: 'app-gallery-modal',
  templateUrl: './gallery-modal.component.html',
  styleUrls: ['./gallery-modal.component.css'],
  providers: []
})
export class GalleryModalComponent implements AfterViewInit, OnDestroy {
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngAfterViewInit(): void {
  }

  public imagesList: Array<GalleryImage>;
  public numTotalImages: number = 0;
  public currImageNum: number = 1;
  public _data: any;
  public subscription: Subscription;
  public isMobile: boolean = false;

  get data() {
    return this._data;
  }

  @Input()
  set data(data: any) {
    this._data = data;
    this.imagesList = data.imagesList;
    this.numTotalImages = this.imagesList.length;
    this.currImageNum = data.startingPosition;
    console.log(data);
  };

  @Input()
  onDismiss: (success: boolean) => boolean;
  
  constructor() {
    this.isMobile = MobileUtils.getIsMobileView();
    MobileUtils.IsMobileView.subscribe(x => {this.isMobile = x});
    this.subscription = Observable.fromEvent(document, 'keypress').subscribe(e => {
      console.log(e);
    })
  }

  get imgSrc() : string {
    return this.imagesList[this.currImageNum - 1]["url"];
  }

  dismissModal(success: boolean) {
    if (this.onDismiss && this.onDismiss(success)) {
      return ModalService.hideModal(new ModalConfigBase({}, GalleryModalComponent, this.onDismiss));
    }
    else if (!success) {
      return ModalService.hideModal(new ModalConfigBase({}, GalleryModalComponent, this.onDismiss));
    }
  }

  arrowLeft(){
    console.log('arrow left');
    if(this.currImageNum !== 1) {
      this.currImageNum--;
    }
  }
  arrowRight(){
    console.log('arrow right');
    if(this.currImageNum <= this.numTotalImages + 1) {
      this.currImageNum++
    }
    if(this.currImageNum === this.numTotalImages + 1){
      this.currImageNum = 1;
    }
  }
}
