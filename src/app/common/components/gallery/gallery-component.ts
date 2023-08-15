import { Component, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import Masonry from 'masonry-layout';
import PhotoSwipe from 'photoswipe';
import { AbstractAppComponent } from '../../abstract-app-component';
import { AppHelperObject } from '../../providers/app-helper-object';

@Component({
  selector: "gallery",
  templateUrl: './gallery-component.html',
  styleUrls: ['./gallery-component.css']
})
export class GalleryComponent extends AbstractAppComponent {

  @Input() provider: Array<any> = new Array();
  @Input() colcount: number = 3;
  @Input() gap: number = 5;

  @ViewChild("galleryContainer", { static: false })
  private _galleryContainer!: ElementRef;

  @ViewChild("pswpContainer", { static: false })
  private _pswpContainer!: ElementRef;

  private _gallery!: any;
  private _masonry!: any;
  private _refreshTimeout: any = null;

  constructor(
    protected override _helper: AppHelperObject) {
    super(_helper);
  }

  override onDestroy(): void {
    super.onDestroy();
    if (this._gallery != null) {
      this._gallery.close();
    }
    if (this._masonry != null) {
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
    if (this._gallery != null) {
      this._gallery.close();
    }
    this._gallery = new PhotoSwipe({
      gallery: this._pswpContainer.nativeElement,
      dataSource: this.provider,
      index: this.provider.indexOf(image),
      clickToCloseNonZoomable: false,
      pswpModule: () => import('photoswipe'),
    });
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
      if (this._masonry != null) {
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
    if (this._galleryContainer) {
      cWidth = Math.round((this._galleryContainer.nativeElement.clientWidth - (cCount * this.gap)) / cCount);
    }
    return cWidth;
  }
}
