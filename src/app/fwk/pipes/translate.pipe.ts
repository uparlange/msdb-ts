import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { AbstractPipe } from '../abstract-pipe';
import { AppClassHelper } from 'src/app/common/app-class-helper';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe extends AbstractPipe implements PipeTransform {

  _tranlateKey: string = null;
  _translateParams: string = null
  _tranlateValue: string = null;
  _onLanguageChangeSubscriber: any = null;

  constructor(appClassHelper: AppClassHelper) {
    super(appClassHelper);
    this._onLanguageChangeSubscriber = this.getLabels().on("languageChange").subscribe(() => {
      this._refreshTranslation();
    });
  }

  transform(value: any, args?: any): any {
    const args_array = Array.from(arguments);
    const key = args_array.shift();
    let params = args_array.join(",");
    if (params == "") {
      params = null;
    }
    if (this._tranlateKey !== key || this._translateParams !== params) {
      this._tranlateKey = key;
      this._translateParams = params;
      this._refreshTranslation();
    }
    return this._tranlateValue;
  }

  onDestroy() {
    super.onDestroy();
    this._onLanguageChangeSubscriber.unsubscribe();
  }

  _refreshTranslation() {
    let param: any = this._tranlateKey;
    if (this._translateParams != null) {
      param = {
        key: this._tranlateKey,
        properties: this._translateParams.toString().split(",")
      };
    }
    this.getLabels().getValues([param]).subscribe((translations: object) => {
      this._tranlateValue = translations[this._tranlateKey];
    });

  }

}
