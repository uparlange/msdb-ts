import { Component, ElementRef, Renderer } from '@angular/core';
import Masonry from 'masonry-layout';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe';
import { AbstractComponent } from '../../../fwk/abstract-component';
import { AppClassHelper } from '../../app-class-helper';

@Component({
  selector: "gallery",
  inputs: ["provider", "colcount", "gap"],
  templateUrl: './gallery-component.html',
  styleUrls: ['./gallery-component.css']
})
export class GalleryComponent extends AbstractComponent {

  provider: Array<any> = new Array();
  colcount: number = 3;
  gap: number = 5;

  _element: any = null;
  _renderer: Renderer = null;
  _windowResizeHandler: Function = null;
  _onWindowResizeHandler: Function = null;
  _gallery: PhotoSwipe<any> = null;
  _masonry: Masonry = null;
  _resizeTimeout: any = null;

  constructor(appClassHelper: AppClassHelper, elementRef: ElementRef, renderer: Renderer) {
    super(appClassHelper);
    this._element = elementRef.nativeElement;
    this._renderer = renderer;
  }

  onInit(): void {
    super.onInit();
    this._onWindowResizeHandler = () => {
      this._refreshMasonry();
    };
    this._windowResizeHandler = this._renderer.listen(this.getWindowRef().nativeWindow, "resize", this._onWindowResizeHandler);
  }

  onDestroy(): void {
    super.onDestroy();
    if (this._gallery !== null) {
      this._gallery.close();
    }
    if (this._masonry !== null) {
      this._masonry.destroy();
    }
    this._windowResizeHandler();
  }

  trackByName(index: number, item: any): void {
    return item ? item.name : undefined;
  }

  getItemStyles(image): any {
    const colwidth: number = this._getColWidth();
    const styles = {
      'float': 'left',
      'width': `${colwidth}px`,
      'height': `${this._getItemHeight(colwidth, image)}px`,
      'margin-bottom': `${this.gap}px`
    };
    return styles;

  }
  openImage(image): void {
    if (this._gallery !== null) {
      this._gallery.close();
    }
    const options: any = {
      index: this.provider.indexOf(image),
      clickToCloseNonZoomable: false,
      shareEl: false,
      history: false
    };
    this._gallery = new PhotoSwipe<PhotoSwipeUI_Default.Options>(this._getPhotoSwipeContainer(), true, this.provider, options);
    this._gallery.init();
  }

  imagesCreated(): void {
    this._refreshMasonry();
  }

  _getItemHeight(requiredWidth, image): number {
    return Math.round(requiredWidth * image.h / image.w);
  }

  _refreshMasonry(): void {
    setTimeout(() => {
      if (this._masonry !== null) {
        this._masonry.destroy();
      }
      this._masonry = new Masonry(".grid", {
        itemSelector: ".grid-item",
        columnWidth: this._getColWidth(),
        gutter: this.gap,
        resize: false
      });
    }, 50);
  }

  _getGalleryContainer(): any {
    /* TODO get reference in other way ? */
    return this._element.getElementsByClassName("gallery")[0];
  }

  _getPhotoSwipeContainer(): any {
    /* TODO get reference in other way ? */
    return this._element.getElementsByClassName("pswp")[0];
  }

  _getColWidth(): number {
    const colcount = Math.min(this.colcount, this.provider.length);
    return Math.round((this._getGalleryContainer().clientWidth - (colcount * this.gap)) / colcount);
  }
}
