import { AbstractAppModel } from '../../../common/abstract-app-model';
import { AppClassHelper } from '../../../common/app-class-helper';
import { MsdbProvider } from '../../../common/msdb-provider';
import { Injectable } from '@angular/core';

@Injectable()
export class DetailModel extends AbstractAppModel {

  constructor(appClassHelper: AppClassHelper, msdbProvider: MsdbProvider) {
    super(appClassHelper, msdbProvider);
  }
}
