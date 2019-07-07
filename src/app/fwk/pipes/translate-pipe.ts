import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { AbstractPipe } from '../abstract-pipe';
import { AppHelperObject } from 'src/app/common/app-helper-object';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe extends AbstractPipe implements PipeTransform {

  _tranlateKey: string = null;
  _translateParams: string = null
  _tranlateValue: string = null;
  _onLanguageChangeSubscription: Subscription = null;

  constructor(appHelperObject: AppHelperObject) {
    super(appHelperObject);
    this._onLanguageChangeSubscription = this.getLabels().on("languageChange").subscribe(() => {
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
    this._onLanguageChangeSubscription.unsubscribe();
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