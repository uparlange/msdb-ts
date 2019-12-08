import { Component, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import Masonry from 'masonry-layout';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import { AbstractComponent } from 'src/app/fwk/abstract-component';
import { AppHelperObject } from 'src/app/common/providers/app-helper-object';

@Component({
  selector: "gallery",
  templateUrl: './gallery-component.html',
  styleUrls: ['./gallery-component.css']
})
export class GalleryComponent extends AbstractComponent {

  @Input() provider: Array<any> = new Array();
  @Input() colcount: number = 3;
  @Input() gap: number = 5;

  @ViewChild("galleryContainer", { static: false }) galleryContainer: ElementRef;
  @ViewChild("pswpContainer", { static: false }) pswpContainer: ElementRef;

  private _gallery: PhotoSwipe<any> = null;
  private _masonry: Masonry = null;
  private _refreshTimeout: any = null;

  constructor(appHelperObject: AppHelperObject) {
    super(appHelperObject);
  }

  onInit(): void {
    super.onInit();
  }

  onDestroy(): void {
    super.onDestroy();
    if (this._gallery !== null) {
      this._gallery.close();
    }
    if (this._masonry !== null) {
      this._masonry.destroy();
    }
  }

  @HostListener("window:resize", ["$event"]) onResize(event: any): void {
    this._refreshMasonry();
  }

  trackByName(index: number, item: any): void {
    return item ? item.name : undefined;
  }

  getItemStyles(image: any): any {
    const colwidth: number = this._getColWidth();
    const styles = {
      'float': 'left',
      'width': `${colwidth}px`,
      'height': `${this._getItemHeight(colwidth, image)}px`,
      'margin-bottom': `${this.gap}px`
    };
    return styles;

  }
  openImage(image: string): void {
    if (this._gallery !== null) {
      this._gallery.close();
    }
    const options: any = {
      index: this.provider.indexOf(image),
      clickToCloseNonZoomable: false,
      shareEl: false,
      history: false
    };
    this._gallery = new PhotoSwipe<PhotoSwipeUI_Default.Options>(this.pswpContainer.nativeElement, PhotoSwipeUI_Default, this.provider, options);
    this._gallery.init();
  }

  imagesCreated(): void {
    this._refreshMasonry();
  }

  private _getItemHeight(requiredWidth: number, image: any): number {
    return Math.round(requiredWidth * image.h / image.w);
  }

  private _refreshMasonry(): void {
    if (this._refreshTimeout != null) {
      clearTimeout(this._refreshTimeout);
    }
    this._refreshTimeout = setTimeout(() => {
      if (this._masonry !== null) {
        this._masonry.destroy();
      }
      this._masonry = new Masonry(".grid", {
        itemSelector: ".grid-item",
        columnWidth: this._getColWidth(),
        gutter: this.gap,
        resize: false
      });
    }, 10);
  }

  private _getColWidth(): number {
    const cCount = Math.min(this.colcount, this.provider.length);
    let cWidth = 0;
    if (this.galleryContainer) {
      cWidth = Math.round((this.galleryContainer.nativeElement.clientWidth - (cCount * this.gap)) / cCount);
    }
    return cWidth;
  }
}
