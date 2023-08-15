import { Pipe, PipeTransform } from '@angular/core';
import { AbstractPipe } from '../abstract-pipe';
import { Subscription } from 'rxjs';
import { FwkHelperObject } from '../providers/fwk-helper-object';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe extends AbstractPipe implements PipeTransform {

  private _tranlateKey: string = "";
  private _translateParams: string = "";
  private _tranlateValue: string = "";
  private _onLanguageChangeSubscription: Subscription;

  constructor(
    protected override _helper: FwkHelperObject) {
    super(_helper);
    this._onLanguageChangeSubscription = this.getLabels().on("languageChange").subscribe(() => {
      this._refreshTranslation();
    });
  }

  transform(value: any, args?: any): any {
    const args_array = Array.from(arguments);
    const key = args_array.shift();
    let params = args_array.join(",");
    /*
    if (params == "") {
      params = null;
    }
    */
    if (this._tranlateKey !== key || this._translateParams !== params) {
      this._tranlateKey = key;
      this._translateParams = params;
      this._refreshTranslation();
    }
    return this._tranlateValue;
  }

  override onDestroy() {
    super.onDestroy();
    this._onLanguageChangeSubscription.unsubscribe();
  }

  private _refreshTranslation() {
    let param: any = this._tranlateKey;
    if (this._translateParams != null) {
      param = {
        key: this._tranlateKey,
        properties: this._translateParams.toString().split(",")
      };
    }
    this.getLabels().getValues([param]).subscribe((translations: Map<String, any>) => {
      this._tranlateValue = translations.get(this._tranlateKey);
    });

  }

}
